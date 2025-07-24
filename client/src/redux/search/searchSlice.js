import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  keyword: '',
  location: '',
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setKeyword: (state, action) => {
      state.keyword = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    resetSearch: () => initialState,
  },
});

export const { setKeyword, setLocation, resetSearch } = searchSlice.actions;
export default searchSlice.reducer;
