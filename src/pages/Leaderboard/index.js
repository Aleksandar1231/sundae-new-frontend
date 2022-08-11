import React from "react";
import {ReactTitle} from 'react-meta-tags';

import Footer from "../../layouts/Footer";
import JoinUs from "../../Modules/JoinUs";
import Description from "../../Modules/Description";
import Numbers from "../../Modules/Numbers";
import Tokens from "./Tokens";
import Unlock from "../Unlock";
import {useWallet} from "use-wallet";
import Bank from "../Bank";
import {Route, useRouteMatch} from "react-router-dom";


const Leaderboard = () => {
    const {path} = useRouteMatch();
    const {account} = useWallet();
    const numbers = [
        {
            title: "Purchase",
            text: "Purchase tokens neccessary to construct the desired liquidity pair.",
            icon: 'purchase'
        },
        {
            title: "Create",
            text: "Create a liquidity pair on Trader-Joe. A liquidity pair is 50% value of each token.",
            icon: 'create'
        },
        {
            title: "Deposit",
            text: "Deposit liquidity pair token into the desired farm on the protocol.",
            icon: 'deposit'
        }
    ]

    return (

        <>
            <Route exact path={path}>
                {!!account ? (
                    <main className={'inner'}>
                        <ReactTitle title={'Sundae | Farm'}/>
                        <Description
                            title={'Farms'}
                            text={"Earn the protocol's share-token by staking various liquidity pairs. Each pool has a different annual " +
                                'percentage revenue dependent on the pool\'s allocations, total value locked and protocol expansion rate.'}
                            page={'farm'}
                        />
                        <Tokens/>
                        <Numbers
                            title={'How It Works'}
                            description={'Liquidity provided in the Farms contributes to the general economy of the protocol. The farms will emit rewards in the form of the share-token. The share token has a limited supply and yielding utility in the boardroom, which makes it very valuable.'}
                            info={numbers}
                            page={'farm'}
                        />
                        <JoinUs
                            isLast={true}
                        />
                    </main>
                ) : (
                    <Unlock/>
                )}
            </Route>
            <Route path={`${path}/:bankId`}>
                <Bank/>
            </Route>
            <Footer alt={true}/>
        </>
    );
}

export default Leaderboard;
