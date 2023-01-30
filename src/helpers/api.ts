const SERVER = process.env.NEXT_PUBLIC_DOMAIN;

export const API = {
  topPage: {
    find: `${SERVER}/api/top-page/find`,
    byAlias: `${SERVER}/api/top-page/byAlias/`,
  },
  product: {
    find: `${SERVER}/api/product/find`,
  },
  review: {
    createDemo: `${SERVER}/api/review/create-demo`,
  },
};
