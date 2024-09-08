import { combineReducers } from '@reduxjs/toolkit';
import favReducer from './favSlice';
import searchReducer from './searchSlice';
const rootReducer = combineReducers({
	fav: favReducer,
	search:searchReducer
});

export default rootReducer;