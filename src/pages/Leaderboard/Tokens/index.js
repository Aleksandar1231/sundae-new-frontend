import React from "react";
import classes from "classnames";

import styles from './index.module.scss';

import Card from "./Card";

import Tooltip from "../../../components/Tooltip";
import Info from "../../../components/Info";
import useBanks from "../../../hooks/useBanks";


const toltip = [
    "A liquidity pair formed with 50% of the peg-token and 50% of the target-token. Investing in this pool provides liquidity for the peg-token while rewarding the share token as emissions. It can also create a positive price impact on the peg-token.",
    "A liquidity pair formed with 50% of the share-token and 50% of the target-token. Investing in this pool provides liquidity for the share-token while rewarding the share token as emissions. It also can create a positive price impact on the share-token.",
    "An old liquidity pair formed with 50% of the share-token and 50% of AVAX. Investing in this pool provides liquidity for the share-token while rewarding the share token as emissions. It also can create a positive price impact on the share-token.",
    "Pool 3 is a liquidity pair consisting 50% of the peg-token $CREAM and 50% of the share-token $CSHARE. This creates positive price impact for both tokens. It can be beneficial in the circumstances where the investor does not want to pair more of the target token $AVAX."
]


const Tokens = () => {
    const [banks] = useBanks();
    const activeBanks = banks.filter((bank) => !bank.finished);


    return (
        <section className={classes("section", styles.section)}>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <div className={classes("row", styles.row)}>
                        <div className={classes("col", "col-12", "col-padding-vertical", styles.col)}>
                            <Info
                                text={'Please review any and all documentation before investing'}/>
                        </div>
                        {activeBanks
                            .filter((bank) => bank.sectionInUI === 2)
                            .map((bank, index) => (
                                <div key={bank.name}
                                     className={classes("col", "col-12", "col-md-6", "col-xl-4", "col-padding-vertical", styles.col)}>
                                    <div className={styles.tooltip}>
                                        <Tooltip
                                            text={toltip[index]}
                                        />
                                    </div>
                                    <Card bank={bank} src={'/img/icon/home_fudge.png'} title={bank.depositTokenName}/>
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Tokens;
