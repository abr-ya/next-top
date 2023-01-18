import { useReducer } from "react";
import { TopPageComponentProps } from "./TopPage.props";
import { Advantages, CardHh, Htag, Sort, Tag } from "@/components/index";
import { SortEnum } from "@/components/Sort/Sort.props";
import { TopLevelCategory } from "@/interfaces/index";
import { sortReducer } from "./sort.reducer";
import styles from "./TopPage.module.css";

export const TopPageComponent = ({ firstCategory, page, products }: TopPageComponentProps): JSX.Element => {
  const [{ products: sortedProducts, sort }, dispathSort] = useReducer(sortReducer, {
    products,
    sort: SortEnum.Rating,
  });

  const setSortHandler = (sort: SortEnum) => {
    dispathSort({ type: sort });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>
        <Htag tag="h1">{page.title}</Htag>
        {products && (
          <Tag color="grey" size="m">
            {products.length}
          </Tag>
        )}
        <Sort sort={sort} setSort={setSortHandler} />
      </div>
      <div>
        {sortedProducts &&
          sortedProducts.map(({ _id: id, title, price, initialRating: rate }) => (
            <div key={id}>
              {title}
              {`(${rate} - ${price})`}
            </div>
          ))}
      </div>
      <div className={styles.hhTitle}>
        <Htag tag="h2">Вакансии - {page.category}</Htag>
        <Tag color="red" size="m">
          hh.ru
        </Tag>
      </div>
      {firstCategory == TopLevelCategory.Courses && page.hh && <CardHh {...page.hh} />}
      {page.advantages && page.advantages.length > 0 && (
        <>
          <Htag tag="h2">Преимущства</Htag>
          <Advantages advantages={page.advantages} />
        </>
      )}
      {page.seoText && <div className={styles.seo} dangerouslySetInnerHTML={{ __html: page.seoText }} />}
      <Htag tag="h2">Получаемые навыки</Htag>
      {page.tags.map((t) => (
        <Tag key={t} color="primary">
          {t}
        </Tag>
      ))}
    </div>
  );
};
