import { useState } from "react";

export default function useRegister() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  const action = async (body: {email: string, password: string}) => {
    try {
      setLoading(true);
      const response = await fetch("https://xla-interview.herokuapp.com/login", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      response.json(); 
      setSuccess(true);
      return response;
    } catch (e) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  return {
    action,
    loading,
    success,
    error,
  };
}
