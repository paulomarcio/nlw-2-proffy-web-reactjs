import React, { SelectHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import './styles.css';

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  name: string;
  options: Array<{
    value: string;
    label: string;
  }>;
}

const Select: React.FC<SelectProps> = ({ label, name, options, ...rest }) => {
  const selectRef = useRef(null);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: selectRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div className="select-block">
      <label htmlFor={name}>{label}</label>
      <select ref={selectRef} defaultValue="" name={name} id={name} {...rest}>
        <option value="" disabled hidden>Selecione uma opção</option>
        {options.map(({value, label}) => {
          return <option key={value} value={value}>{label}</option>
        })}
      </select>
    </div>
  );
};

export default Select;
