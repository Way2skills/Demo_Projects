import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CourseDetails from "./CourseDetails";
import { formatCourseFee } from "../courseUtils";
import api from "../services/api";

vi.mock("../services/api", () => ({
  default: { get: vi.fn(), post: vi.fn() },
  getErrorMessage: (error) => error?.message || "Request failed",
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

const course = {
  id: 8,
  slug: "java-full-stack",
  name: "Java Full Stack",
  category_id: 2,
  category_name: "Full Stack Development",
  description: null,
  syllabus: "HTML,CSS,JS | SPRING | DATABASE CONNECTIVITY",
  duration_hours: null,
  fee: 20000,
  image_url: "/uploads/java-full-stack.png",
  batch_availability: { batch_1: true, batch_2: false, batch_3: true, batch_4: false },
};

const category = {
  id: 2,
  name: "Full Stack Development",
  description: "Frontend, backend and full-stack web development.",
  ai_tools: "Bolt.new, Builder.io, Uizard",
};

const availableBatchesContactText = "Kindly contact our team to confirm your preferred batch timing. Please choose a suitable time from the four available batch timings listed above. Our team will assist you with batch confirmation.";

const existingCourseDetails = [
  {
    name: "Backend Development",
    slug: "backend-development",
    category_id: 2,
    category_name: "Full Stack Development",
    fee: 20000,
    syllabus: "ADVANCED CORE PROGRAMMING LANGUAGE ONLY PYTHON & JAVA MYSQL OR POSTGRESQL",
    topics: ["ADVANCED CORE PROGRAMMING LANGUAGE ONLY PYTHON & JAVA MYSQL OR POSTGRESQL"],
  },
  {
    name: "C and C++",
    slug: "c-and-c",
    category_id: 1,
    category_name: "Programming & Core Data",
    fee: 10000,
    syllabus: "Function|Array|String",
    topics: ["Function", "Array", "String"],
  },
  {
    name: "Database Development",
    slug: "database-development",
    category_id: 1,
    category_name: "Programming & Core Data",
    fee: 30000,
    syllabus: "EITHER CHOOSE ONE LANGUAGE MYSQL,POSTGRESQL,ORACLE",
    topics: ["EITHER CHOOSE ONE LANGUAGE MYSQL,POSTGRESQL,ORACLE"],
  },
  {
    name: "Java Full Stack",
    slug: "java-full-stack",
    category_id: 2,
    category_name: "Full Stack Development",
    fee: 20000,
    syllabus: "HTML,CSS,JS | SPRING | DATABASE CONNECTIVITY",
    topics: ["HTML", "CSS", "JS", "SPRING", "DATABASE CONNECTIVITY"],
  },
  {
    name: "Java Programming",
    slug: "java-programming",
    category_id: 1,
    category_name: "Programming & Core Data",
    fee: 14000,
    syllabus: "ONLY CORE CONCEPT OOPS EXCEPTION HANDLING WITH DB CONNECTIVITY",
    topics: ["ONLY CORE CONCEPT OOPS EXCEPTION HANDLING WITH DB CONNECTIVITY"],
  },
  {
    name: "Python Analytics",
    slug: "python-analytics",
    category_id: 3,
    category_name: "Data Analytics & AI",
    fee: 10000,
    syllabus: "POWER BI|ADVANCED EXCEL",
    topics: ["POWER BI", "ADVANCED EXCEL"],
  },
  {
    name: "Python Full Stack",
    slug: "python-full-stack",
    category_id: 2,
    category_name: "Full Stack Development",
    fee: 25000,
    syllabus: "HTML,CSS,JS REACT + DJANGO + FLASK + FAST API",
    topics: ["HTML", "CSS", "JS REACT", "DJANGO", "FLASK", "FAST API"],
  },
  {
    name: "Python Programming",
    slug: "python-programming",
    category_id: 1,
    category_name: "Programming & Core Data",
    fee: 17000,
    syllabus: "CORE CONCEPT DB CONNECTIVITY",
    topics: ["CORE CONCEPT DB CONNECTIVITY"],
  },
  {
    name: "UI/UX Designing (Figma)",
    slug: "ui-ux-designing-figma",
    category_id: 4,
    category_name: "Creative, Business & Digital",
    fee: 5000,
    syllabus: "FIGMA|CANVA",
    topics: ["FIGMA", "CANVA"],
  },
  {
    name: "Web Designing (HTML, CSS and JS)",
    slug: "web-designing-html-css-and-js",
    category_id: 2,
    category_name: "Full Stack Development",
    fee: 17000,
    syllabus: "HTML,CSS,JS & REACT",
    topics: ["HTML", "CSS", "JS & REACT"],
  },
];

function renderCourseDetails(initialEntry = "/courses/java-full-stack") {
  return render(<MemoryRouter initialEntries={[initialEntry]}>
    <Routes>
      <Route path="/courses/:slug" element={<CourseDetails />} />
      <Route path="/courses" element={<h1>Course Catalog</h1>} />
      <Route path="/contact" element={<h1>Contact Us page</h1>} />
    </Routes>
  </MemoryRouter>);
}

describe("course details", () => {
  it.each(existingCourseDetails)("preserves details for $name", async (existingCourse) => {
    const courseData = {
      ...existingCourse,
      batch_availability: { batch_1: true, batch_2: true, batch_3: true, batch_4: true },
    };
    api.get.mockImplementation((path) => Promise.resolve({
      data: {
        items: path === "/courses"
          ? [courseData]
          : [{ id: existingCourse.category_id, name: existingCourse.category_name, description: null }],
      },
    }));

    renderCourseDetails(`/courses/${existingCourse.slug}`);

    expect(await screen.findByRole("heading", { name: existingCourse.name, level: 1 })).toBeInTheDocument();
    expect(screen.getByText(existingCourse.category_name, { selector: ".course-detail-kicker" })).toBeInTheDocument();
    expect(screen.getAllByText(formatCourseFee(existingCourse.fee)).length).toBeGreaterThan(0);
    const learningSection = screen.getByRole("button", { name: "Expand What You'll Learn" }).closest("section");
    const curriculumSection = screen.getByRole("button", { name: "Expand Course Topics & Curriculum" }).closest("section");
    expect(within(curriculumSection).getByText("Explore the key topics and learning concepts covered in this course.")).toBeInTheDocument();
    expect(within(curriculumSection).queryByText(/Curriculum entries are grouped from the syllabus provided for this course|official module breakdown is not specified/)).not.toBeInTheDocument();
    for (const topic of existingCourse.topics) {
      expect(within(learningSection).getByText(topic)).toBeInTheDocument();
      expect(within(curriculumSection).getByText(topic)).toBeInTheDocument();
    }
    const availableBatchSection = screen.getByRole("region", { name: "Available Batches" });
    expect(within(availableBatchSection).getByText(availableBatchesContactText)).toBeInTheDocument();
    expect(availableBatchSection.querySelectorAll("li")).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "Expand Frequently Asked Questions" }));
    for (const question of [
      "What topics does this course cover?",
      "How much does this course cost?",
      "How do I pay for the course?",
    ]) {
      expect(screen.getByRole("button", { name: question })).toBeInTheDocument();
    }
    expect(screen.queryByRole("button", { name: "What batch timings are available?" })).not.toBeInTheDocument();
    const classTimingsSection = screen.getByRole("button", { name: "Expand Class Timings" }).closest("section");
    const timingRows = Array.from(classTimingsSection.querySelectorAll(".course-detail-data-list > div"));
    expect(timingRows.map((row) => `${row.querySelector("dt").textContent} ${row.querySelector("dd").textContent}`)).toEqual([
      "Batch 1 10:00 AM – 12:00 PM",
      "Batch 2 1:00 PM – 3:00 PM",
      "Batch 3 3:00 PM – 5:30 PM",
      "Batch 4 6:00 PM – 8:00 PM",
    ]);
  });

  it("loads course-specific data by slug and displays only a Contact Us CTA", async () => {
    api.get.mockImplementation((path) => {
      if (path === "/courses") return Promise.resolve({ data: { items: [course] } });
      if (path === "/course-categories") return Promise.resolve({ data: { items: [category] } });
      return Promise.reject(new Error(`Unexpected request: ${path}`));
    });

    renderCourseDetails();

    expect(await screen.findByRole("heading", { name: "Java Full Stack", level: 1 })).toBeInTheDocument();
    expect(screen.getByText("Full Stack Development: Frontend, backend and full-stack web development.")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Java Full Stack course" })).toHaveAttribute("src", course.image_url);
    expect(screen.getAllByText("₹20,000.00")).toHaveLength(3);
    expect(screen.getAllByText("HTML").length).toBeGreaterThan(0);
    expect(screen.getAllByText("CSS").length).toBeGreaterThan(0);
    expect(screen.getAllByText("JS").length).toBeGreaterThan(0);
    expect(screen.getAllByText("SPRING").length).toBeGreaterThan(0);
    expect(screen.getAllByText("DATABASE CONNECTIVITY").length).toBeGreaterThan(0);
    expect(screen.getByText("Cash Payment – Direct Visit Only")).toBeInTheDocument();
    expect(screen.getByText("You must visit the institute in person to make the payment.")).toBeInTheDocument();
    expect(screen.getByText("10:00 AM – 12:00 PM")).toBeInTheDocument();
    expect(screen.getByText("1:00 PM – 3:00 PM")).toBeInTheDocument();
    expect(screen.getByText("3:00 PM – 5:30 PM")).toBeInTheDocument();
    expect(screen.getByText("6:00 PM – 8:00 PM")).toBeInTheDocument();
    const availableBatchSection = screen.getByRole("region", { name: "Available Batches" });
    expect(within(availableBatchSection).getByText(availableBatchesContactText)).toBeInTheDocument();
    expect(availableBatchSection.querySelectorAll("li")).toHaveLength(0);
    expect(screen.queryByText("Discounts or Offers")).not.toBeInTheDocument();
    expect(screen.queryByText("Course Duration")).not.toBeInTheDocument();
    expect(screen.queryByText("Total Learning Hours")).not.toBeInTheDocument();
    expect(screen.queryByText("Additional Course Information")).not.toBeInTheDocument();
    expect(screen.queryByText("Bolt.new")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Back to Courses" })).toHaveAttribute("href", "/courses");
    expect(screen.getAllByRole("link", { name: /Talk to Our Team/ })).toHaveLength(1);
    expect(screen.getByRole("link", { name: /Talk to Our Team/ })).toHaveAttribute("href", "/contact");
    expect(screen.queryByText(/Enroll Now/i)).not.toBeInTheDocument();
    expect(api.get).toHaveBeenCalledWith("/courses");
    expect(api.get).toHaveBeenCalledWith("/course-categories");

    fireEvent.click(screen.getByRole("link", { name: /Talk to Our Team/ }));
    expect(await screen.findByRole("heading", { name: "Contact Us page" })).toBeInTheDocument();
  });

  it("does not invent a syllabus, fee, or batch availability when they are missing", async () => {
    api.get.mockImplementation((path) => Promise.resolve({
      data: { items: path === "/courses" ? [{
        ...course,
        fee: null,
        syllabus: null,
        batch_availability: { batch_1: false, batch_2: false, batch_3: false, batch_4: false },
      }] : [category] },
    }));

    renderCourseDetails();

    expect(await screen.findByRole("heading", { name: "Java Full Stack", level: 1 })).toBeInTheDocument();
    expect(screen.getAllByText("Contact Us for Fee Details").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Contact Us for course topic details.").length).toBeGreaterThan(0);
    const availableBatchSection = screen.getByRole("region", { name: "Available Batches" });
    expect(within(availableBatchSection).getByText(availableBatchesContactText)).toBeInTheDocument();
    expect(within(availableBatchSection).queryByText("No batches are currently available.")).not.toBeInTheDocument();
    expect(screen.queryByText(/duration|learning hours/i)).not.toBeInTheDocument();
    expect(screen.queryByText("Project details are not specified. Contact Us to ask about hands-on learning.")).not.toBeInTheDocument();
  });

  it("allows one course information section at a time and expands FAQ answers independently", async () => {
    api.get.mockImplementation((path) => Promise.resolve({
      data: { items: path === "/courses" ? [course] : [category] },
    }));

    renderCourseDetails();

    expect(await screen.findByRole("heading", { name: "Java Full Stack", level: 1 })).toBeInTheDocument();

    const sectionNames = [
      "What You'll Learn",
      "Course Topics & Curriculum",
      "Course Fees",
      "Class Timings",
      "Frequently Asked Questions",
    ];
    for (const title of sectionNames) {
      expect(screen.getByRole("button", { name: `Expand ${title}` })).toHaveAttribute("aria-expanded", "false");
    }

    fireEvent.click(screen.getByRole("button", { name: "Expand What You'll Learn" }));
    expect(screen.getByRole("button", { name: "Collapse What You'll Learn" })).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(screen.getByRole("button", { name: "Expand Course Fees" }));
    expect(screen.getByRole("button", { name: "Expand What You'll Learn" })).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByRole("button", { name: "Collapse Course Fees" })).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(screen.getByRole("button", { name: "Expand Frequently Asked Questions" }));
    const faqQuestion = screen.getByRole("button", { name: "What topics does this course cover?" });
    expect(faqQuestion).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(faqQuestion);
    expect(faqQuestion).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByText("HTML, CSS, JS, SPRING, DATABASE CONNECTIVITY").parentElement).toHaveAttribute("aria-hidden", "false");
    fireEvent.click(faqQuestion);
    expect(faqQuestion).toHaveAttribute("aria-expanded", "false");
  });

  it("shows a not-found state for an unknown course slug", async () => {
    api.get.mockResolvedValue({ data: { items: [course] } });

    renderCourseDetails("/courses/not-a-course");

    expect(await screen.findByRole("heading", { name: "Course not found" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Browse Courses" })).toHaveAttribute("href", "/courses");
    expect(screen.queryByRole("link", { name: /Talk to Our Team/ })).not.toBeInTheDocument();
  });
});
