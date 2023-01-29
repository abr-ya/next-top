import { TextareaProps } from "./Textarea.props";
import styles from "./Input.module.css";
import cn from "classnames";

export const Textarea = ({ error, className, ...props }: TextareaProps): JSX.Element => {
  return (
    <div className={cn(styles.inputWrapper, className)}>
      <textarea
        className={cn(styles.input, {
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
};
