import { FC } from "react";
import { GetProductResponse } from "@/services/types";
import { formatCurrency } from "@/shared/utils";
import { Button } from "@/shared/components/Button/Button";
import { useModalPurchaseUtil } from "./ModalPurchase.util";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  product: GetProductResponse | null;
  onConfirm: (qty: number, productId: number, total: number) => void;
}

const ModalPurchase: FC<Props> = ({ isOpen, onClose, product, onConfirm }) => {
  const { qty, handleQtyChange, error, totalPrice } = useModalPurchaseUtil({
    isOpen,
    product,
  });

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">{product.name}</h2>
          <div className="relative w-full h-48 mb-4">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-contain rounded"
            />
            <div className="absolute top-2 right-2 bg-green-700 text-gray-800 text-xs font-semibold px-2 py-1 rounded flex items-center">
              <span className="text-white">Stock: {product.qty} Remaining</span>
            </div>
          </div>
          <p className="text-lg font-semibold">{`Price: ${formatCurrency(
            product.price
          )}`}</p>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            value={qty}
            onChange={handleQtyChange}
            className="w-full p-2 border border-gray-300 rounded"
            min="1"
            max={product.qty}
          />
          {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
          <label className="block mt-4 mb-2 text-sm font-medium text-gray-700">
            Total Price
          </label>
          <input
            type="text"
            value={formatCurrency(totalPrice)}
            disabled
            className="w-full p-2 border border-gray-300 rounded bg-gray-100"
          />
        </div>
        <div className="p-4 flex justify-between">
          <Button title="Close" onClick={onClose} backgroundColor="neutral" />
          <Button
            title="Purchase"
            onClick={() => onConfirm(qty, product.id, totalPrice)}
            isDisabled={qty === 0}
            backgroundColor="blue"
          />
        </div>
      </div>
    </div>
  );
};

export default ModalPurchase;
