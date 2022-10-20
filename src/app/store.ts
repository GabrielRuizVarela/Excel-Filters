import { configureStore } from '@reduxjs/toolkit';
import filterReducer from '../features/filterSlice';
import fileSlice from '../features/fileSlice';
import firebaseSlice from '../features/firebaseSlice';

const store = configureStore({
  reducer: {
    filter: filterReducer,
    file: fileSlice,
    firebase: firebaseSlice,
  },
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
