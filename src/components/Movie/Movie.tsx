import React from 'react';
import noImage from '../../assets/img/no-image.jpg'
import styles from './Movie.module.css'

type MoviePropsType = {
    title: string
    year: string
    poster: string
    imdbID: string
}

export const Movie: React.FC<MoviePropsType> = ({title, year, poster}) => {
    return (
        <div>
            {poster !== 'N/A'
                ? <img className={styles.image} src={poster} alt={'movie poster'}/>
                : <img className={styles.image} src={noImage} alt={'movie poster'}/>
            }
            <div>{title}</div>
            <div>{year}</div>
        </div>
    );
};