/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";

type Message = { role: "user" | "bot"; text: string };

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { role: "user", text: input }]);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();
      setMessages((msgs) => [
        ...msgs,
        { role: "bot", text: data.reply ?? "Sorry, no response." },
      ]);
    } catch (err) {
      setMessages((msgs) => [
        ...msgs,
        { role: "bot", text: "Oops! Something went wrong." },
      ]);
    }
    
    setLoading(false);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className={`fixed bottom-8 right-8 z-50 bg-maroon-700 hover:bg-maroon-800 text-white rounded-full shadow-lg p-4 flex items-center transition-all cursor-pointer ${
          open ? "hidden" : ""
        }`}
        aria-label="Open Chatbot"
        onClick={() => setOpen(true)}
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="12" fill="#7C2D12" />
          <path
            d="M8 10h8M8 14h5"
            stroke="#fff"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
        <span className="ml-2 font-semibold hidden md:inline">Chat</span>
      </button>

      
      {open && (
        <div className="fixed bottom-8 right-8 w-128 bg-white/95 border-2 border-maroon-700 rounded-2xl shadow-2xl flex flex-col z-50 font-inter animate-fade-in backdrop-blur-sm">
          <div className="flex items-center justify-between px-4 py-3 bg-maroon-700 rounded-t-2xl">
            <span className="font-bold text-white text-lg">
              AcademiTrends Chatbot
            </span>
            <button
              className="text-white hover:text-maroon-100 transition"
              aria-label="Close Chatbot"
              onClick={() => setOpen(false)}
            >
              <svg width="22" height="22" fill="none" viewBox="0 0 24 24">
                <path
                  d="M6 6l12 12M6 18L18 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>
          {/* Message container: fixed height and scrollable */}
          <div
            className="overflow-y-auto p-3 space-y-2 h-128"
            style={{
              background: "rgba(127, 29, 29, 0.08)",
              // height: "18rem", // h-72 is 18rem in Tailwind
            }}
          >
            {messages.length === 0 && (
              <div className="text-maroon-700 text-center mt-8 text-base">
                Ask me anything about degrees, universities, or career trends!
              </div>
            )}
            {messages.map((m, i) => (
              <div
                key={i}
                className={
                  m.role === "user"
                    ? "flex justify-end"
                    : "flex justify-start"
                }
              >
                <div
                  className={
                    m.role === "user"
                      ? "bg-maroon-200 text-maroon-900 px-3 py-2 rounded-xl mb-1 max-w-[75%] shadow"
                      : "bg-white text-gray-900 px-3 py-2 rounded-xl mb-1 max-w-[75%] border border-maroon-100 shadow"
                  }
                >
                  {m.role === "bot" ? (
                    <ReactMarkdown
                      components={{
                        a: ({ node, ...props }) => (
                          <a
                            {...props}
                            className="text-maroon-700 underline hover:text-maroon-900 transition"
                            target="_blank"
                            rel="noopener noreferrer"
                          />
                        ),
                      }}
                    >
                      {m.text}
                    </ReactMarkdown>
                  ) : (
                    m.text
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
            {loading && (
              <div className="text-maroon-500 text-left">
                AcademiTrends is typing…
              </div>
            )}
          </div>
          <div className="flex border-t p-2 bg-white/80 rounded-b-2xl">
            <input
              className="flex-1 px-2 py-1 rounded-xl border border-maroon-200 mr-2 outline-none text-sm bg-maroon-50/40"
              type="text"
              placeholder="Ask your question…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              disabled={loading}
            />
            <button
              className="bg-maroon-700 text-white px-3 py-1 rounded-xl font-semibold text-sm hover:bg-maroon-800 transition"
              onClick={sendMessage}
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </div>
        </div>
      )}
      {/* Fade-in animation */}
      <style jsx>{`
        .animate-fade-in {
          animation: fadeIn 0.25s ease;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}

