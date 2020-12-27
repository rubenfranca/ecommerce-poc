import React, { FC } from 'react';
import './styles.scss';

interface FormSelectProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  handleChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  defaultValue?: string | number;
  label: string;
  options: {
    value: string | number;
    name: string | number;
  }[];
}

const FormSelect: FC<FormSelectProps> = ({
  options,
  defaultValue,
  handleChange,
  label,
  ...otherProps
}) => {
  if (!Array.isArray(options) || options.length < 1) return null;

  return (
    <div className='formRow'>
      {label && <label>{label}</label>}

      <select
        className='formSelect'
        value={defaultValue}
        onChange={handleChange}
        {...otherProps}
      >
        {options.map((option, index) => {
          const { value, name } = option;

          return (
            <option key={index} value={value}>
              {name}
            </option>
          );
        })}
      </select>
    </div>
  );
};

export default FormSelect;
