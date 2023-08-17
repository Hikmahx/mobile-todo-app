import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  darkMode: false,
  modeToggle: false,
};

const TodoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    setDarkMode: (state, action) => {
      state.darkMode = action.payload;
    },
  },
});

export const { setDarkMode } = TodoSlice.actions;

export default TodoSlice.reducer;
