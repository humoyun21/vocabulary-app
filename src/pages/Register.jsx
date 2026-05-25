import { useState } from "react";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";

import { auth } from "../services/firebase";

import "../styles/auth.css";

export default function Register() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {

      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Account created!");

    } catch (error) {

      console.log(error.message);

      alert(error.message);
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h1>Create Account</h1>

        <p className="auth-subtitle">
          Start learning thousands of English
          vocabulary words from A1 to C1.
        </p>

        <form
          className="auth-form"
          onSubmit={handleRegister}
        >

          <input
            type="email"
            placeholder="Email"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <input
            type="password"
            placeholder="Password"

            value={password}

            onChange={(e) =>
              setPassword(e.target.value)
            }
          />

          <button type="submit">
            Create Account
          </button>

        </form>

        <div className="auth-footer">
          Already have an account?
        </div>

      </div>

    </div>
  );
}