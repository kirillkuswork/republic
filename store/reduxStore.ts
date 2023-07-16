import { configureStore, combineReducers, Action, ThunkAction, createAction } from '@reduxjs/toolkit';
import mainSlice from './slices/mainSlice';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import catalogSlice from './slices/catalog/catalogSlice';
import termsSlice from './slices/terms/termsSlice';
import slidersSlice from './slices/sliders/slidersSlice';
import newsSlice from './slices/news/newsSlice';
import componentsSlice from './slices/components/componentsSlice';
import settingsSlice from './slices/settings/settingsSlice';
import callOrderSlice from './slices/callOrder/callOrderSlice';

let reducers = combineReducers({
    catalogPage: catalogSlice,
    termsPage: termsSlice,
    sliders: slidersSlice,
    main: mainSlice,
    components: componentsSlice,
    newsPage: newsSlice,
    settings: settingsSlice,
    callOrder: callOrderSlice,
});

let makeStore = () =>
    configureStore({
        reducer: reducers,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({
                serializableCheck: false,
                immutableCheck: false,
            }),
    });

export const store = makeStore();

export type RootStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<RootStore['getState']>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action>;
export type AppDispatch = typeof store.dispatch;
export const AppHydrate = createAction<RootState>(HYDRATE);

export const wrapper = createWrapper<RootStore>(makeStore);
