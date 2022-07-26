import React, {useMemo} from "react";
import classNames from "classnames";
import classes from "classnames";

import styles from './index.module.scss';

import Button from "../../../../components/Button";
import useRedeemOnMasonry from "../../../../hooks/useRedeemOnMasonry";
import useTombStats from "../../../../hooks/useTombStats";
import useHarvestFromMasonry from "../../../../hooks/useHarvestFromMasonry";
import useEarningsOnMasonry from "../../../../hooks/useEarningsOnMasonry";
import useClaimRewardCheck from "../../../../hooks/masonry/useClaimRewardCheck";
import useStakedBalanceOnMasonry from "../../../../hooks/useStakedBalanceOnMasonry";
import useWithdrawCheck from "../../../../hooks/masonry/useWithdrawCheck";
import {getDisplayBalance} from "../../../../utils/formatBalance";
import useClaimRewardTimerMasonry from "../../../../hooks/masonry/useClaimRewardTimerMasonry";
import Card from "../../Banners/Card";
import ProgressCountdown from "../../components/ProgressCountdown";

const CardHarvest = () => {
    const {onRedeem} = useRedeemOnMasonry();
    const tombStats = useTombStats();
    const {onReward} = useHarvestFromMasonry();
    const earnings = useEarningsOnMasonry();
    const canClaimReward = useClaimRewardCheck();
    const stakedBalance = useStakedBalanceOnMasonry();
    const canWithdraw = useWithdrawCheck();

    const tokenPriceInDollars = useMemo(
        () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
        [tombStats],
    );

    const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);

    const {from, to} = useClaimRewardTimerMasonry();

    return (
        <div className={classNames('gradient-background', styles.block)}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={styles.picture}>
                        <img src={'/img/icon/home_fudge.png'} alt={''} loading={'lazy'}/>
                    </div>
                    <h6 className={styles.title}>{'FUDGE Earned'}</h6>
                </div>
                <div className={styles.center}>
                    <div className={styles.item}>
                        <h5 className={styles.value}>{getDisplayBalance(earnings)}</h5>
                        <p className={styles.label}>{`≈ $${earnedInDollars}`}</p>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.button}>
                            <Button
                                type={'button'}
                                placeholder={'Claim Reward'}
                                classname={'primary'}
                                disabled={earnings.eq(0) || !canClaimReward}
                                action={onReward}
                            />
                        </div>
                        {canClaimReward ? (
                            ''
                        ) : (
                            <div className={classes(styles.card)}>
                            <p>Claim possible in</p>
                           <span className={styles.progress}>
                               <ProgressCountdown hideBar={true} base={from} deadline={to} />
                           </span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CardHarvest;
