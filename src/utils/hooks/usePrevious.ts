import { useEffect, useRef } from "react";

export const usePrevious = <T>(val: T): T => {
  const ref = useRef(val);

  useEffect(() => {
    ref.current = val;
  }, [val]);

  return ref.current;
};
