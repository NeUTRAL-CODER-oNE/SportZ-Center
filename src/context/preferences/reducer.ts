/* eslint-disable no-case-declarations */
import { Reducer } from "react";
import {
  PreferencesActions,
  PreferencesAvailableAction,
  PreferencesState,
} from "./type";
export const initialState: PreferencesState = {
  preferences: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const preferencesReducer: Reducer<
  PreferencesState,
  PreferencesActions
> = (state = initialState, action) => {
  switch (action.type) {
    case PreferencesAvailableAction.FETCH_PREFERENCES_REQUEST:
      return { ...state, isLoading: true };
    case PreferencesAvailableAction.FETCH_PREFERENCES_SUCCESS:
      return { ...state, isLoading: false, preferences: action.payload };
    case PreferencesAvailableAction.FETCH_PREFERENCES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case PreferencesAvailableAction.REORDER_PREFERENCES:
      return { ...state, isLoading: false, preferences: [action.payload] };

    default:
      return state;
  }
};
