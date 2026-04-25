import { useState, useEffect } from "react";

// The <T> here is a TypeScript Generic — it means this hook works with
// ANY data type. You're not locked into strings or arrays.
// Think of T as a placeholder that gets filled in when you USE the hook.
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    // This is a "lazy initializer" — the function only runs ONCE on mount.
    // React docs: https://react.dev/reference/react/useState#avoiding-recreating-the-initial-state
    try {
      const item = window.localStorage.getItem(key);
      // If something exists in localStorage, parse and return it.
      // Otherwise, fall back to the initialValue you passed in.
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch (error) {
      // localStorage can throw in private browsing or if storage is full.
      // Always handle this gracefully.
      console.error(`useLocalStorage read error for key "${key}":`, error);
      return initialValue;
    }
  });

  // Whenever storedValue changes, sync it to localStorage.
  // useEffect with [storedValue, key] as deps means:
  // "Run this side effect every time storedValue or key changes."
  // React docs: https://react.dev/reference/react/useEffect
  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (error) {
      console.error(`useLocalStorage write error for key "${key}":`, error);
    }
  }, [storedValue, key]);

  // We return the same [value, setter] tuple that useState does.
  // This makes it a drop-in replacement — components won't know the difference.
  return [storedValue, setStoredValue] as const;
}

export default useLocalStorage;
