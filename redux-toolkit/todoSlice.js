import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { useSelector } from "react-redux";

const apiUrl = "https://jsonplaceholder.typicode.com/todos";

const initialState = {
  value: [],
};
const todoSlice = createSlice({
  name: "TODO",
  initialState,
  reducers: {
    addData: (state, action) => {
      state.unshift(action.payload);
    },
    editData: (state, actions) => {

      const { id, ...data } = actions.payload;
      const index = state.findIndex((data) => data.id === id);
      console.log(actions.payload);
      if (index !== -1) {
        state[index] = { ...state[index], ...data };
      }
    },
    deleteData: (state, action) => {
      const index = state.findIndex((data) => data.id === action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    fetchData: (state, action) => {
      return action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addData, editData, deleteData, fetchData } = todoSlice.actions;

export default todoSlice.reducer;

export const fetchAsyncData = () => async (dispatch) => {
  try {
    const response = await axios.get(apiUrl);
    dispatch(fetchData(response.data));
  } catch (error) {
    console.log(error);
  }
};
