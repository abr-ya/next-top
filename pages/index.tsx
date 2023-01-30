import React, { useState } from "react";
import axios from "axios";
import { GetStaticProps } from "next";

import { withLayout } from "../src/layout/Layout";
import { Button, H, Input, P, Rating, Tag, Textarea } from "@/atoms/index";
import { MenuItem } from "../src/interfaces/menu.interface";
import { API } from "src/helpers/api";

interface HomeProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: number;
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const firstCategory = 0;
  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, { firstCategory });

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
      <H tag="h1">Главная и песочница компонентов - Заголовок H1</H>
      <H tag="h2">Заголовок H2</H>
      <H tag="h3">Заголовок H3</H>

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
