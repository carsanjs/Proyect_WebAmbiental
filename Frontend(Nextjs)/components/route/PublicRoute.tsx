"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../src/hooks/useAuth";
import { useSocketio } from "../../src/hooks/useSocket";
import { useLocation, useNavigate } from "react-router-dom";
import { useRouter } from "next/navigation";
interface AuthenticatedProps {
  children: React.ReactNode;
}

export const PublicRoute: React.FC<AuthenticatedProps> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const location = useLocation();
  const [isVerified, setIsVerified] = useState(false);
  const {socket} = useSocketio();

  useEffect(() => {
    if (auth.isAuthenticated) {
      socket?.connect()
      router.push("/dashboard/admin", { scroll: true });
    } else {
      socket?.disconnect();
      setIsVerified(true);
    }
  }, [auth.isAuthenticated, location, router, socket]);


  return isVerified ? <>{children}</> : null;
};
