import { useEffect, useState } from "react";

export default function useCheckAPI() {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<{ version: string }>();
  const [error, setError] = useState(false);

  useEffect(() => {
    const action = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://xla-interview.herokuapp.com");
        setData(await response.json());
        return response;
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    action();
  }, []);

  return {
    loading,
    data,
    error,
  };
}
