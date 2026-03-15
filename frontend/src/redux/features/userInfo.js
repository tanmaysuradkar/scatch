import { createSlice } from "@reduxjs/toolkit";
 
const initialUserState = {
  email: "",
  fullname: "",
  _id: "",
  state: "",
  address: "",
  pinCode: "",
  addressType: "",
  landmark: "",
  mobileNumber: "",
  picture: "",
};
 
export const userInfo = createSlice({
  name: "userInfo",
  initialState: {
    value: initialUserState,
    loading: false,
    error: null,
  },
  reducers: {
    setUserInfo: (state, actions) => {
      console.log("Redux: Setting user info", actions.payload); // Debug log
      state.value = actions.payload;
      state.error = null;
    },
    clearUserInfo: (state) => {
      console.log("Redux: Clearing user info"); // Debug log
      state.value = { ...initialUserState };
      state.error = null;
    },
    setLoading: (state, actions) => {
      state.loading = actions.payload;
    },
    setError: (state, actions) => {
      state.error = actions.payload;
    },
  },
});
 
export const { setUserInfo, clearUserInfo, setLoading, setError } = userInfo.actions;
export default userInfo.reducer;
