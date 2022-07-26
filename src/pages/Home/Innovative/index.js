import React from "react";
import classes from "classnames";

import styles from './index.module.scss';

const Innovative = () => {
    return (
        <section className={classes("section", styles.section)}>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <div className={classes("row", styles.row)}>
                        <div
                            className={classes("col", "col-12", "col-md-5", "col-xl-6", "col-padding-vertical", styles.col)}>
                            <div className={styles.picture}>
                                <div className={styles.img}>
                                    <img
                                        src={"/img/innovative-1.png"}
                                        alt={"Innovative 1"}
                                        loading={"lazy"}
                                    />
                                </div>
                                <div className={styles.img}>
                                    <img
                                        src={"/img/innovative-2.png"}
                                        alt={"Innovative 2"}
                                        loading={"lazy"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            className={classes("col", "col-12", "col-md-7", "col-xl-6", "col-padding-vertical", styles.col)}>
                            <h2 className={styles.title}>Pro-Active & <br/> Innovative Team</h2>
                            <p className={styles.text}>DeFi started off as a niche sector of crypto which has been
                                growing at an unquantifiable rate day by day. In such a rapidly expanding market it's
                                important that a team develops and implements new and innovative mechanism to set a
                                standard for new protocols.</p>
                            <p className={styles.text}>Our team consists of passionate investors right down to the core
                                with a strong understanding of the requirements to satisfy the decentralization of
                                financial independance.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Innovative;
