import { useRef, useState } from "react";
import { CheckCircle2, Send } from "lucide-react";
import api, { getErrorMessage } from "../services/api";
import { useInstitutionSettings } from "../context/SettingsContext";

export default function Contact() {
  const { settings } = useInstitutionSettings();
  const [state, setState] = useState({ loading: false, error: "", sent: false });
  const [emailSent, setEmailSent] = useState(false);
  const submissionInProgress = useRef(false);
  const submissionKey = useRef({ fingerprint: "", id: "" });
  async function submit(event) {
    event.preventDefault();
    if (submissionInProgress.current) return;
    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form).entries());
    const fingerprint = JSON.stringify(values);
    if (submissionKey.current.fingerprint !== fingerprint) {
      submissionKey.current = { fingerprint, id: crypto.randomUUID() };
    }
    values.submission_id = submissionKey.current.id;
    submissionInProgress.current = true;
    setState({ loading: true, error: "", sent: false });
    setEmailSent(false);
    try {
      const { data } = await api.post("/contact", values);
      form.reset();
      submissionKey.current = { fingerprint: "", id: "" };
      setEmailSent(data.email_sent === true);
      setState({ loading: false, error: "", sent: true });
    } catch (error) {
      setState({ loading: false, error: getErrorMessage(error), sent: false });
    } finally {
      submissionInProgress.current = false;
    }
  }
  return <main className="page-main contact-page"><div className="section-wrap contact-grid">
    <section>
      <div className="section-kicker"><span>GET IN TOUCH</span></div>
      <h1>Let's start<br />a <em>conversation.</em></h1>
      <p>Have a question about courses or learning with us? Send a message and we'll get back to you.</p>
      <div className="contact-address">
        <b>{settings.institution_name}</b>
        <span>{settings.address}</span>
        {settings.phone && <a href={`tel:${settings.phone.replace(/[^\d+]/g, "")}`}>{settings.phone}</a>}
        {settings.email && <a href={`mailto:${settings.email}`}>{settings.email}</a>}
      </div>
    </section>
    <form className="contact-form" onSubmit={submit}>
      <label>Your name<input name="name" placeholder="Enter your full name" required maxLength={120} /></label>
      <div className="form-row">
        <label>Email<input type="email" name="email" placeholder="Enter your email address" required maxLength={254} /></label>
        <label>Phone<input type="tel" name="phone" placeholder="Enter your phone number" required minLength={7} maxLength={30} /></label>
      </div>
      <label>Subject<input name="subject" required maxLength={200} /></label>
      <label>Message<textarea name="message" placeholder="Write your message here..." rows="5" required minLength={2} maxLength={5000} /></label>
      <button className="button button-primary" disabled={state.loading}>{state.loading ? "Sending…" : "Send message"} <Send size={16} /></button>
      {state.error && <div className="form-error" role="alert">{state.error}</div>}
      {state.sent && <div className="form-success" role="status"><CheckCircle2 size={17} /> Your message has been recorded. {emailSent ? "A confirmation email has been sent to your email address. " : "We could not send a confirmation email right now. "}Our Decode Team will contact you through a phone call within 2 or 3 working days.</div>}
    </form>
  </div></main>;
}
