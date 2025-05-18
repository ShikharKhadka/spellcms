import React, { ChangeEventHandler } from "react";
import { firstLetterUpperCase } from "../../helper/helper";
import { InputType } from "../textfiled";

const Dropdown = ({
  option,
  onchange,
  defaultOption,
  objectKey,
  objectValue,
  input,
  validationName,
  value,
}: {
  option: string[] | any[];
  onchange: ChangeEventHandler<HTMLSelectElement>;
  defaultOption: string;
  objectKey?: string;
  objectValue?: string;
  input?: InputType;
  validationName?: string;
  value?: string;
}) => {
  return (
    <div>
      <select
        {...(input && validationName
          ? input.register(validationName, {
              required: true,
              onChange: onchange,
            })
          : {
              onChange: onchange,
              value: value,
            })}
        className="px-4 py-2 rounded-lg border border-gray-300 bg-white shadow-sm
               focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-700"
      >
        <option value="">{defaultOption}</option>
        {typeof option[0] == "string" &&
          option.map((e: string) => (
            <>
              <option value={e}>{e}</option>
            </>
          ))}
        {typeof option[0] == "object" &&
          option.map((e: any) => (
            <>
              <option value={e[objectKey ?? ""]}>
                {e[objectValue ?? ""]}
                {/* {firstLetterUpperCase(e[objectValue ?? ""])} */}
              </option>
            </>
          ))}
      </select>
      {input && validationName && (
        <div className="h-5">
          {input.errors[validationName]?.type === "required" && !value && (
            <div className="text-red-500 text-sm">This field is required</div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
