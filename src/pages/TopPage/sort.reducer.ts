import { SortEnum } from "@/components/Sort/Sort.props";
import { ProductModel } from "@/interfaces/index";

export type SortActions =
  | { type: SortEnum }
  | { type: SortEnum.Rating }
  | { type: "reset"; initialState: ProductModel[] };

export interface SortReducerState {
  sort: SortEnum;
  products: ProductModel[];
}

export const sortReducer = (state: SortReducerState, action: SortActions): SortReducerState => {
  switch (action.type) {
    case SortEnum.Rating:
      return {
        sort: SortEnum.Rating,
        products: state.products.sort((a, b) => (a.initialRating > b.initialRating ? -1 : 1)),
      };
    case SortEnum.Price:
      return {
        sort: SortEnum.Price,
        products: state.products.sort((a, b) => (a.price > b.price ? 1 : -1)),
      };
    case SortEnum.Reviews:
      return {
        sort: SortEnum.Reviews,
        products: state.products.sort((a, b) => (a.reviews.length < b.reviews.length ? 1 : -1)),
      };
    case "reset":
      return {
        sort: SortEnum.Rating,
        products: action.initialState,
      };
    default:
      throw new Error("Неверный тип сортировки");
  }
};
