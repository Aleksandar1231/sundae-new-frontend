import React, {useEffect, useState} from "react";

import classes from 'classnames';

import Menu from "./Menu";
import Logo from "../../components/Logo";

import styles from './index.module.scss';
import AccountButton from "./AccountButton";

const Nav = () => {

    const [active, setActive] = useState(false)
    const [sticky, setSticky] = useState('relative');

    useEffect(() => {
        window.addEventListener('scroll', stickNavbar);

        return () => {
            window.removeEventListener('scroll', stickNavbar);
        };
    }, []);

    const stickNavbar = () => {
        if (window !== undefined) {
            let windowHeight = window.scrollY;
            windowHeight > 20 ? setSticky('fixed') : setSticky('relative');
        }
    };

    return (
        <nav className={classes(styles.block, styles[sticky])}>
            <div className="container-fluid">
                <div className="container">
                    <div className={styles.wrapper}>
                        <div className={styles.cell}>
                            <div
                                className={classes(styles.toggle, active && styles.active)}
                                onClick={() => setActive(!active)}
                            >
                                <div/>
                                <div/>
                                <div/>
                            </div>
                        </div>
                        <div className={styles.cell}>
                            <Logo/>
                        </div>
                        <div className={styles.cell}>
                            <Menu
                                active={active}
                                setActive={setActive}
                            />
                        </div>
                        <div className={styles.cell}>
                            <AccountButton text="Connect"/>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Nav;
