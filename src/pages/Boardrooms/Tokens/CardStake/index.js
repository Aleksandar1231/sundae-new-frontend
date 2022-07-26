import React, {useMemo, useState} from "react";
import classNames from "classnames";

import styles from './index.module.scss';

import Button from "../../../../components/Button";
import useApprove, {ApprovalState} from "../../../../hooks/useApprove";
import {getDisplayBalance} from "../../../../utils/formatBalance";
import useStakeToMasonry from "../../../../hooks/useStakeToMasonry";
import useWithdrawFromMasonry from "../../../../hooks/useWithdrawFromMasonry";
import useWithdrawCheck from "../../../../hooks/masonry/useWithdrawCheck";
import useTombFinance from "../../../../hooks/useTombFinance";
import useTokenBalance from "../../../../hooks/useTokenBalance";
import useStakedBalanceOnMasonry from "../../../../hooks/useStakedBalanceOnMasonry";
import useUnstakeTimerMasonry from "../../../../hooks/masonry/useUnstakeTimerMasonry";
import useStakedTokenPriceInDollars from "../../../../hooks/useStakedTokenPriceInDollars";
import {
    setDepositModalData,
    setWithdrawModalData
} from "../../../../state/appReducer/actions/modalActions";
import {useDispatch} from "react-redux";
import DepositModal from "../../../../components/DepositModal";
import WithDrawModal from "../../../../components/WithDrawModal";
import classes from "classnames";
import ProgressCountdown from "../../components/ProgressCountdown";

const CardStake = () => {

    const tombFinance = useTombFinance();
    const [approveStatus, approve] = useApprove(tombFinance.TSHARE, tombFinance.contracts.Masonry.address);

    const tokenBalance = useTokenBalance(tombFinance.TSHARE);
    const stakedBalance = useStakedBalanceOnMasonry();
    const { from, to } = useUnstakeTimerMasonry();

    const stakedTokenPriceInDollars = useStakedTokenPriceInDollars('STRAW', tombFinance.TSHARE);
    const tokenPriceInDollars = useMemo(
        () =>
            stakedTokenPriceInDollars
                ? (Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance))).toFixed(2).toString()
                : null,
        [stakedTokenPriceInDollars, stakedBalance],
    );
    // const isOldBoardroomMember = boardroomVersion !== 'latest';

    const dispatch = useDispatch()

    const { onStake } = useStakeToMasonry();
    const { onWithdraw } = useWithdrawFromMasonry();
    const canWithdrawFromMasonry = useWithdrawCheck();


    const [depositModal, setDepositModal] = useState(false)
    const [withdrawModal, setWithdrawModal] = useState(false)
    return (
        <div className={classNames('gradient-background', styles.block)}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={styles.picture}>
                        <img src={'/img/icon/home_straw.png'} alt={''} loading={'lazy'} />
                    </div>
                    <h6 className={styles.title}>{'STRAW Staked'}</h6>
                </div>
                <div className={styles.center}>
                    <div className={styles.item}>
                        <h5 className={styles.value}>{getDisplayBalance(stakedBalance)}</h5>
                        <p className={styles.label}>{`≈ $${tokenPriceInDollars}`}</p>
                    </div>
                    <div>
                            {approveStatus !== ApprovalState.APPROVED ? (
                                <div className={styles.button}>
                                <Button
                                    type={'button'}
                                    disabled={approveStatus !== ApprovalState.NOT_APPROVED}
                                    placeholder={'Approve STRAW'}
                                    classname={'primary'}
                                    action={approve}
                                />
                                </div>
                            ) : (
                                <div className={styles.button_group}>
                                    <Button
                                        type={'button'}
                                        placeholder={'+'}
                                        classname={'primary'}
                                        action={()=> setDepositModal(true)}

                                    />
                                    <Button
                                        type={'button'}
                                        placeholder={'-'}
                                        classname={'primary'}
                                        disabled={!canWithdrawFromMasonry}
                                        action={()=> setWithdrawModal(true)}

                                    />
                                </div>
                            )}
                    </div>
                    {canWithdrawFromMasonry ? (
                        ''
                    ) : (
                        <div className={classes(styles.card)}>
                            <p>Withdraw possible in</p>
                            <span className={styles.progress}>
                               <ProgressCountdown hideBar={true} base={from} deadline={to} />
                           </span>
                        </div>
                    )}
                </div>
            </div>
            <DepositModal
                        max={tokenBalance}
                        onConfirm={(value) => {
                            onStake(value);
                        }}
                        tokenName={'STRAW'}
                        open={depositModal}
                        handleClose={() => setDepositModal(false)}
            />
            <WithDrawModal
                max={stakedBalance}
                        onConfirm={(value) => {
                            onWithdraw(value);
                        }}
                        tokenName={'STRAW'}
                open={withdrawModal}
                handleClose={() => setWithdrawModal(false)}
            />
        </div>
    );
}

export default CardStake;
