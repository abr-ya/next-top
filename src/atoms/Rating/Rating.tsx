import { useEffect, useState, KeyboardEvent, forwardRef, ForwardedRef } from "react";
import cn from "classnames";
import { RatingProps } from "./Rating.props";
import StarIcon from "./star.svg";
import styles from "./Rating.module.css";

// eslint-disable-next-line react/display-name
export const Rating = forwardRef(
  (
    { isEditable = false, rating, setRating, ...props }: RatingProps,
    ref: ForwardedRef<HTMLDivElement>,
  ): JSX.Element => {
    const [ratingArray, setRatingArray] = useState<JSX.Element[]>(new Array(5).fill(<></>));

    useEffect(() => {
      constructRating(rating);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rating]);

    const changeDispay = (i: number) => {
      if (!isEditable) {
        return;
      }
      constructRating(i);
    };

    const onClick = (i: number) => {
      if (!isEditable || !setRating) {
        return;
      }
      setRating(i);
    };

    const handleSpace = (i: number, e: KeyboardEvent<SVGElement>) => {
      if (e.code != "Space" || !setRating) {
        return;
      }
      setRating(i);
    };

    const constructRating = (currentRating: number) => {
      const updatedArray = ratingArray.map((r: JSX.Element, i: number) => {
        return (
          // to use hover on star-margin
          <span
            className={cn(styles.star, {
              [styles.filled]: i < currentRating,
              [styles.editable]: isEditable,
            })}
            onMouseEnter={() => changeDispay(i + 1)}
            onMouseLeave={() => changeDispay(rating)}
            onClick={() => onClick(i + 1)}
            key={i}
          >
            <StarIcon
              tabIndex={isEditable ? 0 : -1}
              onKeyDown={(e: KeyboardEvent<SVGElement>) => isEditable && handleSpace(i + 1, e)}
            />
          </span>
        );
      });
      setRatingArray(updatedArray);
    };

    return (
      <div {...props} ref={ref}>
        {ratingArray.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
      </div>
    );
  },
);
