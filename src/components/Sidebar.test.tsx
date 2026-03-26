import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import SideBar from './Sidebar';
import { useFilterStore } from '@/store/useFilterStore';

jest.mock('@/store/useFilterStore', () => ({
  useFilterStore: jest.fn(),
}));

describe('Componente SideBar', () => {
  const mockSetSelectedCategory = jest.fn();
  const mockSetPriceOrder = jest.fn();
  const mockSetNameOrder = jest.fn();
  const mockResetFilters = jest.fn();

  // Setup por defecto para evitar repetir código en cada test
  beforeEach(() => {
    jest.clearAllMocks();
    (useFilterStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({
        selectedCategory: '',
        priceOrder: '',
        nameOrder: '',
        setSelectedCategory: mockSetSelectedCategory,
        setPriceOrder: mockSetPriceOrder,
        setNameOrder: mockSetNameOrder,
        resetFilters: mockResetFilters,
      })
    );
  });

  test('renderiza correctamente las secciones principales', () => {
    render(<SideBar />);
    expect(screen.getByText(/^Filtros$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Precio$/i)).toBeInTheDocument();
    expect(screen.getByText(/^Orden Alfabético$/i)).toBeInTheDocument();
  });

  test('maneja la selección de categorías', () => {
    render(<SideBar />);
    fireEvent.click(screen.getByLabelText(/Electronics/i));
    expect(mockSetSelectedCategory).toHaveBeenCalledWith('electronics');
  });

  test('maneja la lógica de orden de precio (Cubre ramas IF/ELSE)', () => {
    render(<SideBar />);
    const select = screen.getByLabelText(/Ordenar por precio/i);

    // Rama IF: Valor válido
    fireEvent.change(select, { target: { value: 'min-max' } });
    expect(mockSetPriceOrder).toHaveBeenCalledWith('min-max');

    // Rama ELSE: Seleccionar "Sin orden" (valor "")
    fireEvent.change(select, { target: { value: '' } });
    expect(mockSetPriceOrder).toHaveBeenCalledWith('max-min');
  });

  test('maneja el orden alfabético y sus estados visuales (Cubre ternarios)', () => {
    // 1. Caso A-Z activo
    (useFilterStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ nameOrder: 'a-z', setNameOrder: mockSetNameOrder })
    );
    const { rerender } = render(<SideBar />);
    expect(screen.getByText('A-Z')).toHaveClass('active');

    fireEvent.click(screen.getByText('A-Z'));
    expect(mockSetNameOrder).toHaveBeenCalledWith('a-z');

    // 2. Caso Z-A activo
    (useFilterStore as unknown as jest.Mock).mockImplementation((selector) =>
      selector({ nameOrder: 'z-a', setNameOrder: mockSetNameOrder })
    );
    rerender(<SideBar />);
    expect(screen.getByText('Z-A')).toHaveClass('active');
    expect(screen.getByText('A-Z')).not.toHaveClass('active');
  });

  test('ejecuta la limpieza de filtros', () => {
    render(<SideBar />);
    fireEvent.click(screen.getByRole('button', { name: /Borrar filtros/i }));
    expect(mockResetFilters).toHaveBeenCalled();
  });
});
