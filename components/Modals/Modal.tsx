"use client";
import { Plus } from "lucide-react";
import React, { useState, useEffect, ReactNode } from "react";

interface EditUser {
  children: ReactNode;
  onClose: () => void;
  heading: string;
  description: string;
}

const Modal = ({ children, onClose, heading, description }: EditUser) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 10);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-black/50 flex items-center justify-center transition-opacity duration-300 ${
        isVisible && !isClosing ? "opacity-100" : "opacity-0"
      }`}
      onClick={handleClose}
    >
      <div
        className={`bg-white rounded-lg p-4 w-full md:w-[600px] shadow-lg transform transition-all duration-300 ${
          isVisible && !isClosing
            ? "scale-100 opacity-100"
            : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-2xl">{heading}</h1>
          <Plus
            className="h-6 w-6 text-black cursor-pointer rotate-45"
            onClick={handleClose}
          />
        </div>
        <p className="mt-4 text-gray-500 text-lg font-medium">{description}</p>
        {children}
      </div>
    </div>
  );
};

export default Modal;
