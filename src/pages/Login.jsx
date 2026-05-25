import { useState } from "react";

import { signInWithEmailAndPassword,} from "firebase/auth";

import { auth } from "../services/firebase";

import "../styles/login.css";

export default function Login() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {

    e.preventDefault();

    try {

      const userCredential =
        await signInWithEmailAndPassword(
          auth,
          email,
          password
        );

      console.log(userCredential.user);

      alert("Login successful!");

    } catch (error) {

      console.log(error.message);

      alert("Invalid email or password");
    }
  };

  return (
    <section className="login-page">

      <div className="login-card">

        <div className="login-top">

          <h1>Welcome Back 👋</h1>

          <p>
            Continue mastering English vocabulary
            with smart flashcards.
          </p>

        </div>

        <form
          onSubmit={handleLogin}
          className="login-form"
        >

          <div className="input-group">

            <label>Email</label>

            <input
              type="email"
              placeholder="Enter your email"

              value={email}

              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

          </div>

          <div className="input-group">

            <label>Password</label>

            <input
              type="password"
              placeholder="Enter your password"

              value={password}

              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

          </div>

          <button type="submit">
            Login
          </button>

        </form>

      </div>

    </section>
  );
}