import React from "react";
import "./Button.css";

interface Props {
  title: string;
  backgroundColor: "blue" | "red" | "green" | "yellow" | "neutral";
  onClick: () => void;
  isDisabled?: boolean;
  icon?: React.ReactNode;
  isFull?: boolean;
}

export const Button: React.FC<Props> = ({
  title,
  backgroundColor,
  onClick,
  isDisabled,
  icon,
  isFull,
}) => {
  const baseClasses =
    "py-2 px-4 rounded transition-all duration-200 flex items-center justify-center";
  const disabledClasses = "opacity-50 cursor-not-allowed";
  const fullWidthClass = isFull ? "w-full" : "";

  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-600 text-white",
    red: "bg-red-500 hover:bg-red-600 text-white",
    green: "bg-green-500 hover:bg-green-600 text-white",
    yellow: "bg-yellow-500 hover:bg-yellow-600 text-black",
    neutral: "bg-neutral-200 text-black hover:bg-neutral-300",
  };

  return (
    <button
      className={`${baseClasses} ${colorClasses[backgroundColor]} ${
        isDisabled ? disabledClasses : ""
      } ${fullWidthClass}`}
      disabled={isDisabled}
      onClick={onClick}
    >
      {icon && <span className="mr-2 flex items-center">{icon}</span>}
      <span className="flex items-center">{title}</span>
    </button>
  );
};
