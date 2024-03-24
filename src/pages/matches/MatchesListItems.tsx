import React from "react";
import { useMatchesState } from "../../context/matches/context";
import { Matches, MatchesState } from "../../context/matches/type";
import { Link } from "react-router-dom";
import Logo from "../../assets/images/live_2009767.png";
import { MapPinIcon } from "@heroicons/react/20/solid";

const MatchesListItems: React.FC = () => {
  const state: MatchesState = useMatchesState();
  const { matches, isLoading, isError, errorMessage } = state;

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  const runningMatches = matches.filter((match: Matches) => match.isRunning);
  const recentMatches = matches.filter((match: Matches) => !match.isRunning);

  return (
    <>
      <div className="max-w-screen-xl mx-auto p-5">
        <div className="container mx-auto px-2 lg:px-2">
          <div className="pr-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <img className="h-12" src={Logo} alt="Live Match" />
              </div>
              <h1
                className="font-bold text-4xl p-2"
                style={{ fontFamily: "Roboto" }}
              >
                Matches
              </h1>
            </div>
          </div>
        </div>

        <div className="max-w-screen-xl mx-auto p-5">
          <div className="flex gap-2 pb-1 rounded-l-md px-2 ">
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
                  <div className="flex-shrink-0 bg-white p-3 rounded-md text-black dark:bg-black dark:text-white border dark:border-white ">
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
        </div>

        <div className="container mx-auto px-2 lg:px-2 mt-4">
          <div className="pr-4 flex justify-between items-center">
            <h1 className="font-bold text-xl p-4">Recent Matches</h1>
          </div>
        </div>

        <div className="container mx-auto px-2 lg:px-2 overflow-auto">
          <div className="flex gap-2 pb-1 rounded-l-md px-2 ">
            {recentMatches.map((match: Matches) => (
              <div
                key={match.id}
                className="flex-shrink-0 bg-white p-3 rounded-md text-black dark:bg-black dark:text-white border dark:border-white hover:shadow-2xl "
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
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default MatchesListItems;
