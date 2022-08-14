import React from 'react';
import styled from 'styled-components';
import classNames from "classnames";
import classes from "classnames";
import styles from './index.module.scss';
import Card from '../Card';
import CardContent from '../CardContent';
import Container from '../Container';

export interface ModalProps {
    onDismiss?: () => void;
}

const Modal: React.FC<{ children: React.ReactNode | React.ReactNode[] }> = ({ children }) => {
    return (

        <div className={classNames('gradient-background', styles.block)}>
            <div className={styles.wrapper}>
                {children}
            </div>

        </div>


    );
};

const StyledModal = styled.div`
  border-radius: 12px;
  position: relative;
`;

export default Modal;
