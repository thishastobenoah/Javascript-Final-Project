import { ChangeEvent, FormEvent, useState } from "react";
import { useLogin, useLoginWithGoogle } from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import "./login.css";

export function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const { login, isLoading, error } = useLogin();
  const { loginWithGoogle } = useLoginWithGoogle();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await login({ email, password });
    navigate("/");
  };

  const handleLoginWithGoogle = async () => {
    await loginWithGoogle();
    navigate("/");
  }

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  return (
    <div className="registration-form-container">
      {error && <div className="form-error">Error: {error}</div>}

      <form className="registration-form" onSubmit={handleSubmit}>
        <p>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
          />
        </p>

        <p>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </p>

        <button type="submit" disabled={isLoading}>
          Login
        </button>

        <button type="button" className="google-login-button" onClick={handleLoginWithGoogle}>
          Login with Google
        </button>

        <div>
          Don't have an account? <a href="/register">Register</a>
        </div>
      </form>
    </div>
  );
}
