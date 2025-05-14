import { Checkbox } from "primereact/checkbox";
import React from "react";
interface InputCheckboxProps {
  value: boolean;
  onChange: (e: { value: boolean }) => void;
  disabled: boolean;
  title: string;
  id: string;
  errors?: any;
}

const Input_Checkbox: React.FC<InputCheckboxProps> = ({
  value,
  onChange,
  disabled,
  title,
  id,
  errors,
}) => {
  return (
    <div>
      <Checkbox
        disabled={disabled}
        inputId={id}
        onChange={onChange}
        checked={value}
        invalid={errors}
      ></Checkbox>
      <label htmlFor={id}> {title}</label>
    </div>
  );
};

export default Input_Checkbox;
