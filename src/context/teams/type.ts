export interface TeamsState {
  teams: Teams[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type Teams = {
  id: number;
  name: string;
  plays: string;
};

export enum TeamsAvailableAction {
  FETCH_TEAMS_REQUEST = "FETCH_TEAMS_REQUEST",
  FETCH_TEAMS_SUCCESS = "FETCH_TEAMS_SUCCESS",
  FETCH_TEAMS_FAILURE = "FETCH_TEAMS_FAILURE",

  REORDER_TEAMS = "REORDER_TEAMS",
}

export type TeamsActions =
  | { type: TeamsAvailableAction.REORDER_TEAMS; payload: Teams }
  | { type: TeamsAvailableAction.FETCH_TEAMS_REQUEST }
  | {
      type: TeamsAvailableAction.FETCH_TEAMS_SUCCESS;
      payload: Teams[];
    }
  | { type: TeamsAvailableAction.FETCH_TEAMS_FAILURE; payload: string };

// A type to hold dispatch actions in a context.
export type TeamsDispatch = React.Dispatch<TeamsActions>;
