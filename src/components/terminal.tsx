"use client";
import { useEffect, useRef } from "react";
import { Terminal } from "@xterm/xterm";
import { IconMinus, IconSquare, IconTerminal, IconTerminal2, IconX } from "@tabler/icons-react";
import "@xterm/xterm/css/xterm.css";

export function APITerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputBuffer = useRef<string>("");

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      allowProposedApi: true,
    });

    term.open(terminalRef.current);
    term.write("Hi! Type something\r\n$ ");

    // Handle user input
    term.onData(async (data) => {
      const charCode = data.charCodeAt(0);

      // Handle Enter key
      if (charCode === 13) {
        term.write("\r\n");
        try {
          const response = await fetch("/api/interpret", {
            method: "POST",
            body: JSON.stringify({ code: inputBuffer.current }),
          });
          const result = await response.json();
          term.write(`${result.result}\r\n$ `);
        } catch (error: any) {
          term.write(`Error: ${error.message}\r\n$ `);
        }
        inputBuffer.current = "";
      }
      // Handle backspace
      else if (charCode === 127) {
        if (inputBuffer.current.length > 0) {
          inputBuffer.current = inputBuffer.current.slice(0, -1);
          term.write("\b \b");
        }
      }
      // Regular input
      else {
        inputBuffer.current += data;
        term.write(data);
      }
    });

    return () => {
      term.dispose();
    };
  }, []);

  return (
    <div className="drop-shadow-lg outline-1 outline-neutral-800">
          <div className="flex justify-between bg-black text-white text-sm pl-2 ">
            <div className="flex p-1">
                <IconTerminal2 className="w-5 mr-1"/>
              <>cmd.exe</>
            </div>
            <div className="flex items-center">
              <IconMinus className="w-8 h-full px-1 hover:bg-muted transition duration-200"/>
              <IconSquare className="w-8 h-full p-2 hover:bg-muted transition duration-200"/>
              <IconX className="w-8 h-full px-1 hover:bg-red-700 transition duration-200"/>
            </div>
          </div>
          {/* <Terminal /> */}
          <div ref={terminalRef} className="w-full" />
        </div>
      
  );
}
