import { useState } from "react";
import { ArrowLeft, ArrowRight, Users } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import api, { getErrorMessage } from "../services/api";

export default function StaffLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function submit(event) {
    event.preventDefault();
    setError("");
    setLoading(true);
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());

    try {
      const { data } = await api.post("/auth/admin/login", values);
      localStorage.setItem("decode_token", data.access_token);
      localStorage.setItem("decode_user", JSON.stringify(data.user));
      navigate("/admin");
    } catch (reason) {
      setError(getErrorMessage(reason));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="page-main portal-page">
      <section className="portal-card">
        <Link to="/portal-login" className="back-link"><ArrowLeft size={15} /> Back to portal selection</Link>
        <div className="verify-icon"><Users size={23} /></div>
        <div className="section-kicker"><span>STAFF & FACULTY PORTAL</span></div>
        <h1>Staff & Faculty<br /><em>sign in.</em></h1>
        <p>Use your institution staff account to access training resources and management tools.</p>
        <form className="verify-form" onSubmit={submit}>
          <label htmlFor="staff-email">Email</label>
          <input id="staff-email" type="email" name="email" autoComplete="username" required maxLength={254} />
          <label htmlFor="staff-password">Password</label>
          <input id="staff-password" type="password" name="password" autoComplete="current-password" required maxLength={128} />
          <button className="button button-primary" disabled={loading}>
            {loading ? "Signing in…" : "Staff & Faculty Login"} <ArrowRight size={16} />
          </button>
          {error && <div className="form-error" role="alert">{error}</div>}
        </form>
        <small>Sign-in is verified by Decode's authentication service. No demo credentials are provided.</small>
      </section>
    </main>
  );
}
