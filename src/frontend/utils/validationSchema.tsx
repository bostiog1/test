import * as yup from "yup";

// Phone number regex
const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

// Login schema
export const loginSchema = yup.object().shape({
  email: yup.string().required("Username is required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Password is required"),
});

// Define the TypeScript type for LoginSchema
export type LoginSchema = yup.InferType<typeof loginSchema>;

// Register schema
export const registerSchema = yup.object().shape({
  firstName: yup.string().required("Required"),
  lastName: yup.string().required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  mobile: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Required"),
  password: yup
    .string()
    .min(5, "Password must be at least 5 characters")
    .required("Required"),
});

// Define the TypeScript type for RegisterSchema
export type RegisterSchema = yup.InferType<typeof registerSchema>;
