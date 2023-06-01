import React, { useEffect, useMemo, useReducer, useRef, useState } from 'react';
import "./StopWatch.css";

function StopWatch() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);


    function formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const sec = seconds % 60;

        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(sec).padStart(2, '0');

        return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
    }


    const intervalRef = useRef(null);
    const startTimer = () => {
        if (!isRunning) {
            intervalRef.current = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
            setIsRunning(true);
        }
    }

    const stopTimer = () => {
        setIsRunning(false);
        clearInterval(intervalRef.current);
    }

    const resetTimer = () => {
        setTime(0);
        if (isRunning) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
        }
    }

    
    
    return (
        <div className='container'>
            <div className='stopwatch'>
                <p>{formatTime(time)}</p>
            </div>
            <div className='controls'>
                {isRunning ? (
                    <button onClick={stopTimer} className='btn'>
                        Stop
                    </button>
                ) : (
                    <button onClick={startTimer} className='btn'>
                        Start
                    </button>
                )}
                <button className='btn' onClick={resetTimer}>
                    Reset
                </button>
            </div>
        </div>
    )
}

export default StopWatch
