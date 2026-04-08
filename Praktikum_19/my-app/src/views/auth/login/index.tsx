import Link from "next/link";
import { useRouter } from "next/router";
// import styles from "./login.module.css";
import style from "@/views/auth/login/login.module.scss";
import { useState } from "react";
import { signIn } from "next-auth/react";

const TampilanLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push, query } = useRouter();

  const callbackUrl: any = query.callbackUrl || "/";
  const [error, setError] = useState("");

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setError("");
    setIsLoading(true);

    //const form = event.currentTarget;
    //
    try {
      const form = event.target as HTMLFormElement;
      const res = await signIn("credentials", {
        redirect: false,
        email: form.email?.value || "",
        password: form.password?.value || "",
        callbackUrl,
      });

      // console.log("signIn response: ", res);
      if (!res?.error) {
        setIsLoading(false);
        push(callbackUrl);
      } else {
        setIsLoading(false);
        setError(res?.error || "Login failed");
      }
    } catch (error) {
      setIsLoading(false);
      setError("wrong email or password");
    }
  };
  return (
    <>
      <div className={style.login}>
        {error && <p className={style.login__error}>{error}</p>}
        <h1 className={style.login__title}>Halaman login</h1>
        <div className={style.login__form}>
          <form onSubmit={handleSubmit}>
            <div className={style.login__form__item}>
              <label htmlFor="email" className={style.login__form__item__label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Email"
                required
                className={style.login__form__item__input}
              />
            </div>
            <div className={style.login__form__item}>
              <label
                htmlFor="password"
                className={style.login__form__item__label}
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Password"
                className={style.login__form__item__input}
              />
            </div>
            <button
              type="submit"
              className={style.login__form__item__button}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "login"}
            </button>
            <br /> <br />
            <button
              type="submit"
              className={style.login__form__item__button}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
            <br />
            <br />
            <button
              type="button"
              onClick={() => signIn("google", { callbackUrl, redirect: false })}
              className={style.login__form__item__button}
            >
              Sign in with Google
            </button>
            <br /> <br />
            <button
              onClick={() => signIn("github", { callbackUrl, redirect: false })}
              className={style.login__form__item__button}
              disabled={isLoading}
            >
              {isLoading ? "Loading..." : "sign in with github"}
            </button>
          </form>
          <br />
          <div className={style.login__form__item__text}>
            Belum punya akun?{" "}
            <Link href="/auth/register">Ke Halaman Register</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default TampilanLogin;
