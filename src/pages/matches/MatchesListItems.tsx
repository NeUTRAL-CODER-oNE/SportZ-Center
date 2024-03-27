import React, { useEffect, useState } from "react";
import { useMatchesState } from "../../context/matches/context";
import { Matches, MatchesState } from "../../context/matches/type";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/live_2009767.png";
import { MapPinIcon } from "@heroicons/react/20/solid";

const MatchesListItems: React.FC = () => {
  const state: MatchesState = useMatchesState();
  const { matches, isLoading, isError, errorMessage } = state;

  const [selectedSports, setSelectedSports] = useState<string[]>([]);
  const [selectedTeams, setSelectedTeams] = useState<string[]>([]);

  useEffect(() => {
    const userPreference = localStorage.getItem("userData");
    if (userPreference) {
      const userData = JSON.parse(userPreference);
      const { preferences } = userData;
      if (preferences.sports && preferences.sports.length > 0) {
        setSelectedSports(preferences.sports);
      }
      if (preferences.teams && preferences.teams.length > 0) {
        setSelectedTeams(preferences.teams);
      }
    }
  }, []);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  let filteredMatches = matches;

  if (selectedSports.length > 0 || selectedTeams.length > 0) {
    filteredMatches = matches.filter((match: Matches) => {
      const sportSelected = selectedSports.includes(match.sportName);
      const teamsSelected = match.teams.some((team) =>
        selectedTeams.includes(team.name),
      );
      return sportSelected || teamsSelected;
    });
  }

  const runningMatches = filteredMatches.filter(
    (match: Matches) => match.isRunning,
  );
  const recentMatches = filteredMatches.filter(
    (match: Matches) => !match.isRunning,
  );

  return (
    <>
      <div className="max-w-screen-1xl mx-auto p-5">
        <div className="flex items-center mb-2">
          <div className="flex-shrink-0 ">
            <img className="h-10" src={Logo} alt="Live Match" />
          </div>
          <h1 className="font-bold text-4xl p-2 ">Matches</h1>
        </div>

        {/* Running Matches */}
        <div className=" pt-4">
          <div className="flex gap-2 pb-1 rounded-l-md px-2">
            {runningMatches.map((match: Matches) => (
              <div
                key={match.id}
                className="relative overflow-hidden rounded-xl transform transition-all hover:-translate-y-2 duration-300 hover:shadow-2xl dark:bg-gray-900"
              >
                <Link
                  key={match.id}
                  to={`/match/${match.id}`}
                  className="block"
                >
                  <div className="flex-shrink-0 p-3 rounded-md text-black dark:text-white border dark:border-white dark:bg-slate-900 bg-slate-100">
                    <div>
                      <h2 className="font-mono text-base font-bold my-1">
                        {match.teams.map((team, index) => (
                          <React.Fragment key={team.id}>
                            {index > 0 && (
                              <span className="text-blue-500"> vs </span>
                            )}
                            {team.name}
                          </React.Fragment>
                        ))}
                      </h2>
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 text-gray-400 mr-1" />
                        <p className="text-sm text-slate-500">
                          Location: {match.location}
                        </p>
                      </div>
                      <p className="text-sm text-slate-500">
                        Sport: {match.sportName}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {runningMatches.length === 0 && (
            <div className="flex items-center justify-center text-center text-black font-mono font-bold text-xl dark:text-zinc-500 p-5">
              {selectedTeams.length > 0 && selectedSports.length > 0 ? (
                <span>
                  No Live matches available for selected teams:{" "}
                  <span className="text-red-500">
                    {selectedTeams.join(", ")}
                  </span>{" "}
                  and selected sports:{" "}
                  <span className="text-red-500">
                    {selectedSports.join(", ")}
                  </span>
                </span>
              ) : selectedTeams.length > 0 ? (
                <span>
                  No Live matches available for selected teams:{" "}
                  <span className="text-red-500">
                    {selectedTeams.join(", ")}
                  </span>
                </span>
              ) : selectedSports.length > 0 ? (
                <span>
                  No Live matches available for selected sport:{" "}
                  <span className="text-red-500">
                    {selectedSports.join(", ")}
                  </span>
                </span>
              ) : (
                "No matches available"
              )}
            </div>
          )}
        </div>

        {/* Recent Matches */}
        <div className="flex items-center mb-2 mx-auto px-2 lg:px-2 mt-4">
          <h1 className="font-bold text-xl  ">Recent Matches</h1>
        </div>

        <div className=" overflow-auto">
          <div className="flex gap-2 pb-1 rounded-l-md px-2">
            {recentMatches.map((match: Matches) => (
              <div
                key={match.id}
                className="flex-shrink-0 p-3 rounded-md text-black dark:text-white border dark:border-white dark:bg-slate-900 hover:shadow-2xl bg-slate-100"
              >
                <Link
                  key={match.id}
                  to={`/match/${match.id}`}
                  className="block"
                >
                  <div>
                    <h2 className="font-mono text-base font-bold my-1">
                      {match.teams.map((team, index) => (
                        <React.Fragment key={team.id}>
                          {index > 0 && (
                            <span className="text-blue-500"> vs </span>
                          )}
                          {team.name}
                        </React.Fragment>
                      ))}
                    </h2>
                    <div className="flex items-center justify-center">
                      <MapPinIcon className="w-4 h-4 text-gray-400 mr-1" />
                      <p className="text-sm text-slate-500">
                        Location: {match.location}
                      </p>
                    </div>
                    <p className="text-sm text-slate-500 justify-center">
                      Sport: {match.sportName}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </div>

          {recentMatches.length === 0 && (
            <div className="flex justify-center text-center text-black font-mono font-bold text-xl dark:text-zinc-500 p-5">
              {selectedTeams.length > 0 && selectedSports.length > 0 ? (
                <span>
                  No matches available for selected teams:{" "}
                  <span className="text-red-500">
                    {selectedTeams.join(", ")}
                  </span>{" "}
                  and selected sports:{" "}
                  <span className="text-red-500">
                    {selectedSports.join(", ")}
                  </span>
                </span>
              ) : selectedTeams.length > 0 ? (
                <span>
                  No matches available for selected teams:{" "}
                  <span className="text-red-500">
                    {selectedTeams.join(", ")}
                  </span>
                </span>
              ) : selectedSports.length > 0 ? (
                <span>
                  No matches available for selected sport:{" "}
                  <span className="text-red-500">
                    {selectedSports.join(", ")}
                  </span>
                </span>
              ) : (
                "No matches available"
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default MatchesListItems;
