import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, KeyRound } from "lucide-react";
import api, { getErrorMessage } from "../services/api";

export default function Portal() {
  const [mode, setMode] = useState("login");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  async function submit(event) {
    event.preventDefault(); setError(""); setLoading(true);
    const values = Object.fromEntries(new FormData(event.currentTarget).entries());
    if (mode === "register" && values.password !== values.confirm_password) { setError("Passwords do not match."); setLoading(false); return; }
    try {
      const { data } = await api.post(mode === "register" ? "/auth/student/register" : "/auth/student/login", values);
      localStorage.setItem("decode_token", data.access_token);
      localStorage.setItem("decode_user", JSON.stringify(data.user));
      navigate("/student");
    } catch (reason) { setError(getErrorMessage(reason)); }
    finally { setLoading(false); }
  }
  return <main className="page-main portal-page"><div className="portal-card"><Link to="/" className="back-link"><ArrowLeft size={15} /> Back to Decode</Link><div className="verify-icon"><KeyRound size={23} /></div><div className="section-kicker"><span>STUDENT PORTAL</span></div><h1>{mode === "login" ? <>Welcome<br /><em>back.</em></> : <>Start your<br /><em>journey.</em></>}</h1><p>{mode === "login" ? "Sign in to access your student space." : "Create an account to access your student space."}</p>
    <form className="verify-form" onSubmit={submit}>{mode === "register" && <><label>Full name<input name="full_name" required maxLength={120} /></label><label>Phone<input type="tel" name="phone" required maxLength={30} /></label></>}<label>Email<input type="email" name="email" required maxLength={254} /></label><label>Password<input type="password" name="password" required minLength={8} maxLength={128} autoComplete={mode === "login" ? "current-password" : "new-password"} /></label>{mode === "register" && <label>Confirm password<input type="password" name="confirm_password" required minLength={8} maxLength={128} /></label>}<button className="button button-primary" disabled={loading}>{loading ? "Please wait…" : mode === "login" ? "Sign in" : "Create account"} <ArrowRight size={16} /></button>{error && <div className="form-error" role="alert">{error}</div>}</form>
    <button className="mode-toggle" onClick={() => { setError(""); setMode(mode === "login" ? "register" : "login"); }}>{mode === "login" ? "New here? Create a student account" : "Already registered? Sign in"}</button>
    <small>Administrator sign-in is separate and is available at <code>/admin/login</code>.</small></div></main>;
}
