import type { NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";

const Home: NextPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState("");
  const [nameError, setNameError] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [repassword, setRepassword] = useState("");
  const [repasswordError, setRepasswordError] = useState("");

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

  const onSubmit = () => {
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

    console.log("submitting");
  };

  useEffect(() => inputs.forEach((i) => i.setError("")), [isLogin]);

  return (
    <>
      <Head>
        <title>Sign in / Login form</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative mb-10 mt-5 md:mx-auto md:max-w-4xl px-4">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
          {inputs.map((i) => (
            <div className="mb-4" key={i.label}>
              <label className="block text-grey-darker text-sm font-bold mb-2">
                {i.label}
              </label>
              <input
                className={`shadow appearance-none border ${
                  !!i.error && "border-red-600"
                } rounded w-full py-2 px-3 text-grey-darker`}
                type={i.type}
                value={i.value}
                onChange={(e) => i.onChange(e.target.value)}
              />
              {!!i.error && (
                <p className="text-red-600 text-xs italic">{i.error}</p>
              )}
            </div>
          ))}
          <button
            className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-4 my-6 rounded"
            onClick={onSubmit}
            type="button"
          >
            {isLogin ? "Login" : "Register"}
          </button>
          <div className="flex items-center justify-between">
            <div></div>
            <div>
              <span className="pr-1">
                {isLogin ? "First time?" : "Already have account?"}{" "}
              </span>
              <a
                className="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker"
                href="#"
                onClick={() => setIsLogin((v) => !v)}
              >
                {(isLogin ? "Register" : "Login") + " now"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
