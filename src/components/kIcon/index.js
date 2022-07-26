import React from "react";

import Icons from "./icon.svg";

const Info = ({name}) => {
    return (
        <svg width="45" height="45" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <use xlinkHref={`${Icons}#icon-${name}`}/>
        </svg>
    );
}

export default Info;
