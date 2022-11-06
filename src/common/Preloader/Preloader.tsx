import React from 'react';
import preloader from '../../assets/img/preloader.svg';
import styles from './Preloader.module.css'

export const Preloader = () => {
    return (
        <div className={styles.preloader}>
            <img src={preloader} alt={'preloader'}/>
        </div>
    );
};