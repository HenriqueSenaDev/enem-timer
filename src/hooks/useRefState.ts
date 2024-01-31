import { MutableRefObject, useRef, useState } from "react";

type IRefStateResult<T> = [
  T,
  (newState: T) => void,
  MutableRefObject<T>
];

// hook used to handle dom event listeners
export function useRefState<T>(initialValue: T): IRefStateResult<T> {
  const [state, setState] = useState<T>(initialValue);
  const ref = useRef<T>(initialValue);

  function updateState(newValue: T) {
    setState(newValue);
    ref.current = newValue;
  }

  return [state, updateState, ref];
}
