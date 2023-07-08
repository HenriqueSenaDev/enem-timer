import { useState, useEffect } from 'react';
import pauseIcon from '../../../../assets/pause.svg';
import './styles.css';

interface IProps {
  secondsPerQuestion: number | null;
  isRunning: boolean;
}

function Timer({ secondsPerQuestion, isRunning }: IProps) {
  const [currentMilis, setCurrentMilis] = useState<number>(0);
  const [overallMilis, setOverallMilis] = useState<number>(0);

  // timer interval
  useEffect(() => {
    let intervalId: number | null = null;
    if (isRunning) {
      intervalId = setInterval(() => {
        setCurrentMilis(currentMilis + 1);
        setOverallMilis(overallMilis + 1);
        console.log('interval working');
      }, 1000);
    }
    else if (intervalId && !isRunning) {
      clearInterval(intervalId as number);
    }

    return () => clearInterval(intervalId as number);
  }, [isRunning]);

  return (
    <div className='timer-container'>
      <h1 className='current-time'>
        00:00:00
      </h1>

      <h2 className='overall-time'>
        00:00:00
      </h2>

      <img src={pauseIcon} alt='pause timer image' />
    </div>
  );
}

export default Timer;
