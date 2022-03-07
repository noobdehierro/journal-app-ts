import { UiReducerActions } from "../reducers/uiReducer";
export const setError = (err: any): UiReducerActions => ({
  type: "[UI] Set Error",
  payload: err,
});

export const removeError = (): UiReducerActions => ({
  type: "[UI] remove Error",
});

export const startLoading = (): UiReducerActions => ({
  type: "[UI] Start Loading",
});
export const finishLoading = (): UiReducerActions => ({
  type: "[UI] Finish loading",
});
