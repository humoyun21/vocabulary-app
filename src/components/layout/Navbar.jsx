import { Link } from "react-router-dom";

import { useEffect, useState }
from "react";

import {
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

import { auth }
from "../../services/firebase";

import "../../styles/navbar.css";

export default function Navbar() {

  const [user, setUser]
    = useState(null);

  useEffect(() => {

    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {

          setUser(currentUser);
        }
      );

    return () => unsubscribe();

  }, []);

  async function handleLogout() {

    try {

      await signOut(auth);

    } catch (error) {

      console.log(error);
    }
  }

  return (

    <nav className="navbar">

      <div className="logo">
        Vocabulary App
      </div>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        {/* USER LOGIN QILGANDA */}

        {user && (

          <>

            <Link to="/learn">
              Learn
            </Link>

            <Link to="/dashboard">
              Dashboard
            </Link>

          </>

        )}

        {/* USER LOGIN QILMAGANDA */}

        {!user ? (

          <>

            <Link to="/login">
              Login
            </Link>

            <Link to="/register">
              Register
            </Link>

          </>

        ) : (

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>

        )}

      </div>

    </nav>
  );
}