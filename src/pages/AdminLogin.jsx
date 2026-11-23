import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, LockKeyhole } from "lucide-react";
import api, { getErrorMessage } from "../services/api";

export default function AdminLogin() {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function submit(event) {
    event.preventDefault(); setError(""); setLoading(true);
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    try {
      const { data } = await api.post("/auth/admin/login", values);
      localStorage.setItem("decode_token", data.access_token);
      localStorage.setItem("decode_user", JSON.stringify(data.user));
      navigate("/admin");
    } catch (reason) { setError(getErrorMessage(reason)); }
    finally { setLoading(false); }
  }
  return <main className="page-main portal-page"><div className="portal-card"><Link to="/" className="back-link"><ArrowLeft size={15} /> Back to website</Link><div className="verify-icon"><LockKeyhole size={23} /></div><div className="section-kicker"><span>ADMINISTRATION</span></div><h1>Admin<br /><em>sign in.</em></h1><p>Use your institution administrator account.</p><form className="verify-form" onSubmit={submit}><label>Email<input type="email" name="email" required autoComplete="username" /></label><label>Password<input type="password" name="password" required autoComplete="current-password" /></label><button className="button button-primary" disabled={loading}>{loading ? "Signing in…" : "Sign in securely"}</button>{error && <div className="form-error" role="alert">{error}</div>}</form><small>Initial administrator setup is performed from the backend command line. No default credentials are provided.</small></div></main>;
}
