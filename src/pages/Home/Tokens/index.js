import React, {useMemo} from "react";
import classes from "classnames";

import styles from './index.module.scss';

import Card from "./Card";
import useTombFinance from "../../../hooks/useTombFinance";
import useBondStats from "../../../hooks/useBondStats";
import useShareStats from "../../../hooks/usetShareStats";
import useTombStats from "../../../hooks/useTombStats";
import Tooltip from "../../../components/Tooltip";

const buycreamAddress = 'https://app.bogged.finance/avax/swap?tokenIn=0xd586E7F844cEa2F87f50152665BCbc2C279D8d70&tokenOut=0xD9FF12172803c072a36785DeFea1Aa981A6A0C18';
const viewCreamAddress = 'https://dexscreener.com/avalanche/0xe367414f29e247b2d92edd610aa6dd5a7fd631ba';
const viewCshareAddress = 'https://dexscreener.com/avalanche/0xf71149502bc064a7da58c4e275da7896ed3f14f3';
const buycshareAddress = 'https://app.bogged.finance/avax/swap?tokenIn=0xd586E7F844cEa2F87f50152665BCbc2C279D8d70&tokenOut=0xf8D0C6c3ddC03F43A0687847f2b34bfd6941C2A2';

const Tokens = () => {
    const tBondStats = useBondStats();
    const tombFinance = useTombFinance();
    const tShareStats = useShareStats();
    const tombStats = useTombStats();
    const tombPriceInDollars = useMemo(
        () => (tombStats ? Number(tombStats.priceInDollars).toFixed(2) : null),
        [tombStats],
    );
    const tombCirculatingSupply = useMemo(() => (tombStats ? String(tombStats.circulatingSupply) : null), [tombStats]);
    const tombTotalSupply = useMemo(() => (tombStats ? String(tombStats.totalSupply) : null), [tombStats]);
    const tSharePriceInDollars = useMemo(
        () => (tShareStats ? Number(tShareStats.priceInDollars).toFixed(2) : null),
        [tShareStats],
    );
    const tShareCirculatingSupply = useMemo(
        () => (tShareStats ? String(tShareStats.circulatingSupply) : null),
        [tShareStats],
    );
    const tShareTotalSupply = useMemo(() => (tShareStats ? String(tShareStats.totalSupply) : null), [tShareStats]);
    const tBondPriceInDollars = useMemo(
        () => (tBondStats ? Number(tBondStats.priceInDollars).toFixed(2) : null),
        [tBondStats],
    );
    const tBondCirculatingSupply = useMemo(
        () => (tBondStats ? String(tBondStats.circulatingSupply) : null),
        [tBondStats],
    );
    const tBondTotalSupply = useMemo(() => (tBondStats ? String(tBondStats.totalSupply) : null), [tBondStats]);

    return (
        <section className={classes("section", styles.section)}>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <div className={styles.list}>
                        <div className={styles.item}>
                            <Card
                                url={'/img/icon/home_fudge.png'}
                                title={'FUDGE'}
                                currentPrice={tombPriceInDollars ? tombPriceInDollars : '-.--'}
                                marketCap={(tombCirculatingSupply * tombPriceInDollars).toFixed(2)}
                                circulatingSupply={tombCirculatingSupply}
                                totalSupply={tombTotalSupply}
                                purchaseUrl={buycreamAddress}
                                chartUrl={viewCreamAddress}
                            />
                            <div className={styles.tooltip}>
                                <Tooltip
                                    text={'The \'peg-token\' of the protocol that is algorithmically pegged to the target token. The time weighted average price as a ratio to the target token will determine whether the protocol is in a deficit phase or a surplus (making this token inflationary during the later).'}
                                />
                            </div>
                        </div>
                        <div className={styles.item}>
                            <Card
                                url={'/img/icon/home_straw.png'}
                                title={'STRAW'}
                                currentPrice={tSharePriceInDollars ? tSharePriceInDollars : '-.--'}
                                marketCap={(tShareCirculatingSupply * tSharePriceInDollars).toFixed(2)}
                                circulatingSupply={tShareCirculatingSupply}
                                totalSupply={tShareTotalSupply}
                                purchaseUrl={buycshareAddress}
                                chartUrl={viewCshareAddress}
                            />
                            <div className={styles.tooltip}>
                                <Tooltip
                                    text={'The \'share-token\' of the protocol. The liquidity pool farms emit the share token as the reward. The share token can be single staked in the boardroom of the protocol, which mints and distributes the peg-token as emissions. The share token is generally the more volatile of the two, and can expect to go up in price significantly when the protocol is in a surplus phase.'}
                                />
                            </div>
                        </div>
                        <div className={styles.item}>
                            <Card
                                url={'/img/icon/home_caraml.png'}
                                title={'CARAML'}
                                currentPrice={tBondPriceInDollars ? tBondPriceInDollars : '-.--'}
                                marketCap={(tBondCirculatingSupply * tBondPriceInDollars).toFixed(2)}
                                circulatingSupply={tBondCirculatingSupply}
                                totalSupply={tBondTotalSupply}
                                purchaseUrl={'/bonds'}
                                chartUrl={null}
                            />
                            <div className={styles.tooltip}>
                                <Tooltip
                                    text={'The \'bond-token\' of the protocol. The peg-token can be used to purchase bonds when the protocol is in a deficit phase. This temporarily decreases circulating supply for a positive price impact. The Bond tokens can then be redeemed for a variable premium when the protocol is in a surplus phase.'}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Tokens;
