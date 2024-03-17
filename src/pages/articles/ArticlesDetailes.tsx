/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment, useContext } from "react";
import { Articles, Teams } from "../../context/articles/type";
import { Dialog, Transition } from "@headlessui/react";
import { API_ENDPOINT } from "../../config/constants";
import { useNavigate, useParams } from "react-router-dom";
import { ThemeContext } from "../../context/theme";

const ArticlesDetails: React.FC = () => {
  const [selectedArticle, setSelectedArticle] = useState<Articles | null>(null);
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();

  const fetchArticleDetailsById = async () => {
    setLoading(true);
    const authToken = localStorage.getItem("authToken") || "";

    try {
      const response = await fetch(`${API_ENDPOINT}/articles/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      setSelectedArticle(data);
    } catch (error) {
      console.error("Error fetching article details:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticleDetailsById().then(() => setOpen(true));
  }, []);

  const closeModal = () => {
    setOpen(false);
    navigate("../../");
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-auto"
          onClose={closeModal}
        >
          <div className={`flex items-center justify-center max-h-1xl`}>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={` mt-5 mb-5 p-10 pb-5 pt-5 w-full max-w-4xl rounded-2xl shadow-xl transform overflow-hidden align-middle transition-all ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
              >
                <Dialog.Title
                  className={`text-lg font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  Article Details
                </Dialog.Title>
                <div className="mt-2">
                  {isLoading && <p>Loading...</p>}
                  {selectedArticle && (
                    <div>
                      <img
                        className="w-full h-48 object-cover rounded-lg"
                        src={selectedArticle.thumbnail}
                        alt={selectedArticle.title}
                      />
                      <div className="flex justify-between p-3 items-center mb-2">
                        <p
                          className={`font-mono font-normal opacity-75 ${theme === "dark" ? "text-zinc-50" : "text-gray-900"}`}
                        >
                          {selectedArticle.teams?.map(
                            (team: Teams, index: number) =>
                              index === 0 ? team.name : ` vs ${team.name}`,
                          )}
                        </p>
                        <p
                          className={`font-mono font-normal opacity-75 ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                        >
                          {new Date(selectedArticle.date).toLocaleDateString(
                            "en-US",
                            {
                              month: "long",
                              day: "numeric",
                              year: "numeric",
                            },
                          )}
                        </p>
                      </div>
                      <h2
                        className={`text-1xl font-bold mb-4 text-center ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                      >
                        {selectedArticle.title}
                      </h2>
                      <div className="overflow-y-auto max-h-72">
                        <p className={`text-gray-600 mb-4 text-justify `}>
                          <b>Content:</b> {selectedArticle.content}
                        </p>
                      </div>
                      <div
                        className="read-more-wrapper"
                        style={{ paddingTop: "1em" }}
                      >
                        <div className="flex justify-center">
                          <button
                            onClick={closeModal}
                            className={` text-gray-600 px-4 py-2 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200 hover:bg-gray-400"} rounded-md`}
                          >
                            Close
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ArticlesDetails;
