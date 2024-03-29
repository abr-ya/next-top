import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import { useScroll } from "../../hooks/useScroll";
import { ButtonIcon } from "../ButtonIcon/ButtonIcon";
import styles from "./Up.module.css";

export const Up = (): JSX.Element => {
  const controls = useAnimation();
  const y = useScroll();

  useEffect(() => {
    controls.start({ opacity: y / document.body.scrollHeight });
  }, [y, controls]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <motion.div className={styles.up} animate={controls} initial={{ opacity: 0 }}>
      <ButtonIcon variant="primary" icon="up" aria-label="Наверх" onClick={scrollToTop} />
    </motion.div>
  );
};
