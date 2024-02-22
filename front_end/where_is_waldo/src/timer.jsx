import React, { useState, useEffect } from 'react';
import { useStopwatch } from 'react-timer-hook';

const formatTime = (time) => {
  if (!time) return '';

  const { days, hours, minutes, seconds } = time;
  return `${days} days, ${hours} hours, ${minutes} minutes, ${seconds} seconds`;
};


function MyStopwatch() {
  const {
    totalSeconds,
    seconds,
    minutes,
    hours,
    days,
    isRunning,
    start,
    pause,
    reset,
  } = useStopwatch({ autoStart: true });


  return (
    <div style={{textAlign: 'center'}}>
    
      <div style={{fontSize: '50px'}}>
        <span>{days}</span>:<span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
      </div>
      <p>{isRunning ? 'Running' : 'Not running'}</p>
      <button onClick={start}>Start</button>
      <button onClick={pause}>Pause</button>
      <button onClick={reset}>Reset</button>
    </div>
  );
}

export default MyStopwatch;

