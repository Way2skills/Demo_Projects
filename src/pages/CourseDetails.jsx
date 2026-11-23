import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, ChevronDown, Minus, Plus } from "lucide-react";
import api, { getErrorMessage } from "../services/api";
import { isKidsCourseCategory } from "../courseCategories";
import { COURSE_BATCHES, formatCourseFee, getCourseSlug } from "../courseUtils";
import "./CourseDetails.css";

const CONTACT_FOR_FEES = "Contact Us for Fee Details";
const AVAILABLE_BATCHES_CONTACT_TEXT = "Kindly contact our team to confirm your preferred batch timing. Please choose a suitable time from the four available batch timings listed above. Our team will assist you with batch confirmation.";

function getCourseTopics(syllabus) {
  const raw = typeof syllabus === "string" ? syllabus.trim() : "";
  if (!raw) return [];
  if (!/[\r\n|;]/.test(raw) && /^EITHER CHOOSE ONE LANGUAGE\b/i.test(raw)) return [raw];

  return raw
    .split(/\r?\n|[|;]+|,\s*|\s\+\s/)
    .map((topic) => topic.replace(/^\s*(?:\d+\s*[.):]|[-*•])\s*/, "").trim())
    .filter(Boolean);
}

function getCourseModules(topics) {
  const topicsPerModule = 4;
  return Array.from({ length: Math.ceil(topics.length / topicsPerModule) }, (_, index) => ({
    title: `Module ${String(index + 1).padStart(2, "0")}`,
    topics: topics.slice(index * topicsPerModule, (index + 1) * topicsPerModule),
  }));
}

function getCourseItems(data) {
  const items = Array.isArray(data?.items) ? data.items : data;
  if (!Array.isArray(items)) throw new Error("Course data could not be loaded.");
  return items;
}

function getCategories(data) {
  const categories = Array.isArray(data?.items) ? data.items : data;
  if (!Array.isArray(categories)) throw new Error("Course category data could not be loaded.");
  return categories;
}

function CourseFacts({ fee, category }) {
  return <div className="course-detail-facts">
    <div><span>Course Fees</span><strong>{fee}</strong></div>
    <div><span>Category</span><strong>{category}</strong></div>
  </div>;
}

function CourseDetailSection({ id, title, children, className = "", isOpen, onToggle }) {
  const contentId = `${id}-content`;
  const contentRef = useRef(null);
  const [contentHeight, setContentHeight] = useState(0);

  useLayoutEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const updateHeight = () => setContentHeight(isOpen ? content.scrollHeight : 0);
    updateHeight();

    if (!isOpen || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(updateHeight);
    observer.observe(content);
    return () => observer.disconnect();
  }, [children, isOpen]);

  return <section className={`course-detail-section${isOpen ? " is-mobile-open" : ""} ${className}`.trim()}>
    <div className="course-detail-section-heading">
      <h2>{title}</h2>
      <button
        className="course-detail-section-toggle"
        type="button"
        aria-label={`${isOpen ? "Collapse" : "Expand"} ${title}`}
        aria-expanded={isOpen}
        aria-controls={contentId}
        onClick={onToggle}
      >
        {isOpen ? <Minus size={19} aria-hidden="true" /> : <Plus size={19} aria-hidden="true" />}
      </button>
    </div>
    <div
      id={contentId}
      className="course-detail-section-content"
      style={{ "--content-height": `${contentHeight}px` }}
    >
      <div className="course-detail-section-content-inner" ref={contentRef}>{children}</div>
    </div>
  </section>;
}

