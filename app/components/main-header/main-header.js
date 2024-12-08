import Link from "next/link";
import Image from "next/image";

import LogoImg from "@/assets/logo.png";
import HeaderCSS from "@/app/components/main-header/main-header.module.css";
import MainHeaderBackground from "./main-header-background";
import NavLink from "./nav-link";

export default function MainHeader() {
  return (
    <div className={HeaderCSS["header-section"]}>
      <MainHeaderBackground />
      <header className={HeaderCSS.header}>
        <Link href="/" className={HeaderCSS.logolink}>
          <Image
            src={LogoImg}
            className={HeaderCSS.logoimg}
            priority
            alt="Logo"
          />
          <h1>NEXTLEVEL FOOD</h1>
        </Link>
        <ul className={HeaderCSS.headerlinks}>
          <li>
            <NavLink href="/">Home</NavLink>
          </li>
          <li>
            <NavLink href="/meals">Browse Meals</NavLink>
          </li>
          <li>
            <NavLink href="/community">Join Community</NavLink>
          </li>
        </ul>
      </header>
    </div>
  );
}
