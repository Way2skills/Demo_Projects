//---- INTERNSHIPS ----
import { useEffect, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Clock3,
  Code2,
  GraduationCap,
  Lightbulb,
  Monitor,
  Timer,
  TrendingUp,
  UploadCloud,
  UserRound,
  UsersRound,
} from "lucide-react";
import api, { getErrorMessage } from "../services/api";
import "./Internships.css";

function formatDate(value) {
  if (!value) return "—";
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}

function formatTime(value) {
  if (!value) return "—";
  const [hours, minutes] = value.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  return `${hours % 12 || 12}:${String(minutes).padStart(2, "0")} ${period}`;
}

export default function Internships() {
  const [workshops, setWorkshops] = useState([]);
  const [loadingWorkshops, setLoadingWorkshops] = useState(true);
  const [workshopError, setWorkshopError] = useState("");
  const [formState, setFormState] = useState({ loading: false, error: "", sent: false });
  const [resumeFileName, setResumeFileName] = useState("");

  useEffect(() => {
    let active = true;
    api.get("/workshops")
      .then(({ data }) => {
        if (active) setWorkshops(data.items || data);
      })
      .catch((reason) => {
        if (active) setWorkshopError(getErrorMessage(reason));
      })
      .finally(() => {
        if (active) setLoadingWorkshops(false);
      });
    return () => { active = false; };
  }, []);

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    setFormState({ loading: true, error: "", sent: false });
    try {
      await api.post("/internships/apply", new FormData(form), { headers: { "Content-Type": "multipart/form-data" } });
      form.reset();
      setResumeFileName("");
      setFormState({ loading: false, error: "", sent: true });
    } catch (reason) {
      setFormState({ loading: false, error: getErrorMessage(reason), sent: false });
    }
  }

  return (
    <main className="page-main internships-page">
      <section className="internships-hero">
        <div className="internships-hero-inner">
          <div className="internships-hero-copy">
            <span className="internships-eyebrow">CAREER &amp; INDUSTRY EXPERIENCE</span>
            <h1>Taking learning into the <em>real world.</em></h1>
            <h2>Industrial Internships &amp; Technical Workshops</h2>
            <p>Join Tamil Nadu’s premier software training &amp; development hub in Namakkal. Build real-time industry projects with senior engineers, complete your college internship / inplant training (IPT), and earn QR-verifiable ISO certificates.</p>
          </div>
          <div className="internships-hero-visual" aria-hidden="true">
            <div className="internships-hero-orbit internships-hero-orbit-one" />
            <div className="internships-hero-orbit internships-hero-orbit-two" />
            <div className="internships-hero-project">
              <div className="internships-hero-project-top"><span><i /><i /><i /></span><GraduationCap size={17} /><span>CAREER LAB</span></div>
              <div className="internships-hero-project-code"><Code2 size={30} /><div><b /> <b /> <b /></div></div>
              <div className="internships-hero-project-bottom"><span>Real-world skills</span><strong><TrendingUp size={14} /> + Growth</strong></div>
            </div>
            <div className="internships-hero-card internships-hero-card-program"><BriefcaseBusiness size={16} /><span>Internship<br /><b>Programs</b></span></div>
            <div className="internships-hero-card internships-hero-card-project"><Code2 size={16} /><span>Real-Time<br /><b>Projects</b></span></div>
            <div className="internships-hero-card internships-hero-card-mentor"><UsersRound size={16} /><span>Industry<br /><b>Mentorship</b></span></div>
            <div className="internships-hero-card internships-hero-card-growth"><ArrowUpRight size={16} /><span>Career<br /><b>Growth</b></span></div>
            <div className="internships-hero-stats"><Lightbulb size={17} /><span><b>Learn by doing</b><small>Practical skills · Industry experience</small><small>Skill development</small></span></div>
            <div className="internships-hero-pill">LEARN <i /> BUILD <i /> GROW</div>
          </div>
        </div>
      </section>

      <section className="internships-layout section-wrap" id="opportunities">
        <section className="internships-opportunities" id="workshops" aria-labelledby="internships-opportunities-heading">
          <header className="internships-section-heading">
            <span className="internships-section-eyebrow">EXPLORE YOUR NEXT STEP</span>
            <h2 id="internships-opportunities-heading">Internship &amp; Workshop</h2>
          </header>
          {loadingWorkshops ? (
            <p className="internships-state" role="status">Loading Internship &amp; Workshop programs…</p>
          ) : workshopError ? (
            <div className="internships-state is-error" role="alert">Internship &amp; Workshop programs couldn’t be loaded: {workshopError}</div>
          ) : workshops.length === 0 ? (
            <p className="internships-state">Currently No Internship &amp; Workshop Available Right Now.</p>
          ) : (
            <div className="internships-opportunity-grid">
              {workshops.map((workshop) => (
                <article className="internships-opportunity-card" key={workshop.id}>
                  <div className="internships-opportunity-card-top">
                    <span className="internships-opportunity-type"><BriefcaseBusiness size={14} /> Program</span>
                    <span className="internships-opportunity-duration"><Timer size={14} /> {workshop.duration}</span>
                  </div>
                  <h3>{workshop.program}</h3>
                  <p className="internships-opportunity-trainer"><UserRound size={16} /> {workshop.trainer_name}</p>
                  <dl className="internships-opportunity-details">
                    <div>
                      <dt><CalendarDays size={15} /> Admission</dt>
                      <dd>{formatDate(workshop.admission_start_date)} – {formatDate(workshop.admission_end_date)}</dd>
                    </div>
                    <div>
                      <dt><CalendarDays size={15} /> Program dates</dt>
                      <dd>{formatDate(workshop.program_start_date)} – {formatDate(workshop.program_end_date)}</dd>
                    </div>
                    <div>
                      <dt><Monitor size={15} /> Mode</dt>
                      <dd><span className="internships-mode-badge">{workshop.mode}</span></dd>
                    </div>
                    <div>
                      <dt><Clock3 size={15} /> Timing</dt>
                      <dd>{formatTime(workshop.start_time)} – {formatTime(workshop.end_time)}</dd>
                    </div>
                  </dl>
                </article>
              ))}
            </div>
          )}
        </section>

        <form className="contact-form application-form internships-application" onSubmit={submit}>
          <div className="internships-form-heading">
            <span className="internships-section-eyebrow">TAKE THE NEXT STEP</span>
            <h2>Apply for an Opportunity</h2>
          </div>
          <label className="internships-form-field">
            <span>Opportunity</span>
            <span className="internships-select-wrap">
              <BriefcaseBusiness size={17} aria-hidden="true" />
              <select name="internship_title" required disabled={loadingWorkshops || workshops.length === 0}>
                <option value="">{workshops.length ? "Select an opportunity" : "No programs available"}</option>
                {workshops.map((workshop) => <option key={workshop.id} value={workshop.program}>{workshop.program}</option>)}
              </select>
            </span>
          </label>
          <div className="internships-form-row">
            <label className="internships-form-field">
              <span>Full name</span>
              <input name="full_name" required minLength={2} maxLength={120} />
            </label>
            <label className="internships-form-field">
              <span>Email</span>
              <input type="email" name="email" required maxLength={254} />
            </label>
          </div>
          <label className="internships-form-field">
            <span>Phone</span>
            <input type="tel" name="phone" maxLength={30} />
          </label>
          <label className="internships-form-field">
            <span>Resume (PDF, DOC or DOCX, max 8 MB)</span>
            <span className="internships-resume-control">
              <UploadCloud size={21} aria-hidden="true" />
              <span className="internships-resume-copy">
                <strong>{resumeFileName || "Choose a resume file"}</strong>
                <small>PDF, DOC or DOCX · up to 8 MB</small>
              </span>
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={(event) => setResumeFileName(event.target.files?.[0]?.name || "")}
              />
            </span>
          </label>
          <button className="button button-primary internships-submit" disabled={formState.loading || loadingWorkshops || workshops.length === 0}>
            {formState.loading ? "Submitting…" : "Submit application"} <ArrowRight size={17} />
          </button>
          {formState.error && <div className="form-error internships-form-feedback is-error" role="alert">{formState.error}</div>}
          {formState.sent && <div className="form-success internships-form-feedback" role="status">Your application has been received.</div>}
        </form>
      </section>
    </main>
  );
}
