import React from 'react';
import {useWallet} from 'use-wallet';
import useModal from '../../hooks/useModal';
import AccountModal from './AccountModal';
import CustomAccountModal from '../AccountModal'
import Button from "../Button";
import {setAccountModalData, setModalData} from "../../state/appReducer/actions/modalActions";
import {useDispatch, useSelector} from "react-redux";
import styles from './index.module.scss';

const AccountButton = ({text}) => {
    const dispatch = useDispatch();
    const {account} = useWallet();
    const {modal, accountModal} = useSelector(state => state.rootReducer.modalReducer)


    const [onPresentAccountModal] = useModal(<AccountModal/>);

    const buttonText = text ? text : 'Unlock';


    return (
        <div className={styles.button}>
            {!account ? (
                <Button
                    action={() => {
                        dispatch(setModalData(!modal))
                    }}
                    type={'button'}
                    placeholder={buttonText}
                    classname={'additional'}
                />
            ) : (
                <>
                    <Button
                        action={() => {
                            dispatch(setAccountModalData(true))
                        }}
                        type={'button'}
                        placeholder={'My Wallet'}
                        classname={'additional'}
                    />
                    <CustomAccountModal/>
                </>
            )}

        </div>
    );
};

export default AccountButton;
