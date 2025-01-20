import React from "react";

const Button = ({ children, variant = 'primary', onClick, className = '', type = 'button' }) => {
    const variants = {
      primary: 'bg-blue-600 hover:bg-blue-700 text-white',
      secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-800',
      danger: 'bg-red-600 hover:bg-red-700 text-white',
      ghost: 'hover:bg-gray-100'
    };
  
    return (
      <button
        type={type}
        onClick={onClick}
        className={`
          ${variants[variant]}
          px-4 
          py-2 
          rounded-md 
          font-medium 
          transition-colors 
          ${className}
        `}
      >
        {children}
      </button>
    );
  };

  export default Button