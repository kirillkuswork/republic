import React from 'react';
import styles from './SliderHand.module.scss';

export interface ISliderHand {
    position: 'left' | 'right';
}

const SliderHand: React.FC<ISliderHand> = ({ position }) => {
    return (
        <div className={styles.SliderHand + ` ${styles[position]}`}>
            <div className={'wrapper wrapper-visible'}>
                <img
                    src={'https://static.tildacdn.com/tild3834-6331-4462-b361-316363316363/hand.svg'}
                    className={styles.SliderHand__hand}
                    alt={'Указатель слайдера'}
                />
            </div>
        </div>
    );
};

export default SliderHand;
