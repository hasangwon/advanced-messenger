import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { AppState } from '../../app/store';
import initialState from './globalInitialData';

export const globalSlice = createSlice({
  name: 'global',
  initialState,
  reducers: {
    setLoadingProgress: (state, action: PayloadAction<string>) => {
      state.config.loadingProgress = action.payload;
    },
    setConfigIsLoaded: (state, action: PayloadAction<boolean>) => {
      state.config.isLoaded = action.payload;
    },

    setInfoUserKey: (state, action: PayloadAction<string>) => {
      state.info.userKey = action.payload;
    },
    setInfoUserName: (state, action: PayloadAction<string>) => {
      state.info.userName = action.payload;
    },
    setInfoUserTelNumber: (state, action: PayloadAction<string>) => {
      state.info.userTelNumber = action.payload;
    },
  },
});

export const globalReducers = globalSlice.actions;
export const selectGlobalConfig = (state: AppState) => state.global.config;
export const selectGlobalInfo = (state: AppState) => state.global.info;
export const selectGlobalAuth = (state: AppState) => state.global.auth;
export default globalSlice.reducer;
