import { useState, useEffect } from "react";
import useRegister from "./useRegister";
import useLogin from "./useLogin";

const useInputs = (isLogin: boolean, setState: Function) => {
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repassword, setRepassword] = useState("");
  const [repasswordError, setRepasswordError] = useState("");
  const {
    action: register,
    error: registerError,
    setError: setRegisterError,
    loading: registerLoading,
  } = useRegister();
  const {
    action: login,
    error: loginError,
    setError: setLoginError,
    loading: loginLoading,
  } = useLogin();

  const inputs = [
    {
      label: "Name",
      value: name,
      onChange: setName,
      type: "text",
      placeholder: "John Wick",
      error: nameError,
      setError: setNameError,
      visible: !isLogin,
    },
    {
      label: "Email",
      value: email,
      onChange: setEmail,
      type: "text",
      placeholder: "john_wick@gmail.com",
      error: emailError,
      setError: setEmailError,
      visible: true,
    },
    {
      label: "Password",
      value: password,
      onChange: setPassword,
      type: "password",
      placeholder: "**********",
      error: passwordError,
      setError: setPasswordError,
      visible: true,
    },
    {
      label: "Reenter Password",
      value: repassword,
      onChange: setRepassword,
      type: "password",
      placeholder: "**********",
      error: repasswordError,
      setError: setRepasswordError,
      visible: !isLogin,
    },
  ].filter((i) => i.visible);

  const onSubmit = async () => {
    if (
      inputs
        .map((i) => {
          const flag = !i.value;
          if (flag) i.setError(i.label + " is required");
          else i.setError("");
          return flag;
        })
        .some(Boolean)
    )
      return;

    if (
      inputs
        .map((i) => {
          const flag = i.value.length > 50;
          if (flag) i.setError(i.label + " cannot more than 50 characters");
          else i.setError("");
          return flag;
        })
        .some(Boolean)
    )
      return;

    if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
      setEmailError("Not a valid email");
      return;
    } else setEmailError("");

    if (!isLogin) {
      if (!password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/)) {
        setPasswordError(
          "Password need to contain uppercase, lowercase, number and between 8 to 32 characters"
        );
        return;
      } else setPasswordError("");

      if (password !== repassword) {
        setRepasswordError("Reenter Password did not match");
        return;
      } else setRepasswordError("");
    }
    if (isLogin) login({ email, password });
    else register({ name, email, password }, () => setState("successRegister"));
  };

  useEffect(() => {
    inputs.forEach((i) => i.setError(""));
    setLoginError("");
    setRegisterError("");
  }, [isLogin]);

  return {
    inputs,
    onSubmit,
    name,
    setName,
    nameError,
    setNameError,
    email,
    setEmail,
    emailError,
    setEmailError,
    password,
    setPassword,
    passwordError,
    setPasswordError,
    repassword,
    setRepassword,
    repasswordError,
    setRepasswordError,
    registerError,
    loginError,
    registerLoading,
    loginLoading,
  };
};

export default useInputs;
