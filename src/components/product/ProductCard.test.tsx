import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from './ProductCard';
import { useCartStore } from '@/store/useCartStore';

// 1. Mockeamos FlexibleImage extrayendo las props de Next.js
jest.mock('@/app/components/FlexibleImage', () => {
  // Extraemos fill y priority para que NO entren en ...rest
  return function DummyFlexibleImage({
    fill: _fill,
    priority: _prio,
    sizes: _s,
    ...rest
  }: any) {
    return <img data-testid="flexible-image" {...rest} />;
  };
});

// 2. Mockeamos Zustand (El estado global)
jest.mock('@/store/useCartStore', () => ({
  useCartStore: jest.fn(),
}));

describe('Componente ProductCard', () => {
  const mockProduct = {
    id: '123',
    name: 'Teclado Mecánico',
    price: 99.99,
    image: '/teclado.jpg',
  };

  const mockAddToCart = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    (useCartStore as unknown as jest.Mock).mockImplementation((selector) => {
      return selector({ addToCart: mockAddToCart });
    });
  });

  test('renderiza la información del producto correctamente', () => {
    render(<ProductCard product={mockProduct as any} />);

    expect(screen.getByText('Teclado Mecánico')).toBeInTheDocument();
    expect(screen.getByText('99.99€')).toBeInTheDocument();

    const imagen = screen.getByTestId('flexible-image');
    expect(imagen).toHaveAttribute('src', '/teclado.jpg');
    expect(imagen).toHaveAttribute('alt', 'Teclado Mecánico');
  });

  test('llama a la función addToCart al hacer clic en el botón', () => {
    render(<ProductCard product={mockProduct as any} />);

    const boton = screen.getByRole('button', { name: /Añadir al carrito/i });

    fireEvent.click(boton);

    expect(mockAddToCart).toHaveBeenCalledTimes(1);
    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct);
  });
});
