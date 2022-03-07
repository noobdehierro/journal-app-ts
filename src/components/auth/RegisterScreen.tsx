import { FormEvent } from "react";
import { Link } from "react-router-dom";
import { useForm } from "../../hooks/useForm";
import { isFormValid } from "../../helpers/isFormValid";
// import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { startRegisterWithEmailPasswordName } from "../../redux/actions/auth";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../redux/hooks";
import { setError } from "../../redux/actions/ui";

export interface RegisterForm {
  name: string;
  email: string;
  password1: string;
  password2: string;
}

export const RegisterScreen = () => {
  const { loading, msgError } = useAppSelector((state) => state.ui);

  const dispatch = useDispatch();
  const { handleInputChange, values } = useForm<RegisterForm>({
    name: "newUser",
    email: "newUser@gmail.com",
    password1: "123456",
    password2: "123456",
  });

  const { email, name, password1, password2 } = values;

  const handleRegister = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const resp = isFormValid(values);
    if (Object.keys(resp.errors).length !== 0) {
      dispatch(setError(resp.errors));
      return console.log(resp);
    }
    // dispatch(removeError());
    dispatch(startRegisterWithEmailPasswordName(email, password2, name));
  };

  return (
    <>
      <h3 className="auth__title">Register</h3>

      <form
        onSubmit={(e) => handleRegister(e)}
        className="animate__animated animate__fadeIn animate__faster"
      >
        <input
          type="text"
          placeholder="Name"
          name="name"
          className="auth__input"
          autoComplete="off"
          value={name}
          onChange={handleInputChange}
        />
        {msgError?.name && (
          <span className="auth__alert-error">{msgError.name}</span>
        )}

        <input
          type="text"
          placeholder="Email"
          name="email"
          className="auth__input"
          autoComplete="off"
          value={email}
          onChange={handleInputChange}
        />
        {msgError?.email && (
          <span className="auth__alert-error">{msgError.email}</span>
        )}

        <input
          type="password"
          placeholder="Password"
          name="password1"
          className="auth__input"
          value={password1}
          onChange={handleInputChange}
        />
        {msgError?.password && (
          <span className="auth__alert-error">{msgError.password}</span>
        )}

        <input
          type="password"
          placeholder="Confirm password"
          name="password2"
          className="auth__input"
          value={password2}
          onChange={handleInputChange}
        />
        {msgError?.match && (
          <span className="auth__alert-error">{msgError.match}</span>
        )}

        <button
          disabled={loading}
          type="submit"
          className="btn btn-primary btn-block mb-5"
        >
          Register
        </button>

        <Link to="/auth/login" className="link">
          Already registered?
        </Link>
      </form>
    </>
  );
};
