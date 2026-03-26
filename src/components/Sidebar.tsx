'use client';

import { Category, useFilterStore } from '@/store/useFilterStore';

export default function SideBar() {
  //desde Zustand obtenemos el estado global
  // Estado global: categoría seleccionada y función para actualizarla
  const selectedCategory = useFilterStore((state) => state.selectedCategory);
  const setSelectedCategory = useFilterStore(
    (state) => state.setSelectedCategory
  );

  // Estado global: orden de precio y función para actualizarlo
  const priceOrder = useFilterStore((state) => state.priceOrder);
  const setPriceOrder = useFilterStore((state) => state.setPriceOrder);

  // Estado global: orden alfabético y función para actualizarlo
  const nameOrder = useFilterStore((state) => state.nameOrder);
  const setNameOrder = useFilterStore((state) => state.setNameOrder);
  const resetFilters = useFilterStore((state) => state.resetFilters);

  // Categorías disponibles para filtrar
  const categories: Category[] = [
    'clothing',
    'electronics',
    'home',
    'accessories',
  ];

  return (
    <dialog open className="mainShopFilterContainer">
      <div>
        <span className="filterTitle">Filtros</span>
      </div>
      <hr />

      <section className="filtersPanel">
        {/* SECCIÓN CATEGORÍAS: Permite seleccionar una categoría para filtrar productos */}
        <div className="titleFilter">
          <span className="categoryTitle">Categoría</span>
        </div>
        <div className="filtersSection">
          {categories.map((category) => (
            <label key={category}>
              <input
                type="checkbox"
                checked={selectedCategory === category}
                onChange={() => setSelectedCategory(category)}
              />
              {/* Mostrar el nombre de la categoría con la primera letra en mayúscula */}
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </label>
          ))}
        </div>

        <hr />

        {/* SECCIÓN PRECIO: Permite ordenar productos por precio */}
        <div className="titleFilter">
          <span>Precio</span>
        </div>
        <div className="priceFilter">
          <select
            aria-label="Ordenar por precio"
            value={priceOrder || ''}
            onChange={(e) => {
              const val = e.target.value;
              // Cambia el orden de precio según la selección
              if (val === 'min-max' || val === 'max-min') {
                setPriceOrder(val);
              } else {
                setPriceOrder('max-min');
              }
            }}
          >
            <option value="">Sin orden</option>
            <option value="max-min">Precio más alto</option>
            <option value="min-max">Precio más bajo</option>
          </select>
        </div>

        <hr />

        {/* SECCIÓN ORDEN ALFABÉTICO: Permite ordenar productos por nombre */}
        <div className="alphabeticOrder">
          <span>Orden Alfabético</span>
          <br />
          <div className="buttonGroup">
            <button
              className={nameOrder === 'a-z' ? 'active' : ''}
              onClick={() => setNameOrder('a-z')}
            >
              A-Z
            </button>

            <button
              className={nameOrder === 'z-a' ? 'active' : ''}
              onClick={() => setNameOrder('z-a')}
            >
              Z-A
            </button>
          </div>
        </div>

        <div className="resetFilters">
          <button
            type="button"
            className="resetFiltersButton"
            onClick={resetFilters}
          >
            Borrar filtros{' '}
          </button>
        </div>
      </section>
    </dialog>
  );
}
