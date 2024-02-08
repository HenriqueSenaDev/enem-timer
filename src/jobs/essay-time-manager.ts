import { MutableRefObject } from "react";
import { IEssayTimerState } from "../types/essay";

interface IQuestionTimeManagerOptions {
  onFinish?: (state: IEssayTimerState) => void;
  onStart?: (state: IEssayTimerState) => void;
}

// TimerManager to use with useRefState custom hook
export class EssayTimeManager {

  constructor(
    private updateState: (newState: IEssayTimerState) => void,
    private stateRef: MutableRefObject<IEssayTimerState>,
    private options?: IQuestionTimeManagerOptions
  ) {}

  startTimer() {
    if (this.options?.onStart)
      this.options!.onStart(this.stateRef.current);

    this.updateState({
      ...this.stateRef.current,
      isRunning: true,
    });
  }

  incrementTime(milliseconds: number) {
    const { currentMilis, ...rest } = this.stateRef.current;

    this.updateState({
      ...rest,
      currentMilis: currentMilis + milliseconds,
    });
  }

  togglePause() {
    const { isPaused } = this.stateRef.current;

    this.updateState({
      ...this.stateRef.current,
      isPaused: !isPaused,
    });
  }

  resetTimer() {
    this.updateState({
      ...this.stateRef.current,
      currentMilis: 0,
    });
  }

  stopTimer() {
    this.updateState({
      ...this.stateRef.current,
      isRunning: false,
      isPaused: false,
    });
  }

  finishTimer() {
    const { isRunning } = this.stateRef.current;
    if (!isRunning) throw new Error('Tempo não iniciado');

    this.stopTimer();

    if (this.options?.onFinish)
      this.options!.onFinish(this.stateRef.current);
  }
}
