import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <div>
      <Navbar />

      <main style={{ padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
}