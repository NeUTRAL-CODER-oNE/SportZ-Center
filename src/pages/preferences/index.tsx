import React, { useState, Fragment, useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ThemeContext } from "../../context/theme";
import { TeamsState } from "../../context/teams/type";
import { useTeamsState } from "../../context/teams/context";
import { useSportsState } from "../../context/sports/context";
import { useNavigate } from "react-router-dom";
import { Preference } from "../../context/preferences/type";
import { SportsState } from "../../context/sports/type";
import { API_ENDPOINT } from "../../config/constants";

const PreferencesDetails: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const teamsState: TeamsState = useTeamsState();
  const { teams } = teamsState;
  const sportsState: SportsState = useSportsState();
  const { sports } = sportsState;

  const [userPreferences, setUserPreference] = useState<Preference | null>(() => {
    const storedPreferences = localStorage.getItem("userPreferences");
    return storedPreferences ? JSON.parse(storedPreferences) : {
      sport: { id: 0, name: "" },
      teams: { id: 0, name: "" },
    };
  });

  useEffect(() => {
    setOpen(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("userPreferences", JSON.stringify(userPreferences));
  }, [userPreferences]);

  const closeModal = () => {
    setOpen(false);
    navigate("../../");
  };

  const handleSelectedSport = (sportId: number) => {
    setUserPreference((prevPreferences) => ({
      ...prevPreferences!,
      sport: {
        ...prevPreferences?.sport,
        [sportId]: !prevPreferences?.sport[sportId],
      },
    }));
  };

  const handleSelectedTeam = (teamId: number) => {
    setUserPreference((prevPreferences) => ({
      ...prevPreferences!,
      teams: {
        ...prevPreferences?.teams,
        [teamId]: !prevPreferences?.teams[teamId],
      },
    }));
  };

  const setPreferences = async () => {
    const token = localStorage.getItem("authToken") ?? "";

    const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        preferences: userPreferences,
      }),
    });
    const data = await response.json();
    const userData = localStorage.getItem("userData") ?? "";
    const JSONdata = JSON.parse(userData);
    const patchedUserData = {
      ...JSONdata,
      preferences: data.preferences,
    };
    localStorage.setItem("userData", JSON.stringify(patchedUserData));
    navigate("/");
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
                        <input
                          type="checkbox"
                          className="mr-2"
                          onChange={() => handleSelectedSport(sport.id)}
                          checked={userPreferences?.sport[sport.id]}
                        />
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
                        <input
                          type="checkbox"
                          className="mr-2"
                          onChange={() => handleSelectedTeam(team.id)}
                          checked={userPreferences?.teams[team.id]}
                        />
                        <p className="text-sm font-mono font-bold text-zinc-500">
                          {team.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="read-more-wrapper pt-3">
                  <div className="flex justify-center">
                    <button
                      onClick={setPreferences}
                      className={` text-zinc-500 font-mono font-bold px-4 py-2 ${theme === "dark" ? "bg-gray-800  hover:bg-gray-700" : "bg-gray-200 hover:bg-gray-300"} rounded-md`}
                    >
                      Apply Preference
                    </button>
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
