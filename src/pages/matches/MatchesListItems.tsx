import React, { useEffect } from 'react';
import { fetchMatches } from '../../context/matches/actions';
import { useMatchesDispatch, useMatchesState } from '../../context/matches/context';
import { Matches } from '../../context/matches/type';
import { Link } from "react-router-dom";
import Logo from "../../assets/images/live_2009767.png";

const MatchListItems: React.FC<{ match: Matches; onClick: () => void }> = ({
  onClick,
}) => {
  const state = useMatchesState();
  const { matches, isLoading, isError, errorMessage } = state;
  const matchesDispatch = useMatchesDispatch();

  useEffect(() => {
    fetchMatches(matchesDispatch);
  }, [matchesDispatch]);

  // Function to handle refreshing matches
  const handleRefresh = () => {
    fetchMatches(matchesDispatch);
  };

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>{errorMessage}</span>;
  }

  // Filter live matches
  const runningMatches = matches.filter((match: Matches) => match.isRunning);

  // Filter recent matches (not running)
  const recentMatches = matches.filter((match: Matches) => !match.isRunning);

  return (
    <>
      <div className="container mx-auto px-2 lg:px-2">
        <div className="pr-4 flex justify-between items-center">
          <div className="flex items-center">
          <div className="flex-shrink-0">
                  <img className="h-12" src={Logo} alt="SportZ-Center" />
                </div>            
                <h1 className='font-bold text-4xl p-4' style={{ fontFamily: 'Roboto, sans-serif' }}>Matches</h1>
          </div>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50"
            onClick={handleRefresh}
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="container mx-auto px-2 lg:px-2">
        <div className="flex gap-2 pb-1 rounded-l-md px-2">
          {runningMatches.map((match: Matches) => (
            <div
              key={match.id}
              className="relative overflow-hidden rounded-xl transform transition-all hover:-translate-y-2 duration-300 hover:shadow-2xl dark:bg-gray-900"
              onClick={onClick}
            >
              <Link key={match.id} to={`/matches/${match.id}`} className="block">
                <div className="flex-shrink-0 bg-white p-3 rounded-md text-black dark:bg-black dark:text-white border dark:border-white ">
                  <div>
                    <h2 className="text-base font-bold my-1">{match.teams.map((team, index) => (
                      <React.Fragment key={team.id}>
                        {index > 0 && <span className="text-blue-500"> vs </span>}
                        {team.name}
                      </React.Fragment>
                    ))}</h2>
                    <p className="text-sm text-slate-500">
                      Location: {match.location}
                    </p>
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
          <h1 className='font-bold text-xl p-4'>Recent Matches</h1>
        </div>
      </div>

      <div className="container mx-auto px-2 lg:px-2 overflow-auto">
        <div className="flex gap-2 pb-1 rounded-l-md px-2">
          {recentMatches.map((match: Matches) => (
            <div key={match.id} className="flex-shrink-0 bg-white p-3 rounded-md text-black dark:bg-black dark:text-white border dark:border-white">
              <div>
                <h2 className="text-base font-bold my-1">{match.teams.map((team, index) => (
                  <React.Fragment key={team.id}>
                    {index > 0 && <span className="text-blue-500"> vs </span>}
                    {team.name}
                  </React.Fragment>
                ))}</h2>
                <p className="text-sm text-slate-500">
                  Location: {match.location}
                </p>
                <p className="text-sm text-slate-500">
                  Sport: {match.sportName}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default MatchListItems;
