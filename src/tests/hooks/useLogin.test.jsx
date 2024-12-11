import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import useLogin from "../../hooks/useLogin";
import { useUserContext } from "../../contexts/userContext";

vi.mock("../../contexts/userContext", () => ({
  useUserContext: vi.fn(),
}));

describe("useLogin", () => {
  const mockUpdateUserData = vi.fn();
  const mockLoadProfilePicture = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
    useUserContext.mockReturnValue({
      updateUserData: mockUpdateUserData,
      loadProfilePicture: mockLoadProfilePicture,
    });
  });

  it("handles successful login with JSON response", async () => {
    const apiUrl = "http://mock-api.com/login";
    const mockCredentials = { username: "test", password: "1234" };
    const mockResponseData = { token: "abc123", user: { name: "Test User" } };

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve(mockResponseData),
        headers: { get: () => "application/json" },
      })
    );

    const { result } = renderHook(() => useLogin(apiUrl));

    await act(async () => {
      await result.current.login(mockCredentials);
    });

    expect(fetch).toHaveBeenCalledWith(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(mockCredentials),
    });

    expect(sessionStorage.getItem("user")).toEqual(JSON.stringify(mockResponseData));
    expect(mockUpdateUserData).toHaveBeenCalledWith(mockResponseData);
    expect(mockLoadProfilePicture).toHaveBeenCalledWith(mockResponseData);
    expect(result.current.data).toEqual(mockResponseData);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("handles successful login with plain text response", async () => {
    const apiUrl = "http://mock-api.com/login";
    const mockCredentials = { username: "test", password: "1234" };
    const mockResponseText = "Authentication successful";

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        text: () => Promise.resolve(mockResponseText),
        headers: { get: () => "text/plain" },
      })
    );

    const { result } = renderHook(() => useLogin(apiUrl));

    await act(async () => {
      await result.current.login(mockCredentials);
    });

    expect(result.current.data).toEqual(mockResponseText);
    expect(result.current.error).toBeNull();
    expect(result.current.loading).toBe(false);
  });

  it("handles login failure", async () => {
    const apiUrl = "http://mock-api.com/login";
    const mockCredentials = { username: "test", password: "wrong" };
    const mockErrorMessage = "Invalid credentials";

    global.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
        json: () => Promise.resolve({ message: mockErrorMessage }),
        headers: { get: () => "application/json" },
      })
    );

    const { result } = renderHook(() => useLogin(apiUrl));

    await act(async () => {
      await result.current.login(mockCredentials);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe(mockErrorMessage);
    expect(result.current.loading).toBe(false);
  });

  it("handles network error", async () => {
    const apiUrl = "http://mock-api.com/login";
    const mockCredentials = { username: "test", password: "1234" };

    global.fetch = vi.fn(() => Promise.reject(new Error("Network error")));

    const { result } = renderHook(() => useLogin(apiUrl));

    await act(async () => {
      await result.current.login(mockCredentials);
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBe("Network error");
    expect(result.current.loading).toBe(false);
  });
});
