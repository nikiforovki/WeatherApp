import { useRef, useEffect } from 'react';

type DebouncedFunction = (...args: any[]) => void;

export default function useDebouncedFunction(
  func: DebouncedFunction,
  delay: number,
): (() => void) & DebouncedFunction {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  function clearTimer(): void {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }

  useEffect(() => {
    clearTimer();
    timeoutRef.current = setTimeout(() => func(), delay);
  }, [func, delay]);

  return { ...func, clear: clearTimer };
}
