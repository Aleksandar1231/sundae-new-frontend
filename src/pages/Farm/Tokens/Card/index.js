import React, { useMemo, useState } from "react";
import classNames from "classnames";

import styles from './index.module.scss';
import { BigNumber } from 'ethers';
import useStatsForPool from "../../../../hooks/useStatsForPool";
import { getDisplayBalance } from "../../../../utils/formatBalance";
import useEarnings from "../../../../hooks/useEarnings";
import useShareStats from "../../../../hooks/usetShareStats";
import useTombStats from "../../../../hooks/useTombStats";
import useHarvest from "../../../../hooks/useHarvest";
import useApprove, { ApprovalState } from "../../../../hooks/useApprove";
import useStakedBalance from "../../../../hooks/useStakedBalance";
import useStakedTokenPriceInDollars from "../../../../hooks/useStakedTokenPriceInDollars";
import useTokenBalance from "../../../../hooks/useTokenBalance";
import useStake from "../../../../hooks/useStake";
import useWithdraw from "../../../../hooks/useWithdraw";
import TokenSymbol from "../../../../components/TokenSymbol";
import Button from "../../../../components/Button";
import FarmDepositModal from "../../../../components/DepositModal";
import { useDispatch } from "react-redux";
import { setDepositModalData, setWithdrawModalData } from "../../../../state/appReducer/actions/modalActions";
import FarmWithDrawModal from "../../../../components/WithDrawModal";
import useModal from '../../../../hooks/useModal';

import useZap from '../../../../hooks/useZap';
import ZapModal from '../../../Bank/components/ZapModal';

const Card = ({ bank, src, title }) => {
    const [approveStatus, approve] = useApprove(bank.depositToken, bank.address);
    const statsOnPool = useStatsForPool(bank);

    const earnings = useEarnings(bank.contract, bank.earnTokenName, bank.poolId);
    const { onReward } = useHarvest(bank);
    const tombStats = useTombStats();
    const tShareStats = useShareStats();

    const tokenStats = bank.earnTokenName === 'STRAW' ? tShareStats : tombStats;
    const tokenPriceInDollars = useMemo(
        () => (tokenStats ? Number(tokenStats.priceInDollars).toFixed(2) : null),
        [tokenStats],
    );
    const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);


    const stakedBalance = useStakedBalance(bank.contract, bank.poolId);
    const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank.depositTokenName, bank.depositToken);
    const stakedInDollars = (
        Number(stakedTokenPriceInDollars) * Number(getDisplayBalance(stakedBalance, bank.depositToken.decimal))
    ).toFixed(2);
    const { onStake } = useStake(bank);
    const { onWithdraw } = useWithdraw(bank);
    const tokenBalance = useTokenBalance(bank.depositToken);
    const dispatch = useDispatch()
    const [depositModal, setDepositModal] = useState(false)
    const [withdrawModal, setWithdrawModal] = useState(false)

    // Zap stuff
    const { onZapIn } = useZap(bank);
    const [onPresentZap, onDissmissZap] = useModal(
        <ZapModal
            decimals={bank.depositToken.decimal}
            onConfirm={(zappingToken, tokenName, amount, slippageBp) => {
                if (Number(amount) <= 0 || isNaN(Number(amount))) return;
                onZapIn(zappingToken, tokenName, amount, slippageBp, BigNumber.from(0), onStake);
                onDissmissZap();
            }}
            tokenName={bank.depositTokenName}
        />,
    );


    return (
        <div className={classNames('gradient-background', styles.block)}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={styles.picture}>
                        <TokenSymbol symbol={bank.depositTokenName} />
                    </div>
                    <div>
                        <h6 className={styles.title}>{bank.depositTokenName}</h6>
                        <p className={styles.percent}>{bank.multiplier}</p>
                    </div>
                </div>


                <div className={styles.center}>
                    <div className={styles.item}>
                        <p className={styles.label}>Daily ROI</p>
                        <p className={styles.value}>{statsOnPool?.dailyAPR}%</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.label}>Earn</p>
                        <p className={styles.value}>{bank.earnTokenName}</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.label}>Pending Rewards</p>
                        <p className={styles.value}>{getDisplayBalance(earnings)}</p>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.button}>
                            <Button
                                type={'button'}
                                placeholder={'Collect'}
                                classname={'primary'}
                                action={onReward}
                            />
                        </div>
                    </div>
                    <div className={classNames(styles.item, styles.wide)}>
                        <p className={styles.label}>{`≈ $${earnedInDollars}`}</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.label}>Staked</p>
                        <p className={styles.value}>{`${bank.depositTokenName}`}</p>
                    </div>


                    {approveStatus !== ApprovalState.APPROVED ? (
                        <div className={classNames(styles.item)}>
                            <div className={styles.button}>
                                <Button
                                    disabled={
                                        bank.closedForStaking ||
                                        approveStatus === ApprovalState.PENDING ||
                                        approveStatus === ApprovalState.UNKNOWN
                                    }
                                    type={'button'}
                                    action={approve}
                                    placeholder={'Approve'}
                                    classname={'primary'}
                                >
                                    {`Approve ${bank.depositTokenName}`}
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className={classNames(styles.item, styles.plus)}>
                            <div className={classNames(styles.btn_count)}>
                                <p className={styles.value}>
                                    {getDisplayBalance(stakedBalance, bank.depositToken.decimal)}
                                </p>
                                <p className={styles.label}>
                                    {`≈ $${stakedInDollars}`}
                                </p>
                            </div>
                            <div className={classNames(styles.btn_group)}>
                                <Button
                                    type={'button'}
                                    placeholder={'+'}
                                    classname={'primary'}
                                    disabled={bank.closedForStaking}
                                    action={bank.closedForStaking ? null : () => setDepositModal(true)}
                                />
                                <Button
                                    type={'button'}
                                    placeholder={'-'}
                                    classname={'primary'}
                                    action={() => setWithdrawModal(true)}
                                />

                            </div>
                        </div>
                    )}


                </div>
                <div className={styles.bottom}>
                    <p className={styles.locked}>Total Value Locked:</p>
                    <h5 className={styles.total}>${statsOnPool?.TVL}</h5>
                </div>
                <div className={styles.bottom2}>
                    <div className={styles.button2}>
                        <Button
                            type={'link'}
                            placeholder={'Create Liquidity'}
                            classname={'primary'}
                            action={bank.buyLink}
                        />
                    </div>
                    <div className={styles.button2}>
                        <Button
                            type={'button'}
                            placeholder={'Zap'}
                            classname={'primary'}
                            disabled={bank.closedForStaking}
                            action={() => (bank.closedForStaking ? null : onPresentZap())}
                        />
                    </div>
                </div>
            </div>
            <FarmDepositModal
                max={tokenBalance}
                decimals={bank.depositToken.decimal}
                onConfirm={(amount) => {
                    if (Number(amount) <= 0 || isNaN(Number(amount))) return;
                    onStake(amount);
                }}
                tokenName={bank.depositTokenName}
                action={true}
                handleClose={() => setDepositModal(false)}
                open={depositModal}
            />
            <FarmWithDrawModal
                max={stakedBalance}
                decimals={bank.depositToken.decimal}
                onConfirm={(amount) => {
                    if (Number(amount) <= 0 || isNaN(Number(amount))) return;
                    onWithdraw(amount);
                }}
                tokenName={bank.depositTokenName}
                handleClose={() => setWithdrawModal(false)}
                open={withdrawModal}
            />

        </div>
    );
}

export default Card;
