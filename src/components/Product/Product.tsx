import React, { ForwardedRef, forwardRef, Fragment, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import cn from "classnames";
import { ProductProps } from "./Product.props";
import styles from "./Product.module.css";
import { Button, Card, Hr, Rating, Tag } from "@/atoms/index";
import { priceRu } from "src/helpers/money";
import Features from "./Features";
import { Review, ReviewForm } from "..";

export const Product = motion(
  // eslint-disable-next-line react/display-name
  forwardRef(
    (
      {
        className,
        product: {
          _id,
          title,
          initialRating,
          reviewAvg,
          price,
          oldPrice,
          image,
          credit,
          categories,
          reviewCount,
          description,
          advantages,
          disadvantages,
          characteristics,
          reviews,
        },
        ...props
      }: ProductProps,
      ref: ForwardedRef<HTMLDivElement>,
    ): JSX.Element => {
      const [isReviewOpened, setIsReviewOpened] = useState(!!reviews.length);

      const toggleReview = () => setIsReviewOpened((prev) => !prev);

      const reviewRef = useRef<HTMLDivElement>(null);

      const scrollToReview = () => {
        setIsReviewOpened(true);
        reviewRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      };

      const variants = {
        visible: { opacity: 1, height: "auto" },
        hidden: { opacity: 0, height: 0 },
      };

      return (
        <div className={className} {...props} ref={ref}>
          <Card className={styles.product}>
            <div className={styles.logo}>
              <Image src={`${process.env.NEXT_PUBLIC_DOMAIN}${image}`} alt={title} width={70} height={70} />
            </div>
            <div className={styles.title}>{title}</div>
            <div className={styles.price}>
              {priceRu(price)}
              {oldPrice && (
                <Tag className={styles.oldPrice} color="green">
                  {priceRu(price - oldPrice)}
                </Tag>
              )}
            </div>
            <div className={styles.credit}>
              {priceRu(credit)}/<span className={styles.month}>мес</span>
            </div>
            <div className={styles.rating}>
              <Rating rating={reviewAvg ?? initialRating} />
            </div>
            <div className={styles.tags}>
              {categories.map((category: string) => (
                <Tag key={category} className={styles.category} color="ghost">
                  {category}
                </Tag>
              ))}
            </div>
            <div className={styles.priceTitle}>цена</div>
            <div className={styles.creditTitle}>кредит</div>
            <div className={styles.rateTitle}>
              <a href="#ref" onClick={scrollToReview}>
                {reviewCount} отзывов
              </a>
            </div>
            <Hr className={styles.hr} />
            <div className={styles.description}>{description}</div>
            <Features data={characteristics} />
            <div className={styles.advBlock}>
              {advantages && (
                <div className={styles.advantages}>
                  <div className={styles.advTitle}>Преимущества</div>
                  <div>{advantages}</div>
                </div>
              )}
              {disadvantages && (
                <div className={styles.disadvantages}>
                  <div className={styles.advTitle}>Недостатки</div>
                  <div>{disadvantages}</div>
                </div>
              )}
            </div>
            <Hr className={styles.hr} />
            <div className={styles.actions}>
              <Button variant="primary">Узнать подробнее</Button>
              <Button
                variant="ghost"
                arrow={isReviewOpened ? "down" : "right"}
                className={styles.reviewButton}
                onClick={toggleReview}
              >
                Читать отзывы
              </Button>
            </div>
          </Card>
          <motion.div animate={isReviewOpened ? "visible" : "hidden"} variants={variants} initial="hidden">
            <Card
              color="blue"
              className={cn(styles.reviews, {
                [styles.opened]: isReviewOpened,
                [styles.closed]: !isReviewOpened,
              })}
              ref={reviewRef} // for scroll
            >
              {reviews.map((r) => (
                <Fragment key={r._id}>
                  <Review review={r} />
                  <Hr />
                </Fragment>
              ))}
              <ReviewForm productId={_id} />
            </Card>
          </motion.div>
        </div>
      );
    },
  ),
);
