import { AppDispatch } from "../store/store";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
  signInWithPopup,
  googleAuthProvider,
  signOut,
} from "../../firebase/firebase-config";
import { AuthReducerActions } from "../reducers/authReducer";
import Swal from "sweetalert2";
import { finishLoading, startLoading } from "./ui";
import { noteLogout } from "./notes";

export const login = (
  uid: string,
  name: string | null
): AuthReducerActions => ({
  type: "[Auth] Login",
  payload: { uid, name },
});

//pedir ayuda error consola, pero funciona al 100
export const startRegisterWithEmailPasswordName = (
  email: string,
  password: string,
  name: string
) => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        updateProfile(auth.currentUser!, {
          displayName: name,
        })
          .then(() => {
            const { displayName, uid } = userCredential.user;

            dispatch(login(uid, displayName));
            dispatch(finishLoading());
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        dispatch(finishLoading());
        const errorCode = error.code;
        console.log(errorCode);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorCode,
        });
      });
  };
};

export const startLoginEmailPassword = (email: string, password: string) => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());

    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const { uid, displayName } = userCredential.user;
        dispatch(login(uid, displayName));
        dispatch(finishLoading());
      })
      .catch((error) => {
        dispatch(finishLoading());

        const errorCode = error.code;
        console.log(errorCode);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorCode,
        });
      });
  };
};

export const startGoogleLogin = () => {
  return (dispatch: AppDispatch) => {
    dispatch(startLoading());
    const auth = getAuth();
    signInWithPopup(auth, googleAuthProvider)
      .then((result) => {
        const { displayName, uid } = result.user;

        dispatch(login(uid, displayName));
        dispatch(finishLoading());
      })
      .catch((error) => {
        dispatch(finishLoading());

        const errorCode = error.code;
        console.log(errorCode);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: errorCode,
        });
      });
  };
};

export const startLogout = () => {
  return (dispatch: AppDispatch) => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        dispatch(logout());
        dispatch( noteLogout() );
      })
      .catch((error) => {
        console.log(error);
      });
  };
};

const logout = (): AuthReducerActions => ({
  type: "[Auth] Logout",
});
