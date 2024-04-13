"use client";

import Button from "../../ui/Button";
import MobileMenu from "../MobileMenu";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { VambientalAppTitle } from "../VambientalTitle/Vambiental";
import ReloadSkeleto from "../../sckeletos/Vambientapp";

const Navbar = () => {
  const [isScrolling, setIsScrolling] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolling(true);
      } else {
        setIsScrolling(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(timeout);
    };
  }, []);
  return (
    <nav
      className={clsx(
        "py-4 w-full bg-white",
        isScrolling ? "fixed top-0 bg-white shadow-lg z-10" : "relative"
      )}
    >
      <div
        className={clsx(
          "w-[95%] mx-auto max-w-[1450px] flex  items-center justify-between border-gray-100",
          isScrolling && "pb-0 border-none",
          !isScrolling && "pb-5"
        )}
      >
        <VambientalAppTitle/>
        <div className="flex gap-5 flex-1 justify-end max-md:hidden">
          {isLoading ? (<ReloadSkeleto/>) : 
          (
            <Button 
            type="button"
            text="Inicia sesión" aria="Log in button" onClick={() => router.push("/auth/signin")}/>
          )}
        </div>
        <div>
          <MobileMenu />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
