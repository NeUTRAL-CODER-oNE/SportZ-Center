import React, { useEffect, Suspense } from "react";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";
import ErrorBoundary from "../../components/ErrorBoundary";
const ArticlesList = React.lazy(() => import("./ArticlesList"));

const Articles = () => {
  const articleDispatch = useArticlesDispatch();

  useEffect(() => {
    fetchArticles(articleDispatch);
  }, [articleDispatch]);

  return (
    <div className="w-full dark:bg-black">
      <Suspense fallback={<div>Loading...</div>}>
        <ErrorBoundary>
          <ArticlesList />
        </ErrorBoundary>
      </Suspense>
    </div>
  );
};

export default Articles;
