import React from "react";

import styles from './index.module.scss';

const Preloader = () => {

    return (
        <div className={styles.block}>
            <div className={styles.wrapper}>
                <img
                    src={"https://icecreamfinance.app/static/media/loader.fa8ccc02.gif"}
                    alt={""}
                    loading={'lazy'}
                />
            </div>
        </div>
    );
}

export default Preloader;
