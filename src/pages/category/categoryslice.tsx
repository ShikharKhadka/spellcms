import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { fetchCategory, postCategory } from "../../services/services";

const initialState: CategoryInitialStateI = {
  status: "loading",
  data: [],
  error: null,
};

interface CategoryInitialStateI {
  status: "loading" | "success" | "error";
  data: CategoryI[];
  error: string | null;
}
export interface CategoryI {
  id?: string;
  name: string;
}

export const post = createAsyncThunk(
  "users/postCategory",
  async (category: CategoryI, thunkAPI) => {
    const response = await postCategory({
      body: category,
    });
    return response;
  }
);

export const fetch = createAsyncThunk("users/fetchCategory", async () => {
  const response = await fetchCategory();
  return response;
});

const categorySlice = createSlice({
  name: "category",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetch.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        fetch.fulfilled,
        (state, action: PayloadAction<CategoryI[] | string>) => {
          state.status = "success";
          if (typeof action.payload == "object") {
            const list = action.payload as CategoryI[];
            state.data = action.payload;
          }

          // Add user to the state array
        }
      )
      .addCase(fetch.rejected, (state) => {
        state.status = "error";
        // Add user to the state array
      })
      .addCase(post.pending, (state) => {
        state.status = "loading";
      })
      .addCase(
        post.fulfilled,
        (state, action: PayloadAction<CategoryI | null>) => {
          console.log("This is state", action);
          if (action.payload) {
            state.status = "success";
            state.data.push(action.payload);
            // const index = state.data.findIndex(
            //   (e) => e.id == action.payload?.id
            // );
            // state.data[index] = action.payload;
          }
          // Add user to the state array
        }
      );
  },
});

// export const { todoAdded, todoToggled } = todosSlice.actions
export default categorySlice.reducer;
