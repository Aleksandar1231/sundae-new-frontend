import React, { useCallback, useMemo, useState } from 'react';
import Button from '../../../components/Button';
import Modal from '../../../components/Modal';
import ModalActions from '../../../components/ModalActions';
import ModalTitle from '../../../components/ModalTitle';
import TokenInput from '../../../components/TokenInput';
import { getFullDisplayBalance } from '../../../utils/formatBalance';
import { BigNumber } from 'ethers';
import Label from '../../../components/Label';

interface ExchangeModalProps {
  max: BigNumber;
  onConfirm: (amount: string) => void;
  title: string;
  description: string;
  action: string;
  tokenName: string;
  onDismiss?: () => void;
}

const ExchangeModal: React.FC<ExchangeModalProps> = ({
  max,
  title,
  description,
  onConfirm,
  onDismiss,
  action,
  tokenName,
}) => {
  const [val, setVal] = useState('');
  const fullBalance = useMemo(() => getFullDisplayBalance(max), [max]);

  const handleChange = useCallback((e: React.FormEvent<HTMLInputElement>) => setVal(e.currentTarget.value), [setVal]);

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance);
  }, [fullBalance, setVal]);

  return (
    <Modal>
      {/*<ModalTitle text={title} />*/}
      <TokenInput
        value={val}
        onSelectMax={handleSelectMax}
        onChange={handleChange}
        max={fullBalance}
        symbol={tokenName}
      />
      <Label text={description} />
      <ModalActions>
          <Button
              type={'button'}
              disabled={null}
              placeholder={'Cancel'}
              classname={'primary'}
              action={onDismiss}
          />
          <Button
              type={'button'}
              disabled={null}
              placeholder={action}
              classname={'primary'}
              action={() => onConfirm(val)}
          />
      </ModalActions>
    </Modal>
  );
};

export default ExchangeModal;
