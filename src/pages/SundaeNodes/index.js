import React from "react";
import { ReactTitle } from 'react-meta-tags';

import Footer from "../../layouts/Footer";
import JoinUs from "../../Modules/JoinUs";
import Description from "../../Modules/Description";
import Numbers from "../../Modules/Numbers";
import Tokens from "./Tokens";
import Banners from "./Banners";
import Unlock from "../Unlock";
import { useWallet } from "use-wallet";


const SundaeNodes = () => {
    const { account } = useWallet();
    const numbers = [
        {
            title: "Purchase or Claim",
            text: "Either purchase the FUDGE from TraderJoe or claim rewards from the Boardroom.",
            icon: 'purchase'
        },
        {
            title: "Purchase Node",
            text: "Purchase Nodes using the required fixed token cost of 50 FUDGE. Several Nodes can be purchased at once.",
            icon: 'deposit'
        },
        {
            title: "Compound or Claim",
            text: "You can claim your rewards to take profit or compound into more Nodes once you have earned enough to cover the cost.",
            icon: 'claim'
        }
    ]

    return (
        <>
            {!!account ? (
                <main className={'inner'}>
                    <ReactTitle title={'Sundae | Nodes'} />
                    <Description
                        title={'Nodes'}
                        text={"Purchase Nodes to participate in the locked staking pool. Each Node has a fixed token cost and delivers a relatively stable return on investment. The addition of Nodes promotes further utility for the peg token while also increasing the ability to generate further revenue from the protocol."}
                        page={'sundaenodes'}
                    />
                    <Banners />
                    <Tokens />
                    <Numbers
                        title={'How It Works'}
                        description={'Nodes utilize the selected token to deliver a form of locked staking in the protocol. Rewards will be emitted in the same token required to purchase the Nodes.'}
                        info={numbers}
                        page={'sundaenodes'}
                    />
                    <JoinUs
                        isLast={true}
                    />
                </main>
            ) : (
                <Unlock />
            )}
            <Footer alt={true} />
        </>
    );
}

export default SundaeNodes;
