export interface IEssayTimeOption {
  timeLabel: string;
  milliseconds: number;
}

export interface IEssayTimerState {
  isRunning: boolean;
  isPaused: boolean;
  currentMilis: number;
  duration: number,
}
