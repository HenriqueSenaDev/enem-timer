import { createContext, useEffect, useState } from "react";

interface ITimerContext {
  milissecondsPerQuestion: number | null;
  timeOptionInfo: ITimeOptionInfo | null;
  setTimeOptionInfo: (optionInfo: ITimeOptionInfo | null) => void,
}

interface ITimeOptionInfo {
  timeSpecification: string;
  time: string;
}

const TimerContext = createContext<ITimerContext>({
  milissecondsPerQuestion: null,
  timeOptionInfo: null,
  setTimeOptionInfo: () => {},
});

interface IProps {
  children: React.ReactNode
}

function TimerContextProvider({ children }: IProps) {
  const [milissecondsPerQuestion, setMilissecondsPerQuestion] = useState<number | null>(null);
  const [timeOptionInfo, setTimeOptionInfo] = useState<ITimeOptionInfo | null>(null);

  function getMillissecondsPerQuestion() {
    const [minutes, seconds] = timeOptionInfo!.time.split('m');
    return (Number(minutes) * 60 + Number(seconds)) * 1000;
  }

  useEffect(() => {
    if (timeOptionInfo)
    setMilissecondsPerQuestion(getMillissecondsPerQuestion());
  }, [timeOptionInfo]);

  return (
    <TimerContext.Provider value={{
      milissecondsPerQuestion,
      timeOptionInfo,
      setTimeOptionInfo
    }} >
      {children}
    </TimerContext.Provider>
  );
}

export { TimerContextProvider, TimerContext };
