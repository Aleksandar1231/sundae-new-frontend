import React from "react";
import {useDispatch, useSelector} from "react-redux";

import classes from "classnames";

import {setModalData} from "../../../state/appReducer/actions/modalActions";

import Button from "../../../components/Button";

import styles from './index.module.scss';
import {useWallet} from "use-wallet";

const CTA = () => {
    const dispatch = useDispatch();

    const {modal} = useSelector(state => state.rootReducer.modalReducer)

    function handleMouseMove(e) {
        const parent = document.getElementById('banner-bottom')

        const rect = parent.getBoundingClientRect()
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;

        const mouseXpercentage = Math.round(x * 100 / rect.width);
        const mouseYpercentage = Math.round(y * 100 / rect.height);

        parent.style.background = `radial-gradient(at ${mouseXpercentage}% ${mouseYpercentage}%, #FDAD3E, #C64FBB)`
    }
    const {account} = useWallet();
    return (
        <section className={classes("section", styles.section)}>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <div
                        className={classes('gradient', styles.banner)}
                        onMouseMove={(e) => handleMouseMove(e)}
                        id={'banner-bottom'}
                    >
                        <h2 className={styles.title}>Start in Seconds</h2>
                        <p className={styles.text}>Connect your wallet to start using the app in seconds. <br/>No
                            registration needed.</p>
                        {!!!account &&
                            <div className={styles.button}>
                                <Button
                                    action={() => {
                                        dispatch(setModalData(!modal))
                                    }}
                                    type={'button'}
                                    placeholder={'Connect Wallet'}
                                    classname={'white'}
                                />
                            </div>
                        }
                        <a
                            href={"https://icecreamfinancial.gitbook.io/sundae-finance/"}
                            className={styles.link}
                            target={'_blank'}
                            rel={"noreferrer"}
                        >
                            Learn how to start
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CTA;
