import { TopPageComponentProps } from "./TopPage.props";

export const TopPageComponent = ({ products }: TopPageComponentProps): JSX.Element => {
  return <>{products && products.length}</>;
};
