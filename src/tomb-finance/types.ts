import ERC20 from './ERC20';
import { BigNumber } from 'ethers';
export type ContractName = string;

export interface BankInfo {
  name: string;
  poolId: number;
  sectionInUI: number;
  contract: ContractName;
  depositTokenName: ContractName;
  earnTokenName: ContractName;
  sort: number;
  site: string;
  multiplier: string;
  buyLink: string;
  finished: boolean;
  closedForStaking: boolean;
}

export interface Bank extends BankInfo {
  address: string;
  depositToken: ERC20;
  earnToken: ERC20;
}

export type PoolStats = {
  userDailyBurst?: string;
  userYearlyBurst?: string;
  dailyAPR: string;
  yearlyAPR: string;
  TVL: string;
};

export type TokenStat = {
  tokenInFtm: string;
  priceInDollars: string;
  totalSupply: string;
  circulatingSupply: string;
};

export type LPStat = {
  tokenAmount: string;
  ftmAmount: string;
  priceOfOne: string;
  totalLiquidity: string;
  totalSupply: string;
};

export type AllocationTime = {
  from: Date;
  to: Date;
};

export type TShareSwapperStat = {
  tshareBalance: string;
  tbondBalance: string;
  // tombPrice: string;
  // tsharePrice: string;
  rateTSharePerTomb: string;
};

export type Call = {
  address: string // Address of the contract
  name: string // Function name on the contract (exemple: balanceOf)
  params?: any[] // Function params
};

export interface PegPoolUserInfo {
  amountDeposited: string;
  amountDepositedBN: BigNumber;
  isDeposited: boolean;
};

export interface PegPool {
  depositsEnabled: boolean;
  totalDesposits: string;
  depositToken: ERC20;
  depositTokenName: string;
  userInfo?: PegPoolUserInfo;
  approved: boolean;
}

export interface PegPoolToken {
  name: string;
  token: ERC20;
  pairAddress: string;
  amount?: string;
  image?: string;
  pendingValue?: string;
  pendingValueBN?: BigNumber;
  currentPrice?: string;
  currentPriceNum?: number;
  rewardPerBlock: number;
  canCompound: boolean;
}
