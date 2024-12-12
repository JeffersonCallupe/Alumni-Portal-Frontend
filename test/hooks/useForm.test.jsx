import { renderHook, act } from "@testing-library/react";
import useForm from "../../src/hooks/useForm";

describe("useForm hook", () => {
  const initialValues = { name: "", email: "" };
  const mockOnSubmit = vi.fn();
  const mockValidate = vi.fn();

  beforeEach(() => {
    mockOnSubmit.mockReset();
    mockValidate.mockReset();
  });

  test("initializes with initialValues", () => {
    const { result } = renderHook(() =>
      useForm(initialValues, mockOnSubmit, mockValidate)
    );

    expect(result.current.formData).toEqual(initialValues);
    expect(result.current.errors).toEqual({});
  });

  test("updates formData on handleChange", () => {
    const { result } = renderHook(() =>
      useForm(initialValues, mockOnSubmit, mockValidate)
    );

    act(() => {
      result.current.handleChange({ target: { name: "name", value: "John" } });
    });

    expect(result.current.formData.name).toBe("John");
    expect(result.current.formData.email).toBe("");
  });

  test("validates formData on handleValidation", () => {
    mockValidate.mockReturnValueOnce({ email: "Email is required" });

    const { result } = renderHook(() =>
      useForm(initialValues, mockOnSubmit, mockValidate)
    );

    act(() => {
      const isValid = result.current.handleValidation();
      expect(isValid).toBe(false);
    });

    expect(mockValidate).toHaveBeenCalledWith(result.current.formData);
    expect(result.current.errors).toEqual({ email: "Email is required" });
  });

  test("validates specific fields on handleValidation", () => {
    mockValidate.mockReturnValueOnce({
      name: "Name is required",
      email: "Email is required",
    });

    const { result } = renderHook(() =>
      useForm(initialValues, mockOnSubmit, mockValidate)
    );

    act(() => {
      const isValid = result.current.handleValidation(["name"]);
      expect(isValid).toBe(false);
    });

    expect(result.current.errors).toEqual({ name: "Name is required" });
  });

  test("calls onSubmit when handleSubmit is invoked with no validation errors", () => {
    mockValidate.mockReturnValueOnce({});

    const { result } = renderHook(() =>
      useForm(initialValues, mockOnSubmit, mockValidate)
    );

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() });
    });

    expect(mockValidate).toHaveBeenCalledWith(result.current.formData);
    expect(mockOnSubmit).toHaveBeenCalledWith(result.current.formData);
    expect(result.current.errors).toEqual({});
  });

  test("does not call onSubmit when validation errors exist", () => {
    mockValidate.mockReturnValueOnce({ name: "Name is required" });

    const { result } = renderHook(() =>
      useForm(initialValues, mockOnSubmit, mockValidate)
    );

    act(() => {
      result.current.handleSubmit({ preventDefault: vi.fn() });
    });

    expect(mockValidate).toHaveBeenCalledWith(result.current.formData);
    expect(mockOnSubmit).not.toHaveBeenCalled();
    expect(result.current.errors).toEqual({ name: "Name is required" });
  });
});
