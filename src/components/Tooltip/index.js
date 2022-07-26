import React from "react";

import styles from './index.module.scss';

import Icon from "../Icon";

const Tooltip = ({text}) => {
    return (
        <div className={styles.block}>
            <span className={styles.icon}>
                <Icon name={'tooltip'}/>
            </span>
            <div className={styles.wrapper}>
                <p className={styles.text}>{text}</p>
            </div>
        </div>
    );
}

export default Tooltip;
