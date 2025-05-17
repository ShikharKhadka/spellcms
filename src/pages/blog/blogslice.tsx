import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import { fetchBlog, postBlog, searchBlog } from '../../services/services';

const initialState: BlogInitialStateI = {
    status: "loading",
    data: [],
    error: null,
};

interface BlogInitialStateI {
    status: "loading" | "success" | "error",
    data: BlogI[],
    error: string | null;
}
export interface BlogI {
    id?: string;
    title: string,
    author: string, category: string, tags: string, status: string, createdAt: string
}

const post = createAsyncThunk(
    'users/postBlog',
    async (blog: BlogI, thunkAPI) => {
        const response = await postBlog({
            body: blog
            //  {
            //     author: "",
            //     category: "",
            //     createdAt: "",
            //     status: "",
            //     tags: "",
            //     title: ""
            // }
        })
        return response;
    },
)

export const fetch = createAsyncThunk(
    'users/fetchBlog',
    async () => {
        const response = await fetchBlog();
        return response;
    },
)


export const search = createAsyncThunk(
    'users/searchBlog',
    async (search: string) => {
        const response = await searchBlog({ search: search });
        return response;
    },
)



const blogSlice = createSlice({
    name: 'blog',
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.
            addCase(fetch.pending, (state) => {
                state.status = 'loading';
            }).
            addCase(fetch.fulfilled, (state, action: PayloadAction<BlogI[] | string>) => {
                state.status = 'success';
                if (typeof action.payload == "object") {
                    const list = action.payload as BlogI[];
                    state.data = action.payload;

                }

                // Add user to the state array
            }).addCase(fetch.rejected, (state) => {
                state.status = 'error';
                // Add user to the state array
            }).
            addCase(post.pending, (state) => {
                state.status = 'loading';
            }).
            addCase(post.fulfilled, (state, action: PayloadAction<BlogI | null>) => {
                state.status = 'success';
                if (action.payload != null) {
                    const index = state.data.findIndex((e) => e.id == action.payload?.id);
                    state.data[index] = action.payload;
                }
                // Add user to the state array
            }).
            addCase(search.fulfilled, (state, action: PayloadAction<BlogI[] | null>) => {
                if (action.payload != null) {
                    state.status = 'success';
                    state.data = action.payload
                }
                else {
                    state.data = [];
                    state.status = 'error';
                    state.error = "NO Data Found";
                }
                // Add user to the state array
            }).
            addCase(search.rejected, (state) => {
                state.status = 'error';
                state.error = "NO Data Found";
                // Add user to the state array
            });


    },
})

// export const { todoAdded, todoToggled } = todosSlice.actions
export default blogSlice.reducer