import {
  getProducts,
  getProductById,
  getProductsByCategory,
} from '@/services/productService';
import { products } from '@/mocks/mockProducts';

describe('Product Service', () => {
  test('getProducts returns all products with correct metadata', () => {
    const result = getProducts();

    expect(result.data).toEqual(products);
    expect(result.totalCount).toBe(products.length);
    expect(result.page).toBe(1);
    expect(result.hasNextPage).toBe(false);
  });

  test('getProductById returns the correct product', () => {
    const product = products[0];

    const result = getProductById(product.id);

    expect(result).toEqual(product);
  });

  test('getProductById returns undefined if it does not exist', () => {
    const result = getProductById('Does not exist');

    expect(result).toBeUndefined();
  });

  test('getProductsByCategory filter correctly', () => {
    const category = products[0].category;

    const result = getProductsByCategory([category]);

    expect(result.every((p) => p.category === category)).toBe(true);
  });

  test('getProductsByCategory returns all if categories is empty', () => {
    const result = getProductsByCategory([]);

    expect(result).toEqual(products);
  });
});
