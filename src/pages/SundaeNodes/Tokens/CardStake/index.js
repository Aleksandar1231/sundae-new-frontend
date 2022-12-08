import React, { useMemo, useState } from "react";
import classNames from "classnames";
import {Link} from "react-router-dom";
import styles from './index.module.scss';

import Button from "../../../../components/Button";
import useApprove, { ApprovalState } from "../../../../hooks/useApprove";
import DepositModal from "../../../../components/DepositModal";


import useStake from '../../../../hooks/useStake';
import useNodePrice from '../../../../hooks/useNodePrice';
import useStakedTokenPriceInDollars from '../../../../hooks/useStakedTokenPriceInDollars';
import useTokenBalance from '../../../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../../../utils/formatBalance';


const CardStake = ({ bank }) => {
    const [approveStatus, approve] = useApprove(bank?.depositToken, bank?.address);
    const tokenBalance = useTokenBalance(bank?.depositToken);
    const nodePrice = useNodePrice(bank?.contract, bank?.poolId, bank?.sectionInUI);
    const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank?.depositTokenName, bank?.depositToken);

    const tokenPriceInDollars = useMemo(
        () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
        [stakedTokenPriceInDollars],
    );
    const earnedInDollars = (
        Number(tokenPriceInDollars) * Number(getDisplayBalance(nodePrice, bank.depositToken.decimal))
    ).toFixed(2);
    const { onStake } = useStake(bank);


    const [depositModal, setDepositModal] = useState(false)

    return (
        <div className={classNames('gradient-background', styles.block)}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={styles.picture}>
                        <img src={'/img/icon/node.png'} alt={''} loading={'lazy'} />
                    </div>

                </div>
                <div className={styles.center}>
                    <div className={styles.item}>
                        <h6 className={styles.value}>{getDisplayBalance(nodePrice, bank.depositToken.decimal, 1)}</h6>
                        <p className={styles.label}>{`≈ $${earnedInDollars}`}</p>
                        <h5 className={styles.title}>{'Node Cost'}</h5>
                    </div>
                    <div>
                        {approveStatus !== ApprovalState.APPROVED ? (
                            <div className={styles.item}>
                                <div className={styles.button}>
                                    <Button
                                        type={'button'}
                                        disabled={
                                            bank.closedForStaking ||
                                            approveStatus === ApprovalState.PENDING ||
                                            approveStatus === ApprovalState.UNKNOWN

                                        }
                                        placeholder={`Approve ${bank.depositTokenName}`}
                                        classname={
                                            bank.closedForStaking ||
                                                approveStatus === ApprovalState.PENDING ||
                                                approveStatus === ApprovalState.UNKNOWN
                                                ? 'primary'
                                                : 'primary'



                                        }
                                        action={approve}
                                    />
                                </div>
                                <div className={styles.button}>
                                    <Button
                                        placeholder={'Leaderboard'}
                                        classname={'primary'}
                                        component={Link}
                                        to={'/leaderboard'}
                                        

                                    />
                                </div>
                            </div>

                        ) : (
                            <div className={styles.item}>
                                <div className={styles.button}>
                                    <Button
                                        type={'button'}
                                        placeholder={'Purchase Node'}
                                        classname={'primary'}
                                        disabled={bank.closedForStaking}
                                        action={() => (bank.closedForStaking ? null : setDepositModal(true))}

                                    />
                                </div>
                                <div className={styles.button}>
                                    <Button
                                        type={'link'}
                                        placeholder={'Leaderboard'}
                                        classname={'primary'}
                                        action={'https://sundaefinance.app/#/leaderboard'}

                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <DepositModal
                max={tokenBalance}
                onConfirm={(value) => {
                    onStake(value);
                }}
                tokenName={'FudgeNode'}
                open={depositModal}
                handleClose={() => setDepositModal(false)}
            />
        </div>
    );
}

export default CardStake;
