const CommonInput = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = "",
  error = "",
  required = false,
  className = "",
}) => {
  return (
    <div className="flex flex-col items-start gap-2 w-full  border-inherit">
      {label && (
        <label
          htmlFor={name}
          className=" flex items-center gap-1 font-semibold text-sm text-gray-700 border-inherit"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full  border border-inherit  rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 placeholder-gray-500 ${
          error
            ? "border-red-500 focus:ring-red-300"
            : "border-inherit focus:ring-blue-500"
        } ${className}`}
      />

      {error && <p className="text-red-600 text-sm font-medium">{error}</p>}
    </div>
  );
};
export default CommonInput;
