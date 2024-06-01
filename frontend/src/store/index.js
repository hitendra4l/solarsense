// import { configureStore } from "@reduxjs/toolkit";
// import { userReducer } from "./reducers/userReducers";
// import { locationReducer } from "./reducers/locationReducers";

// const userInfoFromLocalStorage = localStorage.getItem("account")
//   ? JSON.parse(localStorage.getItem("account"))
//   : null;

// const locationInfoFromLocalStorage = localStorage.getItem("project")
//   ? JSON.parse(localStorage.getItem("project"))
//   : null;

// const initialState = {
//   user: { userInfo: userInfoFromLocalStorage },
//   location: { locationInfo: locationInfoFromLocalStorage },
// };

// const store = configureStore({
//   reducer: {
//     user: userReducer,
//     location: locationReducer,
//   },
//   preloadedState: initialState,
// });

// export default store;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

export default store;
