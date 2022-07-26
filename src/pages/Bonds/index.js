import React from "react";
import {ReactTitle} from 'react-meta-tags';

import Footer from "../../layouts/Footer";
import JoinUs from "../../Modules/JoinUs";
import Description from "../../Modules/Description";
import Numbers from "../../Modules/Numbers";
import Tokens from "./Tokens";
import Unlock from "../Unlock";
import {useWallet} from "use-wallet";

const Bonds = () => {
    const {account} = useWallet();

    const numbers = [
        {
            title: "Convert Tokens",
            text: "Convert your peg-token at a 1:1 ratio for the bond-token. Bonds will only be available when the protocol is in a deficit phase.",
            icon: 'convert'
        },
        {
            title: "Hold Bond",
            text: "Hold the bond-token until the peg-token is back above the algorithmically pegged value.",
            icon: 'hold'
        },
        {
            title: "Redeem Bonds",
            text: "The premium ratio will be determined by the peg-token's time weighted average price on the previous epoch.",
            icon: 'redeem'
        }
    ]

    return (
        <>
            {!!account ? (
                <main className={'inner'}>
                    <ReactTitle title={'IceCream | Bonds'}/>
                    <Description
                        title={'Buy & Redeem Bonds'}
                        text={'Purchase bonds utilizing the peg-token when the protocol is below peg. You may redeem bonds for a premium dependent on the time weighted average price once the protocol is above the pegged value of the target-token.'}
                        page={'bonds'}
                    />
                    <Tokens/>
                    <Numbers
                        title={'How It Works'}
                        description={'Purchasing bonds in a deficit phase assists in positive price stability by decreasing the circulating supply as peg-tokens are exchanged for bond-tokens. The investor then has the opportunity to earn a premium by redeeming the bonds once the protocol is above the pegged time weighted average price.'}
                        info={numbers}
                        page={'bonds'}
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

export default Bonds;
