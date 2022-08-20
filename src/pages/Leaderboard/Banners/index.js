import React, { useMemo, useEffect, useState } from 'react';
import classes from "classnames";

import Card from "./Card";
import { useWallet } from 'use-wallet';
import styles from './index.module.scss';
import ProgressCountdown from "../components/ProgressCountdown";
import moment from 'moment';
import useTreasuryAllocationTimes from "../../../hooks/useTreasuryAllocationTimes";
import useCurrentEpoch from '../../../hooks/useCurrentEpoch';
import useFetchMasonryAPR from '../../../hooks/useFetchMasonryAPR';
import useCashPriceInEstimatedTWAP from '../../../hooks/useCashPriceInEstimatedTWAP';
import useTotalStakedOnMasonry from '../../../hooks/useTotalStakedOnMasonry';
import {getDisplayBalance} from "../../../utils/formatBalance";
import { lotteries, moralisConfiguration } from '../../../config';
import { getLeaderboardTotal } from '../../../hooks/getLeaderboardTotal';

const Banners = () => {

    const { account } = useWallet();
    const [leaderboardData, setLeaderboardData] = useState(null);
    const [userEntries, setUserEntries] = useState(null);

    const currentEpoch = useCurrentEpoch();
    const cashStat = useCashPriceInEstimatedTWAP();
    const totalStaked = useTotalStakedOnMasonry();
    const masonryAPR = useFetchMasonryAPR();
    const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);

    const from = moment('2022-08-20 12:00:00Z');
    const to = moment('2022-08-28 12:00:00Z');

    useEffect(() => {
        fetchLeaderboardData();
      }, [account]);
    
      const fetchLeaderboardData = async () => {
        // const params =  { };
        const Moralis = require('moralis/node');
        await Moralis.start({
          serverUrl: moralisConfiguration.serverUrl,
          appId: moralisConfiguration.appId,
        });
    
        const leaderboardData = await getLeaderboardTotal(lotteries, from, to);
        setLeaderboardData(leaderboardData);
        if (account) {
          const userEntries = leaderboardData.filter(data => data.wallet.toLowerCase() === account.toLowerCase());
          setUserEntries(userEntries.length > 0 ? userEntries : [{ 'entries': 0 }]);
        }
      };

    return (
        <section className={classes("section", styles.section)}>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <div className={styles.list}>
                        <div className={classes(styles.card, styles.top)}>
                            <Card text={"Next Reset"}>
                                <ProgressCountdown base={moment().toDate()} hideBar={true} deadline={to.toDate()} description="Next Reset" />
                            </Card>
                        </div>
                        <div className={classes(styles.card, styles.bottom)}>
                            <Card text={"Your Points"}> { userEntries && userEntries.length > 0 ? ( <>{userEntries[0].entries}</> ) : '-' }</Card>
                        </div>
                        <div className={classes(styles.card, styles.top)}>
                            <Card text={"Current Leader"}>                  
                            { leaderboardData && leaderboardData.length > 0 ? (
                            <>{leaderboardData[0].entries}</>
                            ) : '-' }
                            </Card>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Banners;
