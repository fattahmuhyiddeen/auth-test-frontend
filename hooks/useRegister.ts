import { useState } from "react";

interface Body {
  name: string;
  email: string;
  password: string;
}

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const action = async (body: Body) => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://xla-interview.herokuapp.com/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const res = await response.json();
      if (res.user) setSuccess(true);
      else if (res.error) setError(res.error);
      else if (response.status < 200 || response.status >= 300)
        setError("Sorry, please try later");

      return response;
    } catch (e) {
      setError(JSON.stringify(e));
    } finally {
      setLoading(false);
    }
  };

  return {
    action,
    loading,
    success,
    error,
    setError,
  };
}
