import axios from "axios";
import { GetStaticProps } from "next";
import React, { useState } from "react";
import { Button, H, Input, P, Rating, Tag, Textarea } from "@/atoms/index";
import { MenuItem } from "../src/interfaces/menu.interface";
import { withLayout } from "../src/layout/Layout";

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(`${process.env.NEXT_PUBLIC_DOMAIN}/api/top-page/find`, {
    firstCategory,
  });
  return {
    props: {
      menu,
      firstCategory,
    },
  };
};

const Home = (): JSX.Element => {
  const [rating, setRating] = useState(0);

  return (
    <>
      <H tag="h1">Первый заголовок)</H>
      <H tag="h2">Средний заголовок)</H>
      <H tag="h3">Мелкий заголовок)</H>

      <Button variant="primary">Кнопка primary</Button>
      <Button variant="ghost" arrow="right">
        Кнопка ghost
      </Button>

      <P size="l">Большой параграф.</P>
      <P>Средний параграф.</P>
      <P size="s">Маленький параграф.</P>

      <Tag size="s">Default S</Tag>
      <Tag color="primary">Primary Default</Tag>
      <Tag size="s" color="green">
        Green S
      </Tag>
      <Tag size="m" color="red">
        Red M
      </Tag>

      <Rating rating={rating} isEditable setRating={setRating} />
      <Input placeholder="тест" />
      <Textarea placeholder="тест Textarea" />
    </>
  );
};

export default withLayout(Home);
