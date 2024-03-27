
import React, { Suspense } from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
const UserPreferences = React.lazy(() => import("./UserPreferences"));

const Preferences = () => {

  return (
    <div className="w-full dark:bg-black">
      <ErrorBoundary>
        <Suspense
          fallback={<div className=" suspense-loading">Loading....</div>}
        >
          <UserPreferences />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
};

export default Preferences;
