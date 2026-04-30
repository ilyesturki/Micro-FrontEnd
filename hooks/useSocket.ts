"use client";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_URL = "wss://micro-backend-nf3s.onrender.com";

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    const newSocket = io(SOCKET_URL, {
      transports: ["websocket"],
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {});

    newSocket.on("serverMessage", (data: string) => {
      setMessage(data);
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return { socket, message };
};
