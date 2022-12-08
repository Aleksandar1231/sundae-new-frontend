import React from 'react';
import Countdown from 'react-countdown';


const ProgressCountdown = ({base, deadline, hideBar, description}) => {
    const percentage =
        Date.now() >= deadline.getTime()
            ? 100
            : ((Date.now() - base.getTime()) / (deadline.getTime() - base.getTime())) * 100;

    const countdownRenderer = (countdownProps) => {
        const {days, hours, minutes, seconds} = countdownProps;
        const h = String(days * 24 + hours);
        const m = String(minutes);
        const s = String(seconds);
        return (<>
                {h.padStart(2, '0')}:{m.padStart(2, '0')}:{s.padStart(2, '0')}
            </>
        );
    };
    return (
        <>
            <Countdown key={new Date().getTime()} date={deadline} renderer={countdownRenderer}/>
            {hideBar ? (
                ''
            ) : (
                <div>{percentage}</div>
            )}
        </>
    );
};


export default ProgressCountdown;