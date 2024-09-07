import { formatCurrency } from "@/shared/utils";
import { FC } from "react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import { Button } from "@/shared/components/Button/Button";

interface Props {
  id: number;
  name: string;
  image: string;
  price: number;
  qty: number;
  type: "Food" | "Beverage";
  handleBuy: () => void;
}

const ProductCard: FC<Props> = ({
  id,
  name,
  image,
  price,
  qty,
  type,
  handleBuy,
}) => {
  return (
    <div
      key={id}
      className="bg-white p-4 rounded-lg border border-gray-200 shadow-md hover:shadow-lg transition-shadow duration-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
    >
      <div className="relative w-full h-48 bg-gray-200 rounded overflow">
        <img
          src={image}
          alt={name}
          className={`w-full h-full object-contain transition-transform duration-300 transform hover:scale-105 ${
            qty === 0 ? "grayscale" : ""
          }`}
        />
        <div className="absolute top-2 left-2 bg-white text-gray-800 text-xs font-semibold px-2 py-1 rounded flex items-center">
          {type === "Food" ? (
            <span className="text-purple-500">Food</span>
          ) : (
            <span className="text-orange-500">Beverage</span>
          )}
        </div>
        <div
          className={`absolute top-2 right-2 ${
            qty > 0 ? "bg-green-700" : "bg-red-700"
          } text-gray-800 text-xs font-semibold px-2 py-1 rounded flex items-center`}
        >
          {qty > 0 ? (
            <span className="text-white">
              {qty > 100 ? "100+ Remaining" : `${qty} Remaining`}
            </span>
          ) : (
            <span className="text-white">Out of Stock</span>
          )}
        </div>
      </div>
      <h2 className="mt-4 text-lg font-bold text-gray-800">{name}</h2>
      <div className="mt-2 mb-4 text-gray-600 flex justify-between">
        <span>{formatCurrency(price)}</span>
      </div>
      <Button
        title="Buy"
        backgroundColor="blue"
        isDisabled={qty === 0}
        onClick={handleBuy}
        isFull
        icon={<ShoppingCartIcon className="h-5 w-5" />}
      />
    </div>
  );
};

export default ProductCard;
