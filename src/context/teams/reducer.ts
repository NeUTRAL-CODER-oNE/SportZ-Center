/* eslint-disable no-case-declarations */
import { Reducer } from "react";
import { TeamsActions, TeamsAvailableAction, TeamsState } from "./type";
export const initialState: TeamsState = {
  teams: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const teamsReducer: Reducer<TeamsState, TeamsActions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case TeamsAvailableAction.FETCH_TEAMS_REQUEST:
      return { ...state, isLoading: true };
    case TeamsAvailableAction.FETCH_TEAMS_SUCCESS:
      return { ...state, isLoading: false, teams: action.payload };
    case TeamsAvailableAction.FETCH_TEAMS_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case TeamsAvailableAction.REORDER_TEAMS:
      return { ...state, isLoading: false, teams: [action.payload] };

    default:
      return state;
  }
};
