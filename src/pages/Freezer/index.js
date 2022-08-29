import React from "react";
import { ReactTitle } from 'react-meta-tags';

import Footer from "../../layouts/Footer";
import JoinUs from "../../Modules/JoinUs";
import Description from "../../Modules/Description";
import Numbers from "../../Modules/Numbers";
import Tokens from "./Tokens";
import Unlock from "../Unlock";
import { useWallet } from "use-wallet";
import Bank from "../Bank";
import { Route, useMatch, Routes } from "react-router-dom";


const Freezer = () => {
    const { path } = useMatch('/freezer');
    const { account } = useWallet();
    const numbers = [
        {
            title: "Deposit",
            text: "Deposit your FROYO receipt token into the Freezer to earn additional rewards.",
            icon: 'purchase'
        },
        {
            title: "Claim",
            text: "Claim rewards earned from the Freezer and cycle it into other systems within the protocol to earn more yield.",
            icon: 'create'
        },
        {
            title: "Withdraw",
            text: "Withdrawals while underpeg will be taxed depending on TWAP and will be locked in as protocol-owned-liquidity. ",
            icon: 'deposit'
        }
    ]

    return (

        <>
            {!!account ? (
                <main className={'inner'}>
                    <ReactTitle title={'Sundae | Freezer'} />
                    <Description
                        title={'Freezer'}
                        text={"Earn profit share rewards by locking up your FROYO receipt tokens in the Freezer while the protocol is underpeg."}
                        page={'freezer'}
                    />
                    {/* <Tokens /> */}
                    <Numbers
                        title={'How It Works'}
                        description={'While your liquidity pairs grow in size due to continuous autocompounding earn additional rewards in the form of profit share while the buy back and burn mechanisms of FROYO aid in repegging the protocol.'}
                        info={numbers}
                        page={'freezer'}
                    />
                    <JoinUs
                        isLast={true}
                    />
                </main>
            ) : (
                <Unlock />
            )}
            <Routes>
                <Route path={`${path}/:bankId`} element={<Bank/>}/>
            </Routes>
            <Footer alt={true} />
        </>
    );
}

export default Freezer;
