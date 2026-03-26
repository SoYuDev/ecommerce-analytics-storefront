import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import SkeletonCard from '@/components/SkeletonCard';

describe('Componente SkeletonCard', () => {
  test('renderiza la estructura básica del skeleton', () => {
    render(<SkeletonCard />);

    // Buscamos el contenedor principal por su clase de animación
    // Usamos querySelector porque es un componente de puro estilo
    const skeletonContainer = screen.getByTestId('skeleton-card');
    expect(skeletonContainer).toBeInTheDocument();

    // Verificamos que tenga la clase de animación de Tailwind
    expect(skeletonContainer).toHaveClass('animate-pulse');
  });

  test('contiene los elementos que simulan la imagen y el texto', () => {
    const { container } = render(<SkeletonCard />);

    // Verificamos que existan los divs internos que simulan el contenido
    // 1 para la imagen, 1 para el título, 1 para el precio
    const decorativeDivs = container.querySelectorAll('div');

    // Dependiendo de cómo lo hayas programado, buscamos un mínimo de elementos
    expect(decorativeDivs.length).toBeGreaterThanOrEqual(3);
  });
});
