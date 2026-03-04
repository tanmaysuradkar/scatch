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
    setownerInfo: (state, actions) => {
      state.value = actions.payload;
    },
    clearownerInfo: (state) => {
      state.value = { email: " ", fullname: " ", _id: " "};
    },
  },
});
export const { setOwnerInfo, clearOwnerInfo } = ownerInfo.actions;
export default ownerInfo.reducer;
