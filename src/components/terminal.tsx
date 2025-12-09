"use client";
import { useEffect, useRef, useCallback } from "react";
import { Terminal } from "@xterm/xterm";
import { ClipboardAddon } from "@xterm/addon-clipboard";
import {
  IconMinus,
  IconSquare,
  IconTerminal2,
  IconX,
} from "@tabler/icons-react";
import "@xterm/xterm/css/xterm.css";
import { FitAddon } from "@xterm/addon-fit";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface InterpretRequest {
  code: string;
}

interface InterpretResponse {
  result: string;
}

interface WebSocketErrorResponse {
  error: string;
  code: string;
}

const WS_URL = process.env.NEXT_PUBLIC_WS_URL || "/api/terminal";

export function APITerminal() {
  const terminalRef = useRef<HTMLDivElement>(null);
  const inputBuffer = useRef<string>("");
  const socketRef = useRef<WebSocket | null>(null);
  const attemptedConnection = useRef<boolean>(false);

  useEffect(() => {
    if (!terminalRef.current) return;

    const term = new Terminal({
      cursorBlink: true,
      allowProposedApi: true,
    });

    const clipboardAddon = new ClipboardAddon();
    const fitAddon = new FitAddon();
    term.loadAddon(clipboardAddon);
    term.loadAddon(fitAddon);

    term.open(terminalRef.current);
    fitAddon.fit();

    window.addEventListener("resize", () => {
      fitAddon.fit();
    });

    term.write("AWS EC2 is too expensive :( \r\n");
    // term.write("Connecting... \r\n");

    let socket: WebSocket;

    try {
      socket = new WebSocket(WS_URL);

      socket.onopen = () => {
        // console.log("Socket opened");
        attemptedConnection.current = true;
        term.write("Server connected. \r\n$ ");
      };

      socket.onclose = (event) => {
        // console.log("socket closed. ", event);
        if (attemptedConnection.current) {
          term.write("Server closed. Please try again later. \r\n$ ");
        } else {
          term.write(
            "Unable to connect to server. Please try again later. \r\n$ "
          );
        }
      };

      socket.onerror = (event) => {
        // console.log("socket error. ", event);
      };

      socket.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);
          console.log("received websocket message: ", data);

          if ("error" in data) {
            term.write(`${data.error}\r\n$ `);
          } else {
            if (data.result == "continue") {
              term.write(`$ `);
            } else {
              term.write(`${data.result}\r\n$ `);
            }
          }
        } catch (err) {
          // console.error("Error parsing websocket message: ", err);
          term.write("Error processing server response\r\n$ ");
        }
      };
      socketRef.current = socket;
    } catch (err) {
      term.write(
        "Failed to initialize connection. Please try again later.\r\n$ "
      );
    }

    const handlePaste = async () => {
      try {
        const text = await navigator.clipboard.readText();
        if (text) {
          inputBuffer.current += text;
          term.write(text);
        }
      } catch (err) {
        // console.error("Failed to read clipboard contents: ", err);
      }
    };

    // Handle user input
    term.onData(async (data) => {
      const charCode = data.charCodeAt(0);
      // Handle Enter key
      if (charCode === 13) {
        term.write("\r\n");
        interpretCode(inputBuffer.current.trim());
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

    term.attachCustomKeyEventHandler((arg) => {
      if (arg.ctrlKey && arg.code === "KeyV" && arg.type === "keydown") {
        handlePaste();
        return false;
      }
      return true;
    });

    return () => {
      term.dispose();
    };
  }, []);

  const interpretCode = useCallback((code: string) => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      // console.log("WebSocket not connected");
      return;
    }
    const request: InterpretRequest = { code: code };
    socketRef.current.send(JSON.stringify(request));
  }, []);

  return (
    <div className="drop-shadow-lg outline-1 outline-neutral-800">
      <div className="flex justify-between bg-black text-white text-sm pl-2 ">
        <div className="flex p-1">
          <IconTerminal2 className="w-5 mr-1" />
          <>cmd.exe</>
        </div>
        <div className="flex items-center">
          <Button
            onClick={() => toast("That tickles.")}
            variant="ghost"
            size="icon"
            className="dark:hover:bg-muted rounded-none"
          >
            <IconMinus />
          </Button>
          <Button
            onClick={() => toast("Maybe one day.")}
            variant="ghost"
            size="icon"
            className="dark:hover:bg-muted rounded-none"
          >
            <IconSquare />
          </Button>
          <Button
            onClick={() => toast("Stop that.")}
            variant="ghost"
            size="icon"
            className="dark:hover:bg-red-700 rounded-none"
          >
            <IconX className="size-6" />
          </Button>
        </div>
      </div>
      {/* <Terminal /> */}
      <div ref={terminalRef} />
    </div>
  );
}
