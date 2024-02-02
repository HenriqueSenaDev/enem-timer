export interface ITimerQuestionOption {
  description: string;
  timeLabel: string;
  milisseconds: number;
  questionsQuantity?: number;
}

export interface QuestionTime {
  current: string;
  overall: string;
}
export interface IQuestionTimerState {
  isRunning: boolean;
  isPaused: boolean;
  currentMilis: number;
  overallMilis: number;
  questions: QuestionTime[];
  milisPerQuestion: number,
}
