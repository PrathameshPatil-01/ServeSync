import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyword: '',
  location: '',
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    clearSearch: (state) => {
      state.keyword = '';
      state.location = '';
    },
  },
});

export const { setKeyword, setLocation, clearSearch } = searchSlice.actions;

export default searchSlice.reducer;

