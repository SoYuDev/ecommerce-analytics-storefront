'use client';
import GridPage from './GridPage';
import { use, useState } from 'react';
// import Filtericon from './buttons/FilterIcon';
import { products } from '@/mocks/mockProducts';
import ProductCard from './product/ProductCard';
import Filtericon from './buttons/FilterIcon';

export default function SideBar() {
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleFilters = () => {
    setFiltersOpen(!filtersOpen);
  };

  return (
    <>
      <button onClick={toggleFilters}>boton</button>
      <div className="main-shop">
        {filtersOpen && (
          <aside>
            <section className="filtersPanel">
              <div className="filtersSection">
                <h4>Orden</h4>
                <select>
                  <option>Menor precio</option>
                  <option>Mayor precio</option>
                </select>
              </div>
              <div className="filtersSection">
                <h4>Tipo</h4>
                <label>
                  <input type="checkbox" /> Ropa
                </label>
                <label>
                  <input type="checkbox" /> Tecnología
                </label>
                <label>
                  <input type="checkbox" /> Home
                </label>
                <label>
                  <input type="checkbox" /> Accesorios
                </label>
              </div>
            </section>
          </aside>
        )}

        {/* <section className="productsGrid">
          {products.map((p) => (
              <ProductCard 
           
                productName={p.name}
                description={p.description}
                price={p.price}
                image={p.image}
              />
          ))}
        </section> */}
      </div>
    </>
  );
}
