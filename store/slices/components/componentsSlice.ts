import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IHintState } from './componentsSliceTypes';

let initialState: IHintState = {
    hintElement: null,
    hintContainer: null,
    hintIsShow: true,
};

const componentsSlice = createSlice({
    name: 'componentsSlice',
    initialState,
    reducers: {
        setHintElement(state, action: PayloadAction<Element>) {
            // @ts-ignore
            state.hintElement = action.payload;
        },
        setHintContainer(state, action: PayloadAction<Element>) {
            // @ts-ignore
            state.hintContainer = action.payload;
        },
        setHintIsShow(state, action: PayloadAction<boolean>) {
            state.hintIsShow = action.payload;
        },
    },
});

export default componentsSlice.reducer;
export const { setHintElement, setHintContainer, setHintIsShow } = componentsSlice.actions;
