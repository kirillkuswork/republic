import { IApiSlider } from '../../api/apiTypes';

export interface ISlidersSliceState {
    sliderRedsFirst: null | IApiSlider;
    activePhotoPack: number;
}
