import { TextareaProps } from "./Textarea.props";
import styles from "./Input.module.css";
import cn from "classnames";
import { ForwardedRef, forwardRef } from "react";

// eslint-disable-next-line react/display-name
export const Textarea = forwardRef(
  ({ error, className, ...props }: TextareaProps, ref: ForwardedRef<HTMLTextAreaElement>): JSX.Element => {
    return (
      <div className={cn(styles.inputWrapper, className)}>
        <textarea
          ref={ref}
          className={cn(styles.input, styles.w100, {
            [styles.error]: error,
          })}
          {...props}
        />
        {error && (
          <span role="alert" className={styles.errorMessage}>
            {error.message}
          </span>
        )}
      </div>
    );
  },
);
