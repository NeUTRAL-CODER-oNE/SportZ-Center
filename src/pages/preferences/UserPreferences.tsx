import React, { useState, Fragment, useContext, useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { ThemeContext } from "../../context/theme";
import { useNavigate } from "react-router-dom";
import { TeamsState } from "../../context/teams/type";
import { useSportsState } from "../../context/sports/context";
import { SportsState } from "../../context/sports/type";
import { useTeamsState } from "../../context/teams/context";
import { API_ENDPOINT } from "../../config/constants";

interface Preference {
  sports: string[];
  teams: string[];
}

export type Sports = {
  id: number;
  name: string;
  teams: Teams[];
};

export type Teams = {
  id: number;
  name: string;
  plays: string;
};

const UserPreferences: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const [isOpen, setOpen] = useState(false);
  const teamsState: TeamsState = useTeamsState();
  const { teams } = teamsState;
  const sportsState: SportsState = useSportsState();
  const { sports } = sportsState;

  const [selectedPreferences, setSelectedPreferences] = useState<Preference>({
    sports: [],
    teams: [],
  });

  console.log(selectedPreferences);

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: "sports" | "teams",
  ) => {
    const { value, checked } = e.target;
    setSelectedPreferences((prevSelectedPreferences) => {
      // ensure prevSelectedPreferences[type] is initialized as an array and an array
      const selectedValues = Array.isArray(prevSelectedPreferences[type])
        ? prevSelectedPreferences[type]
        : [];

      if (checked) {
        return {
          ...prevSelectedPreferences,
          [type]: [...selectedValues, value],
        };
      } else {
        return {
          ...prevSelectedPreferences,
          [type]: selectedValues.filter((item) => item !== value),
        };
      }
    });
  };

  useEffect(() => {
    const fetchPreferences = async () => {
      const token = localStorage.getItem("authToken");

      try {
        const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        console.log(data);
        // ensure preferences is initialized as an object with sports and teams properties
        const preferences = data.preferences || { sports: [], teams: [] };
        setSelectedPreferences(preferences);
      } catch (error) {
        console.log("Error fetching preferences:", error);
      }
    };

    fetchPreferences();
  }, []);

  const setPreferences = async () => {
    try {
      const authenticated = localStorage.getItem("authToken");
      console.log(authenticated);
      if (!authenticated) {
        throw new Error("User is not authenticated");
      }

      const response = await fetch(`${API_ENDPOINT}/user/preferences`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authenticated}`,
        },
        body: JSON.stringify({
          preferences: selectedPreferences,
        }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(
          `Failed to update preferences: ${response.status} - ${errorMessage}`,
        );
      }

      const responseData = await response.json();
      console.log(responseData);

      // Update the user's preferences in local storage
      const userData = localStorage.getItem("userData");
      if (userData) {
        const parsedUserData = JSON.parse(userData);
        const updatedUserData = {
          ...parsedUserData,
          preferences: responseData.preferences,
        };
        console.log("Updated user data:", updatedUserData);
        localStorage.setItem("userData", JSON.stringify(updatedUserData));
      }

      navigate("/");
      window.location.reload();

      // eslint-disable-next-line react-hooks/rules-of-hooks
    } catch (error) {
      console.error("Error updating preferences:", error);
      alert("Failed to update preferences. Please try again later.");
    }
  };

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
                className={`mx-auto m-auto p-10 w-full max-w-3xl transform overflow-hidden rounded-2xl align-middle shadow-xl transition-all ${
                  theme === "dark" ? "bg-gray-900" : "bg-white"
                }`}
              >
                <Dialog.Title
                  className={`flex justify-center text-2xl font-mono font-bold ${
                    theme === "dark" ? "text-white" : "text-gray-900"
                  }`}
                >
                  Preferences
                </Dialog.Title>
                <div>
                  <p
                    className={`font-mono font-bold ${
                      theme === "dark" ? "text-zinc-200" : "text-gray-700"
                    }`}
                  >
                    Sports
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-1 mt-4">
                    {sports.map((sport) => (
                      <div
                        key={sport.id}
                        className="flex items-center mb-2 accent-blue-700"
                      >
                        <input
                          className="mr-2"
                          onChange={(e) => handleCheckboxChange(e, "sports")}
                          type="checkbox"
                          value={sport.name}
                          checked={
                            selectedPreferences?.sports?.includes(sport.name) ||
                            false
                          }
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
                  <p
                    className={`font-mono font-bold ${
                      theme === "dark" ? "text-zinc-200" : "text-gray-700"
                    }`}
                  >
                    Teams
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-1 mt-4">
                    {teams.map((team) => (
                      <div
                        key={team.id}
                        className="flex items-center mb-2 accent-blue-700"
                      >
                        <input
                          className="mr-2"
                          onChange={(e) => handleCheckboxChange(e, "teams")}
                          type="checkbox"
                          value={team.name}
                          name={team.name}
                          checked={
                            selectedPreferences?.teams?.includes(team.name) ||
                            false
                          }
                        />
                        <p className="text-sm font-mono font-bold text-zinc-500">
                          {team.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex justify-center pt-6">
                  <button
                    onClick={setPreferences}
                    className={` text-zinc-500 font-mono font-bold px-4 py-2 ${
                      theme === "dark"
                        ? "bg-gray-800  hover:bg-gray-700"
                        : "bg-gray-200 hover:bg-gray-300"
                    } rounded-md`}
                  >
                    Apply Preference
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default UserPreferences;
