export default function Input({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  return (
    <div className="mb-4 text-left">
      {label && (
        <label className="block text-xs text-slate-400 font-bold uppercase mb-1 ml-1">
          {label}
        </label>
      )}

      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="
          w-full px-4 py-3 rounded-xl
          bg-slate-800 text-white
          border border-slate-700
          focus:outline-none focus:ring-2 focus:ring-blue-500
          placeholder:text-slate-500
        "
      />
    </div>
  );
}
