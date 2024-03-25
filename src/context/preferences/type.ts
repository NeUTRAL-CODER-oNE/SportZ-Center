export interface PreferencesState {
  preferences: Preference[];
  isLoading: boolean;
  isError: boolean;
  errorMessage: string;
}

export type Preference = {
  sport: {
    id: number;
    name: string;
  };
  teams: {
    id: number;
    name: string;
  };
};

export enum PreferencesAvailableAction {
  FETCH_PREFERENCES_REQUEST = "FETCH_PREFERENCES_REQUEST",
  FETCH_PREFERENCES_SUCCESS = "FETCH_PREFERENCES_SUCCESS",
  FETCH_PREFERENCES_FAILURE = "FETCH_PREFERENCES_FAILURE",

  REORDER_PREFERENCES = "REORDER_PREFERENCES",
}

export type PreferencesActions =
  | {
      type: PreferencesAvailableAction.REORDER_PREFERENCES;
      payload: Preference;
    }
  | { type: PreferencesAvailableAction.FETCH_PREFERENCES_REQUEST }
  | {
      type: PreferencesAvailableAction.FETCH_PREFERENCES_SUCCESS;
      payload: Preference[];
    }
  | {
      type: PreferencesAvailableAction.FETCH_PREFERENCES_FAILURE;
      payload: string;
    };

// A type to hold dispatch actions in a context.
export type PreferencesDispatch = React.Dispatch<PreferencesActions>;
