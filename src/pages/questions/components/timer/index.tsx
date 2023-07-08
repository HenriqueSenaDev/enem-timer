import { useState, useEffect } from 'react';
import pauseIcon from '../../../../assets/pause.svg';
import './styles.css';

interface IProps {
  secondsPerQuestion: number | null;
  isRunning: boolean;
  setIsRunning: (conditional: boolean) => void;
  isPaused: boolean;
  setIsPaused: (conditional: boolean) => void;
}

function Timer({ secondsPerQuestion, isRunning, setIsRunning, isPaused, setIsPaused }: IProps) {
  const [currentMilis, setCurrentMilis] = useState<number>(0);
  const [formatedCurrentMilis, setFormatedCurrentMilis] = useState<string>('00:00:00');
  const [overallMilis, setOverallMilis] = useState<number>(0);
  const [formatedOverallMilis, setFormatedOverallMilis] = useState<string>('00:00:00');

  function milisToFormattedTime(milis: number) {
    function doubleDigitTimeCheck(value: number) {
      return value >= 10 ? `${value}` : `0${value}`;
    }

    const minutes = Math.floor(milis / 1000 / 60);
    const seconds = Math.floor((milis - (1000 * 60 * minutes)) / 1000);
    const milisseconds = milis - ((1000 * 60 * minutes) + (1000 * seconds));

    const fomarttedMinutes = doubleDigitTimeCheck(minutes);
    const formattedSeconds = doubleDigitTimeCheck(seconds);
    const formattedMilisseconds = milisseconds != 0 ? milisseconds.toString().substring(0, 2) : '00';


    return `${fomarttedMinutes}:${formattedSeconds}:${formattedMilisseconds}`;
  }

  // timer interval
  useEffect(() => {
    let intervalId: number | null = null;
    if (isRunning && !isPaused) {
      intervalId = setInterval(() => {
        setCurrentMilis((prevState) => prevState + 10);
        setOverallMilis((prevState) => prevState + 10);
        console.log('countdown')
      }, 10);
    }
    else if (intervalId && (!isRunning || isPaused)) {
      clearInterval(intervalId as number);
    }

    return () => clearInterval(intervalId as number);
  }, [isRunning, isPaused]);

  useEffect(() => {
    setFormatedCurrentMilis(milisToFormattedTime(currentMilis));
    setFormatedOverallMilis(milisToFormattedTime(overallMilis));
  }, [currentMilis]);

  return (
    <div className='timer-container'>
      <h1 className='current-time'>
        {formatedCurrentMilis}
      </h1>

      <h2 className='overall-time'>
        {formatedOverallMilis}
      </h2>

      <img
        src={pauseIcon}
        alt='pause timer image'
        onClick={() => setIsPaused(!isPaused)}
      />
    </div>
  );
}

export default Timer;
