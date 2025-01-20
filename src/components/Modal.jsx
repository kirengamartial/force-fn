import React from "react";


const Modal = ({ isOpen, onClose, title, children }) => {
    if (!isOpen) return null;
  
    return (
      <div className="fixed inset-0 z-50 overflow-y-auto">
        <div className="flex min-h-screen items-end justify-center text-center sm:items-center sm:p-0">
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75" onClick={onClose} />
          <div className="relative bg-white rounded-lg p-6 max-w-lg w-full">
            <div className="mb-4">
              <h3 className="text-lg font-medium">{title}</h3>
            </div>
            {children}
          </div>
        </div>
      </div>
    );
  };


  export default Modal