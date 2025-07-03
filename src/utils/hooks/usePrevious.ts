import { useRef } from "react";

export const usePrevious = <T>(val: T): T | undefined => {
  const ref = useRef<T>();
  const previous = ref.current;
  ref.current = val;
  return previous;
};
