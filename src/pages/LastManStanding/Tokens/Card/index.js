import React, { useMemo, useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { BigNumber } from 'ethers';
import styles from './index.module.scss';
import config from '../../../LastManStanding/config';
import { BtnType, DynamicObject, Size, Symbol } from '../../types';
import FarmDepositModal from "../../../../components/DepositModal";
import { useDispatch } from "react-redux";
import { Box, Button, CardActions, CardContent, Typography, Grid, Container } from '@material-ui/core';
import FarmWithDrawModal from "../../../../components/WithDrawModal";
import TombFinance from '../../ethereum/TombFinance';
import useMediaQuery from '../../../../hooks/useMediaQuery';
import fudge from '../../../../assets/img/fudge.png';
import straw from '../../../../assets/img/straw.png';
import Countdown from '../../Countdown';
import { parseBigNumber, useWallet, watchTransaction } from '../../ethereum/ethereum';
import {
    buy,
    claim,
    getClaimed,
    getClaimPeriod,
    getLastTs,
    getPeriod,
    getPotSize,
    getTicketSize,
    getWinner,
} from '../../ethereum/lms/lms';
import handleResult from '../../ethereum/handleresult';
import EthereumInteraction from '../../ethereum/EthereumInteraction';
import separateNumberWithCommas from '../../../../utils/separateNumberWithCommas';

// interface Pot {
//     inactive?: boolean;
//     earning?: boolean;
//     symbol: Symbol;
//     icon: string;
//     iconWidth: number | string;
//     iconHeight: number | string;
//     iconClassName?: string;
//     iconClassNameCollapsed?: string;
//     iconSm: string;
//     iconSmWidth: number | string;
//     iconSmHeight: number | string;
//     border: string;
//     shadow: string;
//     text: string;
//     fill: string;
//     bg: string;
//     bgLight: string;
//     color: string;
// }

const Card = ({ pot }) => {
    const { wallet, chain, loaded } = useWallet();

    const bp1280px = useMediaQuery(1280);

    const tokensUnfiltered = {
        AVAX: null,
        USDC: TombFinance.tokens[`koc${Symbol.USDC}`],
        GRAPE: TombFinance.tokens[Symbol.GRAPE],
        FUDGE: TombFinance.tokens[Symbol.FUDGE],
        STRAW: TombFinance.tokens[Symbol.STRAW],
    };
    const tokens = {};
    for (const [key, value] of Object.entries(tokensUnfiltered)) {
        if (value !== undefined) tokens[key] = value;
    }

    const pots = [
        // {
        //   symbol: Symbol.USDC,
        //   earning: true,
        //   icon: usdc,
        //   iconWidth: 72,
        //   iconHeight: 72,
        //   iconSm: usdc_sm,
        //   iconSmWidth: 35,
        //   iconSmHeight: 35,
        //   border: 'border-usdc',
        //   shadow: 'shadow-[0_8px_14px_rgba(42,120,205,0.04)] hover:shadow-[0_10px_25px_rgba(42,120,205,0.2)]',
        //   text: 'text-usdc',
        //   fill: 'fill-usdc',
        //   bg: '#6ca4dc',
        //   bgLight: 'bg-[#f0f5fb]',
        //   color: 'usdc',
        // },
        // {
        //   symbol: Symbol.AVAX,
        //   icon: avax,
        //   iconWidth: 72,
        //   iconHeight: 72,
        //   iconSm: avax_sm,
        //   iconSmWidth: 35,
        //   iconSmHeight: 35,
        //   border: 'border-avax',
        //   shadow: 'shadow-[0_8px_14px_rgba(236,69,69,0.04)] hover:shadow-[0_10px_25px_rgba(236,69,69,0.2)]',
        //   text: 'text-avax',
        //   fill: 'fill-avax',
        //   bg: '#ee868c',
        //   bgLight: 'bg-[#fbe6e8]',
        //   color: 'avax',
        // },
        // {
        //   symbol: Symbol.GRAPE,
        //   icon: grape,
        //   iconWidth: 71,
        //   iconHeight: 72,
        //   iconSm: grape_sm,
        //   iconSmWidth: 35,
        //   iconSmHeight: 35,
        //   border: 'border-grape',
        //   shadow: 'shadow-[0_8px_14px_rgba(130,9,108,0.04)] hover:shadow-[0_10px_25px_rgba(130,9,108,0.2)]',
        //   text: 'text-grape',
        //   fill: 'fill-grape',
        //   bg: '#82096c',
        //   bgLight: 'bg-[#e6cde1]',
        //   color: 'grape',
        // },
        {
            symbol: Symbol.FUDGE,
            icon: fudge,
            iconWidth: 71,
            iconHeight: 72,
            iconSm: fudge,
            iconSmWidth: 35,
            iconSmHeight: 35,
            border: 'border-grape',
            shadow: 'shadow-[0_8px_14px_rgba(130,9,108,0.04)] hover:shadow-[0_10px_25px_rgba(130,9,108,0.2)]',
            text: 'text-grape',
            fill: 'fill-grape',
            bg: '#82096c',
            bgLight: 'bg-[#e6cde1]',
            color: 'grape',
        },
        {
            symbol: Symbol.STRAW,
            icon: straw,
            iconWidth: 71,
            iconHeight: 72,
            iconSm: straw,
            iconSmWidth: 35,
            iconSmHeight: 35,
            border: 'border-grape',
            shadow: 'shadow-[0_8px_14px_rgba(130,9,108,0.04)] hover:shadow-[0_10px_25px_rgba(130,9,108,0.2)]',
            text: 'text-grape',
            fill: 'fill-grape',
            bg: '#82096c',
            bgLight: 'bg-[#e6cde1]',
            color: 'grape',
        },
    ];

    const refsBigBoxes = useRef({});

    const [prevWallet, setPrevWallet] = useState('');
    const [approved, setApproved] = useState(() => {
        const approved = {};
        Object.keys(tokens)
            .filter((key) => key !== Symbol.AVAX)
            .forEach((key) => {
                approved[key] = undefined;
            });
        return approved;
    });
    const [loading, setLoading] = useState(() => {
        const loading = {};
        Object.keys(tokens).forEach((key) => {
            loading[key] = false;
        });
        return loading;
    });
    const [response, setResponse] = useState(() => {
        const loading = {};
        Object.keys(tokens).forEach((key) => {
            loading[key] = '';
        });
        return loading;
    });
    const [avaxPriceInDollars, setAvaxPriceInDollars] = useState(0);
    const [avaxPriceInDollarsPoll, setAvaxPriceInDollarsPoll] = useState();
    const [timePoll, setTimePoll] = useState();
    const [hoveredSmallBox, setHoveredSmallBox] = useState();
    const [hoveredBigBox, setHoveredbigBox] = useState();
    const [openedPots, setOpenedPots] = useState([]);
    const [sortedPots, setSortedPots] = useState(pots);

    const [winner, setWinner] = useState();
    const [isClaimed, setIsClaimed] = useState();
    const [lastTs, setLastTs] = useState();
    const [lastTsCandidate, setLastTsCandidate] = useState();
    const [claimPeriod, setClaimPeriod] = useState();
    const [period, setPeriod] = useState();
    const [ticketSize, setTicketSize] = useState();
    const [potSize, setPotSize] = useState();

    useEffect(() => {
        if (prevWallet && wallet) {
            Object.keys(tokens)
                .filter((key) => key !== Symbol.AVAX)
                .forEach((key) => {
                    if (localStorage.getItem(`isApprovedKoc${key}`) === 'true') localStorage.removeItem(`isApprovedKoc${key}`);
                });
        }
        setPrevWallet(wallet);

        const getAllowance = async (symbol, newApproved) => {
            const allowance = (await tokens[symbol].getAllowance(wallet, config.koc[symbol])) || BigNumber.from(0);
            if (allowance && allowance.gt(0)) newApproved[symbol] = true;
            else newApproved[symbol] = false;
        };

        const initApproved = async () => {
            const newApproved = { ...approved };
            const keys = Object.keys(tokens).filter((key) => key !== Symbol.AVAX);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                if (localStorage.getItem(`isApprovedKoc${key}`) === 'true') newApproved[key] = true;
                else if (wallet && chain === config.chainId) await getAllowance(key, newApproved);
                else newApproved[key] = false;
            }
            setApproved(newApproved);
        };
        initApproved();
    }, [wallet, chain]);

    useEffect(() => {
        const initAvaxPriceInDollars = async () =>
            setAvaxPriceInDollars(await TombFinance.getTokenPriceInDollarsFromCoinGecko(Symbol.AVAX));

        const correctChain = chain === config.chainId;
        if (wallet && correctChain) {
            initAvaxPriceInDollars();
        }

        if (avaxPriceInDollarsPoll !== undefined) clearInterval(avaxPriceInDollarsPoll);

        const avaxPriceInDollarsInterval = setInterval(async () => {
            if (wallet && correctChain) await initAvaxPriceInDollars();
        }, 60000);
        setAvaxPriceInDollarsPoll(avaxPriceInDollarsInterval);

        return () => clearInterval(avaxPriceInDollarsInterval);
    }, [wallet, chain]);

    useEffect(() => {
        const initPeriod = async () => {
            const period = {};
            const keys = Object.keys(tokens);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                period[key] = await getPeriod(key);
            }
            setPeriod(period);
        };

        const initLastTsCandidate = async () => {
            const lastTs = {};
            const keys = Object.keys(tokens);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                lastTs[key] = await getLastTs(key);
            }
            setLastTsCandidate(lastTs);
        };

        const correctChain = chain === config.chainId;
        if (wallet && correctChain) {
            initPeriod();
            initLastTsCandidate();
        }

        if (timePoll !== undefined) clearInterval(timePoll);

        const timeInterval = setInterval(async () => {
            if (wallet && correctChain) await initLastTsCandidate();
        }, 60000);
        setTimePoll(timeInterval);

        return () => clearInterval(timeInterval);
    }, [wallet, chain]);

    useEffect(() => {
        const initData = async () => {
            const winner = {};
            const isClaimed = {};
            const claimPeriod = {};
            const ticketSize = {};
            const potSize = {};
            const keys = [Symbol.USDC, Symbol.AVAX].concat(openedPots);
            for (let i = 0; i < keys.length; i++) {
                const key = keys[i];
                winner[key] = (await getWinner(key)) || '0x00';
                isClaimed[key] = await getClaimed(key);
                claimPeriod[key] = await getClaimPeriod(key);
                ticketSize[key] = await getTicketSize(key);
                potSize[key] = await getPotSize(key, config.tokens[key].decimals);
            }
            setWinner(winner);
            setIsClaimed(isClaimed);
            setClaimPeriod(claimPeriod);
            setTicketSize(ticketSize);
            setPotSize(potSize);
        };

        const correctChain = chain === config.chainId;
        if (wallet && correctChain) {
            initData();
        }
    }, [wallet, chain, openedPots]);

    useEffect(() => {
        const newState = { ...lastTs };
        var needsUpdate = false;
        pots
            .filter((pot) => !pot.inactive)
            .forEach((pot) => {
                const symbol = pot.symbol;
                if (lastTs?.[symbol] === undefined || !lastTsCandidate?.[symbol]?.eq(lastTs?.[symbol])) {
                    newState[symbol] = lastTsCandidate?.[symbol];
                    needsUpdate = true;
                }
            });
        if (needsUpdate) {
            setLastTs(newState);

            const updateData = async () => {
                const winner = {};
                const isClaimed = {};
                const ticketSize = {};
                const potSize = {};
                const keys = [Symbol.USDC, Symbol.AVAX].concat(openedPots);
                for (let i = 0; i < keys.length; i++) {
                    const key = keys[i];
                    winner[key] = (await getWinner(key)) || '0x00';
                    isClaimed[key] = await getClaimed(key);
                    ticketSize[key] = await getTicketSize(key);
                    potSize[key] = await getPotSize(key, config.tokens[key].decimals);
                }
                setWinner(winner);
                setIsClaimed(isClaimed);
                setTicketSize(ticketSize);
                setPotSize(potSize);
            };

            if (wallet && chain === config.chainId) {
                updateData();
            }
        }
    }, [lastTsCandidate]);

    const handleSetLoading = (value, symbol) => {
        const newLoading = { ...loading };
        newLoading[symbol] = value;
        setLoading(newLoading);
    };
    const handleSetResponse = (value, symbol) => {
        const newState = { ...response };
        newState[symbol] = value;
        setResponse(newState);
    };

    const handleSetApproved = (value, symbol) => {
        const newApproved = { ...approved };
        newApproved[symbol] = value;
        setApproved(newApproved);
    };

    const onApprove = async (symbol) => {
        handleSetLoading(true, symbol);
        handleSetResponse('', symbol);

        try {
            const result = await tokens[symbol].approve(config.koc[symbol]);
            const operation = 'Approve';
            handleSetResponse(handleResult(result, operation), symbol);
            if (!('hash' in result)) {
                handleSetLoading(false, symbol);
                return;
            }

            watchTransaction(result.hash, (receipt, success) => {
                handleSetLoading(false, symbol);
                if (!success) {
                    return handleSetResponse(`${operation} failed. Check transaction.`, symbol);
                }
                localStorage.setItem(`isApprovedKoc${symbol}`, 'true');
                handleSetApproved(true, symbol);
                handleSetResponse(`${operation} has succeeded!`, symbol);
            });
        } catch (e) {
            handleSetLoading(false, symbol);
        }
    };

    const onBuy = async (symbol) => {
        handleSetLoading(true, symbol);
        handleSetResponse('', symbol);

        try {
            const result = await buy(symbol, symbol === Symbol.AVAX ? ticketSize[Symbol.AVAX] : BigNumber.from(0));
            const operation = 'Joining the tournament';
            handleSetResponse(handleResult(result, operation), symbol);
            if (!('hash' in result)) {
                handleSetLoading(false, symbol);
                return;
            }

            watchTransaction(result.hash, (receipt, success) => {
                handleSetLoading(false, symbol);
                if (!success) {
                    return handleSetResponse(`${operation} failed. Check transaction.`, symbol);
                }
                handleSetResponse(`${operation} has succeeded!`, symbol);
            });
        } catch (e) {
            handleSetLoading(false, symbol);
        }
    };

    const onClaim = async (symbol) => {
        handleSetLoading(true, symbol);
        handleSetResponse('', symbol);

        try {
            const result = await claim(symbol);
            const operation = 'Claiming';
            handleSetResponse(handleResult(result, operation), symbol);
            if (!('hash' in result)) {
                handleSetLoading(false, symbol);
                return;
            }

            watchTransaction(result.hash, (receipt, success) => {
                handleSetLoading(false, symbol);
                if (!success) {
                    return handleSetResponse(`${operation} failed. Check transaction.`, symbol);
                }

                handleSetResponse(``, symbol);

                const newState = { ...isClaimed };
                newState[symbol] = true;
                setIsClaimed(newState);
            });
        } catch (e) {
            handleSetLoading(false, symbol);
        }
    };

    const getBoobyPrice = (symbol) => {
        const lastTsNumber = lastTs?.[symbol]?.toNumber();
        if (lastTsNumber) {
            const hourInSecs = 3600;
            const halfAnHourInSecs = hourInSecs * 0.5;
            const secondsSinceLastTs = Math.floor(Date.now() / 1000 - lastTsNumber);
            if (secondsSinceLastTs >= halfAnHourInSecs) {
                const ticketSizeParsed = parseBigNumber(ticketSize?.[symbol], config.tokens[symbol].decimals);
                return (ticketSizeParsed / hourInSecs / 3) * (secondsSinceLastTs - halfAnHourInSecs);
            } else return 0;
        } else return 0;
    };

    const getRemainingSeconds = (symbol) =>
        lastTs?.[symbol]?.add(period?.[symbol] || 0)?.toNumber() - Math.round(Date.now() / 1000);

    useEffect(() => {
        const usdcAvax = pots.slice(0, 2);
        const rest = pots.slice(2);
        const isNotTicking = (pot) =>
            !lastTs?.[pot.symbol] ||
            lastTs?.[pot.symbol]?.eq(0) ||
            Date.now() / 1000 > lastTs?.[pot.symbol]?.toNumber() + period?.[pot.symbol]?.toNumber();
        const sortByLastTs = (a, b) => {
            const aNotTicking = isNotTicking(a);
            const bNotTicking = isNotTicking(b);
            if (aNotTicking && bNotTicking) return 0;
            else if (aNotTicking) return 1;
            else if (bNotTicking) return -1;
            else return getRemainingSeconds(a.symbol) - getRemainingSeconds(b.symbol);
        };
        const newSortedPots = usdcAvax.sort(sortByLastTs).concat(rest.sort(sortByLastTs));
        var diff = false;
        for (var i = 0; i < newSortedPots.length; i++) {
            if (newSortedPots[i].symbol !== sortedPots[i].symbol) diff = true;
        }
        if (diff) setSortedPots(newSortedPots);
        setOpenedPots(
            isOpen ? openedPots.filter((pot) => pot !== symbol) : openedPots.concat(symbol),
        )

    }, [lastTs, period, sortedPots]);

    const symbol = pot.symbol;
    const isOpen = openedPots.includes(symbol);
    const avaxOrUsdc = symbol === Symbol.AVAX || symbol === Symbol.USDC;
    const notAvaxAndNotUsdc = symbol !== Symbol.AVAX && symbol !== Symbol.USDC;



    return (
        <div className={classNames('gradient-background', styles.block)} onClick={
            !isOpen && !pot.inactive
                ? () =>
                    setOpenedPots(
                        isOpen ? openedPots.filter((pot) => pot !== symbol) : openedPots.concat(symbol),
                    )
                : undefined
        }>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={styles.picture}>
                        <img
                            src={pot.icon}
                            alt=""
                            width={pot.iconWidth}
                            height={pot.iconHeight}
                            className={pot.iconClassName || ''}
                        />
                    </div>
                    <div>
                        <h6 className={styles.title}>{symbol}</h6>
                    </div>
                </div>


                <div className={styles.center}>
                    <div className={styles.item}>
                        <p className={styles.value}>If you survive for {period?.[symbol]?.toNumber() / 3600 || 0} hours in the Tournament,
                            you get the whole pot:{' '}
                            {separateNumberWithCommas(parseFloat(potSize?.[symbol]?.toFixed(2) || '0'))}{' '}
                            {symbol}
                        </p>
                        <br />
                        {pot.earning && (
                            <p className={styles.value}>
                                It only takes 30 minutes of ruling to begin earning!

                            </p>
                        )}
                    </div>
                    <div className={styles.item}>
                        <p className={styles.value}>Only the most recent Champion can win the pot.
                            Another Champion can come by and dominate the fight themselves; if another Champion
                            joins the fight, they will knock you off and dominate.
                        </p>
                    </div>
                    <div className={styles.item}>
                        <>
                            {winner?.[symbol] !== undefined &&
                                !BigNumber.from(winner?.[symbol]).eq(0) &&
                                lastTs?.[symbol] !== undefined &&
                                period?.[symbol] !== undefined &&
                                potSize?.[symbol] !== undefined &&
                                (winner?.[symbol] && wallet && winner?.[symbol]?.toLowerCase() === wallet ? (
                                    Date.now() / 1000 <
                                        lastTs?.[symbol]?.toNumber() + period?.[symbol]?.toNumber() ? (
                                        <>
                                            <p className={styles.value}>
                                                You are dominating
                                                {' '}
                                                the Tournament!
                                                <br />
                                                If you survive until the timer runs out,
                                                <br />
                                                you will receive{' '}
                                                {separateNumberWithCommas(parseFloat(potSize?.[symbol]?.toFixed(2) || '0'))}{' '}
                                                {symbol}
                                                {pot.symbol === Symbol.AVAX && (
                                                    <>
                                                        {' '}
                                                        ($
                                                        {separateNumberWithCommas(
                                                            parseFloat((potSize?.[symbol] * avaxPriceInDollars)?.toFixed(2)) ||
                                                            '0',
                                                        )}
                                                        )
                                                    </>
                                                )}
                                                .
                                            </p>
                                            {pot.earning && (
                                                <p className={styles.value}>
                                                    <br /> <br />
                                                    If you were kicked out of the fight right now,
                                                    <br />
                                                    you'd earn{' '}
                                                    {separateNumberWithCommas(
                                                        parseFloat(getBoobyPrice(symbol)?.toFixed(2)) || '0',
                                                    )}{' '}
                                                    {symbol}
                                                    {pot.symbol === Symbol.AVAX && (
                                                        <>
                                                            {' '}
                                                            ($
                                                            {separateNumberWithCommas(
                                                                parseFloat(
                                                                    (getBoobyPrice(symbol) * avaxPriceInDollars)?.toFixed(2),
                                                                ) || '0',
                                                            )}
                                                            )
                                                        </>
                                                    )}
                                                    .
                                                </p>
                                            )}
                                        </>
                                    ) : (
                                        <p className={styles.value}>
                                            The fight is over! You have{' '}
                                            <span style={{ fontWeight: 'bold !important' }} className="font-bold">
                                                won!
                                            </span>
                                            <br />
                                            Claim{' '}
                                            <span className="font-bold">
                                                your{' '}
                                                {separateNumberWithCommas(parseFloat(potSize?.[symbol]?.toFixed(2) || '0'))}{' '}
                                                {symbol}
                                                {pot.symbol === Symbol.AVAX && (
                                                    <>
                                                        {' '}
                                                        ($
                                                        {separateNumberWithCommas(
                                                            parseFloat((potSize?.[symbol] * avaxPriceInDollars)?.toFixed(2)) ||
                                                            '0',
                                                        )}
                                                        )
                                                    </>
                                                )}
                                                !
                                            </span>
                                        </p>
                                    )
                                ) : (
                                    winner?.[symbol] &&
                                    (Date.now() / 1000 <
                                        lastTs?.[symbol]?.toNumber() + period?.[symbol]?.toNumber() ? (
                                        <p className={styles.value}>
                                            The following address{' '}
                                            will win the{' '}
                                            {separateNumberWithCommas(parseFloat(potSize?.[symbol]?.toFixed(2) || '0'))}{' '}
                                            {symbol}
                                            {pot.symbol === Symbol.AVAX && (
                                                <>
                                                    {' '}
                                                    ($
                                                    {separateNumberWithCommas(
                                                        parseFloat((potSize?.[symbol] * avaxPriceInDollars)?.toFixed(2)) ||
                                                        '0',
                                                    )}
                                                    )
                                                </>
                                            )}
                                            :
                                            <br />
                                            {winner?.[symbol]?.slice(0, 6)}...{winner?.[symbol]?.slice(-4)}
                                            .
                                        </p>
                                    ) : (
                                        <p className={styles.value}>
                                            <br />
                                            The tournament is over.
                                            <br />
                                            <span className="break-all">
                                                {winner?.[symbol]?.slice(0, 6)}...{winner?.[symbol]?.slice(-4)}
                                            </span>{' '}
                                            has{' '}
                                            <span className="font-bold">
                                                won{' '}
                                                {separateNumberWithCommas(parseFloat(potSize?.[symbol]?.toFixed(2) || '0'))}{' '}
                                                {symbol}
                                                {pot.symbol === Symbol.AVAX && (
                                                    <>
                                                        {' '}
                                                        ($
                                                        {separateNumberWithCommas(
                                                            parseFloat((potSize?.[symbol] * avaxPriceInDollars)?.toFixed(2)) ||
                                                            '0',
                                                        )}
                                                        )
                                                    </>
                                                )}
                                                !
                                            </span>
                                            <br />
                                        </p>
                                    ))
                                ))}

                        </>
                    </div>
                    <div className={styles.item}>
                        <Countdown
                            period={period?.[symbol]}
                            start={lastTs?.[symbol]}
                            text={pot.text}
                            bg={pot.bg}
                            bgLight={pot.bgLight}
                            className={styles.center}
                        />
                    </div>
                    <div className={styles.item}>
                        <EthereumInteraction
                            wallet={wallet}
                            chain={chain}
                            loaded={loaded}
                            connectButton={
                                <Button color="primary" variant="contained">
                                    Connect to Metamask
                                </Button>
                            }
                            chainSwitchButton={
                                <Button color="primary" variant="contained">
                                    Switch to Avalanche
                                </Button>
                            }
                        >

                            {

                                symbol !== Symbol.AVAX && !approved?.[symbol] ? (
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        onClick={async () => await onApprove(symbol)}
                                        disabled={Object.values(loading).find((loading) => loading)}
                                    >

                                        Approve
                                    </Button>
                                ) : !lastTs?.[symbol] ||
                                    lastTs?.[symbol]?.eq(0) ||
                                    Date.now() / 1000 < lastTs?.[symbol]?.toNumber() + period?.[symbol]?.toNumber() ? (
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        disabled={Object.values(loading).find((loading) => loading)}
                                        onClick={async () => await onBuy(symbol)}
                                    >
                                        {!lastTs?.[symbol] || lastTs?.[symbol]?.eq(0)
                                            ? 'Be the first to join and start'
                                            : 'Join'}{' '}
                                        the Tournament for{' '}
                                        {separateNumberWithCommas(
                                            parseFloat(
                                                parseBigNumber(ticketSize?.[symbol], config.tokens[symbol].decimals)?.toFixed(
                                                    2,
                                                ),
                                            ),
                                        )}{' '}
                                        {symbol}
                                        {pot.symbol === Symbol.AVAX && (
                                            <>
                                                {' '}
                                                ($
                                                {separateNumberWithCommas(
                                                    parseFloat(
                                                        (
                                                            parseBigNumber(ticketSize?.[symbol], config.tokens[symbol].decimals) *
                                                            avaxPriceInDollars
                                                        )?.toFixed(2),
                                                    ) || '0',
                                                )}
                                                )
                                            </>
                                        )}
                                    </Button>
                                ) : winner?.[symbol]?.toLowerCase() !== wallet ||
                                    BigNumber.from(winner?.[symbol]).eq(0) ? (
                                    <></>
                                ) : isClaimed?.[symbol] ? (
                                    <p className={`${pot.text} text-16 sm:text-18 font-semibold`}>
                                        Your reward is claimed.
                                    </p>
                                ) : lastTs?.[symbol]?.toNumber() + claimPeriod?.[symbol]?.toNumber() <
                                    Date.now() / 1000 ? (
                                    <p className={`${pot.text} text-16 sm:text-18 font-semibold`}>
                                        The time for you to claim your reward has expired. You can't claim it anymore.
                                    </p>
                                ) : (
                                    <Button
                                        color="primary"
                                        variant="contained"
                                        disabled={Object.values(loading).find((loading) => loading)}
                                        onClick={async () => await onClaim(symbol)}
                                    >
                                        You have won! Claim your{' '}
                                        {separateNumberWithCommas(parseFloat(potSize?.[symbol]?.toFixed(2)))} {symbol}
                                        {pot.symbol === Symbol.AVAX && (
                                            <>
                                                {' '}
                                                ($
                                                {separateNumberWithCommas(
                                                    parseFloat((potSize?.[symbol] * avaxPriceInDollars)?.toFixed(2)) || '0',
                                                )}
                                                )
                                            </>
                                        )}
                                    </Button>
                                )
                            }
                        </EthereumInteraction>
                    </div>

                    {/* <div className={styles.item}>
                        <div className={styles.button}>
                            <Button
                                type={'button'}
                                placeholder={'Collect'}
                                classname={'primary'}
                                action={onReward}
                            />
                        </div>
                    </div> */}
                    <div className={styles.item}>
                        <p className={styles.label}> {response?.[symbol] ? (
                            response[symbol]
                        ) : (
                            <>
                                <br />
                            </>
                        )}</p>
                    </div>
                </div >
            </div>
        </div >
    );
}

export default Card;
