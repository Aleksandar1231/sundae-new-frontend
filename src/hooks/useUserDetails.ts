import { BigNumber } from 'ethers';
import { useCallback, useState, useEffect } from 'react';
import useTombFinance from './useTombFinance';
import config from '../config';

const useUserDetails = (contract: string, sectionInUI: number, user: string) => {
  const tombFinance = useTombFinance();

  const [poolAPRs, setPoolAPRs] = useState<BigNumber[]>([]);

  const fetchNodes = useCallback(async () => {
    setPoolAPRs(await tombFinance.getUserDetails(contract, user));
  }, [tombFinance, contract, user]);

  useEffect(() => {
    if (user && sectionInUI === 3) {
      fetchNodes().catch((err) => console.error(`Failed to fetch APR info: ${err.stack}`));
      const refreshInterval = setInterval(fetchNodes, config.refreshInterval);
      return () => clearInterval(refreshInterval);
    }
  }, [setPoolAPRs, tombFinance, fetchNodes, user, sectionInUI]);

  return poolAPRs;
};

export default useUserDetails;