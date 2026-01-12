"use client"

const Button = ({ children, className = "", ...rest }) => {
  return (
    <button
      {...rest}
      className={`px-4 py-1.5 rounded-md  ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
