interface AuthReducer {
  uid?: string;
  name?: string | null;
}

export type AuthReducerActions =
  | { type: "[Auth] Login"; payload: AuthReducer }
  | { type: "[Auth] Logout" };

const initialState: AuthReducer = {};

export const authReducer = (
  state: AuthReducer = initialState,
  action: AuthReducerActions
): AuthReducer => {
  switch (action.type) {
    case "[Auth] Login":
      return {
        ...state,
        uid: action.payload.uid,
        name: action.payload.name,
      };
    case "[Auth] Logout":
      return {};

    default:
      return state;
  }
};
