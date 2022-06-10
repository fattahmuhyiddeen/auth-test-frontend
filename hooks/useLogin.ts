import { useState } from "react";
import { useCookies } from "react-cookie";

export default function useLogin() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const setCookie = useCookies(["token"])[1];

  const action = async (body: { email: string; password: string }) => {
    try {
      setLoading(true);
      setError("");
      const response = await fetch(
        "https://xla-interview.herokuapp.com/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const res = (await response.json()) as { token?: string; error?: string };
      if (res.token) setCookie("token", res.token);
      else if (res.error) setError(res.error);
      else if (response.status === 401) setError("Wrong email or password");
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
    setError,
    error,
  };
}
