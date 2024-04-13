import { useState} from "react";
import { CgMenuGridO, CgClose } from "react-icons/cg";
import {FaSquareInstagram} from "react-icons/fa6";
import { FaFacebookSquare } from "react-icons/fa";

import Button from "../ui/Button";
import Link from "next/link";


const MobileMenu = () => {
  const [openMobileMenu, setOpenMobileMenu] =
    useState(false);

  const mobileMenuHandler = () => {
    setOpenMobileMenu(!openMobileMenu);
  };
  return (
    <>
      <div
        className="container md:hidden"
        onClick={mobileMenuHandler}
      >
        {openMobileMenu ? (
          <CgClose size={25} />
        ) : (
          <CgMenuGridO size={25} />
        )}
      </div>

      {openMobileMenu ? (
        <div
          onClick={() => setOpenMobileMenu(false)}
          className="fixed w-full h-screen top-0 left-0 bg-black/25 z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="absolute h-screen left-0 top-0 w-60 bg-white z-[999] px-5 border-r overflow-y-hidden flex flex-col gap-10"
          >
            <div className="border-b py-5">
              <Link href={"/"}>
                <h1 className="text-3xl font-extrabold text-secondary">Vambiental <span className="text-primary">App</span></h1>
              </Link>
              <div className="flex gap-5 text-secondary flex-1 justify-center text-xl mt-5">
                <FaFacebookSquare />
                <FaSquareInstagram />
              </div>
            </div>
            <div className="flex justify-center items-center">
             <Link href="/auth/signin">
             <Button
                text="Inicia sesión"
                onClick={() => null}
                aria="Log in button"
              />
             </Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default MobileMenu;
