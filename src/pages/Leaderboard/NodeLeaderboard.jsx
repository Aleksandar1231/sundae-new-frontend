import { Box, CardContent, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { lotteries, moralisConfiguration } from '../../config';
import moment from 'moment/moment';
import { getLeaderboardTotal } from '../../hooks/getLeaderboardTotal';
import Card from '../../components/Card';



const NodeLeaderboard = () => {
  const [leaderboardData, setLeaderboardData] = useState(null);


  const from = moment('2022-07-31 12:00:00Z');
  const to = moment('2022-08-07 12:00:00Z');

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
      <Grid container spacing={3} style={{ marginTop: '50px' }}>
        {leaderboardData && (
          <Grid item xs={12} sm={12} md={12}>
            <Card variant="outlined">
              <CardContent>
                <Box style={{ position: 'relative' }}>
                  <table style={{'width': '100%'}}>
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
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
  );
};

export default NodeLeaderboard;
