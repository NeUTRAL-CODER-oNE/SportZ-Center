export interface SportsState {
  sports: Sports[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type Sports = {
  id: number;
  name: string;
};

export enum SportsAvailableAction {
  FETCH_SPORTS_REQUEST = "FETCH_SPORTS_REQUEST",
  FETCH_SPORTS_SUCCESS = "FETCH_SPORTS_SUCCESS",
  FETCH_SPORTS_FAILURE = "FETCH_SPORTS_FAILURE",

  REORDER_SPORTS = "REORDER_SPORTS",
}

export type SportsActions =
  | { type: SportsAvailableAction.REORDER_SPORTS; payload: Sports }
  | { type: SportsAvailableAction.FETCH_SPORTS_REQUEST }
  | {
      type: SportsAvailableAction.FETCH_SPORTS_SUCCESS;
      payload: Sports[];
    }
  | { type: SportsAvailableAction.FETCH_SPORTS_FAILURE; payload: string };

// A type to hold dispatch actions in a context.
export type SportsDispatch = React.Dispatch<SportsActions>;
