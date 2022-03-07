interface UiReducer {
  loading: boolean;
  msgError: any;
}
export type UiReducerActions =
  | { type: "[UI] Set Error"; payload: any }
  | { type: "[UI] remove Error" }
  | { type: "[UI] Start Loading" }
  | { type: "[UI] Finish loading" };

const initialState = {
  loading: false,
  msgError: null,
};
export const uiReducer = (
  state = initialState,
  action: UiReducerActions
): UiReducer => {
  switch (action.type) {
    case "[UI] Set Error":
      return {
        ...state,
        msgError: action.payload,
      };
    case "[UI] remove Error":
      return {
        ...state,
        msgError: null,
      };
    case "[UI] Start Loading":
      return {
        ...state,
        loading: true,
      };
    case "[UI] Finish loading":
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
};
