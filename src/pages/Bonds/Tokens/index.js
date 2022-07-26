import React, {useCallback, useMemo, useState, useEffect} from "react";
import classes from "classnames";

import styles from './index.module.scss';

import Card from "./Card";
import Banner from "./Banner";
import {getDisplayBalance} from "../../../utils/formatBalance";
import useCashPriceInLastTWAP from "../../../hooks/useCashPriceInLastTWAP";
import useBondStats from "../../../hooks/useBondStats";
import useBondsPurchasable from "../../../hooks/useBondsPurchasable";
import useTokenBalance from "../../../hooks/useTokenBalance";
import useTombFinance from "../../../hooks/useTombFinance";
import {BOND_REDEEM_PRICE, BOND_REDEEM_PRICE_BN} from "../../../tomb-finance/constants";
import {useTransactionAdder} from "../../../state/transactions/hooks";
import {useWallet} from "use-wallet";
import {useRouteMatch} from "react-router-dom";

const Tokens = () => {
    const {path} = useRouteMatch();
    const {account} = useWallet();
    const tombFinance = useTombFinance();
    const addTransaction = useTransactionAdder();
    const bondStat = useBondStats();
    const cashPrice = useCashPriceInLastTWAP();
    const bondsPurchasable = useBondsPurchasable();

    const bondBalance = useTokenBalance(tombFinance?.TBOND);
    const [tombBalance, setTombBalance] = useState('0')

    useEffect(() => {
        const getTombBalance = async () => {
          const { Treasury } = tombFinance.contracts
          const tombBalance = await tombFinance.TOMB.balanceOf(Treasury.address);
          setTombBalance(getDisplayBalance(tombBalance, 18, 0));
        }
        getTombBalance();
      })

    const handleBuyBonds = useCallback(
        async (amount) => {
            const tx = await tombFinance.buyBonds(amount);
            addTransaction(tx, {
                summary: `Buy ${Number(amount).toFixed(2)} CARAML with ${amount} FUDGE`,
            });
        },
        [tombFinance, addTransaction],
    );

    const handleRedeemBonds = useCallback(
        async (amount) => {
            const tx = await tombFinance.redeemBonds(amount);
            addTransaction(tx, {summary: `Redeem ${amount} CARAML`});
        },
        [tombFinance, addTransaction],
    );
    const isBondRedeemable = useMemo(() => cashPrice.gt(BOND_REDEEM_PRICE_BN), [cashPrice]);
    const isBondPurchasable = useMemo(() => Number(bondStat?.tokenInFtm) < 1.01, [bondStat]);

    return (
        <section className={classes("section", styles.section)}>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <div className={classes("row", styles.row)}>
                        <div className={classes("col", "col-12", "col-md-6", "col-xl-4", styles.col, styles.lg)}>
                            {/*<div className={styles.tooltip}>*/}
                            {/*    <Tooltip*/}
                            {/*        text={'Provided liquidity in the Farms is contributed to the general economy of the protocol. The farms will emit rewards in the form of the share-token. The share token has a limited supply and yielding utility in the boardroom, which makes it very valuable.'}/>*/}
                            {/*</div>*/}
                            <Card
                                imgFrom={'/img/icon/home_straw.png'}
                                imgTo={'/img/icon/home_caraml.png'}
                                action="Purchase"
                                fromToken={tombFinance.TOMB}
                                fromTokenName="FUDGE"
                                toToken={tombFinance.TBOND}
                                toTokenName="CARAML"
                                priceDesc={
                                    !isBondPurchasable
                                        ? 'FUDGE is over peg'
                                        : getDisplayBalance(bondsPurchasable, 18, 4) + ' CARAML available for purchase'
                                }
                                onExchange={handleBuyBonds}
                                disabled={!bondStat || isBondRedeemable}
                            />
                        </div>
                        <div className={classes("col", "col-12", "col-md-12", "col-xl-4", styles.col, styles.lg)}>
                            <div className={classes("row", styles.row)}>
                                <div
                                    className={classes("col", "col-12", "col-md-6", "col-xl-12", styles.col, styles.sm)}>
                                    {/*<div className={styles.tooltip}>*/}
                                    {/*    <Tooltip*/}
                                    {/*        text={'Provided liquidity in the Farms is contributed to the general economy of the protocol. The farms will emit rewards in the form of the share-token. The share token has a limited supply and yielding utility in the boardroom, which makes it very valuable.'}/>*/}
                                    {/*</div>*/}
                                    <Banner
                                        text={`FUDGE = ${getDisplayBalance(cashPrice, 18, 4)} DAI`}
                                        value={"Last-Epoch TWAP price"}
                                    />
                                </div>
                                <div
                                    className={classes("col", "col-12", "col-md-6", "col-xl-12", styles.col, styles.sm)}>
                                    {/*<div className={styles.tooltip}>*/}
                                    {/*    <Tooltip*/}
                                    {/*        text={'Provided liquidity in the Farms is contributed to the general economy of the protocol. The farms will emit rewards in the form of the share-token. The share token has a limited supply and yielding utility in the boardroom, which makes it very valuable.'}*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    <Banner
                                        text={`CARAML = ${Number(bondStat?.tokenInFtm).toFixed(2) || '-'} DAI`}
                                        value={"Current Price: (FUDGE)^2"}
                                    />
                                </div>
                                <div
                                    className={classes("col", "col-6", "col-md-6", "col-xl-6", styles.col, styles.sm)}>
                                    {/*<div className={styles.tooltip}>*/}
                                    {/*    <Tooltip*/}
                                    {/*        text={'Provided liquidity in the Farms is contributed to the general economy of the protocol. The farms will emit rewards in the form of the share-token. The share token has a limited supply and yielding utility in the boardroom, which makes it very valuable.'}*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    <Banner
                                        text={Number(bondStat?.totalSupply)}
                                        value={"Total Bonds Purchased"}
                                    />
                                </div>
                                <div
                                    className={classes("col", "col-6", "col-md-6", "col-xl-6", styles.col, styles.sm)}>
                                    {/*<div className={styles.tooltip}>*/}
                                    {/*    <Tooltip*/}
                                    {/*        text={'Provided liquidity in the Farms is contributed to the general economy of the protocol. The farms will emit rewards in the form of the share-token. The share token has a limited supply and yielding utility in the boardroom, which makes it very valuable.'}*/}
                                    {/*    />*/}
                                    {/*</div>*/}
                                    <Banner
                                        text={tombBalance}
                                        value={"Treasury Reserves"}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className={classes("col", "col-12", "col-md-6", "col-xl-4", styles.col, styles.lg)}>
                            {/*<div className={styles.tooltip}>*/}
                            {/*    <Tooltip*/}
                            {/*        text={'Provided liquidity in the Farms is contributed to the general economy of the protocol. The farms will emit rewards in the form of the share-token. The share token has a limited supply and yielding utility in the boardroom, which makes it very valuable.'}*/}
                            {/*    />*/}
                            {/*</div>*/}
                            <Card
                                imgFrom={'/img/icon/home_caraml.png'}
                                imgTo={'/img/icon/home_straw.png'}
                                action="Redeem"
                                fromToken={tombFinance.TBOND}
                                fromTokenName="CARAML"
                                toToken={tombFinance.TOMB}
                                toTokenName="FUDGE"
                                priceDesc={`${getDisplayBalance(bondBalance)} CARAML Available in wallet`}
                                onExchange={handleRedeemBonds}
                                disabled={!bondStat || bondBalance.eq(0) || !isBondRedeemable}
                                disabledDescription={!isBondRedeemable ? `Enabled when CARAML > ${BOND_REDEEM_PRICE}DAI` : null}
                            />
                        </div>
                    </div>
                    <div className={classes("row", styles.row)}>
                        <div className={classes("col", "col-12", styles.col)}>
                            {/*<div className={styles.info}>*/}
                            {/*    <Info*/}
                            {/*        text={'Claiming below 1.1 peg will not receive a redemption bonus. Claim wisely!'}/>*/}
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}

export default Tokens;
