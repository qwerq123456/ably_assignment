import {
    SetStateAction, Dispatch, useState, useEffect
} from 'react';

const REMAIN_TIME_TEXT = '남은시간';

interface RemainTimeCounterProps {
    remainSecond: number
    setIsTimeOut: Dispatch<SetStateAction<boolean>>;
}
export const RemainTimeCounter = ({ remainSecond, setIsTimeOut }: RemainTimeCounterProps) => {
    const [minutes, setMinutes] = useState(Math.floor(remainSecond / 60));
    const [seconds, setSeconds] = useState(remainSecond % 60);
    useEffect(() => {
        const countdown = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(countdown);
                    setIsTimeOut(true);
                } else {
                    setMinutes(minutes - 1);
                    setSeconds(59);
                }
            }
        }, 1000);
        return () => {
            clearInterval(countdown);
        };
    }, [minutes, seconds]);
    return (
        <div>
            <div>{ REMAIN_TIME_TEXT }</div>
            <div>{ minutes < 10 ? `0${minutes}` : minutes } : { seconds < 10 ? `0${seconds}` : seconds }</div>
        </div>
    );
};
