"use client";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "../../../../components/share/Sidebar";
import Loader from "../../../../components/ui/Loader";
import { ToastContainer } from "react-toastify";
import { AuthProvider, AuthContext } from "../../../context/JWTAuthContext";
import { SocketProvider } from "../../../context/SocketContext";
import { Authenticated } from "../../../../components/authenticated/Authenticated";

export default function Page() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <AuthProvider>
      <SocketProvider>
        <AuthContext.Consumer>
          {(auth) =>
            !auth.isInitialized ? (
              <Loader />
            ) : (
              <Authenticated>
                <ToastContainer />
                <div className="dark:bg-boxdark-2 dark:text-bodydark overflow-hidden">
                  <div className="flex h-screen overflow-hidden">
                    <Sidebar
                      sidebarOpen={sidebarOpen}
                      setSidebarOpen={setSidebarOpen}
                    />
                    <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-none overflow-hidden">
                      {/* <DashboardRoutes/> */}
                      <Outlet />
                    </div>
                  </div>
                </div>
              </Authenticated>
            )
          }
        </AuthContext.Consumer>
      </SocketProvider>
    </AuthProvider>
  );
}
