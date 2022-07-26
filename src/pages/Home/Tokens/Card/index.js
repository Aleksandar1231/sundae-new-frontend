import React from "react";
import classNames from "classnames";

import styles from './index.module.scss';

import Button from "../../../../components/Button";
import {Link} from "react-router-dom";



const Card = ({
                  url,
                  title,
                  currentPrice,
                  marketCap,
                  circulatingSupply,
                  totalSupply,
                  purchaseUrl,
                  chartUrl,
              }) => {
    return (
        <div className={classNames('gradient-background', styles.block)}>
            <div className={styles.wrapper}>
                <div className={styles.top}>
                    <div className={styles.left}>
                        <div className={styles.picture}>
                            {
                                url &&
                                <img
                                    src={url}
                                    alt={title}
                                    loading={'lazy'}
                                />
                            }
                        </div>
                        <h6>{title}</h6>
                    </div>
                    <div className={styles.right}>
                        <p className={classNames(styles.label, styles.uppercase)}>Current Price</p>
                        <h3 className={styles.price}>${currentPrice}</h3>
                    </div>
                </div>
                <div className={styles.center}>
                    <div className={styles.item}>
                        <p className={styles.label}>Market Cap</p>
                        <p className={styles.value}>${marketCap}</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.label}>Circulating Supply</p>
                        <p className={styles.value}>{circulatingSupply}</p>
                    </div>
                    <div className={styles.item}>
                        <p className={styles.label}>Total Supply</p>
                        <p className={styles.value}>{totalSupply}</p>
                    </div>
                </div>
                <div className={styles.bottom}>
                  <div className={classNames(styles.button1)}>
                     <Button
                       type={'link'}
                       placeholder={'Purchase'}
                       classname={'primary'}
                       action={purchaseUrl}
                     />
                   </div>

                    <div className={styles.button}>
                      {chartUrl &&
                        <Button
                            type={'link'}
                            placeholder={'View Chart'}
                            classname={'alt'}
                            action={chartUrl}
                        />}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Card;
