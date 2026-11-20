import { useState } from "react";
import { BadgeCheck, Search, ShieldCheck, XCircle } from "lucide-react";
import api, { getErrorMessage } from "../services/api";

export default function VerifyCertificate() {
  const [number, setNumber] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  async function submit(event) {
    event.preventDefault();
    setResult(null); setError(""); setLoading(true);
    try { const { data } = await api.get(`/certificates/verify/${encodeURIComponent(number.trim())}`); setResult(data); }
    catch (reason) { setError(reason.response?.status === 404 ? "No certificate with that number was found." : getErrorMessage(reason)); }
    finally { setLoading(false); }
  }
  return <main className="page-main verify-page">
    <section className="verify-card"><div className="verify-icon"><ShieldCheck size={26} /></div><div className="section-kicker"><span>CERTIFICATE LOOKUP</span></div><h1>Verify a<br /><em>certificate.</em></h1><p>Enter the certificate number to check its status against Decode Institution's records.</p>
      <form className="verify-form" onSubmit={submit}><label htmlFor="certificate-number">Certificate number</label><div className="input-with-icon"><Search size={17} /><input id="certificate-number" value={number} onChange={(event) => setNumber(event.target.value)} placeholder="e.g. DECODE-2025-0001" required maxLength={80} /></div><button className="button button-primary" disabled={loading}>{loading ? "Checking…" : "Verify certificate"} <BadgeCheck size={17} /></button></form>
      {error && <div className="result-box result-error"><XCircle size={19} /><span>{error}</span></div>}
      {result && <div className="result-box result-valid"><BadgeCheck size={21} /><div><strong>{result.status === "issued" ? "Certificate verified" : "Certificate is not valid"}</strong><p>Name: {result.student_name}<br />Course: {result.course_name}<br />Issued: {result.issue_date}<br />Status: {result.status}</p></div></div>}
      <small>Verification results are based only on records held in the Decode Institution database.</small>
    </section>
  </main>;
}
