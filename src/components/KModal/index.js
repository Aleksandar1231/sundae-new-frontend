import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {WalletConnectConnector} from "@web3-react/walletconnect-connector";
import {InjectedConnector} from "@web3-react/injected-connector";

import classes from "classnames";

import styles from './index.module.scss';
import {setModalData} from "../../state/appReducer/actions/modalActions";
import {setAccessData} from "../../state/appReducer/actions/accessActions";
import {useWallet} from "use-wallet";

const KModal = () => {
    const dispatch = useDispatch();
    const {connect} = useWallet();

    const {modal} = useSelector(state => state.rootReducer.modalReducer)

    const handleClick = (e) => {
        const action = e.target.getAttribute('data-close')

        if (action) {
            dispatch(setModalData(!modal))
        }
    }

    return (
        <div
            className={classes(styles.block, modal && styles.active)}
            data-close={true}
            onClick={(event) => {
                handleClick(event)
            }}
        >
            <div className={classes('gradient-background', styles.content)}>
                <h5 className={styles.title}>Connect Wallet</h5>
                <span
                    className={styles.close}
                    data-close={true}
                    onClick={(event) => {
                        handleClick(event)
                    }}
                />
                <button
                    type={'button'}
                    className={classes(styles.button, styles.metamask)}
                    onClick={() => {
                        connect('injected');
                        dispatch(setAccessData(1))
                        dispatch(setModalData(!modal))
                    }}
                >
                   <span className={styles.icon}>
                        <img
                            src={"/img/product/metamask.svg"}
                            alt={"Metamask"}
                            loading={'lazy'}
                            className={styles.icon}
                        />
                    </span>
                    <span className={styles.label}>Metamask</span>
                </button>
                <button
                    type={'button'}
                    className={classes(styles.button, styles.wallet)}
                    onClick={() => {
                        connect('walletconnect');
                        dispatch(setAccessData(1))
                        dispatch(setModalData(!modal))
                    }}
                >
                    <span className={styles.icon}>
                        <img
                            src={"/img/product/wallet.svg"}
                            alt={"Metamask"}
                            loading={'lazy'}
                        />
                    </span>
                    <span className={styles.label}>Wallet</span>
                </button>
            </div>
        </div>
    );
}

export default KModal;
