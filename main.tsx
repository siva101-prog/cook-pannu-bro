import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// REMOVE the "/pages/" part because your files are in the root!
import LandingPage from "./LandingPage"; 
import AuthPage from './AuthPage'; 
import DashboardPage from "./DashboardPage";
import CookPage from "./CookPage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/cook" element={<CookPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
