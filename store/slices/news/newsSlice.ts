import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchNews } from '../../api/api';
import { INewsState } from './newsSliceTypes';

const initialState: INewsState = {
    allNews: null,
};

export const newsSlice = createSlice({
    name: 'newsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchNews.fulfilled, (state, action) => {
            state.allNews = action.payload;
        });
    },
});
export const {} = newsSlice.actions;

export default newsSlice.reducer;
