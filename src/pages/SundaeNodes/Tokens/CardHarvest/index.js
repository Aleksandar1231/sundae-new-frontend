import React, {useMemo} from "react";
import classNames from "classnames";
import styles from './index.module.scss';
import Button from "../../../../components/Button";
import useTombStats from "../../../../hooks/useTombStats";
import {getDisplayBalance} from "../../../../utils/formatBalance";
import useEarnings from '../../../../hooks/useEarnings';
import useHarvest from '../../../../hooks/useHarvest';
import useCompound from '../../../../hooks/useCompound';
import useShareStats from '../../../../hooks/usetShareStats';
import useNodePrice from '../../../../hooks/useNodePrice';

const CardHarvest = ({bank}) => {
    const earnings = useEarnings(bank?.contract, bank?.earnTokenName, bank?.poolId);
    const tombStats = useTombStats();
    const tShareStats = useShareStats();

    let tokenStats = 0;
    if (bank?.earnTokenName === 'STRAW') {
      tokenStats = tShareStats;
    }else if(bank?.earnTokenName === 'FUDGE') {
      tokenStats = tombStats;
    }
  
    const nodePrice = useNodePrice(bank?.contract, bank?.poolId, bank?.sectionInUI);
    const tokenPriceInDollars = useMemo(
      () => (tokenStats ? Number(tokenStats.priceInDollars).toFixed(2) : null),
      [tokenStats],
    );
    
    const earnedInDollars = (Number(tokenPriceInDollars) * Number(getDisplayBalance(earnings))).toFixed(2);
    const { onReward } = useHarvest(bank);
    const { onCompound } = useCompound(bank);

    return (
        <div className={classNames('gradient-background', styles.block)}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={styles.picture}>
                        <img src={`/img/${bank.earnTokenName}.png`} alt={''} loading={'lazy'}/>
                    </div>
                </div>
                <div className={styles.center}>
                    <div className={styles.item}>
                    
                        <h5 className={styles.value}>{getDisplayBalance(earnings)}</h5>
                        <p className={styles.label}>{`≈ $${earnedInDollars}`}</p>
                        <h6 className={styles.title}>{'FUDGE Earned'}</h6>
                    </div>
                    <div className={styles.item}>
                        <div className={styles.button}>
                            <Button
                                type={'button'}
                                placeholder={'Claim Reward'}
                                classname={earnings.eq(0) ? 'primary': 'primary'}
                                disabled={earnings.eq(0)}
                                action={onReward}
                            />
                        </div>

                        <div className={styles.button}>
                            <Button
                                type={'button'}
                                placeholder={'Compound ' + (Number(earnings)/Number(nodePrice)).toFixed(0) + ' Nodes'}
                                classname={Number(earnings) < Number(nodePrice) ? 'primary': 'primary'}
                                disabled={Number(earnings) < Number(nodePrice)}
                                action={onCompound}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default CardHarvest;
