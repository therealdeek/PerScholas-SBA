import { useState, useEffect, useRef } from "react";
import type { FetchState } from "../types";

function useFetch<T>(url: string): FetchState<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState<boolean>(!!url);
  const [error, setError] = useState<string | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!url) {
      return;
    }
    setLoading(true);
    setData(null);
    setError(null);

    abortControllerRef.current = new AbortController();

    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          signal: abortControllerRef.current?.signal,
        });

        if (!response.ok) {
          throw new Error(`HTTP error — status: ${response.status}`);
        }

        const json = await response.json();
        setData(json as T);
      } catch (err) {
        if (err instanceof Error && err.name === "AbortError") {
          return;
        }
        const message =
          err instanceof Error ? err.message : "An unknown error occurred";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortControllerRef.current?.abort();
    };
  }, [url]);

  return { data, loading, error };
}

export default useFetch;
