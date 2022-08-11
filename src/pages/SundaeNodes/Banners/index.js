import React, { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import Card from "./Card";
import useBank from '../../../hooks/useBank';
import useNodes from '../../../hooks/useNodes';
import useMaxPayout from '../../../hooks/useMaxPayout';
import useUserDetails from '../../../hooks/useUserDetails';
import totalNodes from '../../../hooks/useTotalNodes';
import useStatsForPool from '../../../hooks/useStatsForPool';
import useStakedTokenPriceInDollars from '../../../hooks/useStakedTokenPriceInDollars';
import useNodePrice from '../../../hooks/useNodePrice';
import { getDisplayBalance } from '../../../utils/formatBalance';
import useDailyDrip from '../../../hooks/useDailyDrip';
import styles from './index.module.scss';
import classes from "classnames";


const Banners = () => {
    const bank = useBank('FudgeNode');
    const { account } = useWallet();
    const statsOnPool = useStatsForPool(bank);
    const nodes = useNodes(bank?.contract, bank?.sectionInUI, account);
    const nodePrice = useNodePrice(bank?.contract, bank?.poolId, bank?.sectionInUI);
    const total = totalNodes(bank?.contract, bank?.sectionInUI);
    const max = useMaxPayout(bank?.contract, bank?.sectionInUI, account);
    const daily = useDailyDrip(bank?.contract, bank?.sectionInUI, account);
    const userDetails = useUserDetails(bank?.contract, bank?.sectionInUI, account);
    const stakedTokenPriceInDollars = useStakedTokenPriceInDollars(bank?.depositTokenName, bank?.depositToken);

    const tokenPriceInDollars = useMemo(
        () => (stakedTokenPriceInDollars ? stakedTokenPriceInDollars : null),
        [stakedTokenPriceInDollars],
    );

    return (
        <section className={classes("section", styles.section)}>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <div className={styles.list}>
                        <div className={classes(styles.card, styles.top)}>
                            <Card text={"Your Nodes | Value"}>
                                {
                                    nodes[0] &&
                                    <>
                                        {nodes[0].toString()}
                                        |
                                        ${(nodes[0] * (tokenPriceInDollars * getDisplayBalance(nodePrice, bank.depositToken.decimal, 1))).toFixed(0)}
                                    </>
                                }
                            </Card>
                        </div>
                        <div className={classes(styles.card, styles.bottom)}>
                            <Card text={"Daily Earnings"}> $ {((Number(daily) / 1e18) * (tokenPriceInDollars)).toFixed(2)}</Card>
                        </div>
                        <div className={classes(styles.card, styles.top)}>
                            <Card text={"Amount Claimed"}>{(Number(userDetails.total_claims) / 1e18).toFixed(0)}</Card>
                        </div>
                        <div className={classes(styles.card, styles.bottom)}>
                            <Card text={"Max Possible Pay"}>{(Number(max) / 1e18).toFixed(0)}</Card>
                        </div>
                        <div className={classes(styles.card, styles.top)}>
                            <Card text={"Daily APR"}> {bank?.closedForStaking ? '0.00' : statsOnPool?.dailyAPR}%</Card>
                        </div>
                        <div className={classes(styles.card, styles.bottom)}>
                            <Card text={"Total Nodes | TVL"}>{Number(total[0])} | ${statsOnPool?.TVL ? (Number((Number(statsOnPool?.TVL).toFixed(0)))).toLocaleString('en-US') : '-.--'}</Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banners;
