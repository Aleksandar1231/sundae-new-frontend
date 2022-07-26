import React from "react";
import classes from "classnames";

import styles from './index.module.scss';

const Card = ({url, name, children}) => {
    return (
        <div className={styles.block}>
            <div className={classes(styles.photo)}>
                <img
                    src={url}
                    alt={name}
                    loading={"lazy"}
                />
            </div>
            <h6 className={styles.name}>{name}</h6>
            <p className={styles.position}>{children}</p>
        </div>
    );
}

export default Card;
