import { Box, Grid, } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { lotteries, moralisConfiguration } from '../../config';
import moment from 'moment/moment';
import { getLeaderboardTotal } from '../../hooks/getLeaderboardTotal';
import Card from '../../components/Card';
import classNames from "classnames";
import classes from "classnames";
import styles from './index.module.scss';


const NodeLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);


  const from = moment('2022-08-21 12:00:00Z');
  const to = moment('2022-08-28 12:00:00Z');

  useEffect(() => {
    fetchLeaderboardData();
  }, []);

  const fetchLeaderboardData = async () => {
    // const params =  { };
    const Moralis = require('moralis/node');
    await Moralis.start({
      serverUrl: moralisConfiguration.serverUrl,
      appId: moralisConfiguration.appId,
    });

    setLeaderboardData(await getLeaderboardTotal(lotteries, from, to));
  };

  return (
    <section className={classes("section", styles.section)}>
      <div className={classes("container-fluid", styles.fluid)}>
        <div className={classes("container", styles.container)}>
          <div className={classes("row", styles.row)}>
            <div
              className={classes("col", "col-padding-vertical", styles.col)}>
              <div className={classNames('gradient-background', styles.block)}>
                {leaderboardData && (
                  <div className={styles.wrapper}>
                    <div className={styles.top}>
                      <div>
                        <h6 className={styles.title}>Weekly Contest Stats</h6>
                      </div>
                    </div>
                    <div className={styles.center}>
                      <div className={styles.item}>
                        <table style={{ 'width': '100%' }}>
                          <thead>
                            <tr>
                              <th>&nbsp;</th>
                              <th style={{ textAlign: 'left' }}>Wallet</th>
                              <th>FUDGE Node Points</th>
                              <th>LP Node Points</th>
                              <th>Total Points</th>
                            </tr>
                          </thead>
                          <tbody>
                            {leaderboardData.map((item, index) => (
                              <tr key={index}>
                                <td>{index + 1}.</td>
                                <td>{'0x...' + item.wallet.slice(-8)}</td>
                                <td style={{ textAlign: 'center' }}>{item.entries0}</td>
                                <td style={{ textAlign: 'center' }}>{item.entries1}</td>
                                <td style={{ textAlign: 'center' }}>{item.entries}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                      </div>
                    </div>
                    <div className={styles.bottom}/>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NodeLeaderboard;
