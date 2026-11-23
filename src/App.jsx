//---- APP ROUTES ----
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import About from "./pages/About";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import VerifyCertificate from "./pages/VerifyCertificate";
import Contact from "./pages/Contact";
import Portal from "./pages/Portal";
import StudentDashboard from "./pages/StudentDashboard";
import AdminLogin from "./pages/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import { SettingsProvider } from "./context/SettingsContext";
import Internships from "./pages/Internships";

function Protected({ role, children }) {
  const location = useLocation();
  const [sessionExpired, setSessionExpired] = useState(false);
  const token = window.localStorage.getItem("decode_token");
  const user = JSON.parse(window.localStorage.getItem("decode_user") || "{}");
  useEffect(() => {
    const handleSessionExpired = () => setSessionExpired(true);
    window.addEventListener("decode:auth-expired", handleSessionExpired);
    return () => window.removeEventListener("decode:auth-expired", handleSessionExpired);
  }, []);
  if (!token || user.role !== role || sessionExpired) return <Navigate to={role === "admin" ? "/admin/login" : "/portal"} replace state={{ from: location.pathname }} />;
  return children;
}

function SiteLayout({ children }) {
  return <><Header />{children}<Footer /></>;
}

export default function App() {
  return <SettingsProvider><><ScrollToTop /><Routes>
    <Route path="/" element={<SiteLayout><Home /></SiteLayout>} />
    <Route path="/about" element={<SiteLayout><About /></SiteLayout>} />
    <Route path="/courses" element={<SiteLayout><Courses /></SiteLayout>} />
    <Route path="/courses/:slug" element={<SiteLayout><CourseDetails /></SiteLayout>} />
    <Route path="/verify" element={<SiteLayout><VerifyCertificate /></SiteLayout>} />
    <Route path="/contact" element={<SiteLayout><Contact /></SiteLayout>} />
    <Route path="/portal" element={<SiteLayout><Portal /></SiteLayout>} />
    <Route path="/internships" element={<SiteLayout><Internships /></SiteLayout>} />
    <Route path="/student" element={<Protected role="student"><StudentDashboard /></Protected>} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin" element={<Protected role="admin"><AdminDashboard /></Protected>} />
    <Route path="*" element={<SiteLayout><main className="page-main"><div className="empty-state"><h1>Page not found.</h1><a href="/">Return home</a></div></main></SiteLayout>} />
  </Routes></></SettingsProvider>;
}
