"use client";
import { AuthContext } from "../../../context/JWTAuthContext";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../../../context/JWTAuthContext";
import Reload from "../../../../components/ui/Loader";
import { BrowserRouter as Router } from "react-router-dom";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <Router>
      <AuthProvider>
        <AuthContext.Consumer>
          {(auth) =>
            !auth.isInitialized ? (
              <Reload />
            ) : (
              <main
                className="w-full"
                id="content-sesionprovider"
                aria-label="content"
              >
                <ToastContainer />
                {children}
              </main>
            )
          }
        </AuthContext.Consumer>
      </AuthProvider>
    </Router>
  );
}
