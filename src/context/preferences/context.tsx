import React, { createContext, useContext, useReducer } from "react";
import { preferencesReducer, initialState } from "./reducer";
import { PreferencesState, PreferencesDispatch } from "./type";
const PreferencesStateContext = createContext<PreferencesState>(initialState);
const PreferencesDispatchContext = createContext<PreferencesDispatch>(() => {});
export const PreferencesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Create a state and dispatch with `useReducer` passing in the `taskReducer` and an initial state. Pass these as values to our contexts.
  const [state, dispatch] = useReducer(preferencesReducer, initialState);
  return (
    <PreferencesStateContext.Provider value={state}>
      <PreferencesDispatchContext.Provider value={dispatch}>
        {children}
      </PreferencesDispatchContext.Provider>
    </PreferencesStateContext.Provider>
  );
};

// Create helper hooks to extract the `state` and `dispacth` out of the context.
// eslint-disable-next-line react-refresh/only-export-components
export const usePreferencesState = () => useContext(PreferencesStateContext);
// eslint-disable-next-line react-refresh/only-export-components
export const usePreferencesDispatch = () =>
  useContext(PreferencesDispatchContext);
