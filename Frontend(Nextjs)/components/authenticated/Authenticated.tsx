'use client'
import React, {useEffect, useState} from "react";
import { useAuth } from "../../src/hooks/useAuth";
import { useLocation } from "react-router-dom";
import { useRouter } from 'next/navigation';
import { useSocketio } from "../../src/hooks/useSocket";

interface AuthenticatedProps {children: React.ReactNode;}


export const Authenticated: React.FC<AuthenticatedProps> = ({ children }) => {
    const auth = useAuth();
    const router = useRouter();
    const location = useLocation();
    const [isVerified, setIsVerified] = useState(false);
    const {socket} = useSocketio();

    useEffect(()=>{
        if(!auth.isAuthenticated){
            socket?.disconnect();
            router.push("/auth/signin", {scroll: true});
        } else {
            setIsVerified(true);
        }
    }, [auth.isAuthenticated, location, router, socket]);
    
    return isVerified && socket ? <>{children}</> : null;
}
