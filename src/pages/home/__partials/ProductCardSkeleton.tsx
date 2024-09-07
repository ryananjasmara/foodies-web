import { FC } from "react";

const ProductCardSkeleton: FC = () => {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-md">
      <div className="w-full h-48 bg-gray-300 rounded animate-pulse"></div>
      <div className="mt-4 h-6 bg-gray-300 rounded animate-pulse"></div>
      <div className="mt-2 h-4 bg-gray-300 rounded animate-pulse"></div>
      <div className="mt-4 h-10 bg-gray-300 rounded animate-pulse"></div>
    </div>
  );
};

export default ProductCardSkeleton;
