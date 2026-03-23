// 'use client';
// import GridPage from './GridPage';
// import { use, useState } from 'react';
// import Filtericon from './buttons/FilterIcon';
// import { products } from '@/mocks/mockProducts';
// import ProductCard from './product/ProductCard';

export default function SideBar() {
  return (
    <>
      <div className="mainShopFilterContainer">
        <div>
          <span className="filterTitle">Filtros</span>
        </div>
        <div>
          <span className="categoryTitle">Categoría</span>
        </div>

        <section className="filtersPanel">
          <div className="filtersSection">
            <label>
              <input type="checkbox" />
              Ropa
            </label>
            <label>
              <input type="checkbox" />
              Tecnología
            </label>
            <label>
              <input type="checkbox" />
              Home
            </label>
            <label>
              <input type="checkbox" />
              Accesorios
            </label>
          </div>
          <span>Precio</span>
          <div className="priceFilter">
            <input
              type="range"
              min="0"
              max="100"
              aria-label="Price Filter"
              title="Price Filter"
            />
          </div>
          <div>
            <span>Orden Alfabetico</span>
            <br />

            <button>A-Z</button>
            <button>Z-A</button>
          </div>
        </section>
      </div>
    </>
  );
}
