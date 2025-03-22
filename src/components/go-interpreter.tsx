"use client";

import React, { useState, useRef, useEffect } from "react";

const API_URL = "/api/interpret";

const GoTerminal: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!input.trim() || isLoading) return;

    setHistory([...history, input]);
    setHistoryIndex(-1);

    setOutput([...output, `${input}\n`]);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: input }),
      });

      const data = await response.json();

      if (data.error) {
        setOutput((prev) => [...prev, `Error: ${data.error}`]);
      } else {
        setOutput((prev) => [...prev, data.result || "No output"]);
      }
    } catch (error) {
      setOutput((prev) => [...prev, "Connection error. Can't reach service."]);
    } finally {
      setIsLoading(false);
      setInput("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (historyIndex < history.length - 1) {
        const newIndex = historyIndex + 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(history[history.length - 1 - newIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput("");
      }
    }
  };

  return (
    <div className="terminal" onClick={() => inputRef.current?.focus()}>
      <div className="terminal header">bruh</div>
      <div className="terminal body">
        {output.map((line, index) => (
          <div key={index} className="terminal line">
            {line}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="terminal input"
          disabled={isLoading}
          autoFocus
        ></input>
      </form>
    </div>
  );
};

export default GoTerminal;
