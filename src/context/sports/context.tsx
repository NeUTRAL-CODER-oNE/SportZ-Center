/* eslint-disable react-refresh/only-export-components */
// context/matches/context.tsx
import React, { createContext, useContext, useReducer } from "react";
import { initialState, sportsReducer } from "./reducer";
import { SportsDispatch, SportsState } from "./type";

const SportsStateContext = createContext<SportsState>(initialState);
const SportsDispatchContext = createContext<SportsDispatch>(() => {});

export const SportsProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(sportsReducer, initialState);

  return (
    <SportsStateContext.Provider value={state}>
      <SportsDispatchContext.Provider value={dispatch}>
        {children}
      </SportsDispatchContext.Provider>
    </SportsStateContext.Provider>
  );
};

export const useSportsState = () => useContext(SportsStateContext);
export const useSportsDispatch = () => useContext(SportsDispatchContext);
