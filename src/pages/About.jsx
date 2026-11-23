import { FaGoogle } from "react-icons/fa";
import {
  Award,
  BookOpenCheck,
  Building2,
  Code2,
  GraduationCap,
  Landmark,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import "./About.css";

const recognitions = [
  { label: "Google (4.5)", Icon: FaGoogle },
  { label: "Certified", detail: "ISO 27001:2013", Icon: ShieldCheck },
  { label: "Certified", detail: "ISO 10002:2018", Icon: ShieldCheck },
  { label: "Govt of India", detail: "MCA Registered", Icon: Landmark },
  { label: "Featured", detail: "TPL Awards", Icon: Award },
  { label: "Authorized", detail: "Tally Education", Icon: BookOpenCheck },
];

const statistics = [
  ["15,000+", "Students", UsersRound],
  ["25+", "Experienced Educator", GraduationCap],
  ["500+", "Software Developed", Code2],
  ["50,000+", "Interview Tasks", Building2],
];

export default function About() {
  return (
    <main className="page-main about-page">
      <section className="about-page-content section-wrap about-premium">
        <div className="about-hero">
          <div className="about-hero-copy">
            <header className="about-page-heading">
              <span className="about-eyebrow">WHO WE ARE</span>
              <h1>About Decode Institution</h1>
              <h2>Built on Values. Driven by Innovation.</h2>
            </header>
            <div className="about-page-description">
              <p>Decode Institution was founded in 2016 in Namakkal, Tamil Nadu, India, and evolved into a corporate training and development entity after its 2019 incorporation under the Ministry of Corporate Affairs, Government of India. As an ISO 9001:2015 certified organization and Best Training Institute in.</p>
              <p>We bridge the gap between academic knowledge and corporate expectations. Learners gain practical, job-ready skills that meet industry demands.</p>
            </div>
          </div>

          <aside className="about-milestone-panel" aria-label="Institution milestones">
            <span className="about-milestone-kicker">OUR JOURNEY</span>
            <div className="about-milestones">
              <article className="about-milestone">
                <strong>2016</strong>
                <div>
                  <span>Founded</span>
                  <p>Namakkal, Tamil Nadu, India</p>
                </div>
              </article>
              <article className="about-milestone">
                <strong>2019</strong>
                <div>
                  <span>Incorporated</span>
                  <p>Ministry of Corporate Affairs, Government of India</p>
                </div>
              </article>
            </div>
            <div className="about-panel-mark" aria-hidden="true"><i /><i /><i /></div>
          </aside>
        </div>

        <div className="about-recognition-heading">
          <span className="about-eyebrow">CREDENTIALS &amp; RECOGNITION</span>
          <h2>Trusted standards. Recognized achievement.</h2>
        </div>
        <div className="about-recognition" role="group" aria-label="Recognitions and certifications">
          {recognitions.map(({ label, detail, Icon }, index) => (
            <article className="about-recognition-item" key={`${label}-${detail || index}`}>
              <span className="about-recognition-icon" aria-hidden="true">
                <Icon size={21} />
              </span>
              <div className="about-recognition-copy">
                <strong>{label}</strong>
                {detail && <span>{detail}</span>}
              </div>
            </article>
          ))}
        </div>

        <div className="about-statistics" aria-label="Institution statistics">
          {statistics.map(([number, description, Icon]) => (
            <article className="about-statistic" key={description}>
              <Icon className="about-statistic-icon" size={22} aria-hidden="true" />
              <strong>{number}</strong>
              <span>{description}</span>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
