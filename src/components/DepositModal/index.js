import React, {useCallback, useMemo, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {setCbondModalData, setDepositModalData} from "../../state/appReducer/actions/modalActions";
import {getFullDisplayBalance} from "../../utils/formatBalance";
import Button from "../Button";
import classes from "classnames";
import styles from './index.module.scss';
import classNames from "classnames";
import TokenInput from "../TokenInput";

const DepositModal = (
    {
        action, max, decimals, onConfirm, tokenName = '', handleClose, open
    }
) => {
    const dispatch = useDispatch()
    // const statusModal = useSelector(state => state.rootReducer.modalReducer.depositModal)
    const {mode} = useSelector(state => state.rootReducer.modeReducer)

    const [val, setVal] = useState('');

    const fullBalance = useMemo(() => {
        return getFullDisplayBalance(max, decimals, false);
    }, [max, decimals]);

    const handleChange = useCallback(
        (e) => {
            setVal(e.currentTarget.value);
        },
        [setVal],
    );

    const handleSelectMax = useCallback(() => {
        setVal(fullBalance);
    }, [fullBalance, setVal]);


    const handleClick = (e) => {
        const action = e.target.getAttribute('data-close')

        if (action) {
            handleClose()
        }
    }
    return (
        <div
            className={classes(styles.block, open && styles.active)}
            data-close={true}
            onClick={(event) => {
                handleClick(event)
            }}
        >
            <div className={classes('gradient-background', styles.content)}>
                <h5 className={styles.title}>{`Deposit ${tokenName}`}</h5>
                <span
                    className={styles.close}
                    data-close={true}
                    onClick={(event) => {
                        handleClick(event)
                    }}
                />
                <div className={classNames(styles.content, styles[mode])}>

                <TokenInput
                    value={val}
                    onSelectMax={handleSelectMax}
                    onChange={handleChange}
                    max={fullBalance}
                    symbol={tokenName}
                />
                <div className={styles.button_group}>
                    <Button
                        type={'button'}
                        placeholder={'Cancel'}
                        classname={'alt'}
                        action={() => handleClose()}
                    />
                    <Button
                        type={'button'}
                        placeholder={'Confirm'}
                        classname={'primary'}
                        action={() => onConfirm(val)}
                    />
                </div>
                </div>
            </div>
        </div>
    );
}

export default DepositModal;
