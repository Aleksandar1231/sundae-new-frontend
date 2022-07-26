import React from "react";
import classes from "classnames";

import Logo from "../../components/Logo";
import Toggle from "../../components/Toggle";

import styles from './index.module.scss';

const Footer = ({alt}) => {
    return (
        <footer className={classes(styles.block, alt && styles.alt)}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={classes("container-fluid", styles.fluid)}>
                        <div className={classes("container", styles.container)}>
                            <div className={classes("row", styles.row)}>
                                <div className={classes("col", "col-12", "col-md-4", styles.col)}>
                                    <Logo/>
                                </div>
                                <div className={classes("col", "col-12", "col-md-8", styles.col)}>
                                    <ul className={styles.navigation}>
                                        <li className={styles.item}>
                                            <a
                                                href={"https://discord.com/invite/Z9wrNDUDa9"}
                                                className={styles.link}
                                                target={"_blank"}
                                                rel={"noreferrer"}
                                            >
                                                Discord
                                            </a>
                                        </li>
                                        <li className={styles.item}>
                                            <a
                                                href={"https://t.me/icecreamfinance"}
                                                className={styles.link}
                                                target={"_blank"}
                                                rel={"noreferrer"}
                                            >
                                                Telegram
                                            </a>
                                        </li>
                                        <li className={styles.item}>
                                            <a
                                                href={"https://twitter.com/IcecreamFinance"}
                                                className={styles.link}
                                                target={"_blank"}
                                                rel={"noreferrer"}
                                            >
                                                Twitter
                                            </a>
                                        </li>
                                        <li className={styles.item}>
                                            <a
                                                href={"https://icecreamfinancial.gitbook.io/sundae-finance/"}
                                                className={styles.link}
                                                target={"_blank"}
                                                rel={"noreferrer"}
                                            >
                                                GitBook
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div className={classes("container-fluid", styles.fluid)}>
                        <div className={classes("container", styles.container)}>
                            <div className={classes("row", styles.row)}>
                                <div className={classes("col", "col-12", "col-md-4", styles.col)}>
                                {/*    <div className={styles.rules}>*/}
                                {/*        <a*/}
                                {/*            href={"/"}*/}
                                {/*            className={classes(styles.link, styles.sm)}*/}
                                {/*            target={"_blank"}*/}
                                {/*            rel={"noreferrer"}*/}
                                {/*        >*/}
                                {/*            Privacy Policy*/}
                                {/*        </a>*/}
                                {/*        <div className={styles.divider}/>*/}
                                {/*        <a*/}
                                {/*            href={"/"}*/}
                                {/*            className={classes(styles.link, styles.sm)}*/}
                                {/*            target={"_blank"}*/}
                                {/*            rel={"noreferrer"}*/}
                                {/*        >*/}
                                {/*            Terms & Conditions*/}
                                {/*        </a>*/}
                                {/*    </div>*/}
                                </div>
                                <div className={classes("col", "col-12", "col-md-5", "col-lg-5", styles.col)}>
                                    <p className={classes(styles.text, styles.sm)}>
                                        © {new Date().getFullYear()}, IceCream Finance TEAM. All Rights Reserved
                                    </p>
                                </div>
                                <div className={classes("col", "col-12", "col-md-3", "col-lg-3", styles.col)}>
                                    <div className={styles.toggle}>
                                        <Toggle/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
