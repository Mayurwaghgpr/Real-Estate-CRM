const CommonSelect = ({
  label,
  name,
  value,
  onChange,
  options,
  required = false,
  icon: Icon,
}) => {
  return (
    <div className="flex flex-col items-start gap-2 w-full border-inherit">
      {label && (
        <label htmlFor={name} className="font-semibold text-sm text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="relative w-full border-inherit">
        {Icon && Icon}
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className={`w-full py-3 px-4 border border-inherit rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 text-gray-900 bg-white capitalize`}
        >
          <option value="">Select {name} </option>
          {options.map((option) => (
            <option key={option.value || option} value={option.value || option}>
              {option.label || option}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CommonSelect;
