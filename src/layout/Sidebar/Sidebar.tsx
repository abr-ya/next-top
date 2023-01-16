import cn from "classnames";
import { SidebarProps } from "./Sidebar.props";
import styles from "./Sidebar.module.css";
import Logo from "../logo.svg";
import { Menu } from "../Menu/Menu";

export const Sidebar = ({ className, ...props }: SidebarProps): JSX.Element => {
  return (
    <div className={cn(className, styles.sidebar)} {...props}>
      <Logo className={styles.logo} />
      <div>поиск</div>
      <Menu />
    </div>
  );
};