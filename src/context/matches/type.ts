export interface MatchesState {
  matches: Matches[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type Matches = {
  id: number;
  name: string;
  location: string;
  sportName: string;
  startsAt: string;
  endsAt: string;
  isRunning: boolean;
  score: Score[];
  teams: Teams[];
  playingTeam?: number;
  story: string;
};

export type Score = {
  [teamName: string]: string;
};

export type Teams = {
  id: number;
  name: string;
};

export enum MatchesAvailableAction {
  FETCH_MATCHES_REQUEST = "FETCH_MATCHES_REQUEST",
  FETCH_MATCHES_SUCCESS = "FETCH_MATCHES_SUCCESS",
  FETCH_MATCHES_FAILURE = "FETCH_MATCHES_FAILURE",

  REORDER_MATCHES = "REORDER_MATCHES",
}

export type MatchesActions =
  | { type: MatchesAvailableAction.REORDER_MATCHES; payload: Matches }
  | { type: MatchesAvailableAction.FETCH_MATCHES_REQUEST }
  | {
      type: MatchesAvailableAction.FETCH_MATCHES_SUCCESS;
      payload: Matches[];
    }
  | { type: MatchesAvailableAction.FETCH_MATCHES_FAILURE; payload: string };

// A type to hold dispatch actions in a context.
export type MatchesDispatch = React.Dispatch<MatchesActions>;
