import { useEffect, useState } from "react";

export function useDebounce(text: string, delay: number) {
  const [value, setValue] = useState("");

  useEffect(() => {
    const timerId = setTimeout(() => {
      setValue(text);
    }, delay);
    return () => {
      clearTimeout(timerId);
    };
  }, [text, delay]);

  return {
    value,
  };
}

export const useDebounceValue = (text: string, delay: number) => {
  const [value, setValue] = useState(text);
  const { value: debounced } = useDebounce(value, delay);
  return {
    value,
    setValue,
    debounced,
  };
};
