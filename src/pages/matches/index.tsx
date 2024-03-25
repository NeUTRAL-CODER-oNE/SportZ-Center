import { useEffect } from "react";
import { fetchMatches } from "../../context/matches/actions";
import { useMatchesDispatch } from "../../context/matches/context";
import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
const MatchListItems = React.lazy(() => import("./MatchesListItems"));

const Matches = () => {
  const MatchesDispatch = useMatchesDispatch();

  useEffect(() => {
    fetchMatches(MatchesDispatch);
  }, [MatchesDispatch]);

  return (
    <div className="w-full dark:bg-black">
      <ErrorBoundary>
        <Suspense
          fallback={<div className=" suspense-loading">Loading....</div>}
        >
          <MatchListItems />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Matches;
