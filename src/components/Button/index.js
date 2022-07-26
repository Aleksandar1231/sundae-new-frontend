import React from "react";
import classNames from "classnames";

import {useSelector} from "react-redux";

import styles from './index.module.scss';
import {Link} from "react-router-dom";

const Button = ({
                    action,
                    type,
                    placeholder,
                    classname,
                    disabled
                }) => {
    const {mode} = useSelector(state => state.rootReducer.modeReducer)

    return (
        <>
            {
                type === 'button' &&
                <button
                    type={type}
                    className={!disabled?
                    classNames(styles.button, styles[classname], styles[mode]):
                    classNames(styles.button, styles[classname], styles[mode], styles.disabled)
                }
                    onClick={() => {
                      !disabled && action && action()
                    }}
                >
                    {placeholder}
                </button>
            }
            {
                type === 'link' && action!=='/bonds' &&
                <a
                    className={classNames(styles.button, styles[classname], styles[mode])}
                    href={action}
                    target={'_blank'}
                    rel={"noreferrer"}
                >
                    {placeholder}
                </a>
            }
            {action==='/bonds' && <Link
                className={classNames(styles.button, styles[classname], styles[mode])}
                to={action}>
                Purchase
            </Link>}

        </>
    );
}

export default Button;
