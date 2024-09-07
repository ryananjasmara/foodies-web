import { FC } from "react";
import OrderHistorySkeleton from "./OrderHistorySkeleton";
import { formatCurrency, simpleDateFormat } from "@/shared/utils";
import { Button } from "@/shared/components/Button/Button";
import { useModalOrderHistoryUtil } from "./ModalOrderHistory.util";

interface Order {
  id: number;
  product: {
    image: string;
    name: string;
    price: number;
  };
  qty: number;
  total: number;
  created_at: string;
}

interface ModalOrderHistoryProps {
  isOpen: boolean;
  onClose: () => void;
  orderHistory: Order[];
  isLoading: boolean;
}

const ModalOrderHistory: FC<ModalOrderHistoryProps> = ({
  isOpen,
  onClose,
  orderHistory,
  isLoading,
}) => {
  useModalOrderHistoryUtil({ isOpen });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg overflow-hidden shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-4">Order History</h2>
          <div className="max-h-96 overflow-y-auto space-y-4">
            {isLoading
              ? Array.from({ length: 5 }).map((_, index) => (
                  <OrderHistorySkeleton key={index} />
                ))
              : orderHistory.map((order) => (
                  <div key={order.id} className="p-4 border rounded shadow">
                    <div className="flex items-center space-x-4">
                      <img
                        src={order.product.image}
                        alt={order.product.name}
                        className="w-16 h-16 object-contain"
                      />
                      <div>
                        <h3 className="text-lg font-semibold">
                          {order.product.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          Price: {formatCurrency(order.product.price)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Purchase Qty: {order.qty}
                        </p>
                        <p className="text-sm text-gray-600">
                          Total Price: {formatCurrency(order.total)}
                        </p>
                        <p className="text-sm text-gray-600">
                          Order Date: {simpleDateFormat(order.created_at)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
          </div>
        </div>
        <div className="p-4 flex justify-end">
          <Button title="Close" onClick={onClose} backgroundColor="neutral" />
        </div>
      </div>
    </div>
  );
};

export default ModalOrderHistory;
