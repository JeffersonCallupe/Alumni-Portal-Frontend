import { renderHook, act } from "@testing-library/react";
import { vi } from "vitest";
import useDelete from "../../hooks/useDelete";

// Mock para sessionStorage
const mockFetch = vi.fn();
global.fetch = mockFetch;

beforeAll(() => {
  vi.stubGlobal("sessionStorage", {
    getItem: vi.fn((key) => {
      if (key === "token") return "mocked-token";
      return null;
    }),
    setItem: vi.fn(),
    removeItem: vi.fn(),
    clear: vi.fn(),
  });
});

describe("useDelete hook", () => {
  const apiUrl = "https://api.example.com/items";

  beforeEach(() => {
    mockFetch.mockReset();
  });

  test("calls API with correct URL and headers when deleteData is invoked", async () => {
    mockFetch.mockResolvedValueOnce({ ok: true });

    const { result } = renderHook(() => useDelete(apiUrl));

    await act(async () => {
      await result.current.deleteData(123);
    });

    expect(mockFetch).toHaveBeenCalledWith(`${apiUrl}/123`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer mocked-token",
      },
      redirect: "follow",
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  test("sets error when the API call fails", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, statusText: "Not Found" });

    const { result } = renderHook(() => useDelete(apiUrl));

    await act(async () => {
      await result.current.deleteData(123);
    });

    expect(result.current.error).toBe("Error al eliminar la actividad");
    expect(result.current.loading).toBe(false);
  });

  test("handles network errors gracefully", async () => {
    mockFetch.mockRejectedValueOnce(new Error("Network Error"));

    const { result } = renderHook(() => useDelete(apiUrl));

    await act(async () => {
      await result.current.deleteData(123);
    });

    expect(result.current.error).toBe("Network Error");
    expect(result.current.loading).toBe(false);
  });

  test("sets loading to true while the request is in progress", async () => {
    let resolveFetch;
    const fetchPromise = new Promise((resolve) => {
      resolveFetch = resolve;
    });
    mockFetch.mockReturnValueOnce(fetchPromise);

    const { result } = renderHook(() => useDelete(apiUrl));

    act(() => {
      result.current.deleteData(123);
    });

    expect(result.current.loading).toBe(true);

    await act(async () => {
      resolveFetch({ ok: true });
    });

    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });
});