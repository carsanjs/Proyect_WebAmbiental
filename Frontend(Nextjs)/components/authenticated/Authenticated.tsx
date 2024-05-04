"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../src/hooks/useAuth";
import { useLocation } from "react-router-dom";
import { useRouter } from "next/navigation";

interface AuthenticatedProps {
  children: React.ReactNode;
}

export const Authenticated: React.FC<AuthenticatedProps> = ({ children }) => {
  const auth = useAuth();
  const router = useRouter();
  const location = useLocation();
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push("/auth/signin", { scroll: true });
    } else {
      setIsVerified(true);
    }
  }, [auth.isAuthenticated, location, router]);

  return isVerified ? <>{children}</> : null;
};
