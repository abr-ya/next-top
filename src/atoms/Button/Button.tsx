import { motion } from "framer-motion";
import cn from "classnames";
import styles from "./Button.module.css";
import { ButtonProps } from "./Button.props";
import ArrowIcon from "./arrow.svg";

export const Button = ({ variant, arrow = "none", children, className, ...props }: ButtonProps): JSX.Element => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      className={cn(className, styles.button, {
        [styles.primary]: variant === "primary",
        [styles.ghost]: variant === "ghost",
      })}
      {...props}
    >
      {children}
      {arrow !== "none" && (
        <span
          className={cn(styles.arrow, {
            [styles.down]: arrow === "down",
          })}
        >
          <ArrowIcon />
        </span>
      )}
    </motion.button>
  );
};
