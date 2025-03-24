import { createSlice } from "@reduxjs/toolkit";

const walletGraphSlice = createSlice({
  name: "walletGraph",
  initialState: {
    graphNodes: null,
  },
  reducers: {
    setGraphData: (state, action) => {
      state.graphNodes = action.payload;
    },
    resetGraph: (state) => {
      state.graphNodes = null;
    },
  },
});

export const { resetGraph, setGraphData } = walletGraphSlice.actions;

export default walletGraphSlice.reducer;
