import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback } from 'react';
import { getProductById, getFilteredProducts } from '@/services/productService';
import { Product } from '@/types/product';
import { PaginatedResponse } from '@/types/paginatedResponse';
import { useFilterStore } from '@/store/useFilterStore';

const withQueryDefaults = () => ({
  staleTime: 1000 * 60 * 5,
  retry: 1,
});

export const useProduct = (id: string) => {
  return useQuery<Product | undefined>({
    queryKey: ['products', 'detail', id],
    queryFn: () => getProductById(id),
    enabled: !!id,
    ...withQueryDefaults(),
  });
};

export const useFilteredProducts = () => {
  const queryClient = useQueryClient();
  const { selectedCategory, priceOrder, nameOrder, currentPage, pageSize } =
    useFilterStore();

  const query = useQuery<PaginatedResponse<Product>>({
    queryKey: [
      'products',
      'list',
      { selectedCategory, priceOrder, nameOrder, page: currentPage, pageSize },
    ],
    queryFn: () =>
      getFilteredProducts(
        selectedCategory ? [selectedCategory] : [],
        priceOrder,
        nameOrder,
        currentPage,
        pageSize
      ),
    staleTime: 1000 * 60 * 5,
  });

  const prefetchNextPage = useCallback(() => {
    // console.log('Evento hover detectado');
    // if (query.data?.hasNextPage) {
    //   console.log('Haciendo prefetch de la página:', currentPage + 1);
    // } else {
    //   console.log('No hay página siguiente ');
    // }
    if (query.data?.hasNextPage) {
      const nextPage = currentPage + 1;
      const prefetchCategories = selectedCategory ? [selectedCategory] : [];

      queryClient.prefetchQuery({
        queryKey: [
          'products',
          'list',
          { selectedCategory, priceOrder, nameOrder, page: nextPage, pageSize },
        ],
        queryFn: () =>
          getFilteredProducts(
            prefetchCategories,
            priceOrder,
            nameOrder,
            nextPage,
            pageSize
          ),
      });
    }
  }, [
    currentPage,
    query.data,
    selectedCategory,
    priceOrder,
    nameOrder,
    pageSize,
    queryClient,
  ]);

  return { ...query, prefetchNextPage };
};
