import React, { useMemo, useEffect, useRef, useState } from "react";
import classes from "classnames";

import styles from './index.module.scss';
import { BtnType, DynamicObject, Size, Symbol } from '../types';
import Card from "./Card";
import fudge from '../../../assets/img/fudge.png';
import straw from '../../../assets/img/straw.png';
import Tooltip from "../../../components/Tooltip";
import Info from "../../../components/Info";
import useBanks from "../../../hooks/useBanks";

const pots = [
    // {
    //   symbol: Symbol.USDC,
    //   earning: true,
    //   icon: usdc,
    //   iconWidth: 72,
    //   iconHeight: 72,
    //   iconSm: usdc_sm,
    //   iconSmWidth: 35,
    //   iconSmHeight: 35,
    //   border: 'border-usdc',
    //   shadow: 'shadow-[0_8px_14px_rgba(42,120,205,0.04)] hover:shadow-[0_10px_25px_rgba(42,120,205,0.2)]',
    //   text: 'text-usdc',
    //   fill: 'fill-usdc',
    //   bg: '#6ca4dc',
    //   bgLight: 'bg-[#f0f5fb]',
    //   color: 'usdc',
    // },
    // {
    //   symbol: Symbol.AVAX,
    //   icon: avax,
    //   iconWidth: 72,
    //   iconHeight: 72,
    //   iconSm: avax_sm,
    //   iconSmWidth: 35,
    //   iconSmHeight: 35,
    //   border: 'border-avax',
    //   shadow: 'shadow-[0_8px_14px_rgba(236,69,69,0.04)] hover:shadow-[0_10px_25px_rgba(236,69,69,0.2)]',
    //   text: 'text-avax',
    //   fill: 'fill-avax',
    //   bg: '#ee868c',
    //   bgLight: 'bg-[#fbe6e8]',
    //   color: 'avax',
    // },
    // {
    //   symbol: Symbol.GRAPE,
    //   icon: grape,
    //   iconWidth: 71,
    //   iconHeight: 72,
    //   iconSm: grape_sm,
    //   iconSmWidth: 35,
    //   iconSmHeight: 35,
    //   border: 'border-grape',
    //   shadow: 'shadow-[0_8px_14px_rgba(130,9,108,0.04)] hover:shadow-[0_10px_25px_rgba(130,9,108,0.2)]',
    //   text: 'text-grape',
    //   fill: 'fill-grape',
    //   bg: '#82096c',
    //   bgLight: 'bg-[#e6cde1]',
    //   color: 'grape',
    // },
    {
        symbol: Symbol.FUDGE,
        icon: fudge,
        iconWidth: 71,
        iconHeight: 72,
        iconSm: fudge,
        iconSmWidth: 35,
        iconSmHeight: 35,
        border: 'border-grape',
        shadow: 'shadow-[0_8px_14px_rgba(130,9,108,0.04)] hover:shadow-[0_10px_25px_rgba(130,9,108,0.2)]',
        text: 'text-grape',
        fill: 'fill-grape',
        bg: '#82096c',
        bgLight: 'bg-[#e6cde1]',
        color: 'grape',
    },
    {
        symbol: Symbol.STRAW,
        icon: straw,
        iconWidth: 71,
        iconHeight: 72,
        iconSm: straw,
        iconSmWidth: 35,
        iconSmHeight: 35,
        border: 'border-grape',
        shadow: 'shadow-[0_8px_14px_rgba(130,9,108,0.04)] hover:shadow-[0_10px_25px_rgba(130,9,108,0.2)]',
        text: 'text-grape',
        fill: 'fill-grape',
        bg: '#82096c',
        bgLight: 'bg-[#e6cde1]',
        color: 'grape',
    },
];

const Tokens = () => {
    const [sortedPots, setSortedPots] = useState(pots);


    return (
        <section className={classes("section", styles.section)}>
            <div className={classes("container-fluid", styles.fluid)}>
                <div className={classes("container", styles.container)}>
                    <div className={classes("row", styles.row)}>
                        <div className={classes("col", "col-12", "col-padding-vertical", styles.col)}>
                            <Info
                                text={'Please review any and all documentation before investing'} />
                        </div>
                        {sortedPots
                            .map((pot, index) => (

                                < div key={index.toString()}
                                    className={classes("col", "col-12", "col-md-6", "col-xl-4", "col-padding-vertical", styles.col)}>
                                    
                                    <Card pot={pot} />
                                </div>
                            ))}
                    </div>
                </div>
            </div>
        </section >
    );
}

export default Tokens;
