import React from "react";
import classes from "classnames";

import styles from './index.module.scss';
import CountUp from "react-countup";
import useTotalValueLocked from "../../../hooks/useTotalValueLocked";

const Banner = () => {
    const TVL = useTotalValueLocked();

    function handleMouseMove(e) {
        const parent = document.getElementById('banner-top')

        const rect = parent.getBoundingClientRect()
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        const mouseXpercentage = Math.round(x * 100 / rect.width);
        const mouseYpercentage = Math.round(y * 100 / rect.height);

        parent.style.background = `radial-gradient(at ${mouseXpercentage}% ${mouseYpercentage}%, #FDAD3E, #C64FBB)`
    }

    return (
        <section className={classes("section", styles.section)}>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <div
                        className={classes("gradient", styles.banner)}
                        onMouseMove={(e) => handleMouseMove(e)}
                        id={'banner-top'}
                    >
                        <div className={styles.left}>
                            <h1 className={styles.title}>The Sweetest Protocol on Avalanche</h1>
                            <p className={styles.text}>A seigniorage protocol designed to expand and contract supply similar to the way central banks trade fiscal debt to stabilize purchasing power. All of which provided without any rebases or collateral risk.</p>
                            <p className={styles.label}>Total Value Locked</p>
                            <CountUp className={styles.value} end={TVL} separator="," prefix="$"/>
                        </div>
                        <div className={styles.right}>
                            <div className={styles.picture}>
                                <div className={styles.img}>
                                    <img
                                        src={"/img/banner-1.png"}
                                        alt={"Banner 1"}
                                        loading={"lazy"}
                                    />
                                </div>
                                <div className={styles.img}>
                                    <img
                                        src={"/img/banner-2.png"}
                                        alt={"Banner 2"}
                                        loading={"lazy"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banner;
