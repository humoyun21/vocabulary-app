import { Routes, Route } from "react-router-dom";

import MainLayout from "./components/layout/MainLayout";
import Learn from "./pages/Learn";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import LearnedWordsList from "./pages/LearnedWordsList";
import PracticeWordsList from "./pages/PracticeWordsList";
function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<ProtectedRoute>  <Dashboard /> </ProtectedRoute>} />
        <Route path="/learn" element={<ProtectedRoute><Learn /></ProtectedRoute>} /></Route>
        <Route path="/learned" element={<LearnedWordsList />} />
        <Route path="/practice" element={<PracticeWordsList />} />
        <Route path="*" element={<NotFound />} />

      
    </Routes>
  );
}

export default App;