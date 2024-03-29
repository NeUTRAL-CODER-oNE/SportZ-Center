/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { API_ENDPOINT } from "../../config/constants";
import { ThemeContext } from "../../context/theme";
import { Matches, MatchesState } from "../../context/matches/type";
import { useParams, useNavigate } from "react-router-dom";
import { useMatchesState } from "../../context/matches/context";

const MatchDetails: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<Matches | null>(null);
  const state: MatchesState = useMatchesState();
  const { isLoading, isError, errorMessage } = state;

  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const [scoreLoading, setScoreLoading] = useState(false);

  const fetchMatchDetailsById = async () => {
    const authToken = localStorage.getItem("authToken") || "";

    try {
      const response = await fetch(`${API_ENDPOINT}/matches/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
      });
      const data = await response.json();
      setSelectedMatch(data);
    } catch (error) {
      console.error("Error fetching match details:", error);
    }
  };

  useEffect(() => {
    fetchMatchDetailsById().then(() => setOpen(true));
  }, []);

  const closeModal = () => {
    setOpen(false);
    navigate("../..");
  };

  const handleRefresh = async () => {
    setScoreLoading(true);
    await fetchMatchDetailsById();
    setScoreLoading(false);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-3xl flex justify-center bg-black bg-opacity-25"
          onClose={closeModal}
        >
          <div className={`flex items-center justify-center max-h-3xl `}>
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
                className={`mx-auto m-auto p-10 w-full max-w-3xl transform overflow-hidden rounded-2xl align-middle shadow-xl transition-all ${
                  theme === "dark" ? "bg-gray-900" : "bg-white"
                }`}
              >
                <Dialog.Title
                  className={`text-lg font-medium ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Match Details
                </Dialog.Title>
                <div className="mt-4">
                  {isLoading && <p>Loading...</p>}
                  {selectedMatch && (
                    <div>
                      <div className="flex justify-center">
                        <p
                          className={`font-bold  ${
                            theme === "dark" ? "text-zinc-50" : "text-black"
                          }`}
                        >
                          {selectedMatch.name}
                        </p>
                      </div>
                      <div className="flex justify-between p-4 items-center mb-2">
                        <p
                          className={`text-l tracking-tight ${
                            theme === "dark" ? "text-zinc-50" : "text-gray-900"
                          }`}
                        >
                          {selectedMatch && selectedMatch.score && (
                            <>
                              {scoreLoading ? (
                                <p>Loading score...</p>
                              ) : (
                                Object.entries(selectedMatch.score).map(
                                  ([teamName, score], index) => (
                                    <React.Fragment key={index}>
                                      {index > 0 && <span> vs </span>}
                                      <span
                                        className={`font-bold ${
                                          index === 0
                                            ? "text-blue-500"
                                            : "text-red-500"
                                        }`}
                                      >
                                        {teamName}
                                      </span>{" "}
                                      ({String(score)})
                                    </React.Fragment>
                                  ),
                                )
                              )}
                            </>
                          )}
                        </p>
                        {selectedMatch.isRunning && (
                          <button
                            onClick={handleRefresh}
                            className={`text-gray-600 px-4 py-2 ${
                              theme === "dark"
                                ? "bg-gray-800"
                                : "bg-gray-200 hover:bg-gray-300"
                            } rounded-md`}
                          >
                            Refresh
                          </button>
                        )}
                      </div>
                      <div className="overflow-y-auto max-h-72 mb-4">
                        <p className={`text-gray-600 mb-4 text-justify `}>
                          <b>Story:</b> {selectedMatch.story}
                        </p>
                      </div>
                      {!selectedMatch.isRunning && selectedMatch.endsAt && (
                        <p className={`text-gray-600 mb-4 text-justify `}>
                          <b>Ends At:</b>{" "}
                          {new Date(selectedMatch.endsAt).toLocaleString()}
                        </p>
                      )}
                      {selectedMatch.isRunning && selectedMatch.startsAt && (
                        <p className={`text-gray-600 mb-4 text-justify `}>
                          <b>Starts At:</b>{" "}
                          {new Date(selectedMatch.startsAt).toLocaleString()}
                        </p>
                      )}
                      <div className="story-read-more-wrapper pt-2">
                        <div className="flex justify-center">
                          <button
                            onClick={closeModal}
                            className={` text-gray-600 px-4 py-2 ${
                              theme === "dark"
                                ? "bg-gray-800"
                                : "bg-gray-200 hover:bg-gray-300"
                            } rounded-md`}
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

export default MatchDetails;
