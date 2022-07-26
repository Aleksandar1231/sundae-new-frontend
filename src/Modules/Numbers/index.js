import React from "react";
import classes from "classnames";

import styles from './index.module.scss';
import Icon from "../../components/Icon";


const Numbers = ({title, description, info, page}) => {
    return (
        <section className={classes("section", styles.section, page !== 'home' && styles.inner)}>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <div className={classes("row", styles.row)}>
                        <div className={classes("col", "col-12", "col-padding-vertical", styles.col)}>
                            <div className={styles.group}>
                                <h2 className={styles.title}>{title}</h2>
                                <p className={styles.text}>{description}</p>
                            </div>
                        </div>
                        <div
                            className={classes("col", "col-12", "col-md-6", "col-xl-4", "col-padding-vertical", styles.col)}>
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <Icon name={info[0].icon}/>
                                </div>
                                <h5 className={styles.subtitle}>{info[0].title}</h5>
                                <p className={styles.text}>{info[0].text}</p>
                            </div>
                        </div>
                        <div
                            className={classes("col", "col-12", "col-md-6", "col-xl-4", "col-padding-vertical", styles.col)}>
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <Icon name={info[1].icon}/>
                                </div>
                                <h5 className={styles.subtitle}>{info[1].title}</h5>
                                <p className={styles.text}>{info[1].text}</p>
                            </div>
                        </div>
                        <div
                            className={classes("col", "col-12", "col-md-6", "col-xl-4", "col-padding-vertical", styles.col)}>
                            <div className={styles.item}>
                                <div className={styles.icon}>
                                    <Icon name={info[2].icon}/>
                                </div>
                                <h5 className={styles.subtitle}>{info[2].title}</h5>
                                <p className={styles.text}>{info[2].text}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Numbers;
