/* eslint-disable no-case-declarations */
import { Reducer } from "react";
import {
  ArticlesState,
  ArticlesActions,
  ArticlesAvailableAction,
} from "./type";
export const initialState: ArticlesState = {
  articles: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const articlesReducer: Reducer<ArticlesState, ArticlesActions> = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case ArticlesAvailableAction.FETCH_ARTICLES_REQUEST:
      return { ...state, isLoading: true };
    case ArticlesAvailableAction.FETCH_ARTICLES_SUCCESS:
      return { ...state, isLoading: false, articles: action.payload };
    case ArticlesAvailableAction.FETCH_ARTICLES_FAILURE:
      return {
        ...state,
        isLoading: false,
        isError: true,
        errorMessage: action.payload,
      };

    case ArticlesAvailableAction.REORDER_ARTICLES:
      return { ...state, isLoading: false, articles: [action.payload] };

    default:
      return state;
  }
};
