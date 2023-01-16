import { CardHhProps } from "./CardHh.props";
import styles from "./CardHh.module.css";
import cn from "classnames";

export const CardHh = ({ color = "white", children, className, ...props }: CardHhProps): JSX.Element => {
  return (
    <div
      className={cn(styles.card, className, {
        [styles.blue]: color == "blue",
      })}
      {...props}
    >
      {children}
    </div>
  );
};
