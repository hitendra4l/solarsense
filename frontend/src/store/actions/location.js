import { locationActions } from "../reducers/locationReducers";

export const newProject = () => (dispatch) => {
  dispatch(locationActions.resetLocationInfo());
  localStorage.removeItem("project");
};
