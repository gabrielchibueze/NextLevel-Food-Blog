"use client";
import Link from "next/link";
import classes from "./nav-link.module.css";
import { usePathname } from "next/navigation";
export default function NavLink({ href, children }) {
  const path = usePathname();
  console.log(path);
  return (
    <div className={classes.navlinks}>
      <Link href={href}>
        <p className={path.startsWith(href) ? classes.activepath : ""}>
          {children}
        </p>
      </Link>
    </div>
  );
}
