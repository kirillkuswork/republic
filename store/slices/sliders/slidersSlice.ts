import { createSlice } from '@reduxjs/toolkit';
import { ISlidersSliceState } from './slidersSliceTypes';
import { fetchSliderRedsFirst } from '../../api/api';
import { IApiSlider } from '../../api/apiTypes';

const initialState: ISlidersSliceState = {
    sliderRedsFirst: null,
    activePhotoPack: 0,
};

const slidersSlice = createSlice({
    name: 'slidersSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSliderRedsFirst.fulfilled, (state, action) => {
            state.sliderRedsFirst = action.payload as IApiSlider;
        });
    },
});

export const {} = slidersSlice.actions;

export default slidersSlice.reducer;
