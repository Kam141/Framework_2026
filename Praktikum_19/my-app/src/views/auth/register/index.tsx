import Link from "next/link";
import style from "../../auth/register/register.module.scss";
import { useState } from "react";
import { useRouter } from "next/router";

const TampilanRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { push } = useRouter();
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    setError("");
    setIsLoading(true);
    event.preventDefault();

    const form = event.currentTarget;
    const formData = new FormData(event.currentTarget);

    const email = formData.get("email") as string;
    const fullname = formData.get("Fullname") as string;
    const password = formData.get("Password") as string;
    const role = formData.get("role") as string; // ✅ ambil role

    const response = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, fullname, password, role }), // ✅ kirim role
    });

    if (response.status === 200) {
      form.reset();
      setIsLoading(false);
      push("/auth/login");
    } else {
      setIsLoading(false);
      setError(
        response.status === 400
          ? "Email already exists"
          : "An error occurred",
      );
    }
  };

  return (
    <div className={style.register}>
      {error && <p className={style.register__error}>{error}</p>}
      <h1 className={style.register__title}>Halaman Register</h1>

      <div className={style.register__form}>
        <form onSubmit={handleSubmit}>


          <div className={style.register__form__item}>
            <label className={style.register__form__item__label}>
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              className={style.register__form__item__input}
            />
          </div>


          <div className={style.register__form__item}>
            <label className={style.register__form__item__label}>
              Fullname
            </label>
            <input
              type="text"
              name="Fullname"
              placeholder="Fullname"
              className={style.register__form__item__input}
            />
          </div>

          <div className={style.register__form__item}>
            <label className={style.register__form__item__label}>
              Password
            </label>
            <input
              type="password"
              name="Password"
              placeholder="Password"
              required
              minLength={6}
              className={style.register__form__item__input}
            />
          </div>

          <div className={style.register__form__item}>
            <label className={style.register__form__item__label}>
              Role
            </label>
            <select
              name="role"
              className={style.register__form__item__input}
              defaultValue="member"
            >
              <option value="member">Member</option>
              <option value="editor">Editor</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            className={style.register__form__item__button}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Register"}
          </button>
        </form>

        <br />

        <p className={style.register__form__item__text}>
          Sudah punya akun?{" "}
          <Link href="/auth/login">Ke Halaman Login</Link>
        </p>
      </div>
    </div>
  );
};

export default TampilanRegister;