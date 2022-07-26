import React from "react";
import classes from "classnames";

import Card from "./Card";

import styles from './index.module.scss';

const Team = () => {
    return (
        <section className={classes("section", styles.section)}>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <h2 className={styles.title}>Meet The People Behind it All</h2>
                    <div className={styles.list}>
                        <div className={classes(styles.card, styles.top)}>
                            <Card
                                url={'/img/team/user_1.png'}
                                name={"Gelato"}
                            >
                                Head Blockchain Developer<br />
                                Tokenomics
                            </Card>
                        </div>
                        <div className={classes(styles.card, styles.bottom)}>
                            <Card
                                url={'/img/team/user_3.png'}
                                name={"Neopolitan"}
                            >
                                Head Web Developer<br />
                                Blockchain Developer
                            </Card>
                        </div>
                        <div className={classes(styles.card, styles.top)}>
                            <Card
                                url={'/img/team/user_5.png'}
                                name={"Sherbert"}
                            >
                                Head of tokenomics<br />
                                Marketing & Communications
                            </Card>
                        </div>
                        <div className={classes(styles.card, styles.bottom)}>
                            <Card
                                url={'/img/team/user_4.png'}
                                name={"Momo"}

                            >
                                Marketing & Communications
                            </Card>
                        </div>
                        <div className={classes(styles.card, styles.top)}>
                            <Card
                                url={'/img/team/user_2.png'}
                                name={"Tillamook"}
                
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Team;
