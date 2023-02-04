import { useEffect, useReducer } from "react";
import { TopPageComponentProps } from "./TopPage.props";
import { Advantages, CardHh, Product, Sort } from "@/components/index";
import { H, Tag } from "@/atoms/index";
import { SortEnum } from "@/components/Sort/Sort.props";
import { TopLevelCategory } from "@/interfaces/index";
import { sortReducer } from "./sort.reducer";
import styles from "./TopPage.module.css";

export const TopPageComponent = ({ firstCategory, page, products }: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispathSort] = useReducer(sortReducer, {
    products,
    sort: SortEnum.Rating,
  });

  useEffect(() => {
    dispathSort({ type: "reset", initialState: products });
  }, [products]);

  const setSortHandler = (sort: SortEnum) => {
    dispathSort({ type: sort });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <H tag="h1">{page.title}</H>
        {products && (
          <Tag color="grey" size="m">
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSortHandler} />
      </div>
      <div>{sortedProducts && sortedProducts.map((p) => <Product key={p._id} product={p} layout />)}</div>
      <div className={styles.hhTitle}>
        <H tag="h2">Вакансии - {page.category}</H>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>
      {firstCategory == TopLevelCategory.Courses && page.hh && <CardHh {...page.hh} />}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <H tag="h2">Преимущства</H>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
      <H tag="h2">Получаемые навыки</H>
      {page.tags.map((t) => (
        <Tag key={t} color="primary">
          {t}
        </Tag>
      ))}
    </div>
  );
};
