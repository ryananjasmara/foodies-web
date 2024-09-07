import { GetProductResponse } from "@/services/types";
import { useEffect, useState } from "react";

export const useModalPurchaseUtil = ({
  isOpen,
  product,
}: {
  isOpen: boolean;
  product: GetProductResponse | null;
}) => {
  const [qty, setQty] = useState(1);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setQty(1);
    }
  }, [isOpen]);

  const handleQtyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (product) {
      if (Number(e.target.value) > product.qty) {
        setQty(product.qty);
        setError("Quantity exceeds stock");
        return;
      } else {
        setQty(Number(e.target.value));
        setError("");
      }
    }
  };

  const totalPrice =
    (product?.price || 0) * (typeof qty === "number" ? qty : 1);

  return { qty, setQty, error, handleQtyChange, totalPrice };
};
