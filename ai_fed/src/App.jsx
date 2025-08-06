import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [input, setInput] = useState("");
  const [chat, setChat] = useState([]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setChat([...chat, userMessage]);


    const response = await axios.post("https://your-backend-url.onrender.com/chat", {
  message: input,
});

   

    const botMessage = { sender: "bot", text: response.data.reply };
    setChat(prev => [...prev, botMessage]);
    setInput("");
  };

  return (
    <div className="chat-container">
      <h2>AI Chatbot</h2>
      <div className="chat-box">
        {chat.map((msg, index) => (
          <p key={index} className={msg.sender}>
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}

export default App;
