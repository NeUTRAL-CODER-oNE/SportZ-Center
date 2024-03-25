import React, { createContext, useContext, useReducer } from "react";
import { articlesReducer, initialState } from "./reducer";
import { ArticlesState, ArticlesDispatch } from "./type";
const ArticlesStateContext = createContext<ArticlesState>(initialState);
const ArticlesDispatchContext = createContext<ArticlesDispatch>(() => {});
export const ArticlesProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  // Create a state and dispatch with `useReducer` passing in the `taskReducer` and an initial state. Pass these as values to our contexts.
  const [state, dispatch] = useReducer(articlesReducer, initialState);
  return (
    <ArticlesStateContext.Provider value={state}>
      <ArticlesDispatchContext.Provider value={dispatch}>
        {children}
      </ArticlesDispatchContext.Provider>
    </ArticlesStateContext.Provider>
  );
};

// Create helper hooks to extract the `state` and `dispacth` out of the context.
// eslint-disable-next-line react-refresh/only-export-components
export const useArticlesState = () => useContext(ArticlesStateContext);
// eslint-disable-next-line react-refresh/only-export-components
export const useArticlesDispatch = () => useContext(ArticlesDispatchContext);
