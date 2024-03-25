/* eslint-disable no-case-declarations */
import { Reducer } from "react";
import { SportsState, SportsActions, SportsAvailableAction } from "./type";
export const initialState: SportsState = {
  sports: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const sportsReducer: Reducer<SportsState, SportsActions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case SportsAvailableAction.FETCH_SPORTS_REQUEST:
      return { ...state, isLoading: true };
    case SportsAvailableAction.FETCH_SPORTS_SUCCESS:
      return { ...state, isLoading: false, sports: action.payload };
    case SportsAvailableAction.FETCH_SPORTS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case SportsAvailableAction.REORDER_SPORTS:
      return { ...state, isLoading: false, sports: [action.payload] };

    default:
      return state;
  }
};
