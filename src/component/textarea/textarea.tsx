import React from "react";
import {
  FieldErrors,
  UseFormHandleSubmit,
  UseFormRegister,
  UseFormWatch,
} from "react-hook-form";

type InputType = {
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any, any>;
  watch: UseFormWatch<any>;
  errors: FieldErrors;
};
const TextArea = ({
  onchange,
  placeholder,
  validationName,
  input,
  value,
}: {
  onchange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder: string;
  validationName: string;
  input: InputType;
  value: string | undefined;
}) => {
  return (
    <div>
      <textarea
        className={`border-2 p-2 rounded-md mb-1 w-full h-[200px] ${
          input.errors[validationName] ? "border-red-500" : "border-gray-300"
        }`}
        {...input.register(validationName, {
          required: true,
          onChange: onchange,
          value: value,
        })}
        placeholder={placeholder}
      ></textarea>
      <div className="h-5">
        {input.errors[validationName]?.type === "required" && !value && (
          <div className="text-red-500 text-sm">This field is required</div>
        )}
      </div>
    </div>
  );
};

export default TextArea;
