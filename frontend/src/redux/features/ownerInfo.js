import { createSlice } from "@reduxjs/toolkit";

export const ownerInfo = createSlice({
  name: "ownerInfo",
  initialState: {
    value: {
      email: "",
      fullname: "",
      _id: "",
    },
  },
  reducers: {
    setOwnerInfo: (state, action) => {
      console.log("Redux: Setting Owner info", action.payload); // Debug log
      state.value = action.payload;
    },
    clearOwnerInfo: (state) => {
      console.log("Redux: Clearing Owner info"); // Debug log
      state.value = { email: "", fullname: "", _id: "" };
    },
  },
});

export const { setOwnerInfo, clearOwnerInfo } = ownerInfo.actions;
export default ownerInfo.reducer;