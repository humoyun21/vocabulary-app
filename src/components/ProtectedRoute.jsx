import { Navigate }from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import {  useEffect, useState, } from "react";
import { auth }from "../services/firebase";
export default function ProtectedRoute({
  children,
}) {

  const [loading, setLoading]= useState(true);
  const [user, setUser]= useState(null);
  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        }
      );
    return () => unsubscribe();
  }, []);
  if (loading) {
    return <h1>Loading...</h1>;
  }
  if (!user) {
    return <Navigate to="/login" />;
  }
  return children;
}