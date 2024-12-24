import React from "react";

interface ToastProps {
  message: string;
  type: "success" | "error";
  onClose: () => void;
}

export const Toast = ({ message, type, onClose }: ToastProps) => {
  return (
    <div
      className={`fixed top-16 z-50 right-4 p-4 rounded-md shadow-lg transition-opacity duration-500 ${
        type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }`}
    >
      <div className="flex items-center justify-between">
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-4 text-white hover:text-gray-200"
        >
          ×
        </button>
      </div>
    </div>
  );
};
