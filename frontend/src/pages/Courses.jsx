import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import api, { getErrorMessage } from "../services/api";
import { isKidsCourseCategory } from "../courseCategories";
import { formatCourseFee, getCourseSlug } from "../courseUtils";
import "./Courses.css";

const COURSES_PER_PAGE = 10;

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [imageFailures, setImageFailures] = useState(() => new Set());

  useEffect(() => {
    let active = true;
    api.get("/courses")
      .then(({ data }) => {
        if (!active) return;
        setCourses(data.items || data);
        setError("");
      })
      .catch((reason) => {
        if (active) setError(getErrorMessage(reason));
      });
    return () => { active = false; };
  }, []);

  const visibleCourses = courses.filter((course) => !isKidsCourseCategory(course.category_name));
  const visiblePages = Math.ceil(visibleCourses.length / COURSES_PER_PAGE);
  const firstCourse = visibleCourses.length === 0 ? 0 : (page - 1) * COURSES_PER_PAGE + 1;
  const lastCourse = Math.min(page * COURSES_PER_PAGE, visibleCourses.length);
  const pageCourses = visibleCourses.slice((page - 1) * COURSES_PER_PAGE, page * COURSES_PER_PAGE);

  return <main className="page-main">
    <section className="page-heading course-page-heading">
      <h1>Explore our <em>courses.</em></h1>
      <p>Explore the courses offered by Decode Institution.</p>
    </section>
    <section className="section-wrap course-listing" id="course-listing">
      {error && <div className="notice" role="alert">We couldn't reach the course service: {error}. Please try again later.</div>}
      {!error && visibleCourses.length === 0 && <div className="empty-state"><h2>Courses are being prepared.</h2><p>Please check back soon for available courses.</p></div>}
      <div className="listing-grid">
        {pageCourses.map((course) => <Link
          to={`/courses/${getCourseSlug(course)}`}
          className={`listing-card course-catalog-card${course.slug === "backend-development" ? " course-catalog-card--full-topics" : ""}`}
          key={course.id}
          aria-label={`View details for ${course.name || course.title}`}
        >
          <div className="course-card-image">
            {course.image_url && !imageFailures.has(course.id)
              ? <img
                src={course.image_url}
                alt={course.name || "Course"}
                loading="lazy"
                onError={() => setImageFailures((current) => new Set(current).add(course.id))}
              />
              : <span>Course image unavailable</span>}
          </div>
          <div className="course-card-content">
            <h2>{course.name || course.title}</h2>
            <div className="course-card-fee">
              <span>Fees</span>
              <strong>{formatCourseFee(course.fee)}</strong>
            </div>
            <div className="course-card-topics">
              <span>Topics</span>
              <div>{course.syllabus?.trim() || "Not specified"}</div>
            </div>
            <span className="course-card-details-link">
              View course details <ArrowRight size={16} aria-hidden="true" />
            </span>
          </div>
        </Link>)}
      </div>
      {visibleCourses.length > 0 && <div className="course-pagination">
        <span className="course-pagination-count" aria-live="polite">Showing {firstCourse}–{lastCourse} of {visibleCourses.length} courses</span>
        {visiblePages > 1 && <nav className="course-pagination-controls" aria-label="Course pages">
          <button type="button" disabled={page === 1} onClick={() => setPage((current) => current - 1)}><ArrowLeft size={14} /> Previous</button>
          {Array.from({ length: visiblePages }, (_, index) => {
            const pageNumber = index + 1;
            return <button type="button" className={page === pageNumber ? "is-current" : ""} aria-current={page === pageNumber ? "page" : undefined} aria-label={`Page ${pageNumber}`} key={pageNumber} onClick={() => setPage(pageNumber)}>{pageNumber}</button>;
          })}
          <button type="button" disabled={page === visiblePages} onClick={() => setPage((current) => current + 1)}>Next <ArrowRight size={14} /></button>
        </nav>}
      </div>}
    </section>
  </main>;
}
