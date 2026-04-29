"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export default function useDoorQr() {
  const [qr, setQr] = useState("");
  const [connected, setConnected] = useState(false);
  const [qrId, setQrId] = useState("");
  const { data: session } = useSession({ required: true });
    const [, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    const token = session?.user?.token;

    if (!token) return;

    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      auth: { token },
      autoConnect: true,
    });

    setSocket(socket);
    socket.emit("join", session.user.id);

    socket.on("qr-updated", (data: { qr: string; qrId: string }) => {
      setQr(data.qr);
      setQrId(data.qrId);
    });

    socket.on("disconnect", () => {
      setConnected(false);
    });
    return () => {
      socket.disconnect(); 
    };
  },[session?.user?.id]);

  return {
    qr,
    qrId,
    connected,
  };
}
// "use client";

// import { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";

// export default function useDoorQr() {
//   const [qr, setQr] = useState<string>("");
//   const [connected, setConnected] = useState(false);

//   useEffect(() => {
//     const socket: Socket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
//       autoConnect: true,
//     });

//     socket.on("connect", () => {
//       setConnected(true);
//     });

//     socket.on("qr-updated", (data: { qr: string }) => {
//       setQr(data.qr);
//     });

//     socket.on("disconnect", () => {
//       setConnected(false);
//     });

//     return () => {
//       socket.disconnect();
//     };
//   }, []);

//   return {
//     qr,
//     connected,
//   };
// }