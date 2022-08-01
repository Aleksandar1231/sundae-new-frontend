import React, {useMemo} from "react";
import classes from "classnames";

import Card from "./Card";

import styles from './index.module.scss';
import ProgressCountdown from "../components/ProgressCountdown";
import moment from 'moment';
import useTreasuryAllocationTimes from "../../../hooks/useTreasuryAllocationTimes";
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';
import useFetchMasonryAPR from '../../../hooks/useFetchMasonryAPR';
import useCashPriceInEstimatedTWAP from '../../../hooks/useCashPriceInEstimatedTWAP';
import useTotalStakedOnMasonry from '../../../hooks/useTotalStakedOnMasonry';
import {getDisplayBalance} from "../../../utils/formatBalance";


const Banners = () => {

    const currentEpoch = useCurrentEpoch();
    const cashStat = useCashPriceInEstimatedTWAP();
    const totalStaked = useTotalStakedOnMasonry();
    const masonryAPR = useFetchMasonryAPR();
    const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);
    const {to} = useTreasuryAllocationTimes();


    return (
        <section className={classes("section", styles.section)}>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <div className={styles.list}>
                        <div className={classes(styles.card, styles.top)}>
                            <Card text={"next epoch"}>
                                <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to}
                                                   description="Next Epoch"/>
                            </Card>
                        </div>
                        <div className={classes(styles.card, styles.bottom)}>
                            <Card text={"Current epoch"}>{Number(currentEpoch)}</Card>
                        </div>
                        <div className={classes(styles.card, styles.top)}>
                            <Card text={"Current TWAP"}>{scalingFactor}</Card>
                        </div>
                        <div className={classes(styles.card, styles.bottom)}>
                            <Card text={"APR"}>{`${masonryAPR.toFixed(2)}%`}</Card>
                        </div>
                        <div className={classes(styles.card, styles.top)}>
                            <Card text={"Daily APR"}>{`${(masonryAPR / 365).toFixed(2)}%`}</Card>
                        </div>
                        <div className={classes(styles.card, styles.bottom)}>
                            <Card text={"STRAW Staked"}>{getDisplayBalance(totalStaked)}</Card>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banners;
