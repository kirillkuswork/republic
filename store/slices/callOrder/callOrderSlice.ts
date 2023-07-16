import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ICallOrderState } from './callOrderSliceTypes';

const initialState: ICallOrderState = {
    show: false,
    formName: '',
};

type FormNameTypes = 'footerForm' | 'contactForm' | 'favoritesForm' | 'flatForm' | 'commercialForm' | 'tradeinForm | Нужна консультация по трейд-ин';

export const callOrderSlice = createSlice({
    name: 'callOrderSlice',
    initialState,
    reducers: {
        openModal: (state, action: PayloadAction<FormNameTypes>) => {
            state.show = true;
            state.formName = action.payload;
        },
        closeModal: (state) => {
            state.show = false;
            state.formName = '';
        },
    },
});

export const { openModal, closeModal } = callOrderSlice.actions;

export default callOrderSlice.reducer;
