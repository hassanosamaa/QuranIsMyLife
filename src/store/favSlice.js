import { createSlice } from '@reduxjs/toolkit';

const initialState = { 
  items: [] 
};

const savedItems = typeof window !== 'undefined' 
  ? (localStorage.getItem('sounds') ? JSON.parse(localStorage.getItem('sounds')) : null) 
  : null;

if (savedItems) {
  initialState.items = savedItems; 
}

const favSlice = createSlice({
  name: 'fav',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.items.find((item) => item.src === action.payload.src);
      if (item) {
        console.log("Item already exists");
      } else {
        state.items.push(action.payload);
        localStorage.setItem('sounds', JSON.stringify(state.items));
      }  
    },
    removeFromCart: (state, action) => {
        
      state.items = state.items.filter((item) => item.src !== action.payload);
      
      localStorage.setItem('sounds', JSON.stringify(state.items));
    },
  },
});

export const { addToCart, removeFromCart } = favSlice.actions;
export default favSlice.reducer;
