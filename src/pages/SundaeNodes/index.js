import React from "react";
import {ReactTitle} from 'react-meta-tags';

import Footer from "../../layouts/Footer";
import JoinUs from "../../Modules/JoinUs";
import Description from "../../Modules/Description";
import Numbers from "../../Modules/Numbers";
import Tokens from "./Tokens";
import Banners from "./Banners";
import Unlock from "../Unlock";
import {useWallet} from "use-wallet";


const SundaeNodes = () => {
    const {account} = useWallet();
    const numbers = [
        {
            title: "Purchase or Claim",
            text: "Either purchase the share-token from traderjoe or claim rewards from the Farms.",
            icon: 'purchase'
        },
        {
            title: "Deposit Tokens",
            text: "Deposit the tokens into the boardroom. There will be a 36 hour lock-up period prior to being able withdraw the deposited share token.",
            icon: 'deposit'
        },
        {
            title: "Claim Rewards",
            text: "Collect the emissions in the form of the peg-token. There will be a 18 hour lockup period after redeeming rewards.",
            icon: 'claim'
        }
    ]

    return (
        <>
            {!!account ? (
                <main className={'inner'}>
                    <ReactTitle title={'Sundae | Nodes'}/>
                    <Description
                        title={'Nodes'}
                        text={'Earn the protocols peg-token by single staking the protocols share-token. You do not have to create any liquidity pairs to stake in the boardroom.' +
                            ' Annual percentage yield is dependent on the total value locked and protocol expansion rate.'}
                        page={'sundaenodes'}
                    />
                    <Banners/>
                    <Tokens/>
                    <Numbers
                        title={'How It Works'}
                        description={'The boardroom utilizes the share-token as a single stake in the protocol to emit the governance (peg) token at the scheduled expansion rate that is dependent on the circulating supply.'}
                        info={numbers}
                        page={'sundaenodes'}
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

export default SundaeNodes;
