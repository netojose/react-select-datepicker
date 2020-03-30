import React from "react";

function LabelWrapper({ children, label, showLabel, name }) {
  return showLabel ? (
    <label data-label={name}>
      <span>{label}</span>
      {children}
    </label>
  ) : (
    children
  );
}

export default ({
  items,
  value,
  label,
  showLabel,
  name,
  onChange,
  renderOption,
  generateValue
}) => {
  return (
    <LabelWrapper label={label} showLabel={showLabel} name={name}>
      <select value={value} onChange={onChange} data-field={name}>
        <option disabled value="">
          {label}
        </option>
        {items.map((item, index) => (
          <option
            key={item}
            value={generateValue ? generateValue(item, index) : item}
          >
            {renderOption ? renderOption(item, index) : item}
          </option>
        ))}
      </select>
    </LabelWrapper>
  );
};
