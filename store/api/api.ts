import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import {
    IApiTermsQA,
    IApiTerms,
    IApiTermsCalcData,
    IApiCatalog,
    IApiSlider,
    IApiNews,
    IApiFlatCheck,
    IApiProgress,
    IApiGeneralSettings,
    IApiGallery,
} from './apiTypes';
import apiUrls, { blockId } from '../../constants/API';

function onApiError(thunkApi: any, error: unknown) {
    console.log(error);
    const message = axios.isAxiosError(error)
        ? error.response
            ? error.response.data.message
                ? error.response.data.message
                : error.response.data.error
                ? error.response.data.error
                : JSON.stringify(error.response.data)
            : error.message
            ? error.message
            : JSON.stringify(error)
        : JSON.stringify(error);
    return thunkApi.rejectWithValue(message);
}

export const fetchCatalog = createAsyncThunk<IApiCatalog, undefined, { rejectValue: string }>(
    'flatsSlice/fetchFlats',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(apiUrls.urlCatalog);
            return response.data;
        } catch (error) {
            return onApiError(thunkApi, error);
        }
    },
);

export const flatCheck = createAsyncThunk<IApiFlatCheck, string, { rejectValue: string }>(
    'favoriteSlice/fetchFlatsStatus',
    async (flatsIds: string, thunkApi) => {
        try {
            const response = await axios.get(apiUrls.urlFlatCheck + flatsIds + '&' + blockId);
            return response.data;
        } catch (error) {
            return onApiError(thunkApi, error);
        }
    },
);

export const fetchQa = createAsyncThunk<IApiTermsQA[], undefined, { rejectValue: string }>('termsSlice/fetchQa', async (_, thunkApi) => {
    try {
        const response = await axios.get(apiUrls.urlQa);
        return response.data;
    } catch (error) {
        return onApiError(thunkApi, error);
    }
});

export const fetchCalcData = createAsyncThunk<IApiTermsCalcData[], undefined, { rejectValue: string }>(
    'termsSlice/fetchCalcData',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(apiUrls.urlCalcData);
            return response.data;
        } catch (error) {
            return onApiError(thunkApi, error);
        }
    },
);

export const fetchTradeinPrograms = createAsyncThunk<any, undefined, { rejectValue: string }>(
  'termsSlice/fetchTradeinProg',
  async (_, thunkApi) => {
      try {
          const response = await axios.get(apiUrls.urlTradeinProgram);
          return response.data.description;
      } catch (error) {
          return onApiError(thunkApi, error);
      }
  },
);

export const fetchSpecialMortgages = createAsyncThunk<IApiTerms, undefined, { rejectValue: string }>(
    'termsSlice/fetchSpecialMortgages',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(apiUrls.urlSpecialMortgages);
            return response.data;
        } catch (error) {
            return onApiError(thunkApi, error);
        }
    },
);

export const fetchInstallments = createAsyncThunk<IApiTerms, undefined, { rejectValue: string }>(
    'termsSlice/fetchInstallments',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(apiUrls.urlInstallments);
            return response.data;
        } catch (error) {
            return onApiError(thunkApi, error);
        }
    },
);

export const fetchSpecialInstallments = createAsyncThunk<IApiTerms, undefined, { rejectValue: string }>(
    'termsSlice/fetchSpecialInstallments',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(apiUrls.urlSpecialInstallments);
            return response.data;
        } catch (error) {
            return onApiError(thunkApi, error);
        }
    },
);

export const fetchSliderRedsFirst = createAsyncThunk<IApiSlider, undefined, { rejectValue: string }>(
    'slidersSlice/fetchSliderRedsFirst',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(apiUrls.urlSliderRedsFirst);
            return response.data;
        } catch (error) {
            return onApiError(thunkApi, error);
        }
    },
);

export const fetchNews = createAsyncThunk<IApiNews[], undefined, { rejectValue: string }>('newsSlice/fetchNews', async (_, thunkApi) => {
    try {
        const response = await axios.get(apiUrls.urlNews);
        return response.data;
    } catch (error) {
        return onApiError(thunkApi, error);
    }
});
export const fetchProgress = createAsyncThunk<IApiProgress[], undefined, { rejectValue: string }>(
    'progressSlice/fetchProgress',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(apiUrls.urlProgress);
            return response.data;
        } catch (error) {
            return onApiError(thunkApi, error);
        }
    },
);
export const fetchGeneralSettings = createAsyncThunk<IApiGeneralSettings[], undefined, { rejectValue: string }>(
    'progressSlice/fetchGeneralSettings',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(apiUrls.urlGeneralSettings);
            return response.data;
        } catch (error) {
            return onApiError(thunkApi, error);
        }
    },
);

export const fetchGallery = createAsyncThunk<IApiGallery[], undefined, { rejectValue: string }>(
    'gallerySlice/fetchGallery',
    async (_, thunkApi) => {
        try {
            const response = await axios.get(apiUrls.urlGallery);
            return response.data;
        } catch (error) {
            return onApiError(thunkApi, error);
        }
    },
);
