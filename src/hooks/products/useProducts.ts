import { useQuery } from '@tanstack/react-query';
import {
  getProducts,
  getProductById,
  getProductsByCategory,
} from '@/services/productService';
import { Product } from '@/types/product';
import { PaginatedResponse } from '@/types/paginatedResponse';

const withQueryDefaults = () => ({
  staleTime: 1000 * 60 * 5, // 5 minutes: Data is considered "fresh" for 5 min.
  retry: 1,
});

//  Hook for general list
export const useListProducts = () => {
  return useQuery<PaginatedResponse<Product>>({
    // Structure: [Domain, Action]
    queryKey: ['products', 'list'],
    queryFn: () => getProducts(),
    ...withQueryDefaults(),
  });
};

//  Hook for detail (DYNAMIC)
export const useProduct = (id: string) => {
  return useQuery<Product | undefined>({
    // Structure: [Domain, Action, ID]
    queryKey: ['products', 'detail', id],
    queryFn: () => getProductById(id),
    enabled: !!id, // <---Only executed if the id has content
    ...withQueryDefaults(),
  });
};

//  Hook for categories (DYNAMIC with Object)
export const useProductsByCategories = (categories: string[]) => {
  return useQuery<Product[]>({
    // Structure: [Domain, Action, { Filters }]
    // the key will be ['products', 'list', { categories: ['electronics'] }]
    queryKey: ['products', 'list', { categories }],
    queryFn: () => getProductsByCategory(categories),
    ...withQueryDefaults(),
  });
};
