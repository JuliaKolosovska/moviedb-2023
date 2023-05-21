import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {AxiosError} from "axios";

import {IMovie, ISearch} from "../../interfaces";
import {searchService} from "../../services";

export interface ISearchState {
    searched: ISearch[];

}

const initialState: ISearchState = {
    searched: [],

};

const find = createAsyncThunk<ISearch[], { name: string }>(
    "searchSlice/find",
    async ({name}, {rejectWithValue}) => {
        try {
            if (name.length <= 1) return [];
            const {data} = await searchService.search(name);
            return data.results.map((item: IMovie): ISearch => {
                const { id, poster_path, title, vote_average} = item;
                return { id, poster_path, title, vote_average};
            });

        } catch (e) {
            return rejectWithValue((e as AxiosError).response?.data)
        }
    }
);

const searchSlice = createSlice({
    name: "searchSlice",
    initialState,
    reducers: {
        resetSearch: (state) => {
            state.searched = [];
        },
    },
    extraReducers: (builder) =>
        builder.addCase(find.fulfilled, (state, action) => {
            state.searched = action.payload;
        }),
});

const {
    reducer: searchReducer,
    actions: {resetSearch},
} = searchSlice;

const searchAction = {
    find,
    resetSearch,
};

export {searchAction, searchReducer};