import { useEffect } from "react";
import { useArticlesDispatch } from "../../context/articles/context";
import { fetchArticles } from "../../context/articles/actions";
import ArticlesList from "./ArticlesList";

const Articles = () => {
  const ArticleDispatch = useArticlesDispatch();

  useEffect(() => {
    fetchArticles(ArticleDispatch);
  }, [ArticleDispatch]);

  return (
    <div className="w-full dark:bg-black">
      <ArticlesList />
    </div>
  );
};

export default Articles;
