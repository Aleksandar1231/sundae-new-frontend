import React from 'react';

import Button from "../Button";
import styles from './index.module.scss';
import classNames from "classnames";
import {useSelector} from "react-redux";
import {Input} from "@material-ui/core";

const TokenInput = ({max, symbol, onChange, onSelectMax, value}) => {

    const {mode} = useSelector(state => state.rootReducer.modeReducer)

    return (
        <>
            <div className={classNames(styles.input)}>
                    <input
                        value={value}
                        onChange={onChange}
                        placeholder={'Enter value'}
                        className={classNames(styles.input_item, styles[mode])}
                    />
                <Button
                    type={'button'}
                    placeholder={'Max'}
                    classname={'primary'}
                    action={onSelectMax}
                    disabled={null}
                />
            </div>
            <div className={classNames(styles.desc)}>{max.toLocaleString()} {symbol} Available</div>
        </>
    )
        ;
};

export default TokenInput;
