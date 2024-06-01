import { createSlice } from "@reduxjs/toolkit";

const locationInitialState = { locationInfo: null };

const locationSlice = createSlice({
  name: "location",
  initialState: locationInitialState,
  reducers: {
    setLocationInfo(state, action) {
      state.locationInfo = action.payload;
    },
    resetLocationInfo(state) {
      state.locationInfo = null;
    },
  },
});

export const locationActions = locationSlice.actions;
export const locationReducer = locationSlice.reducer;
