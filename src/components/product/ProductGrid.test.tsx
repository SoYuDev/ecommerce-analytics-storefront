import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductGrid from './ProductGrid';

// Importamos los hooks para poder controlar sus valores devueltos en los tests
import { useFilteredProducts } from '@/hooks/products/useProducts';
import { useFilterStore } from '@/store/useFilterStore';

// 1. Mockeamos el Custom Hook de productos
// Usamos el alias @/ para asegurar que Jest encuentre el módulo correctamente
jest.mock('@/hooks/products/useProducts', () => ({
  useFilteredProducts: jest.fn(),
}));

// 2. Mockeamos la Store de filtros
// ProductGrid necesita leer el 'pageSize' para saber cuántos skeletons mostrar
jest.mock('@/store/useFilterStore', () => ({
  useFilterStore: jest.fn(),
}));

// 3. Mockeamos los componentes hijos para aislar el test del Grid
// ProductCard está en la misma carpeta, mantenemos ruta relativa
jest.mock('./ProductCard', () => {
  return function DummyProductCard({ product }: { product: { name: string } }) {
    return <div data-testid="product-card">{product.name}</div>;
  };
});

// SkeletonCard está un nivel arriba, usamos el alias @/ para evitar errores de ruta
jest.mock('@/components/SkeletonCard', () => {
  return function DummySkeleton() {
    return <div data-testid="skeleton-card" />;
  };
});

// Pagination está un nivel arriba, usamos el alias @/
jest.mock('@/components/Pagination', () => {
  return function MockPagination() {
    return <div data-testid="pagination" />;
  };
});

describe('Componente ProductGrid', () => {
  // Limpiamos los mocks antes de cada test para evitar interferencias
  beforeEach(() => {
    jest.clearAllMocks();

    // Configuramos un valor por defecto para la store en cada test
    (useFilterStore as unknown as jest.Mock).mockReturnValue({
      pageSize: 8,
    });
  });

  test('renderiza el estado de carga (isLoading) mostrando Skeletons', () => {
    // Simulamos que la query está cargando
    (useFilteredProducts as jest.Mock).mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      isFetching: false,
    });

    render(<ProductGrid />);

    // Verificamos que se rendericen tantos skeletons como indique el pageSize (8)
    const skeletons = screen.getAllByTestId('skeleton-card');
    expect(skeletons).toHaveLength(8);
  });

  test('renderiza el mensaje de error cuando isError es true', () => {
    // Simulamos un fallo en la petición
    (useFilteredProducts as jest.Mock).mockReturnValue({
      data: null,
      isLoading: false,
      isError: true,
      isFetching: false,
    });

    render(<ProductGrid />);

    // Usamos una expresión regular para que el test sea más flexible con el texto
    expect(screen.getByText(/Error al cargar productos/i)).toBeInTheDocument();
  });

  test('renderiza la lista de productos y la paginación correctamente', () => {
    // Simulamos una respuesta exitosa con datos paginados
    const mockData = {
      data: [
        { id: '1', name: 'Camiseta' },
        { id: '2', name: 'Pantalón' },
      ],
    };

    (useFilteredProducts as jest.Mock).mockReturnValue({
      data: mockData,
      isLoading: false,
      isError: false,
      isFetching: false,
    });

    render(<ProductGrid />);

    // 1. Verificamos que se rendericen las cards de productos
    const tarjetas = screen.getAllByTestId('product-card');
    expect(tarjetas).toHaveLength(2);
    expect(screen.getByText('Camiseta')).toBeInTheDocument();
    expect(screen.getByText('Pantalón')).toBeInTheDocument();

    // 2. Verificamos que el componente de paginación esté presente
    expect(screen.getByTestId('pagination')).toBeInTheDocument();
  });
});
