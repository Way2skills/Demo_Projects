//---- ADMIN DASHBOARD TESTS ----
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import App from "../App";
import api from "../services/api";

vi.mock("../services/api", () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), patch: vi.fn(), delete: vi.fn() },
  getErrorMessage: (error) => error?.message || "Request failed",
}));

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  vi.clearAllMocks();
});

describe("admin dashboard", () => {
  it("keeps Course Management available without Batch Management UI", async () => {
    window.localStorage.setItem("decode_token", "test-token");
    window.localStorage.setItem("decode_user", JSON.stringify({ role: "admin", email: "admin@example.test" }));
    const course = { id: 1, name: "Python", fee: 10000, syllabus: "Python, data structures" };
    api.get.mockImplementation((path) => {
      if (path === "/dashboard/stats") return Promise.resolve({ data: {} });
      if (path === "/admin/courses") {
        return Promise.resolve({ data: { items: [course], total: 1, active_count: 1 } });
      }
      return Promise.resolve({ data: { items: [], total: 0 } });
    });

    render(<MemoryRouter initialEntries={["/admin"]}><App /></MemoryRouter>);
    fireEvent.click(within(screen.getByRole("navigation", { name: "Admin sections" })).getByRole("button", { name: "Courses" }));

    expect(await screen.findByRole("table", { name: "Course records" })).toBeInTheDocument();
    expect(screen.getByText("Python")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "+ Add Course" })).toBeInTheDocument();
    expect(screen.queryByText("Batch Management")).not.toBeInTheDocument();
    expect(screen.queryByLabelText("Course")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Save batch availability" })).not.toBeInTheDocument();
    expect(screen.queryByText(/batch availability could not be loaded/i)).not.toBeInTheDocument();
    expect(api.get).not.toHaveBeenCalledWith("/courses");
  });

  it("paginates table records in groups of ten without gaps or duplicates", async () => {
    window.localStorage.setItem("decode_token", "test-token");
    window.localStorage.setItem("decode_user", JSON.stringify({ role: "admin", email: "admin@example.test" }));
    api.get.mockImplementation((path, config) => {
      if (path === "/dashboard/stats") return Promise.resolve({ data: {} });
      if (path === "/admin/courses/schema") return Promise.resolve({ data: { fields: [] } });
      if (path === "/admin/courses") {
        const page = config.params.page;
        const pageSize = config.params.page_size;
        const firstId = (page - 1) * pageSize + 1;
        const count = Math.max(0, Math.min(pageSize, 28 - firstId + 1));
        return Promise.resolve({
          data: {
            items: Array.from({ length: count }, (_, index) => ({
              id: firstId + index,
              name: `Post ${firstId + index}`,
              is_active: true,
            })),
            total: 28,
          },
        });
      }
      return Promise.resolve({ data: { items: [], total: 0 } });
    });

    render(<MemoryRouter initialEntries={["/admin"]}><App /></MemoryRouter>);
    fireEvent.click(within(screen.getByRole("navigation", { name: "Admin sections" })).getByRole("button", { name: "Courses" }));

    const table = await screen.findByRole("table");
    await screen.findByText("Post 10");
    expect(api.get).toHaveBeenCalledWith("/admin/courses", expect.objectContaining({
      params: expect.objectContaining({ page: 1, page_size: 10 }),
    }));
    expect(table.querySelectorAll("tbody tr")).toHaveLength(10);
    expect(screen.getByRole("button", { name: "Previous" })).toBeDisabled();
    expect(screen.getByRole("button", { name: "Next" })).toBeEnabled();

    fireEvent.click(screen.getByRole("button", { name: "Page 2" }));
    await screen.findByText("Post 11");
    expect(screen.getByText("Post 20")).toBeInTheDocument();
    expect(screen.queryByText("Post 10")).not.toBeInTheDocument();
    expect(table.querySelectorAll("tbody tr")).toHaveLength(10);

    fireEvent.click(screen.getByRole("button", { name: "Page 3" }));
    await screen.findByText("Post 21");
    expect(screen.getByText("Post 28")).toBeInTheDocument();
    expect(screen.queryByText("Post 20")).not.toBeInTheDocument();
    expect(table.querySelectorAll("tbody tr")).toHaveLength(8);
    expect(screen.getByRole("button", { name: "Next" })).toBeDisabled();
  });

  it("opens on the overview and uploads course images with authenticated multipart requests", async () => {
    window.localStorage.setItem("decode_token", "test-token");
    window.localStorage.setItem("decode_user", JSON.stringify({ role: "admin", email: "admin@example.test" }));
    let course = { id: 1, name: "Python", fee: 2500, syllabus: "Python", image_url: "/uploads/python.png", is_active: true };
    api.get.mockImplementation((path) => {
      if (path === "/dashboard/stats") return Promise.resolve({ data: { students: 12, courses: 4 } });
      if (path === "/admin/courses") return Promise.resolve({ data: { items: [course], total: 1, active_count: 1 } });
      return Promise.resolve({ data: { items: [], total: 0 } });
    });
    api.post.mockImplementation((path, payload) => {
      course = {
        id: 2,
        name: payload.get("name"),
        fee: Number(payload.get("fee")),
        syllabus: payload.get("syllabus"),
        image_url: "http://localhost:8000/uploads/web.png",
        is_active: true,
      };
      return Promise.resolve({ data: course });
    });
    api.put.mockImplementation((path, payload) => {
      course = {
        ...course,
        name: payload.get("name"),
        fee: Number(payload.get("fee")),
        syllabus: payload.get("syllabus"),
        image_url: "http://localhost:8000/uploads/web-updated.png",
      };
      return Promise.resolve({ data: course });
    });

    render(<MemoryRouter initialEntries={["/admin"]}><App /></MemoryRouter>);
    expect(await screen.findByRole("heading", { name: "Overview" })).toBeInTheDocument();
    expect(screen.getByText("12")).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Manage your institution" })).not.toBeInTheDocument();
    expect(document.querySelector(".admin-quick-links")).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: /DECODE INSTITUTION/ })).toBeInTheDocument();
    expect(screen.queryByText("manoj07@gmail.com")).not.toBeInTheDocument();
    const adminNavigation = within(screen.getByRole("navigation", { name: "Admin sections" }));
    expect(adminNavigation.getByText("Overview")).toBeInTheDocument();
    expect(adminNavigation.queryByRole("button", { name: "Dashboard" })).not.toBeInTheDocument();
    const retainedItems = [
      "Students", "Courses", "Internship & Workshop", "Internship Applications", "Trainers", "Testimonials",
      "Gallery", "Contact Messages", "FAQs", "Course Categories", "Authorized Programs",
    ];
    expect(adminNavigation.getAllByRole("button").map((button) => button.textContent.trim())).toEqual(retainedItems);
    for (const label of ["Training", "Course enquiries", "Workshops", "Placement companies", "Branches", "Settings", "Institution settings", "Kids courses"]) {
      expect(adminNavigation.queryByRole("button", { name: label })).not.toBeInTheDocument();
    }
    expect(screen.getByRole("button", { name: "Sign Out" })).toBeInTheDocument();
    expect(adminNavigation.queryByRole("button", { name: "Overview" })).not.toBeInTheDocument();
    for (const label of retainedItems) {
      expect(adminNavigation.getByRole("button", { name: label })).toBeInTheDocument();
    }
    expect(api.get).not.toHaveBeenCalledWith("/admin/dashboard", expect.anything());

    fireEvent.click(within(screen.getByRole("navigation", { name: "Admin sections" })).getByRole("button", { name: "Courses" }));
    expect(await screen.findByRole("heading", { level: 1, name: "Courses" })).toBeInTheDocument();
    const courseTable = await screen.findByRole("table", { name: "Course records" });
    expect(within(courseTable).getAllByRole("columnheader").map((heading) => heading.textContent)).toEqual(["Course Name", "Fees", "Topics", "Actions"]);
    fireEvent.click(screen.getByRole("button", { name: "+ Add Course" }));
    const courseForm = screen.getByRole("heading", { name: "Add Course" }).closest("form");
    expect(courseForm.querySelectorAll("label")).toHaveLength(5);
    expect(screen.getByLabelText("Course ID")).toHaveValue("Generated automatically");
    fireEvent.change(screen.getByLabelText("Course Name *"), { target: { value: "Web Development" } });
    fireEvent.change(screen.getByLabelText("Fees *"), { target: { value: "3500" } });
    fireEvent.change(screen.getByLabelText("Topics *"), { target: { value: "HTML, CSS, React" } });
    const image = new File(["course image"], "course.png", { type: "image/png" });
    await userEvent.upload(screen.getByLabelText(/Course Image/), image);
    fireEvent.submit(courseForm);

    await waitFor(() => expect(api.post).toHaveBeenCalledWith("/admin/courses", expect.any(FormData)));
    const submittedCourse = api.post.mock.calls[0][1];
    expect(submittedCourse.get("name")).toBe("Web Development");
    expect(submittedCourse.get("fee")).toBe("3500");
    expect(submittedCourse.get("syllabus")).toBe("HTML, CSS, React");
    expect(submittedCourse.get("course_image").name).toBe("course.png");
    expect(await screen.findByText("Course added.")).toBeInTheDocument();
    expect(await screen.findByText("Web Development")).toBeInTheDocument();

    await userEvent.click(within(courseTable).getByRole("button", { name: "Edit" }));
    fireEvent.change(screen.getByLabelText("Fees *"), { target: { value: "3750.50" } });
    fireEvent.change(screen.getByLabelText("Topics *"), { target: { value: "HTML, CSS, React, APIs" } });
    const updatedImage = new File(["updated image"], "course-updated.png", { type: "image/png" });
    await userEvent.upload(screen.getByLabelText(/Course Image/), updatedImage);
    fireEvent.submit(screen.getByRole("heading", { name: "Edit Course" }).closest("form"));

    await waitFor(() => expect(api.put).toHaveBeenCalledWith("/admin/courses/2", expect.any(FormData)));
    expect(api.put.mock.calls[0][1].get("fee")).toBe("3750.50");
    expect(api.put.mock.calls[0][1].get("syllabus")).toBe("HTML, CSS, React, APIs");
    expect(api.put.mock.calls[0][1].get("course_image").name).toBe("course-updated.png");
    expect(await screen.findByText("Course updated.")).toBeInTheDocument();
    expect(await screen.findByText("HTML, CSS, React, APIs")).toBeInTheDocument();

    fireEvent.click(adminNavigation.getByRole("button", { name: "Internship & Workshop" }));
    expect(await screen.findByRole("heading", { level: 1, name: "Internship & Workshop" })).toBeInTheDocument();
    await waitFor(() => expect(api.get).toHaveBeenCalledWith("/admin/workshops", expect.anything()));

    fireEvent.click(adminNavigation.getByRole("button", { name: "Internship Applications" }));
    expect(await screen.findByRole("heading", { level: 1, name: "Internship Applications" })).toBeInTheDocument();
    await waitFor(() => expect(api.get).toHaveBeenCalledWith("/admin/internship_applications", expect.anything()));
  });

  it("uses trainer-linked workshop fields for create, edit, and delete", async () => {
    window.localStorage.setItem("decode_token", "test-token");
    window.localStorage.setItem("decode_user", JSON.stringify({ role: "admin", email: "admin@example.test" }));
    const savedWorkshop = {
      id: 8,
      trainer_id: 17,
      trainer_name: "Asha Trainer",
      program: "Full Stack Development",
      duration: "2 Months",
      admission_start_date: "2026-03-01",
      admission_end_date: "2026-03-15",
      program_start_date: "2026-04-01",
      program_end_date: "2026-05-31",
      mode: "Offline",
      start_time: "10:00:00",
      end_time: "17:00:00",
      is_active: true,
    };
    api.get.mockImplementation((path) => {
      if (path === "/dashboard/stats") return Promise.resolve({ data: {} });
      if (path === "/admin/trainers") return Promise.resolve({ data: { items: [{ id: 17, name: "Asha Trainer" }], total: 1 } });
      if (path === "/admin/workshops") return Promise.resolve({ data: { items: [savedWorkshop], total: 1 } });
      return Promise.resolve({ data: {} });
    });
    api.post.mockResolvedValue({ data: savedWorkshop });
    api.put.mockResolvedValue({ data: { ...savedWorkshop, program: "Data Analytics" } });
    api.delete.mockResolvedValue({ data: null });
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(true);

    render(<MemoryRouter initialEntries={["/admin"]}><App /></MemoryRouter>);
    fireEvent.click(within(screen.getByRole("navigation", { name: "Admin sections" })).getByRole("button", { name: "Internship & Workshop" }));

    const table = await screen.findByRole("table", { name: "Internship and workshop records" });
    expect(await screen.findByText("Full Stack Development")).toBeInTheDocument();
    expect(within(table).getAllByRole("columnheader").map((header) => header.textContent)).toEqual([
      "Trainer Name", "Program", "Duration", "Admission Start & End Date", "Program Start & End Date", "Mode", "Timing", "Actions",
    ]);
    expect(screen.queryByText("Manage records stored in the Decode Institution database.")).not.toBeInTheDocument();
    expect(within(table).queryByRole("columnheader", { name: "Status" })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "+ Add Internship & Workshop" }));
    expect(await screen.findByRole("option", { name: "Asha Trainer" })).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/Trainer Name/), { target: { value: "17" } });
    fireEvent.change(screen.getByLabelText(/^Program \*/), { target: { value: "Full Stack Development" } });
    fireEvent.change(screen.getByLabelText(/^Duration/), { target: { value: "2 Months" } });
    fireEvent.change(screen.getByLabelText(/Admission Start Date/), { target: { value: "2026-03-01" } });
    fireEvent.change(screen.getByLabelText(/Admission End Date/), { target: { value: "2026-03-15" } });
    fireEvent.change(screen.getByLabelText(/^Program Start Date/), { target: { value: "2026-04-01" } });
    fireEvent.change(screen.getByLabelText(/^Program End Date/), { target: { value: "2026-05-31" } });
    fireEvent.change(screen.getByLabelText(/^Mode/), { target: { value: "Offline" } });
    fireEvent.change(screen.getByLabelText(/Start Time/), { target: { value: "10:00" } });
    fireEvent.change(screen.getByLabelText(/End Time/), { target: { value: "17:00" } });
    fireEvent.click(screen.getByRole("button", { name: "Add Internship & Workshop" }));
    await waitFor(() => expect(api.post).toHaveBeenCalledWith("/admin/workshops", {
      trainer_id: 17,
      program: "Full Stack Development",
      duration: "2 Months",
      admission_start_date: "2026-03-01",
      admission_end_date: "2026-03-15",
      program_start_date: "2026-04-01",
      program_end_date: "2026-05-31",
      mode: "Offline",
      start_time: "10:00",
      end_time: "17:00",
      is_active: true,
    }));

    fireEvent.click(await screen.findByRole("button", { name: "Edit" }));
    fireEvent.change(screen.getByLabelText(/^Program \*/), { target: { value: "Data Analytics" } });
    fireEvent.click(screen.getByRole("button", { name: "Update Internship & Workshop" }));
    await waitFor(() => expect(api.put).toHaveBeenCalledWith("/admin/workshops/8", expect.objectContaining({ program: "Data Analytics" })));

    fireEvent.click(await screen.findByRole("button", { name: "Delete" }));
    await waitFor(() => expect(api.delete).toHaveBeenCalledWith("/admin/workshops/8"));
    expect(confirm).toHaveBeenCalled();
    confirm.mockRestore();
  });

  it("shows database-backed internship applications in the requested table layout", async () => {
    window.localStorage.setItem("decode_token", "test-token");
    window.localStorage.setItem("decode_user", JSON.stringify({ role: "admin", email: "admin@example.test" }));
    const application = {
      id: 21,
      full_name: "Nila Applicant",
      email: "nila@example.com",
      phone: "+91 9876543210",
      created_at: "2026-03-08T12:15:00",
      internship_title: "Full Stack Development",
    };
    api.get.mockImplementation((path) => {
      if (path === "/dashboard/stats") return Promise.resolve({ data: {} });
      if (path === "/admin/internship_applications") return Promise.resolve({ data: { items: [application], total: 1 } });
      if (path === "/admin/internship_applications/schema") return Promise.resolve({ data: { fields: [] } });
      return Promise.resolve({ data: { items: [], total: 0 } });
    });

    render(<MemoryRouter initialEntries={["/admin"]}><App /></MemoryRouter>);
    fireEvent.click(within(screen.getByRole("navigation", { name: "Admin sections" })).getByRole("button", { name: "Internship Applications" }));

    expect(await screen.findByRole("heading", { level: 1, name: "Internship Applications" })).toBeInTheDocument();
    expect(screen.getAllByRole("heading", { name: "Internship Applications" })).toHaveLength(1);
    expect(screen.queryByText("Manage records stored in the Decode Institution database.")).not.toBeInTheDocument();
    const table = await screen.findByRole("table", { name: "Internship applications" });
    expect(within(table).getAllByRole("columnheader").map((header) => header.textContent)).toEqual([
      "Name", "Contact Us", "Date of Applied", "Program Details", "Actions",
    ]);
    expect(within(table).getByText("Nila Applicant")).toBeInTheDocument();
    expect(within(table).getByText("nila@example.com")).toBeInTheDocument();
    expect(within(table).getByText("+91 9876543210")).toBeInTheDocument();
    expect(within(table).getByText(new Date(application.created_at).toLocaleDateString())).toBeInTheDocument();
    expect(within(table).getByText("Full Stack Development")).toBeInTheDocument();
    expect(within(table).getByRole("button", { name: "Edit" })).toBeInTheDocument();
    expect(within(table).getByRole("button", { name: "Delete" })).toBeInTheDocument();
  });

  it("uploads gallery images as multipart data and displays backend media URLs", async () => {
    window.localStorage.setItem("decode_token", "test-token");
    window.localStorage.setItem("decode_user", JSON.stringify({ role: "admin", email: "admin@example.test" }));
    let gallery = {
      id: 4,
      title: "Existing class",
      category: "Training",
      image_url: "/api/v1/media/4",
      alt_text: "Students learning",
      is_active: true,
    };
    api.get.mockImplementation((path) => {
      if (path === "/dashboard/stats") return Promise.resolve({ data: {} });
      if (path === "/admin/gallery/schema") {
        return Promise.resolve({ data: { fields: [
          { name: "title", type: "VARCHAR(180)", required: true },
          { name: "category", type: "VARCHAR(100)", required: false },
          { name: "image_url", type: "VARCHAR(500)", required: true },
          { name: "alt_text", type: "VARCHAR(250)", required: false },
          { name: "is_active", type: "BOOLEAN", required: false },
        ] } });
      }
      if (path === "/admin/gallery") return Promise.resolve({ data: { items: [gallery], total: 1 } });
      return Promise.resolve({ data: {} });
    });
    api.post.mockImplementation((path, payload) => {
      gallery = {
        id: 5,
        title: payload.get("title"),
        category: payload.get("category"),
        image_url: "/api/v1/media/5",
        alt_text: payload.get("alt_text"),
        is_active: payload.get("is_active") === "true",
      };
      return Promise.resolve({ data: gallery });
    });

    render(<MemoryRouter initialEntries={["/admin"]}><App /></MemoryRouter>);
    fireEvent.click(within(screen.getByRole("navigation", { name: "Admin sections" })).getByRole("button", { name: "Gallery" }));
    const table = await screen.findByRole("table");
    await screen.findByText("Existing class");
    expect(table.querySelector("img")).toHaveAttribute("src", "/api/v1/media/4");

    fireEvent.click(await screen.findByRole("button", { name: "+ Add record" }));
    fireEvent.change(screen.getByLabelText("title *"), { target: { value: "Student showcase" } });
    const image = new File(["gallery image"], "gallery.png", { type: "image/png" });
    await userEvent.upload(screen.getByLabelText("image url *"), image);
    fireEvent.submit(screen.getByRole("heading", { name: "Create gallery" }).closest("form"));

    await waitFor(() => expect(api.post).toHaveBeenCalledWith("/admin/gallery", expect.any(FormData)));
    const submitted = api.post.mock.calls[0][1];
    expect(submitted.get("title")).toBe("Student showcase");
    expect(submitted.get("image").name).toBe("gallery.png");
    expect(submitted.has("image_url")).toBe(false);
    expect(await screen.findByText("Student showcase")).toBeInTheDocument();
    expect(table.querySelector("img")).toHaveAttribute("src", "/api/v1/media/5");
  });

  it("submits trainer details and photo as multipart form data and refreshes the list", async () => {
    const user = userEvent.setup();
    window.localStorage.setItem("decode_token", "test-token");
    window.localStorage.setItem("decode_user", JSON.stringify({ role: "admin", email: "admin@example.test" }));
    const trainer = {
      id: 17,
      name: "Asha Trainer",
      experience_years: 3,
      designation: "Technical Trainer",
      expertise: ["Core Programming"],
      image_url: "http://localhost:8000/uploads/trainer.png",
      is_active: true,
    };
    api.get.mockImplementation((path) => {
      if (path === "/dashboard/stats") return Promise.resolve({ data: {} });
      if (path === "/admin/trainers") return Promise.resolve({ data: { items: [trainer], total: 1 } });
      return Promise.resolve({ data: {} });
    });
    api.post.mockResolvedValue({ data: trainer });

    const { container } = render(<MemoryRouter initialEntries={["/admin"]}><App /></MemoryRouter>);
    fireEvent.click(within(screen.getByRole("navigation", { name: "Admin sections" })).getByRole("button", { name: "Trainers" }));
    fireEvent.click(await screen.findByRole("button", { name: "+ Add trainer" }));

    fireEvent.change(screen.getByLabelText(/Trainer Name/), { target: { value: "Asha Trainer" } });
    fireEvent.change(screen.getByLabelText(/Years of Experience/), { target: { value: "3" } });
    fireEvent.change(screen.getByLabelText(/Designation/), { target: { value: "Technical Trainer" } });
    fireEvent.change(screen.getByLabelText(/Areas of Expertise/), { target: { value: "Core Programming" } });
    await user.upload(screen.getByLabelText(/Trainer Photo/), new File(["trainer-image"], "trainer.png", { type: "image/png" }));
    expect(await screen.findByText("Selected: trainer.png")).toBeInTheDocument();
    const addPreview = await screen.findByRole("img", { name: "Trainer photo preview" });
    expect(addPreview.getAttribute("src")).toMatch(/^data:image\/png;base64,/);
    fireEvent.submit(container.querySelector(".admin-record-form"));

    await waitFor(() => expect(api.post).toHaveBeenCalledWith("/admin/trainers", expect.any(FormData)));
    const submitted = api.post.mock.calls[0][1];
    expect(submitted.get("name")).toBe("Asha Trainer");
    expect(submitted.get("experience_years")).toBe("3");
    expect(submitted.get("designation")).toBe("Technical Trainer");
    expect(submitted.get("expertise")).toBe(JSON.stringify(["Core Programming"]));
    expect(submitted.get("photo").name).toBe("trainer.png");
    expect(await screen.findByRole("status")).toHaveTextContent("Trainer added.");
    expect(await screen.findByText("Asha Trainer")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Edit" }));
    expect(await screen.findByRole("img", { name: "Trainer photo preview" })).toHaveAttribute("src", trainer.image_url);
    expect(api.get).toHaveBeenCalledWith("/admin/trainers", {
      params: { page: 1, page_size: 10, search: undefined },
    });
  });

  it("shows student-specific columns and supports search, fee status, edit and confirmed delete", async () => {
    window.localStorage.setItem("decode_token", "test-token");
    window.localStorage.setItem("decode_user", JSON.stringify({ role: "admin", email: "admin@example.test" }));
    const student = {
      id: 8,
      student_code: "D12345",
      full_name: "Asha Student",
      email: "asha@example.test",
      phone: "9876543210",
      course_id: 1,
      course_name: "Core Programming",
      total_course_fee: 2500,
      amount_paid: 500,
      fee_status: "Pending",
      date_of_join: "2025-01-15",
    };
    api.get.mockImplementation((path) => {
      if (path === "/dashboard/stats") return Promise.resolve({ data: {} });
      if (path === "/courses") return Promise.resolve({ data: { items: [{ id: 1, name: "Core Programming" }] } });
      if (path === "/admin/students") return Promise.resolve({ data: { items: [student], total: 1 } });
      return Promise.resolve({ data: {} });
    });
    api.patch.mockResolvedValue({ data: { ...student, fee_status: "Paid" } });
    api.put.mockResolvedValue({ data: { ...student, full_name: "Asha Updated" } });
    api.delete.mockResolvedValue({ data: null });
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(true);

    render(<MemoryRouter initialEntries={["/admin"]}><App /></MemoryRouter>);
    fireEvent.click(within(screen.getByRole("navigation", { name: "Admin sections" })).getByRole("button", { name: "Students" }));

    expect(await screen.findByRole("heading", { name: "Decode Institution Admin Students" })).toBeInTheDocument();
    expect(screen.queryByText("Manage records stored in the Decode Institution database.")).not.toBeInTheDocument();
    const toolbar = document.querySelector(".admin-students-toolbar");
    expect(within(toolbar).getByRole("textbox", { name: "Search Student" })).toBeInTheDocument();
    expect(within(toolbar).getByRole("button", { name: "Add Records" })).toBeInTheDocument();
    const table = screen.getByRole("table", { name: "Student records" });
    expect(Array.from(table.querySelectorAll("thead th")).map((cell) => cell.textContent)).toEqual([
      "Student ID", "Student Name", "Contact", "Course", "Fee Status", "Date of Join", "Actions",
    ]);
    expect(within(table).getByText("asha@example.test")).toBeInTheDocument();
    expect(within(table).getByText("9876543210")).toBeInTheDocument();
    const status = within(table).getByRole("combobox", { name: "Fee Status for Asha Student" });
    expect(Array.from(status.options).map((option) => option.textContent)).toEqual(["Paid", "Unpaid", "Pending"]);
    fireEvent.change(status, { target: { value: "Paid" } });
    await waitFor(() => expect(api.patch).toHaveBeenCalledWith("/admin/students/8/fee-status", { fee_status: "Paid" }));

    fireEvent.change(within(toolbar).getByRole("textbox", { name: "Search Student" }), { target: { value: "Asha" } });
    await waitFor(() => expect(api.get).toHaveBeenCalledWith("/admin/students", {
      params: { page: 1, page_size: 10, search: "Asha" },
    }));

    fireEvent.click(within(table).getByRole("button", { name: "Edit" }));
    fireEvent.change(screen.getByLabelText(/Student Name/), { target: { value: "Asha Updated" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));
    await waitFor(() => expect(api.put).toHaveBeenCalledWith("/admin/students/8", expect.objectContaining({ full_name: "Asha Updated" })));

    fireEvent.click(within(table).getByRole("button", { name: "Delete" }));
    expect(confirm).toHaveBeenCalledWith("Delete this student? This action cannot be undone.");
    await waitFor(() => expect(api.delete).toHaveBeenCalledWith("/admin/students/8"));
    confirm.mockRestore();
  });

  it("opens Add Records and submits the required student fields", async () => {
    window.localStorage.setItem("decode_token", "test-token");
    window.localStorage.setItem("decode_user", JSON.stringify({ role: "admin", email: "admin@example.test" }));
    api.get.mockImplementation((path) => {
      if (path === "/dashboard/stats") return Promise.resolve({ data: {} });
      if (path === "/courses") return Promise.resolve({ data: { items: [{ id: 2, name: "Full Stack Development" }] } });
      if (path === "/admin/students") return Promise.resolve({ data: { items: [], total: 0 } });
      return Promise.resolve({ data: {} });
    });
    api.post.mockResolvedValue({ data: { id: 12 } });

    render(<MemoryRouter initialEntries={["/admin"]}><App /></MemoryRouter>);
    fireEvent.click(within(screen.getByRole("navigation", { name: "Admin sections" })).getByRole("button", { name: "Students" }));
    fireEvent.click(await screen.findByRole("button", { name: "Add Records" }));

    expect(await screen.findByRole("heading", { name: "Add Student" })).toBeInTheDocument();
    for (const label of [/^Student ID/, /^Student Name/, /^Email Address/, /^Phone Number/, /^Course/, /^Total Course Fee/, /^Amount Paid/, /^Fee Status/, /^Date of Join/]) {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    }
    fireEvent.change(screen.getByRole("textbox", { name: "Student ID digits" }), { target: { value: "45678" } });
    fireEvent.change(screen.getByLabelText(/Student Name/), { target: { value: "Bala Student" } });
    fireEvent.change(screen.getByLabelText(/Email Address/), { target: { value: "bala@example.test" } });
    fireEvent.change(screen.getByLabelText(/Phone Number/), { target: { value: "9876543210" } });
    fireEvent.change(screen.getByLabelText(/^Course/), { target: { value: "2" } });
    fireEvent.change(screen.getByLabelText(/Total Course Fee/), { target: { value: "4500" } });
    fireEvent.change(screen.getByLabelText(/Amount Paid/), { target: { value: "1000" } });
    fireEvent.change(screen.getByLabelText(/Fee Status/), { target: { value: "Unpaid" } });
    fireEvent.change(screen.getByLabelText(/Date of Join/), { target: { value: "2025-02-20" } });
    fireEvent.click(screen.getByRole("button", { name: "Save" }));

    await waitFor(() => expect(api.post).toHaveBeenCalledWith("/admin/students", {
      student_code: "D45678",
      full_name: "Bala Student",
      email: "bala@example.test",
      phone: "9876543210",
      course_id: 2,
      total_course_fee: 4500,
      amount_paid: 1000,
      fee_status: "Unpaid",
      date_of_join: "2025-02-20",
    }));
    expect(await screen.findByRole("status")).toHaveTextContent("Student added.");
  });
});
