import React, {useState} from "react";
import classNames from "classnames";

import styles from './index.module.scss';
import useTokenBalance from "../../../../hooks/useTokenBalance";
import useTombFinance from "../../../../hooks/useTombFinance";
import useCatchError from "../../../../hooks/useCatchError";
import useApprove, {ApprovalState} from "../../../../hooks/useApprove";
import Button from "../../../../components/Button";
import {useDispatch} from "react-redux";
import {setCbondModalData} from "../../../../state/appReducer/actions/modalActions";
import BonsModal from "../../../../components/BonsModal";

const Card = ({
                  imgFrom,
                  imgTo,
                  action,
                  fromToken,
                  fromTokenName,
                  toToken,
                  toTokenName,
                  priceDesc,
                  onExchange,
                  disabled = false,
                  disabledDescription,
              }) => {

    const catchError = useCatchError();
    const {contracts: {Treasury},} = useTombFinance();
    const [approveStatus, approve] = useApprove(fromToken, Treasury.address);
    const balance = useTokenBalance(fromToken);
    const dispatch = useDispatch();
    const [isModalOpen, setModalOpen] = useState(false);

    return (
        <div className={classNames('gradient-background', styles.block)}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <h6 className={styles.title}>{`${action} ${toTokenName}`}</h6>
                </div>
                <div className={styles.center}>
                    <div className={styles.item}>
                        <div>
                            <div className={styles.picture}>
                                {
                                    imgFrom &&
                                    <img
                                        src={imgFrom}
                                        alt={''}
                                        loading={'lazy'}
                                    />
                                }
                            </div>
                            <p className={styles.subtitle}>{fromTokenName}</p>
                        </div>
                        <div className={styles.icon}>
                            <svg width="31" height="16" viewBox="0 0 31 16" fill="none"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M30.7071 8.70711C31.0976 8.31658 31.0976 7.68342 30.7071 7.29289L24.3431 0.928932C23.9526 0.538408 23.3195 0.538408 22.9289 0.928932C22.5384 1.31946 22.5384 1.95262 22.9289 2.34315L28.5858 8L22.9289 13.6569C22.5384 14.0474 22.5384 14.6805 22.9289 15.0711C23.3195 15.4616 23.9526 15.4616 24.3431 15.0711L30.7071 8.70711ZM0 9H30V7H0V9Z"/>
                            </svg>
                        </div>
                        <div>
                            <div className={styles.picture}>
                                {
                                    imgTo &&
                                    <img
                                        src={imgTo}
                                        alt={''}
                                        loading={'lazy'}
                                    />
                                }
                            </div>
                            <p className={styles.subtitle}>{toTokenName}</p>
                        </div>
                    </div>
                    <p className={styles.label}>{priceDesc}</p>
                </div>
                <div className={styles.bottom}>
                    <div className={styles.button}>
                        {approveStatus !== ApprovalState.APPROVED && !disabled ? (
                            <Button
                                type={'button'}
                                placeholder={`Approve ${fromTokenName}`}
                                classname={'primary'}
                                disabled={approveStatus === ApprovalState.PENDING || approveStatus === ApprovalState.UNKNOWN}
                                action={() => catchError(approve(), `Unable to approve ${fromTokenName}`)}
                            />
                        ) : (
                            <Button
                                type={'button'}
                                disabled={disabled}
                                placeholder={disabledDescription || action}
                                classname={'primary'}
                                action={() => setModalOpen(true)}
                            />
                        )}
                    </div>
                </div>
            </div>
            <BonsModal
                title={action}
                description={priceDesc}
                max={balance}
                onConfirm={(value) => {
                    onExchange(value);
                }}
                action={action}
                handleClose={() => setModalOpen(false)}
                tokenName={fromTokenName}
                open={isModalOpen}
            />
        </div>
    );
}

export default Card;
