/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, Fragment } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {  useArticlesState } from "../../context/articles/context";
import { Articles } from "../../context/articles/type";
import { API_ENDPOINT } from "../../config/constants";
import { Teams } from "../../context/articles/type";
import ArticleListItem from "./ArticlesListItems";
import { Transition } from '@headlessui/react';

const ArticlesDetailes: React.FC = () => {
  const state = useArticlesState();
  const { articles, isLoading, isError, errorMessage } = state;
  const [selectedArticle, setSelectedArticle] = useState<Articles | null>(null);
  const [isOpen, setOpen] = useState(false);
  const navigate = useNavigate();
  useParams<{ id: string; }>();

  const fetchArticleDetails = async (id: number) => {
    const authToken = localStorage.getItem("authToken");

    try {
      if (!authToken) {
        console.error("Authentication token not found");
        return;
      }
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch article details");
      }
      const data = await response.json();
      setSelectedArticle(data);
      setOpen(true);
    } catch (error) {
      console.error("Error fetching article details", error);
    }
  };

  function closeModal() {
    setOpen(false);
    navigate("../../");
  }
  if (articles.length === 0 && isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <div className="max-w-screen-xl mx-auto p-5">
      <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10 pr-0">
        {articles.map((article: Articles) => (
          <ArticleListItem
            key={article.id}
            article={article}
            onClick={() => fetchArticleDetails(Number(article.id))}
          />
        ))}
      </div>
      <Transition appear show={isOpen} as={Fragment}>
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50" onClick={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="bg-white p-4 md:p-9 rounded-md max-w-3xl mx-auto my-8 dark:bg-gray-900">
              <div className="image-container mt-4">
                <img
                  className="w-full h-48 object-cover rounded-lg"
                  src={selectedArticle?.thumbnail}
                  alt={selectedArticle?.title}
                />
              </div>
              <div className="flex justify-between p-4 items-center mb-2">
                <p className="text-l tracking-tight text-gray-900dark:text-zinc-50">
                  {selectedArticle?.teams.map((team: Teams, index: number) =>
                    index === 0 ? team.name : ` vs ${team.name}`,
                  )}
                </p>
                <p className="font-mono text-xs font-normal opacity-75 text-black dark:text-zinc-50">
                  {selectedArticle && new Date(selectedArticle.date).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
              <h2 className="text-2xl font-bold mb-4 text-center dark:text-white">
                {selectedArticle?.title}
              </h2>
              <div className="overflow-y-auto max-h-72">
                <p className="text-gray-700 mb-4 text-justify dark:text-gray-300">
                  <b>Summary:</b> {selectedArticle?.summary}
                </p>
                <p className="text-gray-700 mb-4 text-justify dark:text-gray-300">
                  <b>Content:</b> {selectedArticle?.content}
                </p>
              </div>
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-gray-200 rounded-md dark:bg-gray-800 dark:text-white"
              >
                Close
              </button>
            </div>
          </Transition.Child>
        </div>
      </Transition>
    </div>
  );
};

export default ArticlesDetailes;
