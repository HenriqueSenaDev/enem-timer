import { useState, useEffect } from 'react';
import { milisToFormattedTime } from './utils/timer-utils';
import TimeTable from './components/timetable';
import Button from '../../../../components/button';
import Timer from './components/timer';
import './styles.css';

export interface IQuestionTime {
  current: string;
  overall: string;
}

interface IProps {
  milissecondsPerQuestion: number;
}

function TimerArea({ milissecondsPerQuestion }: IProps) {
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [isTimeHidden, setIsTimeHidden] = useState<boolean>(false);

  const [currentMilis, setCurrentMilis] = useState<number>(0);
  const [overallMilis, setOverallMilis] = useState<number>(0);
  const [questionsTime, setQuestionsTime] = useState<IQuestionTime[]>([]);

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
    const currentRest = milissecondsPerQuestion - currentMilis;
    let current = milisToFormattedTime(currentRest);

    const overallRest = (milissecondsPerQuestion * (questionsTime.length + 1)) - overallMilis;
    let overall = milisToFormattedTime(overallRest);

    setQuestionsTime([...questionsTime, { current, overall }]);
    setCurrentMilis(0);
  }

  function toogleTime() {
    setIsTimeHidden(!isTimeHidden);
  }

  // timer interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (isRunning && !isPaused) {
        setCurrentMilis((prevState) => prevState + 10);
        setOverallMilis((prevState) => prevState + 10);
      }
    }, 10);

    return () => clearInterval(intervalId);
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
                style={{ backgroundColor: '#120080' }}
                shortcut='Enter'
                onClick={finishTimer}
              />
            </div>
          </div>
        ) : (
          <Button
            text='Iniciar'
            style={{ backgroundColor: '#120080' }}
            shortcut='Enter'
            onClick={startTimer}
          />
        )}
      </div>
    </div>
  );
}

export default TimerArea;
