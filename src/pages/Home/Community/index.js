import React from "react";
import {useDispatch, useSelector} from "react-redux";

import classes from "classnames";

import {setModalData} from "../../../state/appReducer/actions/modalActions";

import Button from "../../../components/Button";

import styles from './index.module.scss';
import {useWallet} from "use-wallet";

const Community = () => {
    const dispatch = useDispatch();

    const {modal} = useSelector(state => state.rootReducer.modalReducer)
    const {account} = useWallet();
    return (
        <section className={classes("section", styles.section)}>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <div className={classes("row", styles.row)}>
                        <div
                            className={classes("col", "col-12", "col-md-8", "col-xl-6", "col-padding-vertical", styles.col)}>
                            <h2 className={styles.title}>Honesty and Integrity</h2>
                            <p className={styles.text}>The IceCream Finance TEAM was founded by a group of investors and developers who were exhausted
                                by the inconsistency of other decentralized finance protocols. We developed our protocol with the two pillars
                                of honesty and integrity, which we as a team will uphold by remaining community based and vocal upon
                                all developments. IceCream Finance was KYC'd by Assure Defi pre-launch to demonstrate our beliefs.
                                We have implemented community voting on important decisions and continue to educate investors as much
                                as possible to protect their capital in all investments.</p>

                            {!!!account && <div className={styles.button}>
                                <Button
                                    action={() => {
                                        dispatch(setModalData(!modal))
                                    }}
                                    type={"button"}
                                    placeholder={'Connect Wallet'}
                                    classname={'alt'}
                                />
                            </div>
                            }
                        </div>
                        <div
                            className={classes("col", "col-12", "col-md-4", "col-xl-6", "col-padding-vertical", styles.col)}>
                            <div className={styles.picture}>
                                <img
                                    src={"/img/community.gif"}
                                    alt={"Community"}
                                    loading={"lazy"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Community;
