import ReactDOM from "react-dom/client";
import "./index.css";
import RouterHandler from "./RouterHandler";
import Chatbot from "./components/Chatbot/Chatbot";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <main>
      <Chatbot />
      <RouterHandler />;
    </main>
  </>
);
