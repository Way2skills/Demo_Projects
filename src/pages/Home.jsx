
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Braces,
  ChartNoAxesCombined,
  Code2,
  Compass,
  Palette,
  Sparkles,
  Target,
  Plus,
  Minus,
} from "lucide-react";
import {
  SiFigma,
  SiMysql,
  SiPostgresql,
  SiPython,
  SiReact,
} from "react-icons/si";
import api, { getErrorMessage } from "../services/api";
import { useInstitutionSettings } from "../context/SettingsContext";
import { isKidsCourseCategory } from "../courseCategories";
import "./HomeFaq.css";
import "./HomeValues.css";

const categoryIcons = [Braces, Code2, ChartNoAxesCombined, Palette];
const categoryTones = ["blue", "violet", "gold", "green"];

const heroWords = [
  "Full Stack",
  "AI",
  "Programming",
  "DataBase",
  "Designing",
];

const homepageFaqs = [
  {
    id: "courses",
    question: "What courses does Decode Institution offer in Namakkal?",
    answer: (
      <>
        <p>
          Decode offers a comprehensive catalog of 35+ industry-aligned courses
          across 6 key disciplines:
        </p>
        <ul>
          <li>Full Stack Development (Java, Python, MERN)</li>
          <li>Programming &amp; Core Data (C/C++, DSA, .NET, Kotlin)</li>
          <li>
            Data Analytics &amp; Agentic AI (Python ML, Power BI, Tableau, SQL
            Analytics)
          </li>
          <li>
            Creative &amp; Digital Design (UI/UX Figma, Graphic Design, Mobile
            Apps, Video Editing)
          </li>
          <li>
            Authorized Accounting Suites (Zoho Books &amp; TallyPrime with GST).
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "location",
    question: "Where is Decode Institution located?",
    answer: (
      <>
        <p>
          No: 4 Cross, Near New Bus Stand,
          <br />
          Namakkal 637 001,
          <br />
          Tamil Nadu, India.
        </p>
        <p>
          Email: <a href="mailto:infodecode@code.com">infodecode@code.com</a>
        </p>
        <p>
          Phone: <a href="tel:+91 63812 43416">+91 63812 43416</a>
        </p>
      </>
    ),
  },
  {
    id: "placements",
    question:
      "Does Decode provide placement support and internship certification?",
    answer: (
      <>
        <p>
          Yes. Decode has facilitated over 5,000+ career placements in leading
          MNCs and IT product companies.
        </p>
        <p>All career-track programs include:</p>
        <ul>
          <li>Hands-on live project development.</li>
          <li>A free 1-month corporate internship.</li>
          <li>Professional resume building.</li>
          <li>Technical mock interviews.</li>
          <li>Dedicated campus drive placement assistance.</li>
        </ul>
      </>
    ),
  },
];

const technologyLogos = [
  { name: "Python", Icon: SiPython, color: "#3776AB" },
  { name: "Power BI", Icon: PowerBiLogo, color: "#F2C811" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#4169E1" },
  { name: "MySQL", Icon: SiMysql, color: "#4479A1" },
  { name: "Figma", Icon: SiFigma, color: "#F24E1E" },
];

function PowerBiLogo({ size = 40 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M32 5a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v38h-12V5Z" />
      <path
        d="M17 18a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v25H17V18Z"
        opacity=".82"
      />
      <path
        d="M2 30a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v13H2V30Z"
        opacity=".65"
      />
    </svg>
  );
}

function TechnologyMarquee() {
  return (
    <section className="technology-section" aria-label="Technology logos">
      <div className="technology-marquee">
        <div className="technology-track">
          {[0, 1].map((copy) => (
            <div
              className="technology-sequence"
              key={copy}
              aria-hidden={copy === 1}
            >
              {technologyLogos.map(({ name, Icon, color }) => (
                <div className="technology-logo" key={name}>
                  <Icon
                    className="technology-logo-icon"
                    style={{ color }}
                    aria-hidden="true"
                  />
                  <span>{name}</span>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CoursePreview({ category, courses, index }) {
  const Icon = categoryIcons[index % categoryIcons.length];

  return (
    <article className={`course-card ${categoryTones[index % categoryTones.length]}`}>
      <div className="course-icon"><Icon size={22} /></div>
      <p className="eyebrow">LEARNING PATH</p>
      <h3>{category.name}</h3>
      <p className="course-description">
        {category.description || "Explore practical learning paths in this subject area."}
      </p>
      <ul>
        {courses.slice(0, 4).map((course) => (
          <li key={course.id}>{course.name}</li>
        ))}
      </ul>
      {category.ai_tools && (
        <div className="course-tools"><Sparkles size={14} /> AI tools: {category.ai_tools}</div>
      )}
    </article>
  );
}

export function AboutContent() {
  const { settings } = useInstitutionSettings();

  return (
    <section className="intro-section section-wrap home-values" id="about">
      <div className="home-values-inner">
        <header className="home-values-heading">
          <span className="home-values-eyebrow">OUR PHILOSOPHY</span>
          <h2>
            Built on Values,
            <br />
            <span>Driven by Innovation</span>
          </h2>
          <p>
            {settings.about_content ||
              `${settings.institution_name} is a learning space in Namakkal for curious minds and determined builders. We focus on useful skills, guided practice and the confidence to take your next step.`}
          </p>
        </header>

        <div className="values-grid" id="approach">
        {[
          ["01", "Practice with purpose", "Work through guided exercises and meaningful projects—not just slides.", Target],
          ["02", "Learn by building", "Connect concepts to practical challenges, one step at a time.", Code2],
          ["03", "Grow with guidance", "Get support as you build confidence and your own learning habits.", Compass],
        ].map(([n, title, text, Icon]) => (
          <article className="value-card" key={n}>
            <div className="home-value-card-top">
              <span className="home-value-number">{n}</span>
              <span className="home-value-icon" aria-hidden="true"><Icon size={21} strokeWidth={1.7} /></span>
            </div>
            <h3>{title}</h3>
            <p>{text}</p>
          </article>
        ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const [courses, setCourses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [openFaq, setOpenFaq] = useState(null);
  const [error, setError] = useState("");
  const [heroWordIndex, setHeroWordIndex] = useState(0);
  const [heroWordSuffix, setHeroWordSuffix] = useState("");
  const [isDeletingHeroWord, setIsDeletingHeroWord] = useState(false);

  const heroWord = heroWords[heroWordIndex];

  const kidsCategoryIds = new Set(
    categories
      .filter((category) => isKidsCourseCategory(category.name))
      .map((category) => String(category.id))
  );

  const visibleCategories = categories.filter(
    (category) => !isKidsCourseCategory(category.name)
  );

  const visibleCourses = courses.filter(
    (course) =>
      !isKidsCourseCategory(course.category_name) &&
      !kidsCategoryIds.has(String(course.category_id))
  );

  useEffect(() => {
    let timeoutId;
    const suffixLength = heroWord.length - 1;

    if (!isDeletingHeroWord) {
      if (heroWordSuffix.length < suffixLength) {
        timeoutId = setTimeout(() => {
          setHeroWordSuffix(heroWord.slice(1, heroWordSuffix.length + 2));
        }, 90);
      } else {
        timeoutId = setTimeout(() => setIsDeletingHeroWord(true), 2500);
      }
    } else if (heroWordSuffix.length > 0) {
      timeoutId = setTimeout(() => {
        setHeroWordSuffix((suffix) => suffix.slice(0, -1));
      }, 45);
    } else {
      timeoutId = setTimeout(() => {
        setHeroWordIndex((index) => (index + 1) % heroWords.length);
        setIsDeletingHeroWord(false);
      }, 250);
    }

    return () => clearTimeout(timeoutId);
  }, [heroWord, heroWordSuffix, isDeletingHeroWord]);

  useEffect(() => {
    api.get("/courses")
      .then(({ data }) => setCourses(data.items || data))
      .catch((reason) => setError(getErrorMessage(reason)));

    api.get("/course-categories")
      .then(({ data }) => setCategories(data.items || data))
      .catch((reason) => setError(getErrorMessage(reason)));
  }, []);

  return (
    <>
      <main>
        <section className="hero">
          <div className="hero-grid">
            <div className="hero-copy">
              <h1 aria-label={`Turn Passion Into ${heroWord}`}>
                <span className="hero-heading-static">
                  Turn Passion<br />Into{" "}
                </span>
                <span className="hero-typewriter" aria-hidden="true">
                  <span className="hero-typewriter-initial">{heroWord[0]}</span>
                  {heroWordSuffix}
                  <span className="hero-typewriter-cursor" />
                </span>
              </h1>

              <p className="hero-intro">
                Learn Design, Full Stack Development, Data Analytics and Emerging Technologies.
              </p>
              <div className="hero-actions">
                <Link className="button button-primary" to="/courses">
                  Explore courses <ArrowRight size={17} />
                </Link>
                <Link className="button button-quiet" to="/contact">
                  Talk to our team <ArrowUpRight size={16} />
                </Link>
              </div>
              <div className="hero-meta">
                <span><i /> Hands-on learning</span>
                <span><i /> Learn at your pace</span>
              </div>
            </div>

            <div className="hero-art" aria-label="Abstract illustration representing code and creative learning">
              <div className="hero-art-grid" />
              <div className="art-orbit orbit-one" />
              <div className="art-orbit orbit-two" />
              <div className="art-glow" />
              <div className="hero-shape hero-cube" />
              <div className="hero-shape hero-sphere" />
              <div className="hero-shape hero-ring" />
              <div className="hero-laptop">
                <div className="code-window">
                  <div className="window-top">
                    <span /><span /><span />
                    <b className="hero-window-motto">AIM HIGH FLY HIGH</b>
                  </div>
                  <div className="code-content">
                    <div><em>01</em> <strong>const</strong> future = <i>"yours"</i>;</div>
                    <div><em>02</em></div>
                    <div><em>03</em> <strong>function</strong> <b>buildSkills</b>() {"{"}</div>
                    <div><em>04</em> &nbsp; learn(<i>"by doing"</i>);</div>
                    <div><em>05</em> &nbsp; create(<i>"what matters"</i>);</div>
                    <div><em>06</em> {"}"}</div>
                    <div className="code-cursor"><em>07</em> <span>_</span></div>
                  </div>
                  <div className="window-status">
                    <span><i /> Ready to grow</span>
                    <span>Namakkal, TN</span>
                  </div>
                </div>
                <div className="laptop-base">
                  <span />
                </div>
              </div>
              <div className="hero-tech-badge tech-react"><SiReact /><span>React</span></div>
              <div className="hero-tech-badge tech-python"><SiPython /><span>Python</span></div>
              <div className="hero-tech-badge tech-ai"><Sparkles /><span>AI</span></div>
              <div className="hero-tech-badge tech-data"><ChartNoAxesCombined /><span>Data</span></div>
              <div className="floating-tag tag-bottom">
                <div className="tag-bars"><i /><i /><i /><i /></div>
                <span>Skills for what's next</span>
              </div>
            </div>
          </div>
        </section>

        <TechnologyMarquee />

        <section className="courses-section" id="courses">
          <div className="section-wrap">
            <div className="section-top">
              <div>
                <h2>Curiosity has<br /><span>a curriculum.</span></h2>
              </div>
              <Link className="text-link" to="/courses">
                Browse all courses <ArrowRight size={16} />
              </Link>
            </div>

            {error && <div className="notice">Course listings could not be loaded: {error}</div>}

            <div className="courses-grid">
              {visibleCategories.map((category, index) => (
                <CoursePreview
                  key={category.id}
                  category={category}
                  index={index}
                  courses={visibleCourses.filter((course) => course.category_id === category.id)}
                />
              ))}
            </div>

            {visibleCategories.length === 0 && !error && (
              <div className="empty-state"><p>Course categories are not available yet.</p></div>
            )}
            {visibleCourses.length > 0 && (
              <p className="api-note">
                {visibleCourses.length} course{visibleCourses.length === 1 ? "" : "s"} currently available.
              </p>
            )}
          </div>
        </section>

        <AboutContent />

        <section className="faq-section section-wrap home-faq" id="faqs" aria-labelledby="home-faq-heading">
          <div className="home-faq-layout">
            <header className="home-faq-copy">
              <span className="home-faq-eyebrow">GOT QUESTIONS?</span>
              <h2 className="faq-heading" id="home-faq-heading">Frequently Asked Questions</h2>
              <p>Find answers to common questions about our courses, admissions, training and programs.</p>
              <span className="home-faq-accent" aria-hidden="true"><i /><i /><i /></span>
            </header>
            <div className="faq-list">
              {homepageFaqs.map(({ id, question, answer }, index) => {
              const isOpen = openFaq === id;
              const answerId = `homepage-faq-${id}`;

              return (
                <article className={`faq-item${isOpen ? " is-open" : ""}`} key={id}>
                  <h3 className="faq-question">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={answerId}
                      onClick={() => setOpenFaq(isOpen ? null : id)}
                    >
                      <span className="home-faq-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                      <span className="home-faq-question-text">{question}</span>
                      <span className="faq-toggle" aria-hidden="true">
                        {isOpen ? <Minus size={18} /> : <Plus size={18} />}
                      </span>
                    </button>
                  </h3>
                  <div
                    id={answerId}
                    className={`faq-answer${isOpen ? " is-open" : ""}`}
                    aria-hidden={!isOpen}
                    inert={isOpen ? undefined : ""}
                  >
                    <div className="faq-answer-content">{answer}</div>
                  </div>
                </article>
              );
            })}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
