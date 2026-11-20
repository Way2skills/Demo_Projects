import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Bell, BookOpen, BriefcaseBusiness, FileBadge, LogOut, UserRound } from "lucide-react";
import api, { getErrorMessage } from "../services/api";

export default function StudentDashboard() {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    api.get("/students/me").then(({ data: value }) => setData(value)).catch((reason) => setError(getErrorMessage(reason)));
  }, []);
  function logout() { localStorage.removeItem("decode_token"); localStorage.removeItem("decode_user"); navigate("/portal"); }
  return <main className="dashboard-page"><header><a className="brand" href="/"><span className="brand-mark">&lt;/&gt;</span><span>decode<span className="brand-light">institution</span></span></a><button className="button button-outline" onClick={logout}><LogOut size={15} /> Sign out</button></header>
    <section><div className="section-kicker"><span>STUDENT SPACE</span></div><h1>Your next step<br /><em>starts here.</em></h1>{error && <div className="notice notice-error">{error}</div>}{data && <>
      <div className="student-welcome"><UserRound size={20} /><span>Signed in as <b>{data.full_name}</b></span></div>
      <div className="student-sections">
        <article><h2><BookOpen size={18} /> My courses</h2>{data.enrolled_courses.length ? data.enrolled_courses.map((course) => <p key={course.id}>{course.name}<span>{course.status}</span></p>) : <p className="student-empty">Your enrolled courses will appear here.</p>}</article>
        <article><h2><BriefcaseBusiness size={18} /> Internship applications</h2>{data.internship_applications.length ? data.internship_applications.map((application) => <p key={application.id}>{application.internship_title}<span>{application.status}</span></p>) : <p className="student-empty">You have no applications yet.</p>}</article>
        <article><h2><FileBadge size={18} /> Certificates</h2>{data.certificates.length ? data.certificates.map((certificate) => <p key={certificate.id}>{certificate.course_name}<span>{certificate.status}</span></p>) : <p className="student-empty">Your issued certificates will appear here.</p>}</article>
        <article><h2><Bell size={18} /> Notifications</h2>{data.notifications.length ? data.notifications.map((notification) => <p key={notification.id}>{notification.title}<span>{notification.is_read ? "Read" : "New"}</span></p>) : <p className="student-empty">There are no new notifications.</p>}</article>
      </div>
    </>}</section>
  </main>;
}
