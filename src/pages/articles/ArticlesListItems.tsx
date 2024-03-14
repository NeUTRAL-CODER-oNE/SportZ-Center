import React from "react";
import { Link } from "react-router-dom";
import { Articles } from "../../context/articles/type";

const ArticleListItem: React.FC<{ article: Articles; onClick: () => void }> = ({
  article,
  onClick,
}) => {
  return (
    <div
      className="relative overflow-hidden rounded-xl  duration-300 shadow-2xl dark:bg-gray-900"
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
            <p
              className="mb-3 font-normal text-justify text-gray-700 dark:text-gray-300"
              style={{ marginBottom: "3rem" }}
            >
              {article.summary}
            </p>
          </div>
          <Link key={article.id} to={`/articles/${article.id}`} className="block">

          <div onClick={onClick}>
          <p className="absolute bottom-0 left-0 w-full text-center rounded-md dark:text-zinc-50 text-white px-4 py-2 rounded-md bg-blue-600 hover:bg-blue-700">
            Read More...
          </p>
          </div>
          </Link>

        </div>
    </div>
  );
};

export default ArticleListItem;
