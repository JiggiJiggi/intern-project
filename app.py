from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from transformers import AutoModelForCausalLM, AutoTokenizer
from sentence_transformers import SentenceTransformer, util
import fitz  
import re

### Divjot Bhogal
### 2024-07-26
### Chatbot v0.0.2

app = Flask(__name__)
CORS(app)
socketio = SocketIO(app, cors_allowed_origins="*")  # Adjust origin as needed

model_name = "microsoft/DialoGPT-small"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForCausalLM.from_pretrained(model_name)
sentence_model = SentenceTransformer('all-MiniLM-L6-v2')

# Function to extract text from questionnaire pdf
def extract_text_from_pdf(pdf_path):
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    return text

# Takes Questionnaire and uses regex to parse it into a format that the model can read.
def parse_qna(text):
    qna = {}
    pairs = re.split(r'(?<=\.)\s*(?=\n)',text.strip())
    for pair in pairs:
        if '?' in pair:
            question, answer = pair.split('?', 1)
            qna[question.strip()] = answer.strip()
    return qna

# Extract and parse Q&A from questionnaire
pdf_path = 'questionnaire.pdf'
pdf_text = extract_text_from_pdf(pdf_path)
specific_qna = parse_qna(pdf_text)

specific_qna_embeddings = {question: sentence_model.encode(question) for question in specific_qna}

# Uses pytorch to find the best match between user message and questionnaire, if none then results 
# with default chatbot output from DialoGPT
def find_best_match(user_message, threshold=0.5):
    user_embedding = sentence_model.encode(user_message)
    best_match = None
    best_score = 0

    for question, embedding in specific_qna_embeddings.items():
        score = util.pytorch_cos_sim(user_embedding, embedding).item()
        if score > best_score and score > threshold:
            best_match = question
            best_score = score  
    return best_match

@app.route('/')
def home():
    return 'Chatbot is running!'

@app.route('/chat', methods=['POST'])
def chat():
    user_message = request.json.get('message')
    
    best_match = find_best_match(user_message)
    if best_match:
        bot_response = specific_qna[best_match]
    else:
        inputs = tokenizer.encode(user_message + tokenizer.eos_token, return_tensors="pt")
        outputs = model.generate(inputs, max_length=1000, pad_token_id=tokenizer.eos_token_id)
        bot_response = tokenizer.decode(outputs[0], skip_special_tokens=True)
        bot_response = bot_response[len(user_message):]  # Removes user message from the bot response

    return jsonify({'response': bot_response})

if __name__ == '__main__':
    app.run(debug=True)