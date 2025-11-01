import { configureStore } from '@reduxjs/toolkit';
import articleReducer from './slices/articleSlice';
import userReducer from './slices/userSlice';
import photoReducer from './slices/photoSlice';

export const store = configureStore({
  reducer: {
    articles: articleReducer,
    users: userReducer,
    photos: photoReducer,
  },
});



