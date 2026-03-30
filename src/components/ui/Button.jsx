import React from "react";

const Button = ({ 
  children, 
  onClick, 
  className = "",
  variant = "primary", 
  icon: Icon, 
  disabled, 
  type = "button"
}) => {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-500 hover:to-indigo-500 shadow-lg shadow-blue-900/20",
    secondary:
      "bg-slate-700 text-slate-200 hover:bg-slate-600 border border-slate-600",
    danger:
      "bg-red-500 text-white hover:bg-red-600",
    success:
      "bg-emerald-600 text-white hover:bg-emerald-500",
    ghost:
      "bg-transparent text-slate-400 hover:text-white hover:bg-slate-800",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-6 py-3 rounded-xl font-bold transition-all active:scale-95 flex items-center justify-center gap-2 text-sm disabled:opacity-50 disabled:cursor-not-allowed ${variants[variant]} ${className}`}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default Button;
