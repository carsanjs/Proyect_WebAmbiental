"use client";
import React, { useEffect, useState } from "react";
import { useAuth } from "../../src/hooks/useAuth";
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

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.push("/dashboard/admin", { scroll: true });
    } else {
      setIsVerified(true);
    }
  }, [auth.isAuthenticated, location, router]);

  return isVerified ? <>{children}</> : null;
};
