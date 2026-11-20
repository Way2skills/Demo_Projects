import { ArrowLeft, ArrowRight, GraduationCap, Users } from "lucide-react";
import { Link } from "react-router-dom";

const portals = [
  {
    className: "student",
    Icon: GraduationCap,
    title: "Student Portal Login",
    description: "Access your courses, learning materials, assignments and certificates.",
    button: "Student Login",
    to: "/student-login",
  },
  {
    className: "staff",
    Icon: Users,
    title: "Staff & Faculty Login",
    description: "Access training resources, student management and institutional activities.",
    button: "Staff & Faculty Login",
    to: "/staff-login",
  },
];

export default function PortalLogin() {
  return (
    <main className="page-main portal-choice-page">
      <section className="portal-choice-content">
        <Link to="/" className="back-link"><ArrowLeft size={15} /> Back to Home</Link>
        <div className="section-kicker"><span>DECODE INSTITUTION</span></div>
        <h1>Welcome to Decode Portal</h1>
        <p className="portal-choice-subtitle">Choose your portal to continue.</p>
        <div className="portal-choice-grid">
          {portals.map(({ className, Icon, title, description, button, to }) => (
            <article className={`portal-choice-card portal-choice-${className}`} key={title}>
              <div className="portal-choice-icon"><Icon size={28} strokeWidth={1.8} /></div>
              <h2>{title}</h2>
              <p>{description}</p>
              <Link className="button button-primary" to={to}>{button}<ArrowRight size={16} /></Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
