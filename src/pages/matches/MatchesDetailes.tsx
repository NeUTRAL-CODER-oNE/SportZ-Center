/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect, Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { API_ENDPOINT } from "../../config/constants";
import { ThemeContext } from "../../context/theme";
import { Matches } from "../../context/matches/type";
import { useParams, useNavigate } from "react-router-dom";

const MatchDetails: React.FC = () => {
  const [selectedMatch, setSelectedMatch] = useState<Matches | null>(null);
  const [isLoading, setLoading] = useState(false);
  const { theme } = useContext(ThemeContext);
  const { id } = useParams();
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);

  const fetchMatchDetailsById = async () => {
    setLoading(true);
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMatchDetailsById().then(() => setOpen(true));
  }, []);

  const closeModal = () => {
    setOpen(false);
    navigate("../..");
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-50 overflow-y-3xl"
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
                className={`mx-auto mt-20 mb-5 p-10 w-full max-w-3xl transform overflow-hidden rounded-2xl align-middle shadow-xl transition-all ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
              >
                <Dialog.Title
                  className={`text-lg font-medium ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  Match Details
                </Dialog.Title>
                <div className="mt-4">
                  {isLoading && <p>Loading...</p>}
                  {selectedMatch && (
                    <div>
                      <div className="flex justify-center">
                        <p
                          className={`font-bold  ${theme === "dark" ? "text-zinc-50" : "text-black"}`}
                        >
                          {selectedMatch.name}
                        </p>
                      </div>
                      <div className="flex justify-between p-4 items-center mb-2">
                        <p
                          className={`text-l tracking-tight ${theme === "dark" ? "text-zinc-50" : "text-gray-900"}`}
                        >
                          {selectedMatch && selectedMatch.score && (
                            <>
                              {Object.entries(selectedMatch.score).map(
                                ([teamName, score], index) => (
                                  <div key={index}>
                                    <p>
                                      {teamName}: {String(score)}
                                    </p>
                                  </div>
                                ),
                              )}
                            </>
                          )}
                        </p>
                      </div>
                      <div className="overflow-y-auto max-h-72">
                        <p className={`text-gray-600 mb-4 text-justify `}>
                          <b>Story:</b> {selectedMatch.story}
                        </p>
                      </div>
                      <div
                        className="story-read-more-wrapper"
                        style={{ paddingTop: "3em" }}
                      >
                        <div className="flex justify-center">
                          <button
                            onClick={closeModal}
                            className={` text-gray-600 px-4 py-2 ${theme === "dark" ? "bg-gray-800" : "bg-gray-200 hover:bg-gray-300"} rounded-md`}
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
