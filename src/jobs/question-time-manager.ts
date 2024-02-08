import { MutableRefObject } from "react";
import { IQuestionTimerState } from "../types/timer";
import { formatQuestionMillis } from "../utils/formatters/questions";

interface IQuestionTimeManagerOptions {
  onFinish?: (state: IQuestionTimerState) => void;
  onStart?: (state: IQuestionTimerState) => void;
}

// TimerManager to use with useRefState custom hook
export class QuestionTimeManager {
  constructor(
    private updateState: (newState: IQuestionTimerState) => void,
    private stateRef: MutableRefObject<IQuestionTimerState>,
    private options?: IQuestionTimeManagerOptions
  ) {}

  startTimer() {
    if (this.options?.onStart)
      this.options!.onStart(this.stateRef.current);

    this.updateState({
      ...this.stateRef.current,
      isRunning: true,
      questions: [],
    });
  }

  incrementTime(milisseconds: number) {
    const { currentMilis, overallMilis, ...rest } = this.stateRef.current;

    this.updateState({
      ...rest,
      currentMilis: currentMilis + milisseconds,
      overallMilis: overallMilis + milisseconds,
    });
  }

  insertQuestion() {
    const {
      isRunning,
      milisPerQuestion,
      currentMilis,
      overallMilis,
      questions,
    } = this.stateRef.current;

    if (!isRunning) throw new Error('Tempo não iniciado.');

    const currentRest = milisPerQuestion - currentMilis;
    const current = formatQuestionMillis(currentRest);

    const overallRest = (milisPerQuestion * (questions.length + 1)) - overallMilis;
    const overall = formatQuestionMillis(overallRest);

    this.updateState({
      ...this.stateRef.current,
      questions: [...questions, { current, overall }],
      currentMilis: 0,
    });
  }

  resetQuestion() {
    const { isRunning, currentMilis, overallMilis } = this.stateRef.current;

    if (!isRunning) throw new Error('Tempo não iniciado');

    this.updateState({
      ...this.stateRef.current,
      overallMilis: overallMilis - currentMilis,
      currentMilis: 0,
    });
  }

  togglePause() {
    const { isPaused } = this.stateRef.current;

    this.updateState({
      ...this.stateRef.current,
      isPaused: !isPaused,
    });
  }

  stopTimer() {
    this.updateState({
      ...this.stateRef.current,
      isRunning: false,
      isPaused: false,
      currentMilis: 0,
      overallMilis: 0,
    });
  }

  finishTimer() {
    const { isRunning } = this.stateRef.current;
    if (!isRunning) throw new Error('Tempo não iniciado');

    this.insertQuestion();
    this.stopTimer();

    if (this.options?.onFinish)
      this.options!.onFinish(this.stateRef.current);
  }
}
