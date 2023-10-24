import { useState, useEffect, useContext } from 'react';
import { TimerContext } from '../../../../contexts/timer';
import { milisToFormattedTime } from './utils/timer-utils';
import TimeTable from './components/timetable';
import Button from '../../../../components/button';
import Timer from './components/timer';
import './styles.css';

interface IQuestionTime {
  current: string;
  overall: string;
}

function TimerArea() {
  const [currentMilis, setCurrentMilis] = useState<number>(0);
  const [overallMilis, setOverallMilis] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isTimeHidden, setIsTimeHidden] = useState<boolean>(false);
  const [questionsTime, setQuestionsTime] = useState<IQuestionTime[]>([]);

  const { milissecondsPerQuestion } = useContext(TimerContext);

  function startTimer() {
    setIsRunning(true);
    setQuestionsTime([]);
  }

  function finishTimer() {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentMilis(0);
    setOverallMilis(0);
    setIsTimeHidden(false);
  }

  function resetQuestion() {
    setOverallMilis(overallMilis - currentMilis);
    setCurrentMilis(0);
  }

  function nextQuestion() {
    const currentRest = milissecondsPerQuestion as number - currentMilis;
    const isCurrentRestPositive = currentRest > 0;
    let current = `${isCurrentRestPositive ? '+' : '-'}${milisToFormattedTime(currentRest)}`;

    const overallRest = (milissecondsPerQuestion as number * (questionsTime.length + 1)) - overallMilis;
    const isOverallRestPositive = overallRest > 0;
    let overall = `${isOverallRestPositive ? '+' : '-'}${milisToFormattedTime(overallRest)}`;

    setQuestionsTime([...questionsTime, { current, overall }]);
    setCurrentMilis(0);
  }

  function toogleTime() {
    setIsTimeHidden(!isTimeHidden);
  }

  // timer interval
  useEffect(() => {
    let intervalId: number | null = null;
    if (isRunning && !isPaused) {
      intervalId = setInterval(() => {
        setCurrentMilis((prevState) => prevState + 10);
        setOverallMilis((prevState) => prevState + 10);
      }, 10);
    }
    else if (intervalId && (!isRunning || isPaused)) {
      clearInterval(intervalId as number);
    }

    return () => clearInterval(intervalId as number);
  }, [isRunning, isPaused]);

  return (
    <div className='timer-area'>
      <Timer
        currentMilis={currentMilis}
        overaalMilis={overallMilis}
        isPaused={isPaused}
        setIsPaused={setIsPaused}
        isTimeHidden={isTimeHidden}
      />

      <TimeTable
        questionsTime={questionsTime}
        isTimeHidden={isTimeHidden}
      />

      <div className='timer-buttons'>
        {isRunning ? (
          <div className='timer-options-area'>
            <div className='options-row'>
              <Button
                text='Resetar questão'
                shortcut='R'
                onClick={resetQuestion}
              />

              <Button
                text='Próxima questão'
                shortcut='Space Bar'
                onClick={nextQuestion}
              />
            </div>

            <div className='options-row'>
              <Button
                text={`${isTimeHidden ? 'Revelar' : 'Esconder'} tempo`}
                shortcut='T'
                onClick={toogleTime}
              />

              <Button
                text='Finalizar'
                primary
                shortcut='Enter'
                onClick={finishTimer}
              />
            </div>
          </div>
        ) : (
          <Button text='Iniciar'
            primary
            shortcut='Enter'
            onClick={startTimer}
          />
        )}
      </div>
    </div>
  );
}

export default TimerArea;
