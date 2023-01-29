import cn from "classnames";
import { ReviewProps } from "./Review.props";
import styles from "./Review.module.css";

export const Review = ({ review, className, ...props }: ReviewProps): JSX.Element => {
  const { name, title, description, createdAt, rating } = review;
  console.log("review", name, title, description, createdAt, rating);

  return (
    <div className={cn(styles.review, className)} {...props}>
      [отзыв]
    </div>
  );
};
