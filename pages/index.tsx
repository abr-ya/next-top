import React, { useState } from "react";
import { Button, Htag, P, Rating, Tag } from "../components";
import { withLayout } from "../layout/Layout";

const Home = (): JSX.Element => {
  const [rating, setRating] = useState(0);

  return (
    <>
      <Htag tag="h1">Первый заголовок)</Htag>
      <Htag tag="h2">Средний заголовок)</Htag>
      <Htag tag="h3">Мелкий заголовок)</Htag>

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
    </>
  );
};

export default withLayout(Home);
