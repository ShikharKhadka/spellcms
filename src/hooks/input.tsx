import { yupResolver } from "@hookform/resolvers/yup";
import { FieldValues, useForm } from "react-hook-form";
import { AnyObject, Lazy, object, ObjectSchema, string } from "yup";




const useInput = ({ schema }: {
  schema: ObjectSchema<{}, any, {}, any> | Lazy<{}, AnyObject, any>
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  return { register, handleSubmit, watch, errors };
};

export default useInput;
