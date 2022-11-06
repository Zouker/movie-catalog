import React from 'react';
import preloader from '../../assets/img/preloader.svg';

export const Preloader = () => {
    return (
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
            <img src={preloader} alt={'preloader'}/>
        </div>
    );
};