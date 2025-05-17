import React from 'react'
import { FieldErrors, UseFormHandleSubmit, UseFormRegister, UseFormWatch } from 'react-hook-form';


type InputType = {
    register: UseFormRegister<any>;
    handleSubmit: UseFormHandleSubmit<any, any>;
    watch: UseFormWatch<any>;
    errors: FieldErrors
}
const Textfiled = ({ onchange, placeholder, required = false, validationName, input, value }: { onchange: (e: React.ChangeEvent<HTMLInputElement>) => void, placeholder: string, required: boolean, validationName: string, input: InputType, value: string | undefined }) => {

    return (
        <div>
            <input
                className={`border-2 p-2 rounded-md w-full mb-1 ${input.errors[validationName] ? 'border-red-500' : 'border-gray-300'}`}
                {...input.register(validationName, { required: true, onChange: onchange })}
                placeholder={placeholder}
            />
            <div className="h-5">
                {input.errors[validationName]?.type === 'required' && !value && (
                    <div className="text-red-500 text-sm">This field is required</div>
                )}
            </div>
        </div>


    )
}

export default Textfiled
