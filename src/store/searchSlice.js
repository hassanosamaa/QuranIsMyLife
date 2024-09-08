import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  search: [] ,
};


const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    addToSearch:(state,action)=>{
        state.search=action.payload
    },
    removeSearch:(state)=>{
      state.search=[]
    },
   
  
  },
});

export const { addToSearch,removeSearch,btnSearch } = searchSlice.actions;
export default searchSlice.reducer;
