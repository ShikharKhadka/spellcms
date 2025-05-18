import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../pages/blog/blogslice";
import categoryReducer from "../pages/category/categoryslice";

export const store = configureStore({
  reducer: {
    blog: blogReducer,
    category: categoryReducer,
  },
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
