import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

import classes from 'classnames';

import styles from './index.module.scss';

const Menu = ({ active, setActive }) => {
    const theme = useTheme();
    const [isVisible, setIsVisible] = useState(false);
    const toggle = () => { setIsVisible(!isVisible) }
    const matches = useMediaQuery(theme.breakpoints.down('lg'));

    return (
        <ul
            className={classes(
                styles.block,
                active && styles.active
            )}
        >
            <li className={styles.item}>
                <NavLink
                    activeclassname={styles.active}
                    className={styles.link}
                    to="/"
                    exact="true"
                    onClick={() => setActive(false)}
                >
                    Home
                </NavLink>
            </li>
            <li className={styles.item}>
                <NavLink
                    activeclassname={styles.active}
                    className={styles.link}
                    to="/farm"
                    onClick={() => setActive(false)}
                >
                    Farm
                </NavLink>
            </li>
            <li className={styles.item}>
                <NavLink
                    activeclassname={styles.active}
                    className={styles.link}
                    to="/boardrooms"
                    onClick={() => setActive(false)}
                >
                    Boardroom
                </NavLink>
            </li>
            <li className={styles.item}>
                <NavLink
                    activeclassname={styles.active}
                    className={styles.link}
                    to="/nodes/FudgeNode"
                    onClick={() => setActive(false)}
                >
                    Nodes
                </NavLink>
            </li>
            <li className={styles.item}>
                <NavLink
                    activeclassname={styles.active}
                    className={styles.link}
                    to="/bonds"
                    onClick={() => setActive(false)}
                >
                    Bonds
                </NavLink>
            </li>
            {matches ? (
                <>
                    <li className={styles.item}>
                        <NavLink
                            activeclassname={styles.active}
                            className={styles.link}
                            to="/lastmanstanding"
                            onClick={() => {
                                setActive(false);
                                toggle();
                            }}
                        >
                            LMS
                        </NavLink>
                    </li>
                    <li className={styles.item}>
                        <NavLink
                            activeclassname={styles.active}
                            className={styles.link}
                            to="/leaderboard"
                            onClick={() => {
                                setActive(false);
                                toggle();
                            }}
                        >
                            Leaderboard
                        </NavLink>
                    </li>
                    <li className={classes(styles.item, styles.last)}>
                        <a
                            href={"https://froyo.farm/#/avax"}
                            className={styles.link}
                            target={"_blank"}
                            rel={"noreferrer"}
                        >
                            Vault
                        </a>
                    </li>
                </>
            ) :
                (<li className={styles.item}>
                    {!isVisible ?
                        <a className={classes(
                            styles.link, active && styles.active
                        )} onClick={toggle}>More</a>
                        : (
                            <>
                                <a className={classes(
                                    styles.link, active && styles.active
                                )} onClick={toggle}>More</a>

                                <ul
                                    className={classes(
                                        styles.dropdownblock,
                                        active && styles.active
                                    )}
                                >
                                    <li className={styles.item}>
                                        <NavLink
                                            activeclassname={styles.active}
                                            className={styles.link}
                                            to="/lastmanstanding"
                                            onClick={() => {
                                                setActive(false);
                                                toggle();
                                            }}
                                        >
                                            LMS
                                        </NavLink>
                                    </li>
                                    <li className={styles.item}>
                                        <NavLink
                                            activeclassname={styles.active}
                                            className={styles.link}
                                            to="/leaderboard"
                                            onClick={() => {
                                                setActive(false);
                                                toggle();
                                            }}
                                        >
                                            Leaderboard
                                        </NavLink>
                                    </li>
                                    <li className={classes(styles.item, styles.last)}>
                                        <a
                                            href={"https://froyo.farm/#/avax"}
                                            className={styles.link}
                                            target={"_blank"}
                                            rel={"noreferrer"}
                                        >
                                            Vault
                                        </a>
                                    </li>

                                </ul>
                            </>
                        )}
                </li>
                )}

            {/* <li className={styles.item}>
                <NavLink
                    activeClassName={styles.active}
                    className={styles.link}
                    to="https://froyo.farm/#/avax"
                    onClick={() => setActive(false)}
                >
                    Vault
                </NavLink>
            </li> */}

            <div className={styles.pictures}>
                <div className={styles.picture}>
                    <img
                        src={'/img/icecream-4.png'}
                        alt={"Ice Cream 1"}
                        loading={"lazy"}
                    />
                </div>
                <div className={styles.picture}>
                    <img
                        src={'/img/icecream-6.png'}
                        alt={"Ice Cream 2"}
                        loading={"lazy"}
                    />
                </div>
            </div>
        </ul>
    );
}

export default Menu;
