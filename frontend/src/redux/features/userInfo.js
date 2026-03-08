import { createSlice } from "@reduxjs/toolkit";

export const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    value: {
      email: "",
      fullname: "",
      _id: "",
      state: "",
      address: "",
      pinCode: "",
      addressType: "",
      landmark: "",
      mobileNumber: "",
      picture:"",
    },
  },
  reducers: {
    setUserInfo: (state, actions) => {
      state.value = actions.payload;
    },
    clearUserInfo: (state) => {
      state.value = { email: " ", fullname: " ", _id: " ", state: " ", address: " ", pinCode: " ", addressType: " ", landmark: " ", mobileNumber: " ",picture:"" };
    },
  },
});
export const { setUserInfo, clearUserInfo } = userInfo.actions;
export default userInfo.reducer;
