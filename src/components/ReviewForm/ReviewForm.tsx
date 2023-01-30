import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { ReviewFormProps } from "./ReviewForm.props";
import styles from "./ReviewForm.module.css";
import CloseIcon from "./close.svg";
import cn from "classnames";
import { Input, Rating, Textarea, Button } from "@/atoms/index";
import { IReviewForm, IReviewSentResponse } from "./ReviewForm.interface";
import { API } from "src/helpers/api";
import axios from "axios";

export const ReviewForm = ({ productId, className, ...props }: ReviewFormProps): JSX.Element => {
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IReviewForm>();

  const onSubmit = async (formData: IReviewForm) => {
    console.log(formData);

    try {
      const { data } = await axios.post<IReviewSentResponse>(API.review.createDemo, { ...formData, productId });
      if (data.message) {
        setIsSuccess(true);
        // reset();
      } else {
        setError("Что-то пошло не так");
      }
    } catch (e: any) {
      setError(e.message);
    }
  };

  return (
    <form onSubmit={handleSubmit((data) => onSubmit(data))}>
      <span>Оставить отзыв на продукт {productId}:</span>
      <div className={cn(styles.reviewForm, className)} {...props}>
        <Input
          {...register("name", { required: { value: true, message: "Заполните имя" } })}
          placeholder="Имя"
          error={errors.name}
        />
        <Input
          {...register("title", { required: { value: true, message: "Заполните заголовок" } })}
          placeholder="Заголовок отзыва"
          className={styles.title}
          error={errors.title}
        />
        <div className={styles.rating}>
          <span>Оценка:</span>
          <Controller
            control={control}
            name="rating"
            rules={{ required: { value: true, message: "Укажите рейтинг" } }}
            render={({ field }) => (
              <Rating
                isEditable
                rating={field.value}
                setRating={field.onChange}
                ref={field.ref}
                error={errors.rating}
              />
            )}
          />
        </div>
        <Textarea
          {...register("description", { required: { value: true, message: "Заполните описание" } })}
          placeholder="Текст отзыва"
          className={styles.description}
          error={errors.description}
        />
        <div className={styles.submit}>
          <Button variant="primary">Отправить</Button>
          <span className={styles.info}>* Перед публикацией отзыв пройдет предварительную модерацию и проверку</span>
        </div>
      </div>
      {isSuccess && (
        <div className={cn(styles.success, styles.panel)}>
          <div className={styles.successTitle}>Ваш отзыв отправлен</div>
          <div>Спасибо, ваш отзыв будет опубликован после проверки.</div>
          <CloseIcon className={styles.close} onClick={() => setIsSuccess(false)} />
        </div>
      )}
      {error && (
        <div className={cn(styles.error, styles.panel)}>
          Что-то пошло не так, попробуйте обновить страницу
          <CloseIcon className={styles.close} onClick={() => setError(undefined)} />
        </div>
      )}
    </form>
  );
};
