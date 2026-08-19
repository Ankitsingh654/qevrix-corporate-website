import React, { useState } from "react";

export default function Messages() {
  const [messages, setMessages] = useState([
    { from: "mentor", text: "Hey Ankit, how’s your project progress?" },
    { from: "intern", text: "Almost done, sir! Working on the dashboard now." },
  ]);
  const [input, setInput] = useState("");

  const sendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { from: "intern", text: input }]);
      setInput("");
    }
  };

  return (
    <div className="bg-qx-surface text-white flex h-[80vh] rounded-xl overflow-hidden border border-qx-borderHover shadow-lg">
      {/* Sidebar */}
      <div className="w-1/4 bg-qx-surface border-r border-qx-border p-4">
        <h2 className="text-xl font-semibold text-qx-primary mb-4">Mentors</h2>
        <ul className="space-y-3">
          <li className="p-2 bg-qx-surfaceHover rounded-lg cursor-pointer hover:bg-qx-primary">
            <span className="font-medium">Mr. Sharma (Java)</span>
          </li>
          <li className="p-2 bg-qx-surfaceHover rounded-lg cursor-pointer hover:bg-qx-primary">
            <span className="font-medium">Ms. Nidhi (Frontend)</span>
          </li>
        </ul>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto space-y-3">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex ${
                msg.from === "intern" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-4 py-2 rounded-lg max-w-xs ${
                  msg.from === "intern"
                    ? "bg-qx-primary text-gray-900"
                    : "bg-qx-surfaceHover"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <div className="p-4 bg-qx-surface border-t border-qx-border flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Type your message..."
            className="flex-1 bg-qx-surfaceHover rounded-lg p-2 text-white outline-none border border-qx-border"
          />
          <button
            onClick={sendMessage}
            className="ml-3 bg-qx-primary hover:bg-qx-primary text-gray-900 px-4 py-2 rounded-lg font-semibold transition"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
