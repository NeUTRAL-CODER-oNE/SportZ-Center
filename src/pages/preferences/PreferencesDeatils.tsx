/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, Fragment, useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ThemeContext } from "../../context/theme";
import { useNavigate } from "react-router-dom";
import { TeamsState } from "../../context/teams/type";
import {
  useSportsState,
} from "../../context/sports/context";
import { SportsState } from "../../context/sports/type";
import { useTeamsState } from "../../context/teams/context";

const PreferencesDetails: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const teamsState: TeamsState = useTeamsState();
  const { teams } = teamsState;
  const sportsState: SportsState = useSportsState();
  const { sports } = sportsState;


  useEffect(() => {
    setOpen(true);
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
          className="fixed inset-0 z-50 overflow-y-3xl flex justify-center  bg-black bg-opacity-25"
          onClose={closeModal}
        >
          <div className={`flex items-center justify-center max-h-screen`}>
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
                className={`mx-auto m-auto p-10 w-full max-w-3xl transform overflow-hidden rounded-2xl align-middle shadow-xl transition-all ${theme === "dark" ? "bg-gray-900" : "bg-white"}`}
              >
                <Dialog.Title
                  className={`flex justify-center text-2xl font-mono font-bold ${theme === "dark" ? "text-white" : "text-gray-900"}`}
                >
                  Preferences
                </Dialog.Title>
                <div>
                  <p className="font-mono font-bold">Sports</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-1 mt-4">
                    {sports.map((sport) => (
                      <div
                        key={sport.id}
                        className="flex items-center mb-2 accent-blue-700"
                      >
                        <input type="checkbox" className="mr-2" />
                        <p className="text-sm font-mono font-bold text-zinc-500">
                          {sport.name}
                        </p>
                      </div>
                    ))}
                  </div>
                  <br />
                </div>
                <div>
                  <p className="font-mono font-bold">Teams</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-1 mt-4">
                    {teams.map((team) => (
                      <div
                        key={team.id}
                        className="flex items-center mb-2 accent-blue-700"
                      >
                        <input type="checkbox" className="mr-2" />
                        <p className="text-sm font-mono font-bold text-zinc-500">
                          {team.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default PreferencesDetails;
