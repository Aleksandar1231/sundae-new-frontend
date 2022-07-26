import React from "react";
import classes from "classnames";

import styles from './index.module.scss';

const Card = ({text, value}) => {
    return (
        <div className={classes("gradient-background", styles.block)}>
            <div className={styles.wrapper}>
                <p className={styles.text}>{text}</p>
                <p className={styles.value}>{value}</p>
            </div>
        </div>
    );
}

export default Card;
