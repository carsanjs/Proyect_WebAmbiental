"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import ReloadSkeleto from "../../components/sckeletos/Vambientapp";
import Button from "../../components/ui/Button";
import { useRouter } from "next/navigation";
import Image from "next/image";

import Arduino from "../../public/lenguajes/arudino.png";
import Nextjs from "../../public/lenguajes/descargar.png";
import Docker from "../../public/lenguajes/dcoker1.png";
import Fastapi from "../../public/lenguajes/fastapi1.png";
import Mongodb from "../../public/lenguajes/mongo1.png";
import Mosquitto from "../../public/lenguajes/mosquitto.png";
import Github from "../../public/Logos/github.png";


import { VambientalAppTitle } from "../../components/share/VambientalTitle/Vambiental";

export default function Home() {  
  const [isLoading, setIsloading] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const technology = [
    "FastApi",
    "React",
    "MongoDB",
    "Mosquitto Broker",
    "Esp8266",
  ];
  const [technologyIndex, setTechnologyIndex] = useState(0);
  const [textTechnology, setTextTechnology] = useState("");
  const router = useRouter();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsloading(false);
    }, 2000);
    return () => clearTimeout(timeout);
  }, []);

  function type() {
    const currentTechnology = technology[technologyIndex];

    const shouldDelete = isDelete ? 1 : -1;
    setTextTechnology((current) =>
      currentTechnology.substring(0, current.length - shouldDelete)
    );
    if (!isDelete && textTechnology === currentTechnology) {
      setTimeout(() => setIsDelete(true), 300);
    } else if (isDelete && textTechnology === "") {
      setIsDelete(false);
      setTechnologyIndex((current) => (current + 1) % technology.length);
    }
  }

  useEffect(() => {
    const timer = setTimeout(type, isDelete ? 100 : 100);
    return () => clearTimeout(timer);
  }, [isDelete, textTechnology]);

  return (
    <>
      <div className="landing-page">
        <header>
          <div className="container-i">
            <VambientalAppTitle/>
            <ul className="links">
              <li>
                <a href="#">
                  <span>
                    <Image src={Github} alt="github" width={30} height={30} />{" "}
                  </span>
                </a>
              </li>
              <Link href="/auth/signup">
                <li>Regístrate</li>
              </Link>
            </ul>
          </div>
        </header>
        <div className="content-t">
          <div className="container-i">
            <div className="info">
              <h1 className="title-tx">
                Innovación para un mundo mejor
                <span className="text-primary">.</span>
              </h1>
              <p className="ttx">
                Bienvenido al proyecto de grado <strong className="vApp">Vambiental App</strong>.{" "}
                En este emocionante proyecto, hemos combinado tecnologías como {" "}
                <strong className="text-primary">{textTechnology}</strong>
              </p>
              <p className="ttx">
                Explora nuestra aplicación y descubre cómo la tecnología puede
                contribuir al cuidado del ambiente, promoviendo así la
                sostenibilidad ambiental.
              </p>
              <p className="ttx">
                Te invitamos a ingresar a nuestra web para ver el resultado
                final y conocer más sobre nuestra iniciativa.
              </p>
              <div className="flex gap-5 tac">
                {isLoading ? (
                  <ReloadSkeleto />
                ) : (
                  <Button
                    type="button"
                    className="btx"
                    text="Inicia sesión"
                    aria="Log in button"
                    onClick={() => router.push("/auth/signin")}
                  />
                )}
              </div>
              <div className="flex gap-5 py-4 px-4">         
            <ul className="icons">
                <li>
                  <a
                    href="#"
                    className=""
                  >
                    <span className="label">
                    <Image
                    src={Arduino}
                    alt="Arduino"
                    objectFit="cover"
                    height={80}
                    />
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=""
                  >
                    <span className="label"><Image
                    src={Mosquitto}
                    objectFit="cover"
                    alt="Mosquitto"
                    height={80}
                    /></span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=""
                  >
                    <span className="label"><Image
                    src={Docker}
                    objectFit="cover"
                    alt="Docker"
                    height={80}
                    /></span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=""
                  >
                    <span className="label"><Image
                    src={Fastapi}
                    alt="Fastapi"
                    objectFit="cover"
                    height={80}
                    /></span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className=""
                  >
                    <span className="label"><Image
                    src={Mongodb}
                    alt="Mongodb"
                    objectFit="cover"
                    height={80}
                    /></span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="icon style2 fa fa-codepen"
                  >
                    <span className="label">
                    <Image
                    src={Nextjs}
                    alt="Nextjs"
                    objectFit="cover"
                     height={80}
                    /></span>
                  </a>
                </li>
              </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
