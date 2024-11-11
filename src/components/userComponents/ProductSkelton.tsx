const ProductSkelton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((skeleton) => (
        <div key={skeleton} className="bg-white shadow-md rounded-lg overflow-hidden animate-pulse">
          <div className="w-full h-48 bg-gray-200" />
          <div className="p-4">
            <div className="h-6 bg-gray-200 rounded w-3/4 mb-2" />
            <div className="h-4 bg-gray-200 rounded w-1/4 mb-4" />
            <div className="h-10 bg-gray-200 rounded" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductSkelton
