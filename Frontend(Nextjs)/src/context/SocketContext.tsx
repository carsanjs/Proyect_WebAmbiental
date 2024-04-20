import { useEffect, useState, createContext } from "react";

import { io, Socket } from "socket.io-client";
import { toast } from "react-toastify";

interface SocketProviderProps {
  children: React.ReactNode;
}

interface Messages {
  sid: string;
  message: string;
  timestamp: string;
}

interface SocketContextType {
  socket: Socket | null;
  message: Messages[];
}

export const SocketContext = createContext<SocketContextType>({
  socket: null,
  message: [],
});

export const SocketProvider: React.FC<SocketProviderProps> = ({ children }) => {
  const user_id_ = localStorage.getItem("accessToken");
  console.log(user_id_);
  const [message, setMessage] = useState<Messages[]>([]);
  const [socket, setSocket] = useState<Socket | null>(null);

  console.log("message", message);

  const Newsocket = io("ws://localhost:8000", {
    path: "/ws/socket.io/",
    transports: ["websocket", "polling"],
    autoConnect: true,
    upgrade: true,
  });

  useEffect(() => {
    if (Newsocket) {
      Newsocket.on("connect", () => {
        console.log(`Conexión establecida con el servidor..${Newsocket.id}`);
        Newsocket.emit("my_event", {
          user_id:user_id_,
          sid: Newsocket.id,
        });
      });

      setSocket(Newsocket);


      Newsocket.on("my_response", (msg) => {
        toast.info("Nueva Notificación", {
          position: "bottom-right",
          theme: "colored",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
        });
        // notificationAudio.play();
        console.log("Received message:", msg);
        setMessage((prevmsg) => [...prevmsg, msg]);
      });

      Newsocket.on("disconnect", (reason) => {
        console.log(`disconnected due to ${reason}`);
      });
    }

    return () => {
      // Newsocket.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={{ socket, message }}>
      {children}
    </SocketContext.Provider>
  );
};
