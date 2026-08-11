import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  platforms: [
    "LinkedIn",
    "Twitter",
    "Instagram",
  ],
};

const platformSlice = createSlice({
  name: "platforms",
  initialState,
  reducers: {},
});

export default platformSlice.reducer;