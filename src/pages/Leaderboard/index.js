import React from "react";
import {ReactTitle} from 'react-meta-tags';

import Footer from "../../layouts/Footer";
import JoinUs from "../../Modules/JoinUs";
import Description from "../../Modules/Description";
import Numbers from "../../Modules/Numbers";
import NodeLeaderboard from "../Leaderboard/NodeLeaderboard";
import Banners from "../Leaderboard/Banners";
import Unlock from "../Unlock";
import {useWallet} from "use-wallet";



const Leaderboard = () => {
    // const {path} = useRouteMatch();
    const {account} = useWallet();
    const numbers = [
        {
            title: "Purchase",
            text: "Purchase nodes with the required token to participate in weekly giveaways and contests.",
            icon: 'purchase'
        },
        {
            title: "Create",
            text: "Each node created will reward you with 1 point and earn you a position on the leaderboard.",
            icon: 'create'
        },
        {
            title: "Win",
            text: "Every Sunday the winner in first place will be rewarded the major prize while a lucky random winner is selected to win a minor prize.",
            icon: 'deposit'
        }
    ]

    return (

        <>
                {!!account ? (
                    <main className={'inner'}>
                        <ReactTitle title={'Sundae | Leaderboard'}/>
                        <Description
                            title={'Leaderboard'}
                            text={"Purchase Nodes to immediately qualify for our weekly competition. Defeat your peers by accumulating points and win prizes every Sunday."}
                            page={'leaderboard'}
                        />
                        <Banners/>
                        <NodeLeaderboard/>
                        <Numbers
                            title={'How It Works'}
                            description={'Instantly earn points upon the purchase of a Node and qualify for the weekly contest. Prizes and winners get announced every Sunday at 12PM EST.'}
                            info={numbers}
                            page={'leaderboard'}
                        />
                        <JoinUs
                            isLast={true}
                        />
                    </main>
                ) : (
                    <Unlock/>
                )}
            <Footer alt={true}/>
        </>
    );
}

export default Leaderboard;
