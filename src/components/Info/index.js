import React from "react";

import Icon from "../Icon";

import styles from './index.module.scss';

const Info = ({text,children}) => {
    return (
        <div className={styles.block}>
            <span className={styles.icon}>
                <Icon name={'info'}/>
            </span>
            <p className={styles.text}>
                {children}
                {text}
            </p>
        </div>
    );
}

export default Info;
