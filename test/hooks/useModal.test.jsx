import { render, screen, fireEvent } from '@testing-library/react';
<<<<<<< HEAD:src/tests/hooks/useModal.test.jsx
import useModal from '../../hooks/useModal'; // Ajusta la ruta según corresponda

=======
import useModal from '../../src/hooks/useModal';
>>>>>>> origin/main:test/hooks/useModal.test.jsx
// Crear un componente que use el hook useModal
const TestComponent = () => {
  const { open, handleOpen, handleClose } = useModal();

  return (
    <div>
      <button onClick={handleOpen}>Open Modal</button>
      <button onClick={handleClose}>Close Modal</button>
      {open && <div role="dialog">Modal is open</div>}
    </div>
  );
};

describe('useModal hook', () => {
  it('should initially have open state as false', () => {
    render(<TestComponent />);
    expect(screen.queryByRole('dialog')).toBeNull(); // No debería haber un modal visible al inicio
  });

  it('should open the modal when handleOpen is called', () => {
    render(<TestComponent />);
    
    fireEvent.click(screen.getByText('Open Modal')); // Simula el click en el botón "Open Modal"
    
    // Esperamos que el modal sea visible después de abrirlo
    expect(screen.getByRole('dialog')).toHaveTextContent('Modal is open');
  });

  it('should close the modal when handleClose is called', () => {
    render(<TestComponent />);
    
    // Primero abre el modal
    fireEvent.click(screen.getByText('Open Modal'));
    expect(screen.getByRole('dialog')).toHaveTextContent('Modal is open');
    
    // Luego cierra el modal
    fireEvent.click(screen.getByText('Close Modal'));
    expect(screen.queryByRole('dialog')).toBeNull(); // El modal debería desaparecer
  });
});
