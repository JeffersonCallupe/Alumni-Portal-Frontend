import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";
import { UserProvider, useUserContext } from "../../src/contexts/userContext";
import { getProfilePicture } from "../../src/hooks/manageImageUser";



// Mockear importación de la imagen predeterminada
vi.mock("../../src/assets/logoPerfil.png", () => ({
  default: "default-profile.png",
}));

// Mockear `getProfilePicture`
vi.mock("../../src/hooks/manageImageUser", () => ({
  getProfilePicture: vi.fn(),
}));

// Componente de prueba que usa el contexto
const TestComponent = () => {
  const { userData, profilePicture, isInstitutional, updateUserData, logout } = useUserContext();

  return (
    <div>
      <p data-testid="user-data">{userData ? JSON.stringify(userData) : "No user data"}</p>
      <img data-testid="profile-picture" src={profilePicture} alt="Profile" />
      <p data-testid="is-institutional">{isInstitutional ? "Yes" : "No"}</p>
      <button onClick={() => updateUserData({ name: "John Doe", studentCode: "12345" })}>
        Update User
      </button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe("UserProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    sessionStorage.clear();
  });

  test("renders default values without sessionStorage data", () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    expect(screen.getByTestId("user-data").textContent).toBe("No user data");
    expect(screen.getByTestId("profile-picture").src).toContain("default-profile.png");
    expect(screen.getByTestId("is-institutional").textContent).toBe("No");
  });

  test("loads user data from sessionStorage and calls getProfilePicture", async () => {
    const mockUserData = { id: "1", name: "Jane Doe", studentCode: "98765", photoUrl: "photo-url" };
    sessionStorage.setItem("user", JSON.stringify(mockUserData));

    const mockImageUrl = "http://example.com/profile.jpg";
    getProfilePicture.mockResolvedValue(mockImageUrl);

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    expect(screen.getByTestId("user-data").textContent).toContain("Jane Doe");
    expect(screen.getByTestId("is-institutional").textContent).toBe("Yes");
    expect(await screen.findByTestId("profile-picture")).toHaveAttribute("src", mockImageUrl);
    expect(getProfilePicture).toHaveBeenCalledOnce();
  });

  test("updates user data correctly", () => {
    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    fireEvent.click(screen.getByText("Update User"));

    const updatedUserData = JSON.parse(screen.getByTestId("user-data").textContent);
    expect(updatedUserData.name).toBe("John Doe");
    expect(updatedUserData.studentCode).toBe("12345");
    expect(sessionStorage.getItem("user")).toContain("John Doe");
  });

  test("handles logout correctly", () => {
    const mockUserData = { id: "1", name: "Jane Doe" };
    sessionStorage.setItem("user", JSON.stringify(mockUserData));

    render(
      <UserProvider>
        <TestComponent />
      </UserProvider>
    );

    fireEvent.click(screen.getByText("Logout"));

    expect(screen.getByTestId("user-data").textContent).toBe("No user data");
    expect(screen.getByTestId("profile-picture").src).toContain("default-profile.png");
    expect(sessionStorage.getItem("user")).toBeNull();
  });
});
