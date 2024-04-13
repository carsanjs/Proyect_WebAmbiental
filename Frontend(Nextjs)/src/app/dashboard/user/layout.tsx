"use client";
import { useState } from "react";
import Header from "../../../../components/share/Header";
import Sidebar from "../../../../components/share/Sidebar";
import { AuthProvider, AuthContext} from "../../../context/JWTAuthContext";
import { Authenticated } from "../../../../components/authenticated/Authenticated";
import { BrowserRouter as Router } from "react-router-dom";
import Loader from "../../../../components/ui/Loader";
import { ToastContainer } from "react-toastify";
interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <AuthProvider>
        <AuthContext.Consumer>
          {(auth) =>
            !auth.isInitialized ? <Loader/>: (
              <Authenticated>
                <ToastContainer/>
                <div className="dark:bg-boxdark-2 dark:text-bodydark overflow-hidden">
                  <div className="flex h-screen overflow-hidden">
                    <Sidebar
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                    />
                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-none overflow-hidden">
                     {children}     
                    </div>
                  </div>
                </div>
              </Authenticated>
            )
          }
        </AuthContext.Consumer>
      </AuthProvider>
    </Router>
  );

  // if(status === "unauthenticated"){
  //   return <div>Unauthenticated...dashboard</div>;
}
