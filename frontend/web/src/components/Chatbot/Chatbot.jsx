import { useEffect, useRef, useState } from "react";
import { RiSendPlaneFill } from "react-icons/ri";
import { IoIosChatbubbles } from "react-icons/io";
import { IoMdClose } from "react-icons/io";
import logoImage from "../../assets/image.png";
import "./Chatbot.css";

const Chatbot = () => {
  const [inputValue, setInputValue] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [botTyping, setBotTyping] = useState(false);
  const [messages, setMessages] = useState([]);
  const chatBoxRef = useRef(null);

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const sendMessage = async () => {
    if (inputValue.trim() === "") return;

    addMessage("User", inputValue);
    setInputValue("");

    try {
      const response = await fetch("http://127.0.0.1:5000/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();
      addMessage("Bot", data.response);
    } catch (error) {
      console.error("Error:", error);
      addMessage("Bot", "Sorry, there was an error. Please try again.");
    }
  };

  const addMessage = async (sender, message) => {
    if (sender === "Bot") {
      setBotTyping(true);
      await sleep(800);
      setMessages((prevMessages) => [...prevMessages, { sender, message }]);
      await sleep(700);
      setBotTyping(false);
    } else {
      setMessages((prevMessages) => [...prevMessages, { sender, message }]);
    }
    await sleep(300);
    scrollToBottom();
  };

  const scrollToBottom = () => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  };

  const toggleChatbot = async () => {
    setShowChat((prev) => !prev);
    if (!showChat) {
      setBotTyping(true);
      await sleep(1500);
      setBotTyping(false);
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="container-chatbot">
      <IoIosChatbubbles
        size={50}
        className={`btn-open-chat ${showChat ? "is-hide" : "is-show"}`}
        onClick={toggleChatbot}
        aria-label="Open Chat"
      />
      {showChat && (
        <div className={`chatbot ${showChat ? "is-show" : "is-hide"}`}>
          <div className="header-chat">
            <div className="logo">
              <img src={logoImage} alt="logo" className="logo-image" />
              <div className="name">CrackInterview</div>
            </div>
            <IoMdClose
              size={26}
              className="btn-close-chat"
              onClick={toggleChatbot}
              aria-label="Close Chat"
            />
          </div>

          <div id="chatbox" ref={chatBoxRef}>
            <div className="bot">
              <div className="logo-chat">
                <img src={logoImage} alt="logo" className="logo-image-chat" />
                <h2>CrackInterview</h2>
              </div>
              {botTyping ? (
                <div className="shimmer-typing">
                  <div className="dots">
                    <div></div>
                    <div></div>
                    <div></div>
                  </div>
                </div>
              ) : (
                <>
                  <div className="message-bot">
                    Welcome to CrackInterview! 👋
                  </div>
                  <div className="message-bot">
                    What information are you looking for? <br />
                    Please use the navigation below or ask me anything about
                    CrackInterview products.
                  </div>
                </>
              )}
            </div>

            {messages.map((msg, index) => (
              <div key={index} className={msg.sender.toLowerCase()}>
                {msg.sender === "Bot" ? (
                  <>
                    <div className="logo-chat">
                      <img
                        src={logoImage}
                        alt="logo"
                        className="logo-image-chat"
                      />
                      <h2>CrackInterview</h2>
                    </div>
                    {botTyping ? (
                      <div className="shimmer-typing">
                        <div className="dots">
                          <div></div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    ) : (
                      <div className="message-bot">{msg.message}</div>
                    )}
                  </>
                ) : (
                  <div className="user">
                    <h2>You</h2>
                    <div className="message-user">{msg.message}</div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="input-field">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown = {(e) => { if (e.key === 'Enter') { sendMessage() } }}
              id="user-input"
              placeholder="Type a message..."
              aria-label="Message input"
            />
            <button
              onClick={sendMessage}
              className={`btn-send-message ${inputValue && "input-not-empty"}`}
              type="button"
              aria-label="Send message"
            >
              <RiSendPlaneFill className="send-icon" size={26} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
