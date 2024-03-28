import { ChangeEvent, FormEvent, useState } from "react";
import { useRegister } from "../../hooks/useRegister";
import { useNavigate } from "react-router-dom";
import "./register.css";

export function Register() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const { register, isLoading, error } = useRegister();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await register({ email, password, confirmPassword });
    navigate("/");
  };

  const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEmail(e.target.value);

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setPassword(e.target.value);

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) =>
    setConfirmPassword(e.target.value);

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

        <p>
          <label htmlFor="password">Confirm Password</label>
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </p>

        <button type="submit" disabled={isLoading}>
          Create Account
        </button>

        <div>
          Have an account? <a href="/login">Login</a>
        </div>
      </form>
    </div>
  );
}
