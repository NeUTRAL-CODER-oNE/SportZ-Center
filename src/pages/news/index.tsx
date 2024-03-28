import React, { Suspense } from "react";

import ErrorBoundary from "../../components/ErrorBoundary";
import AccountLayout from "../../layouts/account";
const News_Articles = React.lazy(() => import("./News_Articles"));

const News = () => {
  return (
    <div className="w-full dark:bg-black">
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          {<AccountLayout />}
          {<News_Articles />}
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};

export default News;
