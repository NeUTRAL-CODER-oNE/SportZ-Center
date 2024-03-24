/* eslint-disable react-refresh/only-export-components */
// context/matches/context.tsx
import React, { createContext, useContext, useReducer } from "react";
import { TeamsDispatch, TeamsState } from "./type";
import { initialState, teamsReducer } from "./reducer";

const TeamsStateContext = createContext<TeamsState>(initialState);
const TeamsDispatchContext = createContext<TeamsDispatch>(() => {});

export const TeamsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(teamsReducer, initialState);

  return (
    <TeamsStateContext.Provider value={state}>
      <TeamsDispatchContext.Provider value={dispatch}>
        {children}
      </TeamsDispatchContext.Provider>
    </TeamsStateContext.Provider>
  );
};

export const useTeamsState = () => useContext(TeamsStateContext);
export const useTeamsDispatch = () => useContext(TeamsDispatchContext);
