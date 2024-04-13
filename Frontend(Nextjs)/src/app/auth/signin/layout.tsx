"use client";
import "./signin.css";
import { useState, useEffect } from "react";
import Image from "next/image";
import LogoFondo from "../../../../public/lg.png";
import Footer from "../../../../components/share/Footer/Footer-login";
import { ToastContainer } from "react-toastify";
import { AuthProvider } from "../../../context/JWTAuthContext";
import { AuthContext } from "../../../context/JWTAuthContext";
import { BrowserRouter as Router } from "react-router-dom";
import { useRouter } from "next/navigation";
import Loader from "../../../../components/ui/loader/index";
import { VambientalAppSignin } from "../../../../components/share/VambientalTitle/VambientalSin";
import ReloadImage from "../../../../components/sckeletos/ImgSignin";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [isSimulatedLoading, setIsSimulatedLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsSimulatedLoading(false);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, []);

  const handleImageLoad = () => {
    setIsLoading(false); // Cuando la imagen se carga, establece isLoading en false
  };

  return (
    <Router>
      <AuthProvider>
        <AuthContext.Consumer>
          {(auth) =>
            !auth.isInitialized ? (
              <Loader />
            ) : (
              <>
                <div className="_sc ps">
                  <div className="Container-1">
                    <div className="_u-c">
                    <div className="showcase">
                        {isSimulatedLoading ? (
                          <ReloadImage />
                        ) : (
                         <>
                          <Image
                            className="_iclupc"
                            src={LogoFondo}
                            alt="Image"
                            onLoad={handleImageLoad}
                          />
                          <div className="_dvgmi"></div>
                          </>
                        )}
                      
                      </div>
                    </div>

                    <div className="_sbt _ptg _ptp" id="_sbt">
                      <div className="content-boxshadow">
                        <div className="div100">
                          <div className="centered-div">
                          <div className="showcase-content">
                          <VambientalAppSignin/>
                            </div>
                          </div>
                        </div>
                      </div>
                      <ToastContainer />
                      {children}
                    </div>
                  </div>
                </div>
                <Footer />
              </>
            )
          }
        </AuthContext.Consumer>
      </AuthProvider>
    </Router>
  );
}
