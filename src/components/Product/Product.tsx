import { ProductProps } from "./Product.props";

export const Product = ({ product: { title, initialRating, price } }: ProductProps): JSX.Element => {
  return <div>{`${title} ==  ${initialRating} == ${price}`}</div>;
};
