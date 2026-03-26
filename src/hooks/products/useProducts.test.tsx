import { renderHook, waitFor } from '@testing-library/react';
import { useFilteredProducts, useProduct } from './useProducts'; // Importamos AMBOS
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient,
} from '@tanstack/react-query';
import { useFilterStore } from '@/store/useFilterStore';
import { getFilteredProducts, getProductById } from '@/services/productService';
import React from 'react';

jest.mock('@/store/useFilterStore');
jest.mock('@/services/productService');
jest.mock('@tanstack/react-query', () => {
  const original = jest.requireActual('@tanstack/react-query');
  return { ...original, useQueryClient: jest.fn() };
});

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: { queries: { retry: false, staleTime: 0 } },
  });

describe('Hooks de Productos - Cobertura Total', () => {
  const mockPrefetchQuery = jest.fn();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={createTestQueryClient()}>
      {children}
    </QueryClientProvider>
  );

  beforeEach(() => {
    jest.clearAllMocks();
    (useQueryClient as jest.Mock).mockReturnValue({
      prefetchQuery: mockPrefetchQuery,
    });
  });

  // 1. CUBRE LÍNEAS 9-20 (Hook de detalle)
  test('useProduct debe obtener un producto por ID', async () => {
    const mockProduct = { id: '123', name: 'Test' };
    (getProductById as jest.Mock).mockResolvedValue(mockProduct);

    const { result } = renderHook(() => useProduct('123'), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockProduct);
  });

  // 2. CUBRE LÍNEAS 35 y 53 (Rama con categoría seleccionada)
  test('debe incluir la categoría en el array cuando existe', async () => {
    (useFilterStore as unknown as jest.Mock).mockReturnValue({
      selectedCategory: 'electronics', // <--- Dispara el [selectedCategory]
      priceOrder: '',
      nameOrder: '',
      currentPage: 1,
      pageSize: 8,
    });

    (getFilteredProducts as jest.Mock).mockResolvedValue({
      data: [],
      totalPages: 1,
    });

    const { result } = renderHook(() => useFilteredProducts(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(getFilteredProducts).toHaveBeenCalledWith(
      ['electronics'],
      '',
      '',
      1,
      8
    );
  });

  // 3. CUBRE LÍNEAS 62-67 (Lógica interna de prefetchQuery)
  test('debe ejecutar la función de llamada dentro del prefetch', async () => {
    (useFilterStore as unknown as jest.Mock).mockReturnValue({
      selectedCategory: '',
      priceOrder: '',
      nameOrder: '',
      currentPage: 1,
      pageSize: 8,
    });

    (getFilteredProducts as jest.Mock).mockResolvedValue({
      data: [],
      totalPages: 2,
      hasNextPage: true,
    });

    const { result } = renderHook(() => useFilteredProducts(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    result.current.prefetchNextPage();

    // Extraemos la queryFn del mock y la ejecutamos manualmente para cubrir el código
    const prefetchCall = mockPrefetchQuery.mock.calls[0][0];
    await prefetchCall.queryFn();

    expect(getFilteredProducts).toHaveBeenCalledTimes(2);
  });
});
