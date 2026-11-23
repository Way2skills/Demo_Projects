import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor } from "@testing-library/react";
import Contact from "./Contact";
import api from "../services/api";

vi.mock("../services/api", () => ({
  default: { get: vi.fn(), post: vi.fn() },
  getErrorMessage: (error) => error?.message || "Request failed",
}));

afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

function fillContactForm() {
  fireEvent.change(screen.getByPlaceholderText("Enter your full name"), { target: { value: "Asha Contact" } });
  fireEvent.change(screen.getByPlaceholderText("Enter your email address"), { target: { value: "asha@example.test" } });
  fireEvent.change(screen.getByPlaceholderText("Enter your phone number"), { target: { value: "+91 9876543210" } });
  fireEvent.change(screen.getByLabelText("Subject"), { target: { value: "Course enquiry" } });
  fireEvent.change(screen.getByPlaceholderText("Write your message here..."), { target: { value: "Please call me about the next course batch." } });
}

describe("Contact page", () => {
  it("uses the requested contact details and saves before showing the success message", async () => {
    let resolveSubmission;
    api.post.mockReturnValue(new Promise((resolve) => { resolveSubmission = resolve; }));

    render(<Contact />);
    expect(document.querySelector(".contact-address span").textContent).toBe(
      "4th Cross, Near New Bus Stand,\nNamakkal 637001,\nTamil Nadu,\nIndia",
    );
    expect(screen.getByRole("link", { name: "+91 63812 43416" })).toHaveAttribute("href", "tel:+916381243416");
    expect(screen.getByPlaceholderText("Enter your full name")).toBeRequired();
    expect(screen.getByPlaceholderText("Enter your email address")).toBeRequired();
    expect(screen.getByPlaceholderText("Enter your phone number")).toBeRequired();
    expect(screen.getByPlaceholderText("Write your message here...")).toBeRequired();

    fillContactForm();
    const form = screen.getByPlaceholderText("Write your message here...").closest("form");
    fireEvent.submit(form);
    fireEvent.submit(form);

    expect(api.post).toHaveBeenCalledTimes(1);
    expect(api.post).toHaveBeenCalledWith("/contact", expect.objectContaining({
      name: "Asha Contact",
      email: "asha@example.test",
      phone: "+91 9876543210",
      subject: "Course enquiry",
      message: "Please call me about the next course batch.",
      submission_id: expect.stringMatching(/^[0-9a-f-]{36}$/i),
    }));
    expect(screen.getByRole("button", { name: /Sending/ })).toBeDisabled();
    expect(screen.queryByRole("status")).not.toBeInTheDocument();

    resolveSubmission({ data: { id: 1, status: "Unchecked", email_sent: true } });

    expect(await screen.findByRole("status")).toHaveTextContent(
      "Your message has been recorded. A confirmation email has been sent to your email address. Our Decode Team will contact you through a phone call within 2 or 3 working days.",
    );
    await waitFor(() => expect(screen.getByRole("button", { name: /Send message/ })).toBeEnabled());
  });

  it("shows a request error without reporting success", async () => {
    api.post.mockRejectedValue(new Error("Could not save your message"));
    render(<Contact />);
    fillContactForm();
    fireEvent.submit(screen.getByPlaceholderText("Write your message here...").closest("form"));

    expect(await screen.findByRole("alert")).toHaveTextContent("Could not save your message");
    expect(screen.queryByRole("status")).not.toBeInTheDocument();
  });

  it("reuses the same submission id after a retry of unchanged form data", async () => {
    api.post
      .mockRejectedValueOnce(new Error("Network timeout"))
      .mockResolvedValueOnce({ data: { id: 2, status: "Unchecked", email_sent: true } });
    render(<Contact />);
    fillContactForm();
    const form = screen.getByPlaceholderText("Write your message here...").closest("form");

    fireEvent.submit(form);
    await screen.findByRole("alert");
    fireEvent.submit(form);

    await screen.findByRole("status");
    const firstRequest = api.post.mock.calls[0][1];
    const retryRequest = api.post.mock.calls[1][1];
    expect(retryRequest.submission_id).toBe(firstRequest.submission_id);
  });
});
