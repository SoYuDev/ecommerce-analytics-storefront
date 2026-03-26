export default function SkeletonCard() {
  return (
    <div
      data-testid="skeleton-card"
      className="gridBox animate-pulse bg-[#3FB6A8] border-gray-200 rounded-xl overflow-hidden shadow-sm"
    >
      {/* Espacio para la imagen */}
      <div className="w-full h-48 bg-[#e0e0cc] opacity-50" />

      {/* Contenido de la tarjeta */}
      <div className="p-4 space-y-3">
        {/* Título del producto */}
        <div className="h-4 bg-[#e0e0cc] rounded w-3/4" />
        {/* Categoría */}
        <div className="h-3 bg-[#e0e0cc] rounded w-1/2 opacity-60" />

        {/* Precio y Botón */}
        <div className="flex justify-between items-center pt-2">
          <div className="h-5 bg-[#e0e0cc] rounded w-16" />
          <div className="h-8 bg-[#e0e0cc] rounded-lg w-20" />
        </div>
      </div>
    </div>
  );
}
