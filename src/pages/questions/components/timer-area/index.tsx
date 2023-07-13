import { useState, useEffect } from 'react';
import { milisToFormattedTime } from './utils/timer-utils';
import TimeTable from '../timetable';
import Button from '../../../../components/button';
import Timer from './components/timer';
import './styles.css';

interface IProps {
  milissecondsPerQuestion: number | null;
}

interface IQuestionTime {
  current: string;
  overall: string;
}

function TimerArea({ milissecondsPerQuestion }: IProps) {
  const [currentMilis, setCurrentMilis] = useState<number>(0);
  const [overallMilis, setOverallMilis] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [questionsTime, setQuestionsTime] = useState<IQuestionTime[]>([]);

  function startTimer() {
    setIsRunning(true);
  }

  function finishTimer() {
    setIsRunning(false);
    setIsPaused(false);
    setCurrentMilis(0);
    setOverallMilis(0);
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
        isRunning={isRunning}
      />

      <TimeTable questionsTime={questionsTime} />

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
                text='Esconder tabela'
                shortcut='T'
                onClick={() => { }}
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
