"use client";
import {
  FaSquareXTwitter,
  FaSquareInstagram,
  FaSquareSnapchat,
} from "react-icons/fa6";

import useMenuActive from "../../hooks/useMenuActive";
import { navLinks } from "../../constants";
import Vlogo from "../../public/V.png";
import Route from "../ui/Route";
import Image from "next/image";
import { usePathname } from "next/navigation";

const Footer = () => {
  const pathname = usePathname();
  return (
    <div className="w-full py-2 bg-tertiary mt-1">
      <div className="w-[95%] mx-auto max-w-[1450px]">
        <div className="py-4 border-gray-300 border-opacity-20 flex justify-between items-center max-md:flex-col max-md:gap-8">
          <div className="flex-1 justify-end text-2xl">
            <Image
              alt="Logo | Vambiental"
              src={Vlogo}
              width={48}
              height={48}
            ></Image>
          </div>

          <div className="flex px-1 justify-center item-center flex-1 justify-end text-2xl">
            <ul className="flex gap-12 max-md:flex-col max-md:gap-5 text-center">
              {navLinks.map((link, index) => {
                const isActive = useMenuActive(link.route);
                return (
                  <li
                    key={index}
                    className={`lila ${
                      pathname === link.route ? "text-primary" : "text-white"
                    }`}
                  >
                    <Route
                      route={link.route}
                      label={link.label}
                      isActive={isActive}
                    />
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="flex gap-5 text-white flex-1 justify-end text-2xl">
            <FaSquareXTwitter />
            <FaSquareInstagram />
            <FaSquareSnapchat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
