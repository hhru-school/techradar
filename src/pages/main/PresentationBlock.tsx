import { FC } from 'react';

import Slider from './Slider';

import styles from './main.module.less';

const imgSrc = 'https://raw.githubusercontent.com/hhru-school/techradar/readme-asset/radarView.JPG';

const PresentationBlock: FC = () => {
    return (
        <div className={styles.presentationBlock}>
            <div className={styles.imgContainer}>
                <img className={styles.img} src={imgSrc}></img>
            </div>
            <Slider />
        </div>
    );
};

export default PresentationBlock;
