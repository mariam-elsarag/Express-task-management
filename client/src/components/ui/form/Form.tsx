import { Control, Controller, FieldError } from "react-hook-form";
import Password from "./Password";
import React from "react";

interface FormItemType {
  id?: string;
  formType?: "input" | "textarea" | "password";
  fieldName?: string | undefined;
  validator?: any;
  label?: string;
  placeholder?: string;
  type?: string;
  name?: string | undefined;
  className?: string;
  groupWith?: number;
  isGrouped?: boolean;
  icon?: React.ReactNode;
}

interface FormProps {
  formList: FormItemType[];
  control: Control<any>;
  errors: Record<string, FieldError | undefined>;
  loading: boolean;
}

const Form: React.FC<FormProps> = ({ formList, control, errors, loading }) => {
  const renderField = (
    item: FormItemType,
    field: { value: any; onChange: (e: any) => void },
    error?: FieldError
  ) => {
    const errorClass = error ? "border-red-500" : "border-blue-800";

    switch (item.formType) {
      case "input":
        return (
          <div
            className={` ${
              errors[item?.fieldName] || error
                ? "border-error-800"
                : " border-grey-100"
            } flex items-center gap-2 border px-3 py-2.5 `}
          >
            {item?.icon}
            <input
              id={item.id}
              type={item.type || "text"}
              name={item.name || ""}
              value={field.value ?? ""}
              onChange={field.onChange}
              className={`w-full h-full outline-0 shadow-none text-grey-300 `}
              placeholder={item.placeholder}
            />
          </div>
        );
      case "password":
        return (
          <div
            className={` ${
              errors[item?.fieldName] || error
                ? "border-error-800"
                : " border-grey-100"
            } flex items-center gap-2 border px-3 py-2.5 `}
          >
            {item?.icon}
            <Password
              id={item.id}
              name={item.name || ""}
              value={field.value ?? ""}
              handleChange={field.onChange}
              placeholder={item.placeholder}
            />
          </div>
        );
      case "textarea":
        return (
          <div
            className={` ${
              errors[item?.fieldName] || error
                ? "border-error-800"
                : " border-grey-100"
            } flex items-center gap-2 border px-3 py-2.5 `}
          >
            {item?.icon}
            <textarea
              id={item.id}
              name={item.name || ""}
              value={field.value ?? ""}
              onChange={field.onChange}
              className={`outline-0 shadow-none  resize-none !h-auto !min-h-[100px] `}
              placeholder={item.placeholder}
            />
          </div>
        );
      default:
        return <></>;
    }
  };

  return (
    <>
      {formList.map((item, index) => {
        const isGrouped = item?.isGrouped && formList[index + 1];
        if (isGrouped) {
          return (
            <div className={`  ${item?.className} `} key={item.id}>
              {[item, formList[index + 1]].map((fieldItem) => (
                <fieldset
                  className={`flex flex-col gap-2  text-base capitalize `}
                  key={fieldItem.id}
                >
                  <label htmlFor={fieldItem?.id}>{fieldItem?.label}</label>
                  <Controller
                    name={fieldItem?.fieldName}
                    control={control}
                    rules={fieldItem.validator}
                    render={({ field, fieldState: { error } }) =>
                      renderField(fieldItem, field, error)
                    }
                  />
                  {errors[fieldItem?.fieldName] && (
                    <p className="text-error-800 text-xs">
                      {errors[fieldItem?.fieldName]?.message}
                    </p>
                  )}
                </fieldset>
              ))}
            </div>
          );
        } else if (item && !item?.isGrouped && !item?.groupWith) {
          return (
            <fieldset
              className={`grid gap-2 text-base capitalize ${item?.className} col-span-2`}
              key={item.id}
            >
              <label htmlFor={item?.id}>{item?.label}</label>
              <Controller
                name={item?.fieldName}
                control={control}
                rules={item?.validator}
                render={({ field, fieldState: { error } }) =>
                  renderField(item, field, error)
                }
              />
              {errors[item?.fieldName] && (
                <p className="text-error-800 text-xs">
                  {errors[item?.fieldName]?.message}
                </p>
              )}
            </fieldset>
          );
        } else {
          return null;
        }
      })}
    </>
  );
};

export default Form;
