import { describe, expect, it, vi } from "vitest";

const { captureRequestInterceptor } = vi.hoisted(() => ({
  captureRequestInterceptor: vi.fn(),
}));

vi.mock("axios", () => ({
  default: {
    create: () => ({
      defaults: { baseURL: "/api/v1" },
      interceptors: {
        request: { use: (interceptor) => captureRequestInterceptor(interceptor) },
        response: { use: vi.fn() },
      },
    }),
  },
}));

import api, { getErrorMessage } from "./api";

describe("API error messages", () => {
  it("explains when the API cannot be reached", () => {
    expect(getErrorMessage({
      code: "ERR_NETWORK",
      message: "Network Error",
      config: { baseURL: api.defaults.baseURL },
    })).toContain(`Cannot reach the API at ${api.defaults.baseURL}`);
  });

  it("uses validation details returned by the API", () => {
    expect(getErrorMessage({ response: { data: { detail: "A trainer with this name already exists" } } }))
      .toBe("A trainer with this name already exists");
  });

  it("adds the admin token to API requests", () => {
    window.localStorage.setItem("decode_token", "test-admin-token");
    const requestInterceptor = captureRequestInterceptor.mock.calls[0][0];
    const config = requestInterceptor({ headers: {} });

    expect(config.headers.Authorization).toBe("Bearer test-admin-token");
    window.localStorage.removeItem("decode_token");
  });
});
