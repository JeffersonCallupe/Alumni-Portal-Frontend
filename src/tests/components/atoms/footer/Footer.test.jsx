import { render, screen } from '@testing-library/react';
import Footer from '../../../../components/atoms/footer/footer';

describe('Footer', () => {
  it('renders footer content correctly', () => {
    render(<Footer />);
    
    // Verificar si el texto del copyright está presente
    const footerText = screen.getByText(/© 2024 Universidad Nacional Mayor de San Marcos - grupo 2 uwu/i);
    expect(footerText).toBeInTheDocument();

    // Verificar si el color de fondo está correctamente aplicado
    const footerElement = screen.getByRole('contentinfo'); // El footer por defecto tiene el role "contentinfo"
    expect(footerElement).toHaveStyle('background-color: #6F191C');
  });
});
