import React from "react";
import classes from "classnames";
import {useSelector} from "react-redux";

import styles from './index.module.scss';

const Roadmap = () => {
    const {mode} = useSelector(state => state.rootReducer.modeReducer)

    return (
        <section className="section">
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <h2 className={styles.title}>Sundae Roadmap</h2>
                </div>
            </div>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <div className={styles.block}>
                        <div className={styles.part}>
                            <div className={classes('gradient-background', styles.step)}>
                                <p className={styles.label}>Phase 1</p>
                            </div>
                            <div className={styles.wrap}>
                                <p className={styles.data}>2021</p>
                                <h5 className={styles.subtitle}>January</h5>
                                <ul className={classes(styles.list, styles.primary, styles[mode])}>
                                    <li className={styles.item}>Start initial announcement on Twitter</li>
                                    <li className={styles.item}>Create Discord and grow organically</li>
                                    <li className={styles.item}>Develope prototype website</li>
                                    <li className={styles.item}>Secure Domain icecreamfinance.app</li>
                                    <li className={styles.item}>Secure KYC from Assured DeFi</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.part}>
                            <div className={classes('gradient-background', styles.step)}>
                                <p className={styles.label}>Phase 2</p>
                            </div>
                            <div className={styles.wrap}>
                                <p className={styles.data}>2022</p>
                                <h5 className={styles.subtitle}>February</h5>
                                <ul className={classes(styles.list, styles.primary, styles[mode])}>
                                    <li className={styles.item}>Announce launch date for genesis pools</li>
                                    <li className={styles.item}>Launch IceCream Finance</li>
                                    <li className={styles.item}>Launch the Boardroom</li>
                                    <li className={styles.item}>Invest in marketing / social media influencers</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.part}>
                            <div className={classes('gradient-background', styles.step)}>
                                <p className={styles.label}>Phase 3</p>
                            </div>
                            <div className={styles.wrap}>
                                <p className={styles.data}>2022</p>
                                <h5 className={styles.subtitle}>March - May</h5>
                                <ul className={classes(styles.list, styles.primary, styles[mode])}>
                                    <li className={styles.item}>Introduce new protocol identity</li>
                                    <li className={styles.item}>Rebuild website with modern UI/UX</li>
                                    <li className={styles.item}>Strategic partnerships</li>
                                    <li className={styles.item}>Launch Sundae Finance</li>
                                    <li className={styles.item}>Zap optimization with variable slippage</li>
                                </ul>
                            </div>
                        </div>
                        <div className={styles.part}>
                            <div className={classes('gradient-background', styles.step)}>
                                <p className={styles.label}>Phase 4</p>
                            </div>
                            <div className={styles.wrap}>
                                <p className={styles.data}>2022</p>
                                <h5 className={styles.subtitle}>June - Present</h5>
                                <ul className={classes(styles.list, styles.primary, styles[mode])}>
                                    <li className={styles.item}>Development of deflationary mechanisms
                                    </li>
                                    <li className={styles.item}>Super Zapper and Strategy
                                    </li>
                                    <li className={styles.item}>Utility development; Creamery, Nodes and Freezer
                                    </li>
                                    <li className={styles.item}>Community education</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Roadmap;
