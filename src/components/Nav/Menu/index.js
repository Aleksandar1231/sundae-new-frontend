import React from "react";
import {NavLink} from "react-router-dom";

import classes from 'classnames';

import styles from './index.module.scss';

const Menu = ({active, setActive}) => {

    return (
        <ul
            className={classes(
                styles.block,
                active && styles.active
            )}
        >
            <li className={styles.item}>
                <NavLink
                    activeClassName={styles.active}
                    className={styles.link}
                    to="/"
                    exact={true}
                    onClick={() => setActive(false)}
                >
                    Home
                </NavLink>
            </li>
            <li className={styles.item}>
                <NavLink
                    activeClassName={styles.active}
                    className={styles.link}
                    to="/farm"
                    onClick={() => setActive(false)}
                >
                    Farm
                </NavLink>
            </li>
            <li className={styles.item}>
                <NavLink
                    activeClassName={styles.active}
                    className={styles.link}
                    to="/boardrooms"
                    onClick={() => setActive(false)}
                >
                    Boardroom
                </NavLink>
            </li>
            <li className={classes(styles.item, styles.last)}>
                <NavLink
                    activeClassName={styles.active}
                    className={styles.link}
                    to="/bonds"
                    onClick={() => setActive(false)}
                >
                    Bonds
                </NavLink>
            </li>
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