function CourseFaqItem({ faq, index, isOpen, onToggle }) {
  const answerRef = useRef(null);
  const [answerHeight, setAnswerHeight] = useState(0);
  const answerId = `course-faq-answer-${index}`;

  useLayoutEffect(() => {
    const answer = answerRef.current;
    if (!answer) return;

    const updateHeight = () => setAnswerHeight(isOpen ? answer.scrollHeight : 0);
    updateHeight();

    if (!isOpen || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(updateHeight);
    observer.observe(answer);
    return () => observer.disconnect();
  }, [faq.answer, isOpen]);

  return <article className={`course-detail-faq${isOpen ? " is-open" : ""}`}>
    <h3>
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={answerId}
        onClick={onToggle}
      >
        {faq.question}<ChevronDown size={18} aria-hidden="true" />
      </button>
    </h3>
    <div
      id={answerId}
      className="course-detail-faq-answer"
      aria-hidden={!isOpen}
      style={{ "--answer-height": `${answerHeight}px` }}
    >
      <div className="course-detail-faq-answer-inner" ref={answerRef}>{faq.answer}</div>
    </div>
  </article>;
}

export default function CourseDetails() {
  const { slug } = useParams();
  const [course, setCourse] = useState(null);
  const [categories, setCategories] = useState([]);
  const [courseError, setCourseError] = useState("");
  const [categoryError, setCategoryError] = useState("");
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    let active = true;
    setCourse(null);
    setCourseError("");
    setLoading(true);
    setNotFound(false);
    setImageFailed(false);
    setOpenSection(null);
    setOpenFaq(null);

    api.get("/courses")
      .then(({ data }) => {
        const courses = getCourseItems(data);
        const selectedCourse = courses.find((item) =>
          getCourseSlug(item) === slug && !isKidsCourseCategory(item.category_name)
        );
        if (active) {
          setCourse(selectedCourse || null);
          setNotFound(!selectedCourse);
        }
      })
      .catch((reason) => {
        if (active) setCourseError(getErrorMessage(reason));
      })
      .finally(() => {
        if (active) setLoading(false);
      });

    return () => { active = false; };
  }, [slug]);

  useEffect(() => {
    let active = true;
    api.get("/course-categories")
      .then(({ data }) => {
        if (active) setCategories(getCategories(data));
      })
      .catch((reason) => {
        if (active) setCategoryError(getErrorMessage(reason));
      });
    return () => { active = false; };
  }, []);

  const category = useMemo(() => categories.find((item) =>
    (course?.category_id != null && item.id === course.category_id) ||
    (course?.category_name && item.name === course.category_name)
  ), [categories, course]);
  const syllabusTopics = useMemo(() => getCourseTopics(course?.syllabus), [course]);
  const modules = useMemo(() => getCourseModules(syllabusTopics), [syllabusTopics]);
  const feeIsAvailable = course?.fee !== null && course?.fee !== undefined &&
    course?.fee !== "" && Number.isFinite(Number(course?.fee)) && Number(course?.fee) >= 0;
  const fee = feeIsAvailable ? formatCourseFee(course.fee) : CONTACT_FOR_FEES;
  const courseDescription = course?.description?.trim() ||
    (category?.description
      ? `${category.name}: ${category.description}`
      : categoryError
        ? `Course category information could not be loaded: ${categoryError}`
        : "A detailed course description is not currently available. Contact Us for more information.");
  const faqs = [
    {
      question: "What topics does this course cover?",
      answer: syllabusTopics.length
        ? syllabusTopics.join(", ")
        : "Contact Us for course topic details.",
    },
    {
      question: "How much does this course cost?",
      answer: feeIsAvailable ? fee : CONTACT_FOR_FEES,
    },
    {
      question: "How do I pay for the course?",
      answer: "Cash Payment – Direct Visit Only. You must visit the institute in person to make the payment.",
    },
  ];

  if (loading) {
    return <main className="page-main course-detail-page">
      <div className="course-detail-wrap"><p className="course-detail-status" role="status">Loading course details…</p></div>
    </main>;
  }

  if (courseError || notFound || !course) {
    return <main className="page-main course-detail-page">
      <div className="course-detail-wrap course-detail-notice">
        <Link className="course-detail-back" to="/courses"><ArrowLeft size={17} /> Back to Courses</Link>
        <section className="course-detail-state" role={courseError ? "alert" : undefined}>
          <h1>{courseError ? "Course details unavailable" : "Course not found"}</h1>
          <p>{courseError
            ? `We couldn't load this course: ${courseError}`
            : "This course is not available. Browse the current course catalog to find a course."}</p>
          <Link className="course-detail-secondary-link" to="/courses">Browse Courses <ArrowRight size={16} /></Link>
        </section>
      </div>
    </main>;
  }

  const courseName = course.name || course.title || "Course";
  const courseCategory = course.category_name || category?.name || "Category not specified";
  const toggleSection = (section) => {
    setOpenSection((current) => current === section ? null : section);
  };

  return <main className="page-main course-detail-page">
    <div className="course-detail-wrap">
      <Link className="course-detail-back" to="/courses"><ArrowLeft size={17} /> Back to Courses</Link>

      <section className="course-detail-hero" aria-labelledby="course-detail-title">
        <div className="course-detail-hero-copy">
          <span className="course-detail-kicker">{courseCategory}</span>
          <h1 id="course-detail-title">{courseName}</h1>
          <p className="course-detail-description">{courseDescription}</p>
          <CourseFacts fee={fee} category={courseCategory} />
        </div>
        <div className="course-detail-image">
          {course.image_url && !imageFailed
            ? <img src={course.image_url} alt={`${courseName} course`} onError={() => setImageFailed(true)} />
            : <span>{courseName}</span>}
        </div>
      </section>

      <CourseDetailSection
        id="learning-outcomes"
        title="What You'll Learn"
        isOpen={openSection === "learning-outcomes"}
        onToggle={() => toggleSection("learning-outcomes")}
      >
        {syllabusTopics.length
          ? <ul className="course-detail-topic-list">{syllabusTopics.map((topic, index) =>
            <li key={`${topic}-${index}`}>{topic}</li>
          )}</ul>
          : <p className="course-detail-muted">Contact Us for course topic details.</p>}
      </CourseDetailSection>

      <CourseDetailSection
        id="course-curriculum"
        title="Course Topics & Curriculum"
        isOpen={openSection === "course-curriculum"}
        onToggle={() => toggleSection("course-curriculum")}
      >
        {modules.length
          ? <>
            <p className="course-detail-muted">Explore the key topics and learning concepts covered in this course.</p>
            <div className="course-detail-modules">
              {modules.map((module) => <article className="course-detail-module" key={module.title}>
                <h3>{module.title}</h3>
                <ul>{module.topics.map((topic, index) => <li key={`${topic}-${index}`}>{topic}</li>)}</ul>
              </article>)}
            </div>
          </>
          : <p className="course-detail-muted">Contact Us for course curriculum details.</p>}
      </CourseDetailSection>

      <div className="course-detail-information-grid">
        <CourseDetailSection
          id="course-fees"
          title="Course Fees"
          className="course-detail-panel"
          isOpen={openSection === "course-fees"}
          onToggle={() => toggleSection("course-fees")}
        >
          <dl className="course-detail-data-list">
            <div><dt>Total Course Fees</dt><dd>{fee}</dd></div>
            <div><dt>Payment Options</dt><dd><strong>Cash Payment – Direct Visit Only</strong><p>You must visit the institute in person to make the payment.</p></dd></div>
          </dl>
        </CourseDetailSection>
        <CourseDetailSection
          id="class-timings"
          title="Class Timings"
          className="course-detail-panel course-detail-class-timings"
          isOpen={openSection === "class-timings"}
          onToggle={() => toggleSection("class-timings")}
        >
          <dl className="course-detail-data-list">
            {COURSE_BATCHES.map((batch) => <div key={batch.key}><dt>{batch.name}</dt><dd>{batch.timing}</dd></div>)}
          </dl>
          <section className="course-detail-available-batches" aria-labelledby="available-batches-title">
            <h3 id="available-batches-title">Available Batches</h3>
            <p className="course-detail-muted">{AVAILABLE_BATCHES_CONTACT_TEXT}</p>
          </section>
        </CourseDetailSection>
      </div>

      <CourseDetailSection
        id="course-faq"
        title="Frequently Asked Questions"
        isOpen={openSection === "course-faq"}
        onToggle={() => toggleSection("course-faq")}
      >
        <div className="course-detail-faqs">
          {faqs.map((faq, index) => <CourseFaqItem
            faq={faq}
            index={index}
            isOpen={openFaq === index}
            onToggle={() => setOpenFaq((current) => current === index ? null : index)}
            key={faq.question}
          />)}
        </div>
      </CourseDetailSection>

      <section className="course-detail-cta" aria-labelledby="course-detail-cta-title">
        <div>
          <span className="course-detail-kicker">Take the next step</span>
          <h2 id="course-detail-cta-title">Interested in This Course?</h2>
          <p>Take the next step towards your career with Decode Institution. Connect with our team to learn more about course details, fees, and batch timings.</p>
        </div>
        <Link className="course-detail-cta-button" to="/contact">
          Talk to Our Team <ArrowRight size={18} aria-hidden="true" />
        </Link>
      </section>
    </div>
  </main>;
}
