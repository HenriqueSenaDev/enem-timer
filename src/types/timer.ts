export interface ITimerQuestionOption {
  description: string;
  timeLabel: string;
  milisseconds: number;
  questionsQuantity?: number;
}

export interface IQuestionTime {
  current: string;
  overall: string;
}
export interface IQuestionTimerState {
  isRunning: boolean;
  isPaused: boolean;
  currentMilis: number;
  overallMilis: number;
  questions: IQuestionTime[];
  milisPerQuestion: number,
}
