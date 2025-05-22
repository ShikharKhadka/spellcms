import { object, string } from "yup";

let schema = object({
    email: string().required().email(),
    password : string().required().max(7),
});