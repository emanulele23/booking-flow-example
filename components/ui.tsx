import React from 'react';

export const Card: React.FC<{
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  selected?: boolean;
}> = ({ children, className = '', onClick, selected }) => (
  <div
    onClick={onClick}
    className={`
      p-5 rounded-xl border transition-all duration-300 cursor-pointer relative overflow-hidden group
      ${selected 
        ? 'bg-neutral-100 border-neutral-900 ring-1 ring-neutral-900 shadow-md' 
        : 'bg-neutral-100 border-neutral-200/50 hover:border-neutral-300 hover:shadow-card-hover'
      }
      ${className}
    `}
  >
    {children}
  </div>
);

export const Button: React.FC<{
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  className?: string;
  disabled?: boolean;
  type?: 'button' | 'submit';
}> = ({ children, onClick, variant = 'primary', className = '', disabled, type = 'button' }) => {
  const baseStyle = "inline-flex items-center justify-center px-6 py-3 rounded-xl text-sm font-semibold transition-all focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-neutral-900 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]";
  
  const variants = {
    // Inverted palette: neutral-900 is white. text-neutral-50 is black.
    primary: "bg-neutral-900 text-neutral-50 hover:bg-neutral-800 shadow-lg shadow-neutral-900/10",
    secondary: "bg-neutral-100 text-neutral-900 border border-neutral-200 hover:bg-neutral-200 hover:border-neutral-300 shadow-sm",
    outline: "border border-neutral-200 text-neutral-400 hover:bg-neutral-200 hover:text-neutral-900",
    ghost: "text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100/50"
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};

export const Input: React.FC<{
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  type?: string;
  name: string;
  required?: boolean;
  multiline?: boolean;
}> = ({ label, value, onChange, placeholder, type = "text", name, required, multiline }) => (
  <div className="flex flex-col gap-2">
    <label className="text-xs font-semibold text-neutral-400 uppercase tracking-wide pl-1">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    {multiline ? (
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={3}
        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-100 text-sm font-medium text-neutral-900 placeholder:text-neutral-500 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:outline-none transition-all shadow-sm"
      />
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-3 rounded-xl border border-neutral-200 bg-neutral-100 text-sm font-medium text-neutral-900 placeholder:text-neutral-500 focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900 focus:outline-none transition-all shadow-sm"
      />
    )}
  </div>
);
