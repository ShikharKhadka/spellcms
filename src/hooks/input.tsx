import { FieldValues, useForm } from "react-hook-form";

const useInput = <T extends FieldValues>() => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<T>();
  return { register, handleSubmit, watch, errors };
};

export default useInput;
