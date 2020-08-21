import React, { TextareaHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import './styles.css';

interface TextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string;
  name: string;
}

const TextArea: React.FC<TextAreaProps> = ({ label, name, ...rest }) => {
  const textAreaRef = useRef(null);
  const { fieldName, registerField } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: textAreaRef.current,
      path: 'value',
    });
  }, [fieldName, registerField]);

  return (
    <div className="textarea-block">
      <label htmlFor={name}>{label}</label>
      <textarea ref={textAreaRef} name={name} id={name} {...rest}></textarea>
    </div>
  );
};

export default TextArea;
