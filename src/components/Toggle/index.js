import React from "react";
import {useDispatch, useSelector} from "react-redux";

import {setModeData} from "../../state/appReducer/actions/modeActions";

import classes from "classnames";

import Icon from "../Icon";

import styles from './index.module.scss';

const Toggle = () => {
    const dispatch = useDispatch();

    const {mode} = useSelector(state => state.rootReducer.modeReducer)

    const handleClick = () => {
        const style = mode === 'dark' ? 'light' : 'dark'

        localStorage.setItem('mode', style);
        dispatch(setModeData(style))

        document.documentElement.setAttribute("data-theme", style);
    }

    return (
        <div className={styles.block}>
            <div className={styles.icon}>
                <Icon name={'mode-night'}/>
            </div>
            <div
                className={classes(styles.item, mode === 'light' && styles.active)}
                onClick={(e) => handleClick()}
            >
                <div className={styles.slide}/>
            </div>
            <div className={styles.icon}>
                <Icon name={'mode-light'}/>
            </div>
        </div>
    );
}

export default Toggle;
