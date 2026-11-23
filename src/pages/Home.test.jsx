import { afterEach, describe, expect, it, vi } from "vitest";
import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Home from "./Home";
import api from "../services/api";

vi.mock("../services/api", () => ({
  default: { get: vi.fn() },
  getErrorMessage: (error) => error?.message || "Request failed",
}));

afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe("homepage hero typewriter", () => {
  it("preserves all learning paths, descriptions, courses, and category tools", async () => {
    const categories = [
      { id: 1, name: "Programming & Core Data", description: "Programming description", ai_tools: "GitHub Copilot, Cursor" },
      { id: 2, name: "Full Stack Development", description: "Full stack description", ai_tools: "Bolt.new, Builder.io" },
      { id: 3, name: "Data Analytics & AI", description: "Analytics description", ai_tools: "Deepnote, Orange" },
      { id: 4, name: "Creative, Business & Digital", description: "Creative description", ai_tools: "Gemini, Stitch" },
    ];
    const courses = categories.map((category, index) => ({
      id: index + 1,
      category_id: category.id,
      category_name: category.name,
      name: `Course ${index + 1}`,
    }));
    api.get.mockImplementation((path) => Promise.resolve({
      data: { items: path === "/courses" ? courses : categories },
    }));
    const { container } = render(<MemoryRouter><Home /></MemoryRouter>);

    expect(await screen.findByRole("heading", { name: "Programming & Core Data" })).toBeInTheDocument();
    expect(container.querySelectorAll(".courses-grid .course-card")).toHaveLength(4);
    for (const text of [
      "Programming description",
      "Full stack description",
      "Analytics description",
      "Creative description",
      "Course 1",
      "Course 2",
      "Course 3",
      "Course 4",
      "AI tools: GitHub Copilot, Cursor",
      "AI tools: Bolt.new, Builder.io",
      "AI tools: Deepnote, Orange",
      "AI tools: Gemini, Stitch",
    ]) {
      expect(screen.getByText(text)).toBeInTheDocument();
    }
  });

  it("hides Kids course categories and their courses from public listings", async () => {
    api.get.mockImplementation((path) => {
      if (path === "/courses") return Promise.resolve({ data: { items: [
        { id: 1, name: "Python Basics", category_id: 1, category_name: "Programming" },
        { id: 2, name: "Scratch Club", category_id: 2, category_name: "Kids Courses" },
        { id: 3, name: "React Basics", category_id: 3, category_name: "Full Stack Development" },
      ] } });
      if (path === "/course-categories") return Promise.resolve({ data: { items: [
        { id: 1, name: "Programming" },
        { id: 2, name: "Kids Courses" },
        { id: 3, name: "Full Stack Development" },
      ] } });
      return Promise.resolve({ data: { items: [] } });
    });

    render(<MemoryRouter><Home /></MemoryRouter>);

    expect(await screen.findByRole("heading", { name: "Programming" })).toBeInTheDocument();
    expect(screen.getByText("Python Basics")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Kids Courses" })).not.toBeInTheDocument();
    expect(screen.queryByText("Scratch Club")).not.toBeInTheDocument();
    expect(screen.getByText("2 courses currently available.")).toBeInTheDocument();
  });

  it("keeps each initial visible while typing and deleting the suffix", () => {
    vi.useFakeTimers();
    api.get.mockResolvedValue({ data: { items: [] } });
    const { container } = render(<MemoryRouter><Home /></MemoryRouter>);
    const typewriter = container.querySelector(".hero-typewriter");
    const initial = () => container.querySelector(".hero-typewriter-initial").textContent;

    expect(screen.getByRole("heading", { name: "Turn Passion Into Profession" })).toBeInTheDocument();
    expect(initial()).toBe("P");

    for (let tick = 0; tick < 9; tick += 1) {
      act(() => vi.advanceTimersByTime(90));
    }
    expect(typewriter.textContent).toContain("Profession");

    act(() => vi.advanceTimersByTime(2500));
    for (let tick = 0; tick < 4; tick += 1) {
      act(() => vi.advanceTimersByTime(45));
    }
    expect(initial()).toBe("P");

    for (let tick = 0; tick < 5; tick += 1) {
      act(() => vi.advanceTimersByTime(45));
    }
    act(() => vi.advanceTimersByTime(250));
    act(() => vi.advanceTimersByTime(90));
    expect(initial()).toBe("D");
    expect(typewriter.textContent.startsWith("D")).toBe(true);
  });

  it("places the technology marquee after the hero and keeps courses before the remaining sections", () => {
    api.get.mockResolvedValue({ data: { items: [] } });
    const { container } = render(<MemoryRouter><Home /></MemoryRouter>);
    const mainSections = Array.from(container.querySelector("main").children);
    const visibleLogos = container.querySelectorAll(".technology-sequence:not([aria-hidden='true']) .technology-logo span");

    expect(mainSections[0]).toHaveClass("hero");
    expect(mainSections[1]).toHaveClass("technology-section");
    expect(mainSections[2]).toHaveClass("courses-section");
    expect(mainSections[3]).toHaveClass("intro-section");
    expect(Array.from(visibleLogos, (logo) => logo.textContent)).toEqual([
      "Python", "Power BI", "React", "PostgreSQL", "MySQL", "Figma",
    ]);
    expect(screen.queryByText(/curiosity,\s*meet craft/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/scroll to explore/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/PRACTICAL SKILLS\.\s*REAL-WORLD THINKING/i)).not.toBeInTheDocument();
    expect(container.querySelector(".programs-section")).toBeNull();
    expect(api.get).not.toHaveBeenCalledWith("/authorized-programs");
  });

  it("shows the requested FAQ answers only when their questions are expanded", () => {
    api.get.mockResolvedValue({ data: { items: [] } });
    const { container } = render(<MemoryRouter><Home /></MemoryRouter>);

    expect(screen.getByRole("heading", { name: "Frequently Asked Questions" })).toBeInTheDocument();
    expect(screen.queryByText(/INSIDE DECODE|Ideas in action|Gallery highlights will appear here/i)).not.toBeInTheDocument();
    expect(api.get).not.toHaveBeenCalledWith("/faqs");
    expect(api.get).not.toHaveBeenCalledWith("/gallery");

    const coursesQuestion = screen.getByRole("button", { name: "What courses does Decode Institution offer in Namakkal?" });
    expect(coursesQuestion).toHaveAttribute("aria-expanded", "false");
    expect(coursesQuestion.closest(".faq-item").querySelector(".faq-toggle .lucide-plus")).toBeInTheDocument();
    fireEvent.click(coursesQuestion);
    expect(coursesQuestion).toHaveAttribute("aria-expanded", "true");
    expect(coursesQuestion.closest(".faq-item").querySelector(".faq-toggle .lucide-minus")).toBeInTheDocument();
    expect(screen.getByText("Full Stack Development (Java, Python, MERN)")).toBeInTheDocument();
    fireEvent.click(coursesQuestion);
    expect(coursesQuestion).toHaveAttribute("aria-expanded", "false");
    expect(container.querySelector("#homepage-faq-courses")).toHaveAttribute("aria-hidden", "true");

    fireEvent.click(screen.getByRole("button", { name: "Where is Decode Institution located?" }));
    expect(screen.getByRole("link", { name: "infodecode@code.com" })).toHaveAttribute("href", "mailto:infodecode@code.com");
    expect(screen.getByRole("link", { name: "+91 63812 43416" })).toHaveAttribute("href", "tel:+916381243416");

    fireEvent.click(screen.getByRole("button", { name: "Does Decode provide placement support and internship certification?" }));
    expect(screen.getByText("Dedicated campus drive placement assistance.")).toBeInTheDocument();
  });

  it("omits the company logo and trainer profile sections from Home", () => {
    api.get.mockResolvedValue({ data: { items: [] } });
    const { container } = render(<MemoryRouter><Home /></MemoryRouter>);

    expect(container.querySelector("#placements")).toBeNull();
    expect(container.querySelector("#trainers")).toBeNull();
    expect(container.querySelector(".placement-carousel")).toBeNull();
    expect(container.querySelector(".placement-carousel-controls")).toBeNull();
    expect(container.querySelector(".trainer-grid")).toBeNull();
    expect(screen.queryByRole("heading", { name: "From the Classroom to Companies" })).not.toBeInTheDocument();
    expect(screen.queryByText("Our alumni are placed in top companies")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "MEET THE BRAINS BEHIND DECODE" })).not.toBeInTheDocument();
    expect(screen.queryByText("Passionate People, Exceptional Talents")).not.toBeInTheDocument();
    expect(api.get).not.toHaveBeenCalledWith("/trainers");
  });

  it("omits the certificate verification promotion from Home", () => {
    api.get.mockResolvedValue({ data: { items: [] } });
    const { container } = render(<MemoryRouter><Home /></MemoryRouter>);

    expect(container.querySelector(".certificate-banner")).toBeNull();
    expect(screen.queryByRole("heading", { name: /Have a certificate/ })).not.toBeInTheDocument();
    expect(screen.queryByText(/Verify a Decode Institution certificate against our records/)).not.toBeInTheDocument();
    expect(screen.queryByRole("link", { name: /Verify certificate/ })).not.toBeInTheDocument();
  });

  it("removes the Kids Coding and Learn By Doing sections from Home", () => {
    api.get.mockResolvedValue({ data: { items: [] } });
    const { container } = render(<MemoryRouter><Home /></MemoryRouter>);

    expect(container.querySelector("#kids-courses")).toBeNull();
    expect(container.querySelector("#internships")).toBeNull();
    for (const text of [
      "AGES 7–14 · 30 HOURS",
      "Big ideas.",
      "Little coders.",
      "AI Magic Lab",
      "Game Maker Studio",
      "Python Code Quest",
      "Scratch Game Heroes",
      "Web Creator Lab",
      "LEARN BY DOING",
      "Make room",
      "real practice.",
      "Explore opportunities",
    ]) {
      expect(screen.queryByText(text)).not.toBeInTheDocument();
    }
    expect(api.get).not.toHaveBeenCalledWith("/kids-courses");
    expect(api.get).not.toHaveBeenCalledWith("/internships");
  });
});
