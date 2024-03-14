import React from "react";
import { Articles, ArticlesState } from "../../context/articles/type";
import { useArticlesState } from "../../context/articles/context";
import ArticlesDetails from "./ArticlesDetailes";

const ArticleListItem: React.FC = () => {
  const state: ArticlesState = useArticlesState();
  const {articles, isLoading, isError, errorMessage } = state;

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!articles) {
    return <div>No article found.</div>;
  }

  const renderArticleDetails = (id: number) => {
    return <ArticlesDetails id={id} />;
    
  };

  return (
    <>
              <div className="max-w-screen-xl mx-auto p-5">
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10 pr-0">
            {articles.map((article: Articles) => (
              <div
                key={article.id}
                className="relative overflow-hidden rounded-xl duration-300 shadow-2xl dark:bg-gray-900"
              >
                <div className="image-container">
                  <img
                    className="w-full h-48 object-cover rounded-lg"
                    src={article.thumbnail}
                    alt={article.title}
                  />
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal h-full">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-l tracking-tight text-gray-900 dark:text-zinc-50">
                        {article.sport.name}
                      </p>
                      <p className="font-mono text-xs font-normal opacity-75 text-black dark:text-zinc-50">
                        {new Date(article.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <h4 className="mb-2 text-l font-bold text-justify tracking-tight text-gray-900 dark:text-zinc-50">
                      {article.title}
                    </h4>
                    <p className="mb-3 font-normal text-justify text-gray-700 dark:text-gray-300">
                      {article.summary}
                    </p>
                  </div>
                  <div className="summary-read-more-wrapper" style={{ paddingTop: '2em' }}>
                    
                  <div className="flex justify-left">{renderArticleDetails(Number(article.id))}</div>

                    </div>
                  </div>
                </div>
            ))}
          </div>
        </div>
    </>
  );
};

export default ArticleListItem;
