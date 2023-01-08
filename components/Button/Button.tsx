import styles from './Button.module.css';
import { ButtonProps } from './Button.props';
import cn from 'classnames';

export const Button = ({ variant, children, className, ...props }: ButtonProps): JSX.Element => {
	return (
		<button
			className={cn(className, styles.button, {
				[styles.primary]: variant == 'primary',
				[styles.ghost]: variant == 'ghost',
			})}
      {...props}
		>
			{children}
		</button>
	);
};
