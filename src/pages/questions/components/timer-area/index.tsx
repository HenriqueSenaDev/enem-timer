import { QuestionTimeManager } from '../../../../jobs/question-time-manager';
import { IQuestionTimerState } from '../../../../types/timer';
import { useRefState } from '../../../../hooks/useRefState';
import { useEffect, useRef } from 'react';
import TimeTable from './components/timetable';
import Button from '../../../../components/button';
import Timer from './components/timer';

interface IProps {
  milisPerQuestion: number;
  isTimeModalOpen: boolean;
  questionsQuantity: number | undefined;
  isInfinity: boolean;
}

function TimerArea({
  milisPerQuestion,
  isTimeModalOpen,
  questionsQuantity,
  isInfinity
}: IProps) {
  // custom useRefState
  // handle dom event listeners and ui react
  const [isTimeHidden, setIsTimeHidden, isTimeHiddenRef] =
    useRefState<boolean>(false);

  const [timerState, setTimerState, timerStateRef] =
    useRefState<IQuestionTimerState>({
      isRunning: false,
      isPaused: false,
      currentMilis: 0,
      overallMilis: 0,
      questions: [],
      milisPerQuestion,
    });

  // refs
  const isTimeModalOpenRef = useRef<boolean>(isTimeModalOpen);
  const questionsQuantityRef = useRef<number | undefined>(questionsQuantity);

  const timerManager = useRef<QuestionTimeManager>(
    new QuestionTimeManager(setTimerState, timerStateRef)
  );

  function handleStart() {
    if (isTimeModalOpenRef.current) return;
    if (!questionsQuantity && !isInfinity) return;
    timerManager.current.startTimer();
  }

  function handleNextQuestion() {
    if (isTimeModalOpenRef.current) return;

    if (questionsQuantityRef.current
      && timerState.questions.length + 1 === questionsQuantityRef.current)
      return timerManager.current.finishTimer();

    timerManager.current.insertQuestion();
  }

  function handleFinish() {
    if (questionsQuantityRef.current
      && timerState.questions.length + 1 < questionsQuantityRef.current) {
      if (!confirm('Você ainda tem questões para fazer. Confirmar?')) return;
    }

    timerManager.current.finishTimer();
    setIsTimeHidden(false)
  }

  function handleReset() {
    timerManager.current.resetQuestion();
  }

  function handleTogglePause() {
    timerManager.current.togglePause();
  }

  function toggleTimeVisibility() {
    if (isTimeModalOpenRef.current) return;
    setIsTimeHidden(!isTimeHiddenRef.current);
  }

  // update ref by props change in question option modal
  useEffect(() => {
    setTimerState({
      ...timerState,
      milisPerQuestion,
    });

    isTimeModalOpenRef.current = isTimeModalOpen;
    questionsQuantityRef.current = questionsQuantity;
  }, [milisPerQuestion, questionsQuantity, isTimeModalOpen]);

  // keyboard shortcuts listener
  useEffect(() => {
    function execKeyboardShortcut(evt: KeyboardEvent) {
      switch (evt.key) {
        case 'Enter': {
          if (!timerStateRef.current.isRunning) return handleStart();
          else return handleFinish();
        }
        case 'r': return handleReset();
        case ' ': return handleNextQuestion();
        case 't': return toggleTimeVisibility();
      }
    }

    window.addEventListener('keypress', execKeyboardShortcut);

    return () => window
      .removeEventListener('keypress', execKeyboardShortcut);
  });

  // timer interval
  useEffect(() => {
    const intervalId = setInterval(() => {
      if (timerState.isRunning && !timerState.isPaused) {
        timerManager.current!.incrementTime(10);
      }
    }, 10);

    return () => clearInterval(intervalId);
  }, [timerState.isRunning, timerState.isPaused]);

  return (
    <div className='flex flex-col items-center justify-between px-5 pt-[38px] flex-1 relative w-full max-w-[300px] lg:justify-center lg:p-0 lg:max-h-[400px] lg:my-auto lg:max-w-[800px]'>
      <Timer
        currentMilis={timerState.currentMilis}
        overaalMilis={timerState.overallMilis}
        isPaused={timerState.isPaused}
        setIsPaused={handleTogglePause}
        isTimeHidden={isTimeHidden}
      />

      <TimeTable
        questionsTime={timerState.questions}
        isTimeHidden={isTimeHidden}
      />

      <div className='w-full flex items-center justify-center lg:absolute lg:bottom-0 lg:left-0 lg:max-w-[372px] lg:h-[150px]'>
        {timerState.isRunning ? (
          <div className='w-full flex flex-col items-center gap-[26px] lg:max-w-[320px]'>
            <div className='w-full flex items-center justify-center gap-6'>
              <Button
                text='Resetar questão'
                shortcut='R'
                onClick={handleReset}
              />

              <Button
                text='Próxima questão'
                shortcut='Space Bar'
                onClick={handleNextQuestion}
              />
            </div>

            <div className='w-full flex items-center justify-center gap-6'>
              <Button
                text={`${isTimeHidden ? 'Revelar' : 'Esconder'} tempo`}
                shortcut='T'
                onClick={toggleTimeVisibility}
              />

              <Button
                text='Finalizar'
                style={{ backgroundColor: '#120080' }}
                shortcut='Enter'
                onClick={handleFinish}
              />
            </div>
          </div>
        ) : (
          <Button
            text='Iniciar'
            style={{ backgroundColor: '#120080' }}
            shortcut='Enter'
            onClick={handleStart}
          />
        )}
      </div>
    </div>
  );
}

export default TimerArea;
