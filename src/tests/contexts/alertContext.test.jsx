import { render, screen, act } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { AlertProvider, useAlert } from "../../contexts/alertContext";
import React from "react";

// Un componente de prueba que usa el contexto de alerta
const TestComponent = () => {
    const { alertMessage, alertType, showAlert, hideAlert } = useAlert();

    return (
        <div>
            {alertMessage && (
                <div data-testid="alert">
                    <span>{alertType}: {alertMessage}</span>
                </div>
            )}
            <button onClick={() => showAlert("Test Alert", "success")}>
                Show Alert
            </button>
            <button onClick={hideAlert}>
                Hide Alert
            </button>
        </div>
    );
};

describe("AlertContext", () => {
    it("should display and hide alert messages", () => {
        render(
            <AlertProvider>
                <TestComponent />
            </AlertProvider>
        );

        // El mensaje de alerta no debería estar visible inicialmente
        expect(screen.queryByTestId("alert")).toBeNull();

        // Mostrar la alerta
        act(() => {
            screen.getByText("Show Alert").click();
        });
        expect(screen.getByTestId("alert")).toHaveTextContent("success: Test Alert");

        // Ocultar la alerta manualmente
        act(() => {
            screen.getByText("Hide Alert").click();
        });
        expect(screen.queryByTestId("alert")).toBeNull();
    });

    it("should auto-hide alert after 3 seconds", async () => {
        vi.useFakeTimers(); // Mock timers para manejar setTimeout
        render(
            <AlertProvider>
                <TestComponent />
            </AlertProvider>
        );

        // Mostrar la alerta
        act(() => {
            screen.getByText("Show Alert").click();
        });
        expect(screen.getByTestId("alert")).toHaveTextContent("success: Test Alert");

        // Avanzar el tiempo
        act(() => {
            vi.advanceTimersByTime(3000);
        });

        // El mensaje de alerta debería desaparecer después de 3 segundos
        expect(screen.queryByTestId("alert")).toBeNull();

        vi.useRealTimers(); // Restaurar timers reales
    });
});
