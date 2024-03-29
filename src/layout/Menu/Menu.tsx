import { useContext, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import cn from "classnames";
import { motion, useReducedMotion } from "framer-motion";
import { MenuContext } from "../../context/menu.context";
import firstLevelMenu from "./FirstLevel";
import styles from "./Menu.module.css";
import { FirstLevelMenuItem, PageItem } from "../../interfaces/menu.interface";

export const Menu = (): JSX.Element => {
  const { menu, setMenu, firstCategory } = useContext(MenuContext);
  const [announce, setAnnounce] = useState<"closed" | "opened" | undefined>();
  const shouldReduceMotion = useReducedMotion();
  const router = useRouter();

  const variants = {
    visible: {
      marginBottom: 20,
      transition: shouldReduceMotion ? {} : { when: "beforeChildren", staggerChildren: 0.1 },
    },
    hidden: { marginBottom: 0 },
  };

  const variantsChildren = {
    visible: { opacity: 1, height: 29 },
    hidden: { opacity: shouldReduceMotion ? 1 : 0, height: 0 },
  };

  const openSecondLevel = (secondCategory: string) => {
    setMenu &&
      setMenu(
        menu.map((m) => {
          if (m._id.secondCategory == secondCategory) {
            setAnnounce(m.isOpened ? "closed" : "opened");
            m.isOpened = !m.isOpened;
          }
          return m;
        }),
      );
  };

  const buildFirstLevel = () => {
    return (
      <>
        {firstLevelMenu.map((m) => (
          <div key={m.route}>
            <Link href={`/${m.route}`}>
              <a>
                <div
                  className={cn(styles.firstLevel, {
                    [styles.firstLevelActive]: m.id == firstCategory,
                  })}
                >
                  {m.icon}
                  <span>{m.name}</span>
                </div>
              </a>
            </Link>
            {m.id == firstCategory && buildSecondLevel(m)}
          </div>
        ))}
      </>
    );
  };

  const buildSecondLevel = (menuItem: FirstLevelMenuItem) => {
    return (
      <ul className={styles.secondBlock}>
        {menu.map((m) => {
          if (m.pages.map((p) => p.alias).includes(router.asPath.split("/")[2])) {
            m.isOpened = true;
          }
          return (
            <li key={m._id.secondCategory}>
              <button
                className={styles.secondLevel}
                onClick={() => openSecondLevel(m._id.secondCategory)}
                aria-expanded={m.isOpened}
              >
                {m._id.secondCategory}
              </button>
              <motion.ul
                layout
                variants={variants}
                initial={m.isOpened ? "visible" : "hidden"}
                animate={m.isOpened ? "visible" : "hidden"}
                className={styles.secondLevelBlock}
              >
                {buildThirdLevel(m.pages, menuItem.route, m.isOpened ?? false)}
              </motion.ul>
            </li>
          );
        })}
      </ul>
    );
  };

  const buildThirdLevel = (pages: PageItem[], route: string, isOpened: boolean) => {
    return pages.map((p) => (
      <motion.li key={p._id} variants={variantsChildren}>
        <Link href={`/${route}/${p.alias}`}>
          <a
            tabIndex={isOpened ? 0 : -1}
            className={cn(styles.thirdLevel, {
              [styles.thirdLevelActive]: `/${route}/${p.alias}` == router.asPath,
            })}
            aria-current={`/${route}/${p.alias}` == router.asPath ? "page" : false}
          >
            {p.category}
          </a>
        </Link>
      </motion.li>
    ));
  };

  return (
    <div className={styles.menu}>
      {announce && (
        <span role="log" className="visualyHidden">
          {announce == "opened" ? "развернуто" : "свернуто"}
        </span>
      )}
      {buildFirstLevel()}
    </div>
  );
};
