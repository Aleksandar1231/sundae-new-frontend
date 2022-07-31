import React, {useMemo} from "react";
import {ReactTitle} from 'react-meta-tags';

import JoinUs from "../../Modules/JoinUs";
import Numbers from "../../Modules/Numbers";
import Description from "../../Modules/Description";

import Team from "./Team";
import Community from "./Community";
import Innovative from "./Innovative";
import Tokens from "./Tokens";
import Roadmap from "./Roadmap";
import Banner from "./Banner";
import CTA from "./CTA";
import Footer from "../../layouts/Footer";

import useGetBoardroomPrintRate from '../../hooks/getBoardroomPrintRate';
import useCurrentEpoch from '../../hooks/useCurrentEpoch';
import useCashPriceInEstimatedTWAP from '../../hooks/useCashPriceInEstimatedTWAP';
// const printRate = useGetBoardroomPrintRate();
// const currentEpoch = useCurrentEpoch();

const Main = () => {
const printRate = useGetBoardroomPrintRate().toFixed(2);
const currentEpoch = Number(useCurrentEpoch());
const cashStat = useCashPriceInEstimatedTWAP();
const scalingFactor = useMemo(() => (cashStat ? Number(cashStat.priceInDollars).toFixed(4) : null), [cashStat]);


    return (
        <>
            <main>
                <ReactTitle title={'Sundae | Home'}/>
                <Banner/>
                <Description
                    title={'Taste The Growth'}
                    text={'FUDGE is a next-generation algo stable pegged 1:1 with DAI and serves as the "governance token" of the protocol. Pairing with a stablecoin provides a safe environment for investors unaffected by the market volatility.'}
                    page={'home'}
                />
                <Tokens/>
                <Numbers
                    title={'Numbers Speak for Themselves'}
                    description={'An ever-growing ecosystem built with success for our investors in mind. Check out our statistics since February that showscases our trajectory.'}
                    info={
                        [
    
                            {
                                title: currentEpoch,
                                text: "Total number of epochs the protocol has been deployed and operating.",
                                icon: 'daily'
                            },
                            {
                                title: printRate+"%",
                                text: "The ratio at which the protocol has remained above peg and printing.",
                                icon: 'treasury'
                            },
                            {
                                title: scalingFactor,
                                text: "A reflection of the current time weighted average price.",
                                icon: 'transactions'
                            }
                        ]
                    }
                    page={'home'}
                />
                <Community/>
                <Team/>
                <JoinUs/>
                <Innovative/>
                <Roadmap/>
                <CTA/>
            </main>
            <Footer/>
        </>
    );
}

export default Main;
