import Link from "next/link";
import cn from "classnames";
import { SidebarProps } from "./Sidebar.props";
import styles from "./Sidebar.module.css";
import Logo from "../logo.svg";
import { Menu } from "../Menu/Menu";
import { Search } from "@/components/index";

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Link href="/">
        <Logo className={styles.logo} style={{ cursor: "pointer" }} />
      </Link>
      <Search />
      <Menu />
    </div>
  );
};
