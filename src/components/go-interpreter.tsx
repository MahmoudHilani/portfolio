"use client";

import React, { useState, useRef, useEffect } from "react";

const API_URL = "/api/interpret";

const GoTerminal: React.FC = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState<string[]>([]);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;
    const curInput = input;
    setHistory([...history, input]);
    setHistoryIndex(-1);
    setInput("");
    setOutput([...output, `${curInput}\n`]);
    setIsLoading(true);

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ code: curInput }),
      });

      const data = await response.json();
      console.log(data);
      if (data.result != "No result") {
        setOutput((prev) => [...prev, data.result]);
      }
    } catch (error) {
      setOutput((prev) => [...prev, "Connection error. Can't reach service."]);
    } finally {
      setIsLoading(false);
      setInput("");
      setTimeout(() => inputRef.current?.focus(), 1);
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
            {">>"} {line}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <span>{">> "}</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="terminal input focus:outline-none max-w-full"
          disabled={isLoading}
          autoFocus
        ></input>
        {isFocused && <span className="h-5 w-3 bg-gray-400"></span>}
      </form>
    </div>
  );
};

export default GoTerminal;
