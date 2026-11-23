//---- APP TESTS ----
import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import App from "./App";
import api from "./services/api";

vi.mock("./services/api", () => ({
  default: { get: vi.fn(), post: vi.fn(), put: vi.fn(), delete: vi.fn() },
  getErrorMessage: (error) => error?.message || "Request failed",
}));

afterEach(() => {
  cleanup();
  window.localStorage.clear();
  vi.clearAllMocks();
  vi.restoreAllMocks();
});

function CurrentPath() {
  const location = useLocation();
  return <output data-testid="current-path">{location.pathname}</output>;
}

describe("public routes", () => {
  it("shows the requested navigation links and opens their pages", async () => {
    api.get.mockResolvedValue({ data: { items: [] } });
    render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>);

    const navigation = screen.getByRole("navigation", { name: "Main navigation" });
    const labels = ["Home", "About Us", "Courses", "Internships & Workshops", "Contact Us"];
    expect(within(navigation).getAllByRole("link").map((link) => link.textContent.trim())).toEqual(labels);

    const routes = [
      ["Home", /Turn Passion/],
      ["About Us", /About Decode Institution/],
      ["Courses", /Explore our courses/],
      ["Internships & Workshops", /Taking learning into the real world/],
      ["Contact Us", /Let's start/],
    ];
    for (const [label, heading] of routes) {
      fireEvent.click(within(navigation).getByRole("link", { name: label }));
      expect(await screen.findByRole("heading", { name: heading })).toBeInTheDocument();
    }
  });

  it("keeps Trainers absent from desktop and expanded mobile navigation", () => {
    api.get.mockResolvedValue({ data: { items: [] } });
    render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>);
    const navigation = screen.getByRole("navigation", { name: "Main navigation" });
    const labels = ["Home", "About Us", "Courses", "Internships & Workshops", "Contact Us"];

    expect(within(navigation).getAllByRole("link").map((link) => link.textContent.trim())).toEqual(labels);
    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    expect(navigation).toHaveClass("is-open");
    expect(screen.getByRole("button", { name: "Close navigation menu" })).toBeInTheDocument();
    expect(within(navigation).getAllByRole("link").map((link) => link.textContent.trim())).toEqual(labels);

    fireEvent.click(screen.getByRole("button", { name: "Close menu" }));
    expect(navigation).not.toHaveClass("is-open");

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    fireEvent.click(screen.getByRole("button", { name: "Close navigation menu" }));
    expect(navigation).not.toHaveClass("is-open");
  });

  it("smoothly scrolls home when the brand is clicked on the home page and closes the mobile menu", async () => {
    api.get.mockResolvedValue({ data: { items: [] } });
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    const { container } = render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>);
    await screen.findByRole("heading", { name: /Turn Passion/ });
    scrollTo.mockClear();

    fireEvent.click(screen.getByRole("button", { name: "Open menu" }));
    const brand = container.querySelector(".site-header .brand");
    fireEvent.click(brand.firstElementChild);
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
    expect(screen.queryByRole("button", { name: "Close navigation menu" })).not.toBeInTheDocument();

    scrollTo.mockClear();
    fireEvent.click(brand.lastElementChild);
    expect(scrollTo).toHaveBeenCalledWith({ top: 0, behavior: "smooth" });
  });

  it("navigates from another page to the home page at the top when the brand is clicked", async () => {
    api.get.mockResolvedValue({ data: { items: [] } });
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(<MemoryRouter initialEntries={["/about"]}><CurrentPath /><App /></MemoryRouter>);
    await screen.findByRole("heading", { name: "About Decode Institution" });
    scrollTo.mockClear();

    fireEvent.click(document.querySelector(".site-header .brand"));

    expect(await screen.findByRole("heading", { name: /Turn Passion/ })).toBeInTheDocument();
    expect(screen.getByTestId("current-path")).toHaveTextContent("/");
    await waitFor(() => {
      expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" });
    });
  });

  it("uses the not-found page for the removed Trainers URL", async () => {
    api.get.mockResolvedValue({ data: { items: [] } });
    render(<MemoryRouter initialEntries={["/trainers"]}><App /></MemoryRouter>);

    expect(await screen.findByRole("heading", { name: "Page not found." })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "The People Behind Decode" })).not.toBeInTheDocument();
  });

  it("navigates Talk to our team to the Contact Us page", async () => {
    api.get.mockResolvedValue({ data: { items: [] } });
    render(<MemoryRouter initialEntries={["/"]}><App /></MemoryRouter>);

    const contactLink = screen.getByRole("link", { name: /Talk to our team/ });
    expect(contactLink).toHaveAttribute("href", "/contact");
    fireEvent.click(contactLink);
    expect(await screen.findByRole("heading", { name: /Let's start/ })).toBeInTheDocument();
  });

  it("supports direct course detail URLs and routes the course CTA to Contact Us", async () => {
    api.get.mockImplementation((path) => {
      if (path === "/settings") return Promise.resolve({ data: {} });
      if (path === "/courses") return Promise.resolve({ data: { items: [{
        id: 8,
        slug: "java-full-stack",
        name: "Java Full Stack",
        category_id: 2,
        category_name: "Full Stack Development",
        syllabus: "HTML,CSS,JS | SPRING | DATABASE CONNECTIVITY",
        fee: 20000,
        image_url: "/uploads/java-full-stack.png",
      }] } });
      if (path === "/course-categories") return Promise.resolve({ data: { items: [{
        id: 2,
        name: "Full Stack Development",
        description: "Frontend, backend and full-stack web development.",
        ai_tools: "Bolt.new, Builder.io, Uizard",
      }] } });
      return Promise.resolve({ data: { items: [] } });
    });
    render(<MemoryRouter initialEntries={["/courses/java-full-stack"]}>
      <CurrentPath />
      <App />
    </MemoryRouter>);

    expect(await screen.findByRole("heading", { name: "Java Full Stack", level: 1 })).toBeInTheDocument();
    const talkLink = screen.getByRole("link", { name: /Talk to Our Team/ });
    expect(talkLink).toHaveAttribute("href", "/contact");
    fireEvent.click(talkLink);
    expect(await screen.findByRole("heading", { name: /Let's start/ })).toBeInTheDocument();
    expect(screen.getByTestId("current-path")).toHaveTextContent("/contact");
  });

  it("renders the footer with configured contact and social links", async () => {
    api.get.mockImplementation((path) => {
      if (path === "/settings") return Promise.resolve({ data: {
        institution_name: "Decode Institution",
        address: "4th Cross, Near New Bus Stand,\nNamakkal 637 001,\nTamil Nadu,\nIndia",
        phone: "+91 63812 43416",
        email: "infodecode@code.com",
        social_links: JSON.stringify({ instagram: "https://instagram.com/decode" }),
      } });
      if (path === "/courses") return Promise.resolve({ data: { items: [] } });
      return Promise.resolve({ data: { items: [] } });
    });
    const { container } = render(<MemoryRouter initialEntries={["/courses"]}><App /></MemoryRouter>);

    expect(await screen.findByText("© 2026 Decode Institution. All rights reserved.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "DECODE INSTITUTION" })).toBeInTheDocument();
    expect(container.querySelector(".footer-brand-logo")).toHaveAttribute("src", "/logos/decode-mark.svg");
    const footer = within(screen.getByRole("contentinfo"));
    expect(footer.getByText("LEARN · BUILD · GROW")).toBeInTheDocument();
    expect(footer.getByText("Empowering students with industry-ready skills, practical learning, and career-focused training.")).toBeInTheDocument();
    expect(footer.getByRole("heading", { name: "QUICK LINKS" })).toBeInTheDocument();
    expect(footer.getByRole("heading", { name: "GET IN TOUCH" })).toBeInTheDocument();
    expect(screen.getByText("Built by the Pillars of Decode Student ❤️ | Proudly Developed by Decode Team")).toBeInTheDocument();
    expect(screen.queryByRole("navigation", { name: "Our courses" })).not.toBeInTheDocument();
    const quickNavigation = screen.getByRole("navigation", { name: "Quick links" });
    expect(within(quickNavigation).getAllByRole("link").map((link) => link.textContent.trim())).toEqual([
      "Home", "About Us", "Courses", "Internships & Workshops", "Contact Us",
    ]);
    expect(within(quickNavigation).getByRole("link", { name: "Home" })).toHaveAttribute("href", "/");
    expect(within(quickNavigation).getByRole("link", { name: "About Us" })).toHaveAttribute("href", "/about");
    expect(within(quickNavigation).getByRole("link", { name: "Courses" })).toHaveAttribute("href", "/courses");
    expect(within(quickNavigation).getByRole("link", { name: "Internships & Workshops" })).toHaveAttribute("href", "/internships");
    expect(within(quickNavigation).getByRole("link", { name: "Contact Us" })).toHaveAttribute("href", "/contact");
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute("href", "https://instagram.com/decode");
    expect(screen.getByRole("link", { name: "Instagram" })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: /4th Cross, Near New Bus Stand/ })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "infodecode@code.com" })).toHaveAttribute("href", "mailto:infodecode@code.com");
    expect(screen.getByRole("link", { name: "+91 63812 43416" })).toHaveAttribute("href", "tel:+916381243416");
  });

  it("expands and collapses the footer quick links and contact accordions", async () => {
    api.get.mockImplementation((path) => {
      if (path === "/settings") return Promise.resolve({ data: {
        address: "4th Cross, Near New Bus Stand, Namakkal 637001, Tamil Nadu, India",
        phone: "+91 63812 43416",
        email: "infodecode@code.com",
        social_links: JSON.stringify({
          instagram: "https://instagram.com/decode",
          facebook: "https://facebook.com/decode",
          linkedin: "https://linkedin.com/company/decode",
          youtube: "https://youtube.com/@decode",
          whatsapp: "https://wa.me/916381243416",
        }),
      } });
      return Promise.resolve({ data: { items: [] } });
    });
    render(<MemoryRouter initialEntries={["/courses"]}><App /></MemoryRouter>);

    const quickLinksToggle = screen.getByRole("button", { name: "QUICK LINKS" });
    expect(quickLinksToggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(quickLinksToggle);
    expect(quickLinksToggle).toHaveAttribute("aria-expanded", "true");
    expect(within(screen.getByRole("navigation", { name: "Quick links" })).getAllByRole("link").map((link) => [
      link.textContent.trim(),
      link.getAttribute("href"),
    ])).toEqual([
      ["Home", "/"],
      ["About Us", "/about"],
      ["Courses", "/courses"],
      ["Internships & Workshops", "/internships"],
      ["Contact Us", "/contact"],
    ]);
    fireEvent.click(quickLinksToggle);
    expect(quickLinksToggle).toHaveAttribute("aria-expanded", "false");

    const contactToggle = screen.getByRole("button", { name: "GET IN TOUCH" });
    expect(contactToggle).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(contactToggle);
    expect(contactToggle).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /4th Cross, Near New Bus Stand/ })).toHaveAttribute("target", "_blank");
    expect(screen.getByRole("link", { name: "infodecode@code.com" })).toHaveAttribute("href", "mailto:infodecode@code.com");
    expect(screen.getByRole("link", { name: "+91 63812 43416" })).toHaveAttribute("href", "tel:+916381243416");
    for (const [label, href] of [
      ["Instagram", "https://instagram.com/decode"],
      ["Facebook", "https://facebook.com/decode"],
      ["LinkedIn", "https://linkedin.com/company/decode"],
      ["YouTube", "https://youtube.com/@decode"],
      ["WhatsApp", "https://wa.me/916381243416"],
    ]) {
      expect(await screen.findByRole("link", { name: label })).toHaveAttribute("href", href);
    }
    fireEvent.click(contactToggle);
    expect(contactToggle).toHaveAttribute("aria-expanded", "false");
  });

  it("scrolls to the top when navigating with footer and header links", async () => {
    api.get.mockResolvedValue({ data: { items: [] } });
    const scrollTo = vi.spyOn(window, "scrollTo").mockImplementation(() => {});
    render(<MemoryRouter initialEntries={["/contact"]}><App /></MemoryRouter>);

    const quickNavigation = screen.getByRole("navigation", { name: "Quick links" });
    const destinations = [
      ["Home", "/", /Turn Passion/],
      ["About Us", "/about", /About Decode Institution/],
      ["Courses", "/courses", /Explore our courses/],
      ["Internships & Workshops", "/internships", /Taking learning into the real world/],
      ["Contact Us", "/contact", /Let's start/],
    ];

    for (const [label, href, heading] of destinations) {
      scrollTo.mockClear();
      const link = within(quickNavigation).getByRole("link", { name: label });
      expect(link).toHaveAttribute("href", href);
      fireEvent.click(link);
      expect(await screen.findByRole("heading", { name: heading })).toBeInTheDocument();
      await waitFor(() => expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" }));
    }

    scrollTo.mockClear();
    fireEvent.click(within(screen.getByRole("navigation", { name: "Main navigation" })).getByRole("link", { name: "Home" }));
    expect(await screen.findByRole("heading", { name: /Turn Passion/ })).toBeInTheDocument();
    await waitFor(() => expect(scrollTo).toHaveBeenCalledWith({ top: 0, left: 0, behavior: "instant" }));

    scrollTo.mockRestore();
  });

  it("renders the requested About content, recognitions, and statistics", () => {
    api.get.mockResolvedValue({ data: { items: [] } });
    const { container } = render(<MemoryRouter initialEntries={["/about"]}><App /></MemoryRouter>);

    expect(screen.getByRole("heading", { name: "About Us", level: 1 })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Built On Values, Driven By Innovation." })).toBeInTheDocument();
    expect(screen.getByText("Decode Institution was founded in 2016 in Namakkal, Tamil Nadu, India, and evolved into a corporate training and development entity after its 2019 incorporation under the Ministry of Corporate Affairs, Government of India. As an ISO 9001:2015 certified organization and Best Training Institute in.")).toBeInTheDocument();
    expect(screen.getByText("We bridge the gap between academic knowledge and corporate expectations. Learners gain practical, job-ready skills that meet industry demands.")).toBeInTheDocument();
    expect(screen.getByRole("img", { name: "Google logo" })).toBeInTheDocument();
    expect(container.querySelectorAll(".about-recognition-item")).toHaveLength(6);
    expect(container.querySelectorAll(".about-statistic")).toHaveLength(4);
    expect(screen.getByText("15,000+")).toBeInTheDocument();
    expect(screen.getByText("Experienced Educator")).toBeInTheDocument();
    expect(screen.queryByText("A PLACE TO BEGIN")).not.toBeInTheDocument();
    expect(screen.queryByText("Practice with purpose")).not.toBeInTheDocument();
    expect(container.querySelector(".intro-section")).toBeNull();
  });

  it("shows only published admin-created workshops and keeps their application flow", async () => {
    api.get.mockImplementation((path) => {
      if (path === "/workshops") return Promise.resolve({ data: { items: [{
        id: 2,
        program: "React Workshop",
        trainer_name: "Asha Trainer",
        duration: "2 Months",
        admission_start_date: "2026-03-01",
        admission_end_date: "2026-03-15",
        program_start_date: "2026-04-01",
        program_end_date: "2026-05-31",
        mode: "Offline",
        start_time: "10:00:00",
        end_time: "17:00:00",
      }] } });
      return Promise.resolve({ data: { items: [] } });
    });
    const { container } = render(<MemoryRouter initialEntries={["/internships"]}><App /></MemoryRouter>);

    expect(await screen.findByRole("heading", { name: "Taking learning into the real world." })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Industrial Internships & Technical Workshops" })).toBeInTheDocument();
    expect(screen.getByText("Join Tamil Nadu’s premier software training & development hub in Namakkal. Build real-time industry projects with senior engineers, complete your college internship / inplant training (IPT), and earn QR-verifiable ISO certificates.")).toBeInTheDocument();
    expect(container.querySelector(".internships-page-heading .back-link")).toBeNull();
    expect(screen.queryByText("LEARN BY DOING")).not.toBeInTheDocument();
    expect(screen.queryByText("Explore internship opportunities and workshops published by Decode Institution. Availability and eligibility are managed by the institution.")).not.toBeInTheDocument();
    expect(screen.queryByText("LEARN TOGETHER")).not.toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "Workshops" })).not.toBeInTheDocument();
    const panels = container.querySelector(".internship-panels");
    expect(panels).toBeInTheDocument();
    expect(panels.querySelector(".internship-workshop-panel")).toBeInTheDocument();
    expect(panels.querySelector(".application-form")).toBeInTheDocument();
    expect(within(panels.querySelector(".internship-workshop-panel")).getByRole("heading", { name: "Internship & Workshop" })).toBeInTheDocument();
    expect(await screen.findByRole("heading", { name: "React Workshop" })).toBeInTheDocument();
    expect(screen.getByText("Asha Trainer")).toBeInTheDocument();
    const details = container.querySelector(".workshop-card-details").textContent;
    expect(details).toContain("Duration: 2 Months");
    expect(details).toContain("Admission: 01/03/2026 – 15/03/2026");
    expect(details).toContain("Program dates: 01/04/2026 – 31/05/2026");
    expect(details).toContain("Mode: Offline");
    expect(details).toContain("Timing: 10:00 AM – 5:00 PM");
    expect(within(panels.querySelector(".application-form")).getByRole("heading", { name: "Apply for an Opportunity" })).toBeInTheDocument();
    expect(api.get).not.toHaveBeenCalledWith("/internships");
  });

  it("shows the exact empty-state message when there are no published workshops", async () => {
    api.get.mockImplementation((path) => {
      return Promise.resolve({ data: { items: [] } });
    });
    render(<MemoryRouter initialEntries={["/internships"]}><App /></MemoryRouter>);

    expect(await screen.findByRole("heading", { name: "Taking learning into the real world." })).toBeInTheDocument();
    expect(await screen.findByText("Currently No Internship & Workshop Available Right Now.")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Internship & Workshop" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Apply for an Opportunity" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Submit application" })).toBeDisabled();
  });

  it("signs an admin in and redirects to the dashboard", async () => {
    api.get.mockResolvedValue({ data: {} });
    api.post.mockResolvedValue({ data: {
      access_token: "test-admin-token",
      user: { id: 1, email: "admin@example.test", role: "admin" },
    } });
    render(<MemoryRouter initialEntries={["/admin/login"]}><App /></MemoryRouter>);

    fireEvent.change(screen.getByLabelText("Email"), { target: { value: "admin@example.test" } });
    fireEvent.change(screen.getByLabelText("Password"), { target: { value: "a-secure-password" } });
    fireEvent.click(screen.getByRole("button", { name: "Sign in securely" }));

    expect(await screen.findByRole("heading", { name: "Overview" })).toBeInTheDocument();
    expect(api.post).toHaveBeenCalledWith("/auth/admin/login", {
      email: "admin@example.test",
      password: "a-secure-password",
    });
  });

  it("returns an admin to sign-in when the session expires", async () => {
    window.localStorage.setItem("decode_token", "expired-token");
    window.localStorage.setItem("decode_user", JSON.stringify({ role: "admin" }));
    api.get.mockImplementation((path) => {
      if (path === "/dashboard/stats") {
        return Promise.resolve().then(() => {
          window.localStorage.removeItem("decode_token");
          window.localStorage.removeItem("decode_user");
          window.dispatchEvent(new Event("decode:auth-expired"));
          throw new Error("Invalid or expired authentication");
        });
      }
      return Promise.resolve({ data: {} });
    });
    render(<MemoryRouter initialEntries={["/admin"]}><App /></MemoryRouter>);

    expect(await screen.findByRole("heading", { name: /admin sign in/i })).toBeInTheDocument();
    expect(screen.getByText("Use your institution administrator account.")).toBeInTheDocument();
  });

  it("navigates from the course page to home", async () => {
    api.get.mockImplementation((path) => {
      if (path === "/settings") return Promise.resolve({ data: { institution_name: "Decode Institution" } });
      if (path === "/courses") return Promise.resolve({ data: { items: [] } });
      return Promise.resolve({ data: { items: [] } });
    });
    render(<MemoryRouter initialEntries={["/courses"]}><App /></MemoryRouter>);
    expect(await screen.findByRole("heading", { name: /Find the skills/ })).toBeInTheDocument();
    fireEvent.click(within(screen.getByRole("navigation", { name: "Quick links" })).getByRole("link", { name: "Home" }));
    expect(await screen.findByText(/Turn passion/i)).toBeInTheDocument();
  });

  it("shows a verified result only after the API responds", async () => {
    api.get.mockImplementation((path) => {
      if (path === "/settings") return Promise.resolve({ data: {} });
      if (path.startsWith("/certificates/verify/")) return Promise.resolve({ data: {
        student_name: "Sample Student", course_name: "Sample Course", issue_date: "2025-01-01", status: "issued",
      } });
      return Promise.resolve({ data: { items: [] } });
    });
    render(<MemoryRouter initialEntries={["/verify"]}><App /></MemoryRouter>);
    fireEvent.change(screen.getByLabelText("Certificate number"), { target: { value: "TEST-CERT-1" } });
    fireEvent.click(screen.getByRole("button", { name: /verify certificate/i }));
    expect(await screen.findByText("Certificate verified")).toBeInTheDocument();
    expect(api.get).toHaveBeenCalledWith("/certificates/verify/TEST-CERT-1");
  });

  it("requires a real course selection before sending an enquiry", async () => {
    api.get.mockImplementation((path) => {
      if (path === "/settings") return Promise.resolve({ data: {} });
      if (path === "/courses") return Promise.resolve({ data: { items: [{ id: 8, name: "Python", category_name: "Programming" }] } });
      return Promise.resolve({ data: { items: [] } });
    });
    render(<MemoryRouter initialEntries={["/courses"]}><App /></MemoryRouter>);
    fireEvent.click(await screen.findByRole("button", { name: /enquire about this course/i }));
    fireEvent.click(screen.getByRole("button", { name: /send enquiry/i }));
    await waitFor(() => expect(api.post).not.toHaveBeenCalled());
  });
});
