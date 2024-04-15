import Image, { StaticImageData } from "next/image";

interface FARM {
  alt: string;
  src: StaticImageData;
  href:string;
}

export function IconsFarm({ alt, src , href}: FARM) {
  return (
  <li>
      <a href={href} className="">
      <Image
        className="icons-img-p"
        src={src}
        alt={alt}
        objectFit="cover"
        height={80}
      />
    </a>
  </li>
  );
}

export function IconsGithub({ alt, src , href}: FARM) {
    return (
        <li>
        <a href={href}>
            <Image src={src} 
            alt={alt} 
            width={30} 
            height={30} />{" "}
        </a>
        </li>
    );
  }
