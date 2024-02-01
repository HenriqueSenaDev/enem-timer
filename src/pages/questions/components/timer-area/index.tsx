import { useEffect, useRef, useState } from 'react';
import { useRefState } from '../../../../hooks/useRefState';
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
  milisPerQuestion: number;
  isTimeModalOpen: boolean;
  questionsQuantity: number;
}

function TimerArea({
  milisPerQuestion,
  isTimeModalOpen,
  questionsQuantity
}: IProps) {
  // refs only
  const milisPerQuestionRef = useRef<number>(milisPerQuestion);
  const isTimeModalOpenRef = useRef<boolean>(isTimeModalOpen);
  const questionsQuantityRef = useRef<number>(questionsQuantity);

  // states only
  const [isPaused, setIsPaused] = useState<boolean>(false);

  // custom useRefState: handle dom event listeners
  const [hasStarted, setHasStarted, hasStartedRef] = useRefState<boolean>(false);
  const [isTimeHidden, setIsTimeHidden, isTimeHiddenRef] = useRefState<boolean>(false);

  const [currentMilis, setCurrentMilis, currentMilisRef] = useRefState<number>(0);
  const [overallMilis, setOverallMilis, overallMilisRef] = useRefState<number>(0);

  const [questionsTime, setQuestionsTime, questionsTimeRef] = useRefState<IQuestionTime[]>([]);

  function startTimer() {
    if (isTimeModalOpenRef.current) return;
    setHasStarted(true);
    setQuestionsTime([]);
  }

  function stopTimer() {
    setHasStarted(false);
    setIsPaused(false);
    setCurrentMilis(0);
    setOverallMilis(0);
    setIsTimeHidden(false);
  }

  function finishTimer() {
    if (!hasStartedRef.current) return;

    if (questionsTimeRef.current.length + 1 < questionsQuantityRef.current)
      if (!confirm('Você ainda tem questões para fazer. Cofirmar?')) return;

    insertQuestion();
    stopTimer();
  }

  function resetQuestion() {
    if (!hasStartedRef.current) return;
    setOverallMilis(overallMilisRef.current - currentMilisRef.current);
    setCurrentMilis(0);
  }

  function insertQuestion() {
    if (!hasStartedRef.current) return;
    const currentRest = milisPerQuestionRef.current - currentMilisRef.current;
    let current = milisToFormattedTime(currentRest);

    const overallRest = (milisPerQuestionRef.current * (questionsTimeRef.current.length + 1)) - overallMilisRef.current;
    let overall = milisToFormattedTime(overallRest);

    setQuestionsTime([...questionsTimeRef.current, { current, overall }]);
    setCurrentMilis(0);

    if (questionsTimeRef.current.length === questionsQuantityRef.current)
      stopTimer();
  }

  function toggleTimeVisibility() {
    setIsTimeHidden(!isTimeHiddenRef.current);
  }

  // update ref by props change in question option modal
  useEffect(() => {
    milisPerQuestionRef.current = milisPerQuestion;
    isTimeModalOpenRef.current = isTimeModalOpen;
    questionsQuantityRef.current = questionsQuantity;
  }, [milisPerQuestion, isTimeModalOpen, questionsQuantity]);

  // keyboard shortcuts listener
  useEffect(() => {
    function execKeyboardShortcut(evt: KeyboardEvent) {
      switch (evt.key) {
        case 'Enter': {
          if (!hasStartedRef.current) return startTimer();
          else return finishTimer();
        }
        case 'r': return resetQuestion();
        case ' ': return insertQuestion();
        case 't': return toggleTimeVisibility();
      }
    }

    window.addEventListener('keypress', execKeyboardShortcut);

    return () => window
      .removeEventListener('keypress', execKeyboardShortcut);
  }, []);

  // timer interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (hasStarted && !isPaused) {
        setCurrentMilis(currentMilisRef.current + 10);
        setOverallMilis(overallMilisRef.current + 10);
      }
    }, 10);

    return () => clearInterval(intervalId);
  }, [hasStarted, isPaused]);

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
        {hasStarted ? (
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
                onClick={insertQuestion}
              />
            </div>

            <div className='options-row'>
              <Button
                text={`${isTimeHidden ? 'Revelar' : 'Esconder'} tempo`}
                shortcut='T'
                onClick={toggleTimeVisibility}
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
