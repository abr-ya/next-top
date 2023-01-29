import { useState, FormEvent } from "react";
import { useRouter } from "next/router";
import cn from "classnames";
import { Button, Input } from "@/atoms/index";
import { SearchProps } from "./Search.props";
import styles from "./Search.module.css";
import GlassIcon from "./glass.svg";

export const Search = ({ className, ...props }: SearchProps): JSX.Element => {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const goToSearch = () => {
    router.push({
      pathname: "/search",
      query: {
        q: search,
      },
    });
  };

  const submitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    goToSearch();
  };

  return (
    <form className={cn(className, styles.search)} {...props} role="search" onSubmit={submitHandler}>
      <Input
        className={styles.input}
        placeholder="Поиск..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Button variant="primary" type="submit" className={styles.button} aria-label="Искать по сайту">
        <GlassIcon />
      </Button>
    </form>
  );
};
