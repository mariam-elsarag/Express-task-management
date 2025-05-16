import { Dropdown } from "primereact/dropdown";

interface DropdownProps {
  value: string;
  placeholder: string;
  error: boolean;
  loading: boolean;
  disabled?: boolean;
  id: number;
  handleChange: (e: { value: string }) => void;
  optionList: [{ name: string; value: string }];
}
const Input_Dropdown: React.FC<DropdownProps> = ({
  id,
  error,
  handleChange,
  value,
  optionList,
  placeholder,
  disabled,
  loading,
}) => {
  return (
    <Dropdown
      options={optionList}
      value={value}
      onChange={handleChange}
      placeholder={placeholder || ""}
      className={`w-full sm:flex-1  input flex_center_y  !px-0 ${
        disabled ? "disabled_input" : ""
      } ${error ? "border-error-800" : ""}`}
      optionLabel="name"
      inputId={id}
      disabled={disabled || loading}
      loading={loading}
      filter
    />
  );
};

export default Input_Dropdown;
