import { BigNumber } from 'ethers';
import { useEffect, useRef, useState } from 'react';
import config from '../LastManStanding/config';
import { parseBigNumber, useWallet, watchTransaction } from './ethereum/ethereum';
import handleResult from './ethereum/handleresult';
import fudge from '../../assets/img/fudge.png';
import straw from '../../assets/img/straw.png';
import JoinUs from "../../Modules/JoinUs";
import Description from "../../Modules/Description";
import Numbers from "../../Modules/Numbers";
import { ReactTitle } from 'react-meta-tags';
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
} from './ethereum/lms/lms';
import {  DynamicObject,  Symbol } from './types';
import TombFinance from './ethereum/TombFinance';
import useMediaQuery from '../../hooks/useMediaQuery';
import React from 'react';
import Tokens from './Tokens';
import Footer from "../../layouts/Footer";

interface IKoCPage {
  refHeader: any;
}

interface Pot {
  inactive?: boolean;
  earning?: boolean;
  symbol: Symbol;
  icon: string;
  iconWidth: number | string;
  iconHeight: number | string;
  iconClassName?: string;
  iconClassNameCollapsed?: string;
  iconSm: string;
  iconSmWidth: number | string;
  iconSmHeight: number | string;
  border: string;
  shadow: string;
  text: string;
  fill: string;
  bg: string;
  bgLight: string;
  color: string;
}

export default function KocPage({ refHeader }: IKoCPage): JSX.Element {
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

  const pots: Pot[] = [
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

  const [prevWallet, setPrevWallet] = useState<string>();
  const [approved, setApproved] = useState<DynamicObject<boolean>>(() => {
    const approved = {};
    Object.keys(tokens)
      .filter((key) => key !== Symbol.AVAX)
      .forEach((key) => {
        approved[key] = undefined;
      });
    return approved;
  });
  const [loading, setLoading] = useState<DynamicObject<boolean>>(() => {
    const loading = {};
    Object.keys(tokens).forEach((key) => {
      loading[key] = false;
    });
    return loading;
  });
  const [response, setResponse] = useState<DynamicObject<string>>(() => {
    const loading = {};
    Object.keys(tokens).forEach((key) => {
      loading[key] = '';
    });
    return loading;
  });
  const [avaxPriceInDollars, setAvaxPriceInDollars] = useState<number>(0);
  const [avaxPriceInDollarsPoll, setAvaxPriceInDollarsPoll] = useState();
  const [timePoll, setTimePoll] = useState();
  const [hoveredSmallBox, setHoveredSmallBox] = useState<Symbol>();
  const [hoveredBigBox, setHoveredbigBox] = useState<Symbol>();
  const [openedPots, setOpenedPots] = useState<Symbol[]>([]);
  const [sortedPots, setSortedPots] = useState<Pot[]>(pots);

  const [winner, setWinner] = useState<DynamicObject<string>>();
  const [isClaimed, setIsClaimed] = useState<DynamicObject<boolean>>();
  const [lastTs, setLastTs] = useState<DynamicObject<BigNumber>>();
  const [lastTsCandidate, setLastTsCandidate] = useState<DynamicObject<BigNumber>>();
  const [claimPeriod, setClaimPeriod] = useState<DynamicObject<BigNumber>>();
  const [period, setPeriod] = useState<DynamicObject<BigNumber>>();
  const [ticketSize, setTicketSize] = useState<DynamicObject<BigNumber>>();
  const [potSize, setPotSize] = useState<DynamicObject<number>>();

  useEffect(() => {
    if (prevWallet && wallet) {
      Object.keys(tokens)
        .filter((key: string) => key !== Symbol.AVAX)
        .forEach((key: string) => {
          if (localStorage.getItem(`isApprovedKoc${key}`) === 'true') localStorage.removeItem(`isApprovedKoc${key}`);
        });
    }
    setPrevWallet(wallet);

    const getAllowance = async (symbol: Symbol, newApproved) => {
      const allowance = (await tokens[symbol].getAllowance(wallet, config.koc[symbol])) || BigNumber.from(0);
      if (allowance && allowance.gt(0)) newApproved[symbol] = true;
      else newApproved[symbol] = false;
    };

    const initApproved = async () => {
      const newApproved = { ...approved };
      const keys = Object.keys(tokens).filter((key) => key !== Symbol.AVAX);
      for (let i = 0; i < keys.length; i++) {
        const key: any = keys[i];
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

    const avaxPriceInDollarsInterval: any = setInterval(async () => {
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
        const key: any = keys[i];
        period[key] = await getPeriod(key);
      }
      setPeriod(period);
    };

    const initLastTsCandidate = async () => {
      const lastTs = {};
      const keys = Object.keys(tokens);
      for (let i = 0; i < keys.length; i++) {
        const key: any = keys[i];
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

    const timeInterval: any = setInterval(async () => {
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
        const key: any = keys[i];
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
          const key: any = keys[i];
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

  const handleSetLoading = (value: boolean, symbol: Symbol) => {
    const newLoading = { ...loading };
    newLoading[symbol] = value;
    setLoading(newLoading);
  };
  const handleSetResponse = (value: string, symbol: Symbol) => {
    const newState = { ...response };
    newState[symbol] = value;
    setResponse(newState);
  };

  const handleSetApproved = (value: boolean, symbol: Symbol) => {
    const newApproved = { ...approved };
    newApproved[symbol] = value;
    setApproved(newApproved);
  };

  const onApprove = async (symbol: Symbol) => {
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

  const onBuy = async (symbol: Symbol) => {
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

  const onClaim = async (symbol: Symbol) => {
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

  const getBoobyPrice = (symbol: Symbol): number => {
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

  const getRemainingSeconds = (symbol: string): number =>
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
  }, [lastTs, period, sortedPots]);

  const numbers = [
    {
        title: "Purchase",
        text: "Purchase a sufficient amount of the necessary token to participate in the game. Each round the cost to enter will increase.",
        icon: 'purchase'
    },
    {
        title: "Deposit",
        text: "Deposit your token into the pot to take over as the new champion. Each time a new champion is the declared the timer will reset.",
        icon: 'create'
    },
    {
        title: "Claim Reward",
        text: "Once the countdown has ended the remaning champion will win the content of the pot. Claim your rewards and wear your crown with pride.",
        icon: 'deposit'
    }
]

  return (
    <>
      <main className={'inner'}>
        <ReactTitle title={'Sundae | Last Man Standing'} />
        <Description
          title={'Last Man Standing'}
          text={"Deposit now to defeat the current champion and take his place. The last one remaining once the countdown is done wins. Do you have what it takes to be the champion."}
          page={'lastmanstanding'}
        />
        <Tokens />
        <Numbers
            title={'How It Works'}
            description={'The pot has a preset timer that counts down to zero. Deposit funds to reset the timer and become the new champion. Once the timer has ended the most recent champion wins the pot.'}
            info={numbers}
            page={'farm'}
            />
        <JoinUs
          isLast={true}
        />
      </main>
      <Footer alt={true}/>

    
    </>
  );
}
