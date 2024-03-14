/* eslint-disable no-case-declarations */
import { Reducer } from "react";
import { MatchesState, MatchesActions, MatchesAvailableAction } from "./type";
export const initialState: MatchesState = {
  matches: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const matchesReducer: Reducer<MatchesState, MatchesActions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case MatchesAvailableAction.FETCH_MATCHES_REQUEST:
      return { ...state, isLoading: true };
    case MatchesAvailableAction.FETCH_MATCHES_SUCCESS:
      return { ...state, isLoading: false, matches: action.payload };
    case MatchesAvailableAction.FETCH_MATCHES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case MatchesAvailableAction.REORDER_MATCHES:
      return { ...state, isLoading: false, matches: [action.payload] };

    default:
      return state;
  }
};
