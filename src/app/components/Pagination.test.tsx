import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useFilterStore } from '@/store/useFilterStore';
import { useFilteredProducts } from '@/hooks/products/useProducts';
import Pagination from '@/components/Pagination';

// 1. Mockeamos la Store y el Hook
jest.mock('@/store/useFilterStore', () => ({
  useFilterStore: jest.fn(),
}));

jest.mock('@/hooks/products/useProducts', () => ({
  useFilteredProducts: jest.fn(),
}));

describe('Componente Pagination', () => {
  const mockSetCurrentPage = jest.fn();
  const mockPrefetchNextPage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    // Estado inicial de la Store
    (useFilterStore as unknown as jest.Mock).mockReturnValue({
      currentPage: 1,
      setCurrentPage: mockSetCurrentPage,
      pageSize: 8,
      setPageSize: jest.fn(),
    });

    // Respuesta inicial del Hook
    (useFilteredProducts as jest.Mock).mockReturnValue({
      data: {
        totalPages: 5,
        hasNextPage: true,
        hasPrevPage: false,
      },
      prefetchNextPage: mockPrefetchNextPage,
    });
  });

  test('renderiza el número correcto de páginas', () => {
    render(<Pagination />);
    // Buscamos los botones de números (1, 2, 3, 4, 5)
    const pageButtons = screen
      .getAllByRole('button')
      .filter((btn) => !isNaN(Number(btn.textContent)));
    expect(pageButtons).toHaveLength(5);
  });

  test('el botón "Anterior" está deshabilitado en la página 1', () => {
    render(<Pagination />);
    const prevButton = screen.getByText(/Anterior/i);
    expect(prevButton).toBeDisabled();
  });

  test('dispara el prefetch al pasar el ratón por "Siguiente"', () => {
    render(<Pagination />);
    const nextButton = screen.getByText(/Siguiente/i);

    // SIMULAMOS EL HOVER
    fireEvent.mouseEnter(nextButton);

    // Verificamos que se llame a la función que optimiza la carga
    expect(mockPrefetchNextPage).toHaveBeenCalledTimes(1);
  });

  test('cambia de página al hacer clic en un número', () => {
    render(<Pagination />);
    const page3Button = screen.getByText('3');

    fireEvent.click(page3Button);

    expect(mockSetCurrentPage).toHaveBeenCalledWith(3);
  });
});
