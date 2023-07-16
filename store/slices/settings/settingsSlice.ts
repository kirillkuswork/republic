import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { fetchGeneralSettings } from '../../api/api';
import { ISettingsState } from './settingsSliceTypes';

const initialState: ISettingsState = {
    general_settings: null,
    promo: null,
};

export const settingsSlice = createSlice({
    name: 'settingsSlice',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchGeneralSettings.fulfilled, (state, action) => {
            state.general_settings = action.payload;
            let main_promo = action.payload.find((item) => item.setting_name === 'main_promo_buttons');
            if (main_promo) state.promo = main_promo;
        });
    },
});
export const {} = settingsSlice.actions;

export default settingsSlice.reducer;
