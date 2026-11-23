import { afterEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
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

describe("admin contact messages", () => {
  it("lists, checks, edits and deletes persisted contact messages", async () => {
    window.localStorage.setItem("decode_token", "test-token");
    window.localStorage.setItem("decode_user", JSON.stringify({ role: "admin", email: "admin@example.test" }));
    let message = {
      id: 21,
      name: "Asha Contact",
      email: "asha@example.test",
      phone: "+91 9876543210",
      subject: "Course enquiry",
      message: "Please call me about the next course batch.",
      status: "Unchecked",
      created_at: "2025-03-10T12:00:00",
    };
    api.get.mockImplementation((path) => {
      if (path === "/dashboard/stats") return Promise.resolve({ data: {} });
      if (path === "/admin/contact_messages") {
        return Promise.resolve({ data: { items: message ? [message] : [], total: message ? 1 : 0 } });
      }
      return Promise.resolve({ data: { items: [], total: 0 } });
    });
    api.patch.mockImplementation(async () => {
      message = { ...message, status: "Checked" };
      return { data: message };
    });
    api.put.mockImplementation(async (_path, updates) => {
      message = { ...message, ...updates };
      return { data: message };
    });
    api.delete.mockImplementation(async () => {
      message = null;
      return { data: null };
    });
    const confirm = vi.spyOn(window, "confirm").mockReturnValue(true);

    render(<MemoryRouter initialEntries={["/admin"]}><App /></MemoryRouter>);
    const navigation = within(screen.getByRole("navigation", { name: "Admin sections" }));
    await fireEvent.click(navigation.getByRole("button", { name: "Contact Messages" }));

    expect(await screen.findByRole("heading", { level: 1, name: "Contact Messages" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { level: 2, name: "Contact Messages" })).not.toBeInTheDocument();
    expect(screen.queryByText("Manage records stored in the Decode Institution database.")).not.toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "+ Add record" })).not.toBeInTheDocument();

    const table = screen.getByRole("table", { name: "Contact messages" });
    expect(Array.from(table.querySelectorAll("thead th")).map((cell) => cell.textContent)).toEqual([
      "Name", "Contact Us Message", "Date", "Status", "Action",
    ]);
    expect(within(table).getByText("Asha Contact")).toBeInTheDocument();
    expect(within(table).getByText("asha@example.test")).toBeInTheDocument();
    expect(within(table).getByText("+91 9876543210")).toBeInTheDocument();
    expect(within(table).getByText("Please call me about the next course batch.")).toBeInTheDocument();
    expect(within(table).getByText(new Date(message.created_at).toLocaleDateString())).toBeInTheDocument();

    fireEvent.click(within(table).getByRole("button", { name: "Unchecked" }));
    await waitFor(() => expect(api.patch).toHaveBeenCalledWith("/admin/contact_messages/21/status"));
    expect(await within(table).findByRole("button", { name: "Checked" })).toBeDisabled();

    fireEvent.click(navigation.getByRole("button", { name: "Courses" }));
    fireEvent.click(navigation.getByRole("button", { name: "Contact Messages" }));
    expect(await within(screen.getByRole("table", { name: "Contact messages" })).findByRole("button", { name: "Checked" })).toBeDisabled();

    fireEvent.click(within(table).getByRole("button", { name: "Edit" }));
    fireEvent.change(screen.getByLabelText(/^Name/), { target: { value: "Asha Updated" } });
    fireEvent.change(screen.getByLabelText(/^Email/), { target: { value: "asha.updated@example.test" } });
    fireEvent.change(screen.getByLabelText(/^Phone/), { target: { value: "+91 9876500000" } });
    fireEvent.change(screen.getByLabelText(/^Message/), { target: { value: "Please call after 5 PM." } });
    fireEvent.click(screen.getByRole("button", { name: "Save changes" }));

    await waitFor(() => expect(api.put).toHaveBeenCalledWith("/admin/contact_messages/21", {
      name: "Asha Updated",
      email: "asha.updated@example.test",
      phone: "+91 9876500000",
      message: "Please call after 5 PM.",
    }));
    expect(await screen.findByText("Asha Updated")).toBeInTheDocument();
    expect(message.status).toBe("Checked");
    expect(message.created_at).toBe("2025-03-10T12:00:00");

    fireEvent.click(within(table).getByRole("button", { name: "Delete" }));
    expect(confirm).toHaveBeenCalledWith("Delete this contact message? This action cannot be undone.");
    await waitFor(() => expect(api.delete).toHaveBeenCalledWith("/admin/contact_messages/21"));
    expect(screen.queryByText("Asha Updated")).not.toBeInTheDocument();
    confirm.mockRestore();
  });
});
