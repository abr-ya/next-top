import React from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from "next";
import axios from "axios";
import { ParsedUrlQuery } from "node:querystring";

import { withLayout } from "@/layout/Layout";
import firstLevelMenu from "@/layout/Menu/FirstLevel";
import { MenuItem, TopLevelCategory, TopPageModel, ProductModel } from "@/interfaces/index";
import { TopPageComponent } from "@/pages/index";
import { API } from "src/helpers/api";

interface TopPageProps extends Record<string, unknown> {
  menu: MenuItem[];
  firstCategory: TopLevelCategory;
  page: TopPageModel;
  products: ProductModel[];
}

const TopPage = ({ firstCategory, page, products }: TopPageProps): JSX.Element => (
  <TopPageComponent firstCategory={firstCategory} page={page} products={products} />
);

export default withLayout(TopPage);

export const getStaticPaths: GetStaticPaths = async () => {
  let paths: string[] = [];
  for (const m of firstLevelMenu) {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: m.id,
    });
    paths = paths.concat(menu.flatMap((s) => s.pages.map((p) => `/${m.route}/${p.alias}`)));
  }
  //console.log(paths); // все пути, в основном - курсы
  return {
    paths,
    fallback: true,
  };
};

export const getStaticProps: GetStaticProps<TopPageProps> = async ({
  params,
}: GetStaticPropsContext<ParsedUrlQuery>) => {
  if (!params) {
    return {
      notFound: true,
    };
  }
  const firstCategoryItem = firstLevelMenu.find((m) => m.route == params.type);
  if (!firstCategoryItem) {
    return {
      notFound: true,
    };
  }
  try {
    const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
      firstCategory: firstCategoryItem.id,
    });
    if (menu.length == 0) {
      return {
        notFound: true,
      };
    }
    const { data: page } = await axios.get<TopPageModel>(`${API.topPage.byAlias}${params.alias}`);
    const productsOptions = {
      category: page.category,
      limit: 10,
    };
    const { data: products } = await axios.post<ProductModel[]>(API.product.find, productsOptions);

    return {
      props: {
        menu,
        firstCategory: firstCategoryItem.id,
        page,
        products,
      },
    };
  } catch {
    return {
      notFound: true,
    };
  }
};
