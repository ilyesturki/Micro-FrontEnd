"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export interface ParkingSpot {
  id: number;
  spotNumber: string;
  status: "available" | "occupied";
}

const generateFakeSpots = (realSpots: ParkingSpot[]): ParkingSpot[] => {
  const fakeSpots: ParkingSpot[] = [];

  for (let i = 2; i <= 8; i++) {
    fakeSpots.push({
      id: i,
      spotNumber: `P${i}`,
      status: Math.random() > 0.5 ? "available" : "occupied",
    });
  }

  return [...realSpots, ...fakeSpots];
};

export default function useParking() {
  const [spots, setSpots] = useState<ParkingSpot[]>([]);
  const { data: session } = useSession({ required: true });
  const [, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    if (!session?.user?.id) return;

    const token = session?.user?.token;

    if (!token) return;

    const newSocket = io(process.env.NEXT_PUBLIC_SOCKET_URL!, {
      auth: { token },
      autoConnect: true,
    });

    setSocket(newSocket);
    newSocket.emit("join", session.user.id);

    newSocket.on("parking-updated", (updatedSpots: ParkingSpot[]) => {
      console.log(updatedSpots);
      // first spot = real data
      const fullParking = generateFakeSpots(updatedSpots);
      console.log(fullParking);
      setSpots(fullParking);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [session?.user?.id]);

  const availableCount = spots.filter(
    (spot) => spot.status === "available"
  ).length;
  return {
    spots,
    availableCount,
  };
}
