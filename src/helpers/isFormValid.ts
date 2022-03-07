import { RegisterForm } from "../components/auth/RegisterScreen";
import validator from "validator";

export const isFormValid = (form: RegisterForm) => {
  const { email, name, password1, password2 } = form;

  let errors:any = {};

  if (!validator.isLength(name, { min: 4 })) {
    errors.name = "name is required";
  }

  if (!validator.isEmail(email)) {
    errors.email = "email is invalid or required";
  }

  if (!validator.isLength(password1, { min: 6 })) {
      errors.password = 'password should be at least 6 characters'
  }

  if (password1 !== password2) {
      errors.match = 'password dont match'
  }

  return { errors };
};
