import { useEffect, useRef } from "react";
import { useRefState } from "../../../../hooks/useRefState";
import { IEssayTimerState } from "../../../../types/essay";
import { EssayTimeManager } from "../../../../jobs/essay-time-manager";
import { formatEssayMillis } from "../../../../utils/formatters/essay";
import { extractTimeUnits } from "../../../../utils/formatters/common";
import { doubleDigitCheck } from "../../../../utils/masks/common";
import { ReactComponent as HideTimeVector } from '../../../../assets/hide-time.svg';
import pauseIcon from '../../../../assets/pause.svg';
import Button from "../../../../components/button";

interface IProps {
  duration: number;
}

function EssayTimerArea({ duration }: IProps) {
  // custom useRefState
  // handle dom event listeners and ui react
  const [isTimeHidden, setIsTimeHidden, isTimeHiddenRef] =
    useRefState<boolean>(false);

  const [timerState, setTimerState, timerStateRef] =
    useRefState<IEssayTimerState>({
      currentMilis: 0,
      duration,
      isPaused: false,
      isRunning: false,
    });

  const timerManager = useRef<EssayTimeManager>(
    new EssayTimeManager(setTimerState, timerStateRef)
  );

  function handleStart() {
    if (!duration) return;

    if (timerStateRef.current.currentMilis != 0)
      timerManager.current.resetTimer();

    timerManager.current.startTimer();
  }

  function handleTogglePause() {
    timerManager.current.togglePause();
  }

  function handleReset() {
    timerManager.current.resetTimer();
  }

  function toggleTimeVisibility() {
    setIsTimeHidden(!isTimeHiddenRef.current);
  }

  function handleFinish() {
    timerManager.current.finishTimer();
    setIsTimeHidden(false);

    const resultMillis =
      timerStateRef.current.duration - timerStateRef.current.currentMilis;

    const isPositive = resultMillis > 0;
    const { hours, minutes, seconds } =
      extractTimeUnits(isPositive ? resultMillis : resultMillis * -1);

    const hoursLabel =
      hours > 0 ? `${doubleDigitCheck(hours)}h` : '';
    const minutesLabel =
      minutes > 0 ? `${doubleDigitCheck(minutes)}m` : '';
    const secondsLabel =
      seconds > 0 ? `${doubleDigitCheck(seconds)}s` : '';

    return alert(`Você ${isPositive ? 'adiantou' : 'atrasou'} o tempo em ${hoursLabel}${minutesLabel}${secondsLabel}`);
  }

  // update ref by props change in modal
  useEffect(() => {
    setTimerState({
      ...timerState,
      duration,
    });
  }, [duration]);

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
    <div className="flex flex-1 items-center justify-center">
      <div className="flex flex-col items-center justify-center gap-9 font-['IBM_Plex_Mono'] leading-[1.2] tracking-[1px] relative h-[190px]">
        <div>
          {isTimeHidden
            ? <HideTimeVector className='w-[220px] h-auto lg:scale-[1.2] -translate-y-[10%] lg:w-[250px]' />
            : (
              <h1 className='text-[50px] font-light lg:text-[82px]'>
                {formatEssayMillis(timerState.currentMilis)}
              </h1>
            )
          }

          <img
            className='mt-[10px] w-5 h-auto m-auto cursor-pointer lg:w-7'
            src={pauseIcon}
            alt='pause timer image'
            onClick={() => {
              if (timerState.currentMilis == 0)
                return alert('Inicie para pausar.');
              handleTogglePause();
            }}
          />
        </div>

        {timerState.isRunning ? (
          <div className='w-full flex flex-col items-center gap-[26px] lg:max-w-[320px]'>
            <div className='w-full flex items-center justify-center gap-6'>
              <Button
                className='text-xs lg:text-base'
                text='Resetar'
                shortcut='R'
                onClick={handleReset}
              />

              <Button
                className='text-xs lg:text-base'
                text={`${isTimeHidden ? 'Revelar' : 'Esconder'} tempo`}
                shortcut='T'
                onClick={toggleTimeVisibility}
              />
            </div>

            <Button
              className='text-xs lg:text-base'
              text='Finalizar'
              style={{ backgroundColor: '#120080' }}
              shortcut='Enter'
              onClick={handleFinish}
            />
          </div>
        ) : (
          <Button
            className='text-xs lg:text-base'
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

export default EssayTimerArea;
