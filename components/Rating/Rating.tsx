import { useEffect, useState } from 'react';
import cn from 'classnames';
import { RatingProps } from './Rating.props';
import StarIcon from './star.svg';
import styles from './Rating.module.css';
 
export const Rating = ({ isEditable = false, rating, setRating, ...props }: RatingProps): JSX.Element => {
	return (
		<div {...props}>
			<StarIcon className={styles.filled} />
		</div>
	);
};
