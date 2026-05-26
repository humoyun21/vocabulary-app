import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import "../styles/login.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isFormReady =
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && password.length >= 6;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredential.user);
      navigate("/");
    } catch (err) {
      console.log(err.message);
      setError("Invalid email or password. Please try again.");
      setLoading(false);
    }
  };

  return (
    <section className="login-page">
      {/* Ambient orbs */}
      <div className="login-orb login-orb1" />
      <div className="login-orb login-orb2" />
      <div className="login-orb login-orb3" />

      <div className="login-card">
        {/* Badge */}
        <div className="login-badge">
          <span className="login-badge-dot" />
          Smart Flashcards · A1 to C1
        </div>

        {/* Heading */}
        <div className="login-top">
          <h1>
            Welcome <em>back</em>
          </h1>
          <p>
            Continue mastering English vocabulary
            with spaced repetition.
          </p>
        </div>

        {/* Social buttons */}
        <div className="login-social">
          <button type="button" className="login-social-btn">
            <span className="login-social-logo login-g">G</span>
            Google
          </button>
          <button type="button" className="login-social-btn">
            <span className="login-social-logo login-gh">⌥</span>
            GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="login-divider">
          <span className="login-divider-line" />
          <span className="login-divider-text">OR WITH EMAIL</span>
          <span className="login-divider-line" />
        </div>

        {/* Error banner */}
        {error && (
          <div className="login-error">
            <span>⚠</span> {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleLogin} className="login-form">
          {/* Email */}
          <div className="login-field">
            <label className="login-label">Email address</label>
            <div className="login-input-wrap">
              <span className="login-input-icon">✉</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
              />
            </div>
          </div>

          {/* Password */}
          <div className="login-field">
            <div className="login-label-row">
              <label className="login-label">Password</label>
              <a href="/forgot-password" className="login-forgot">
                Forgot password?
              </a>
            </div>
            <div className="login-input-wrap">
              <span className="login-input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
              />
              <button
                type="button"
                className="login-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="login-submit-btn"
            disabled={!isFormReady || loading}
          >
            {loading ? (
              <span className="login-spinner" />
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        {/* Footer */}
        <div className="login-footer">
          Don't have an account?{" "}
          <a href="/register">Create one</a>
        </div>
      </div>
    </section>
  );
}
