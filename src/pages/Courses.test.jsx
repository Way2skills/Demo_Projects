import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Courses from "./Courses";
import api from "../services/api";

vi.mock("../services/api", () => ({
  default: { get: vi.fn(), post: vi.fn() },
  getErrorMessage: (error) => error?.message || "Request failed",
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function renderCourses() {
  return render(<MemoryRouter><Courses /></MemoryRouter>);
}

describe("course pagination", () => {
  it("links each catalog course to its unique slug-based details route", async () => {
    const items = Array.from({ length: 10 }, (_, index) => ({
      id: index + 1,
      slug: `course-${index + 1}`,
      name: `Course ${index + 1}`,
      category_name: "Programming",
    }));
    api.get.mockResolvedValue({ data: { items } });

    renderCourses();

    const courseLinks = await screen.findAllByRole("link", { name: /View details for Course/ });
    expect(courseLinks).toHaveLength(10);
    expect(courseLinks.map((link) => link.getAttribute("href"))).toEqual(
      items.map((course) => `/courses/${course.slug}`)
    );
    expect(courseLinks.every((link) => link.querySelector(".course-card-details-link"))).toBe(true);
  });

  it("shows dynamic course details and image but omits Kids courses", async () => {
    api.get.mockResolvedValue({ data: { items: [
      { id: 11, slug: "backend-development", name: "Backend Development", fee: 20000, syllabus: "Advanced core programming language only Python and Java, MySQL or PostgreSQL", image_url: "/uploads/backend.png", category_name: "Full Stack Development" },
      { id: 1, slug: "python-basics", name: "Python Basics", fee: 2500, syllabus: "Python\nData structures", image_url: "/uploads/python.png", category_name: "Programming" },
      { id: 2, name: "Scratch Club", category_name: "Kids Courses" },
      { id: 3, name: "Junior Web Lab", category_name: "Kids Coding & AI Labs" },
      { id: 4, name: "React Basics", category_name: "Full Stack Development" },
    ] } });

    renderCourses();

    const backendCard = await screen.findByRole("link", { name: "View details for Backend Development" });
    expect(backendCard).toHaveClass("course-catalog-card--full-topics");
    expect(within(backendCard).getByText("Advanced core programming language only Python and Java, MySQL or PostgreSQL")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "View details for Python Basics" })).not.toHaveClass("course-catalog-card--full-topics");
    expect(await screen.findByRole("heading", { name: "Python Basics" })).toBeInTheDocument();
    expect(screen.getByText("₹2,500.00")).toBeInTheDocument();
    expect(screen.getByText(/Python\s+Data structures/)).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Python Basics" })).toHaveAttribute("src", "/uploads/python.png");
    expect(screen.getByRole("heading", { name: "React Basics" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Scratch Club" })).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Junior Web Lab" })).not.toBeInTheDocument();
    expect(screen.getByText("Showing 1–3 of 3 courses")).toBeInTheDocument();
  });

  it("shows ten dynamic courses per page and navigates the final eight without duplicates", async () => {
    const items = Array.from({ length: 28 }, (_, index) => ({
      id: index + 1,
      name: `Course ${index + 1}`,
      category_name: "Programming",
    }));
    api.get.mockResolvedValue({ data: { items } });
    const { container } = renderCourses();
    const courseNames = () => Array.from(container.querySelectorAll(".listing-card h2"), (heading) => heading.textContent);

    expect(await screen.findByRole("heading", { name: "Course 1" })).toBeInTheDocument();
    expect(screen.queryByRole("link", { name: "Home" })).not.toBeInTheDocument();
    expect(screen.queryByText("LEARNING PATHS")).not.toBeInTheDocument();
    expect(screen.getByText("Showing 1–10 of 28 courses")).toBeInTheDocument();
    expect(courseNames()).toEqual(items.slice(0, 10).map((course) => course.name));

    const pagination = screen.getByRole("navigation", { name: "Course pages" });
    expect(within(pagination).getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(within(pagination).getByRole("button", { name: "Next" })).toBeEnabled();

    fireEvent.click(within(pagination).getByRole("button", { name: "Page 2" }));
    expect(screen.getByText("Showing 11–20 of 28 courses")).toBeInTheDocument();
    expect(within(pagination).getByRole("button", { name: "Page 2" })).toHaveAttribute("aria-current", "page");
    expect(courseNames()).toEqual(items.slice(10, 20).map((course) => course.name));

    fireEvent.click(within(pagination).getByRole("button", { name: "Page 3" }));
    expect(screen.getByText("Showing 21–28 of 28 courses")).toBeInTheDocument();
    expect(courseNames()).toEqual(items.slice(20).map((course) => course.name));
    expect(container.querySelectorAll(".listing-card")).toHaveLength(8);
    expect(within(pagination).getByRole("button", { name: "Next" })).toBeDisabled();

    fireEvent.click(within(pagination).getByRole("button", { name: "Previous" }));
    expect(screen.getByText("Showing 11–20 of 28 courses")).toBeInTheDocument();
    fireEvent.click(within(pagination).getByRole("button", { name: "Previous" }));
    expect(screen.getByText("Showing 1–10 of 28 courses")).toBeInTheDocument();
    expect(api.get).toHaveBeenCalledWith("/courses");
  });
});
