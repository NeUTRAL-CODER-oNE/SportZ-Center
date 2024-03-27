import React, { useEffect, useState } from "react";
import { Articles, ArticlesState } from "../../context/articles/type";
import { useArticlesState } from "../../context/articles/context";
import { Link } from "react-router-dom";
import {
  useSportsDispatch,
  useSportsState,
} from "../../context/sports/context";
import Logo2 from "../../assets/images/sport-news.png";
import { fetchSports } from "../../context/sports/actions";
import { SportsState } from "../../context/sports/type";
import { useTeamsDispatch, useTeamsState } from "../../context/teams/context";
import { TeamsState } from "../../context/teams/type";
import { fetchTeams } from "../../context/teams/actions";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const ArticleListItem: React.FC = () => {
  const articleState: ArticlesState = useArticlesState();
  const {
    articles,
    isLoading: articleLoading,
    isError: articleError,
    errorMessage: articleErrorMessage,
  } = articleState;

  const sportsState: SportsState = useSportsState();
  const {
    sports,
    isLoading: sportLoading,
    isError: sportError,
    errorMessage: sportErrorMessage,
  } = sportsState;

  const teamsState: TeamsState = useTeamsState();
  const {
    teams,
    isLoading: teamsLoading,
    isError: teamError,
    errorMessage: teamErrorMessage,
  } = teamsState;

  const sportsDispatch = useSportsDispatch();
  const teamsDispatch = useTeamsDispatch();

  const [selectedSport, setSelectedSport] = useState<string[]>([]);
  const [selectedTeam, setSelectedTeam] = useState<string[]>([]);

  const handleSportClick = (sportName: string) => {
    setSelectedSport(sportName ? [sportName] : []); // Set to [sportName] if a sport is selected, otherwise set to an empty array
    setSelectedTeam([]); // Reset selectedTeam when changing sports
  };

  const handleTeamClick = (teamName: string) => {
    setSelectedTeam([teamName]);
  };

  useEffect(() => {
    fetchSports(sportsDispatch);
    fetchTeams(teamsDispatch);
  }, [sportsDispatch, teamsDispatch]);

  useEffect(() => {
    const userPreference = localStorage.getItem("userData");
    if (userPreference) {
      const userData = JSON.parse(userPreference);
      const { preferences } = userData;
      if (preferences && preferences.sports && preferences.sports.length > 0) {
        setSelectedSport(preferences.sports);
      }
      if (preferences && preferences.teams && preferences.teams.length > 0) {
        setSelectedTeam(preferences.teams);
      }
    }
  }, []);

  if (articleLoading || sportLoading || teamsLoading) {
    return <div>Loading...</div>;
  }

  if (articleError || sportError || teamError) {
    return (
      <div className="max-w-screen-xl mx-auto">
        {articleErrorMessage || sportErrorMessage || teamErrorMessage}
      </div>
    );
  }

  if (
    !articles ||
    articles.length === 0 ||
    !sports ||
    sports.length === 0 ||
    !teams ||
    teams.length === 0
  ) {
    return <div>No data found.</div>;
  }

  const filteredArticlesBySport = selectedSport.length
    ? articles.filter((article) => selectedSport.includes(article.sport.name))
    : articles;

  let filteredArticlesByTeam = filteredArticlesBySport;

  if (selectedTeam.length) {
    filteredArticlesByTeam = filteredArticlesBySport.filter((article) =>
      article.teams.some((team) => selectedTeam.includes(team.name)),
    );
  }

  const filteredArticles = filteredArticlesByTeam;

  return (
    <>
      <div className="max-w-screen-1xl mx-auto p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center mb-2">
            <div className="flex-shrink-0 ">
              <img className="h-10" src={Logo2} alt="Article" />
            </div>
            <h1 className="font-bold text-4xl p-2">Trending News</h1>
          </div>
          <div className="flex items-center space-x-4">
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold font-mono text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-slate-900 dark:text-zinc-300">
                  Sort By: Sport
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900 max-h-96 overflow-y-auto">
                  <div className="py-1 font-mono font-bold">
                    <Menu.Item>
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          selectedSport.length === 0
                            ? "bg-gray-200 text-gray-900 dark:text-zinc-50"
                            : "text-zinc-500"
                        } dark:bg-slate-900 dark:hover:bg-slate-800`}
                        onClick={() => handleSportClick("")}
                      >
                        All Sports
                      </button>
                    </Menu.Item>
                    {sports &&
                      sports.map((sport) => (
                        <Menu.Item key={sport.id}>
                          <button
                            className={`block w-full text-left px-4 py-2 text-sm ${
                              selectedSport.includes(sport.name)
                                ? "bg-gray-200 text-gray-900 dark:text-zinc-50"
                                : "text-zinc-500"
                            } dark:bg-slate-900 dark:hover:bg-slate-800`}
                            onClick={() => handleSportClick(sport.name)}
                          >
                            {sport.name}
                          </button>
                        </Menu.Item>
                      ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
            <Menu as="div" className="relative inline-block text-left">
              <div>
                <Menu.Button className="inline-flex justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold font-mono text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 dark:bg-slate-900 dark:text-zinc-300">
                  Sort By: Team
                  <ChevronDownIcon
                    className="-mr-1 h-5 w-5 text-gray-400"
                    aria-hidden="true"
                  />
                </Menu.Button>
              </div>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-induration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 z-10 mt-2 w-52 origin-top-right  rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900 max-h-96 overflow-y-auto">
                  <div className="py-1 font-mono font-bold">
                    {selectedSport.length
                      ? teams
                          .filter((team) => team.plays === selectedSport[0])
                          .map((team) => (
                            <Menu.Item key={team.id}>
                              <button
                                className={`block w-full text-left px-4 py-2 text-sm ${
                                  selectedTeam.includes(team.name)
                                    ? "bg-gray-200 text-gray-900 dark:text-zinc-50"
                                    : "text-zinc-500"
                                } dark:bg-slate-900 dark:hover:bg-slate-800`}
                                onClick={() => handleTeamClick(team.name)}
                              >
                                {team.name}
                              </button>
                            </Menu.Item>
                          ))
                      : teams.map((team) => (
                          <Menu.Item key={team.id}>
                            <button
                              className={`block w-full text-left px-4 py-2 text-sm ${
                                selectedTeam.includes(team.name)
                                  ? "bg-gray-200 text-gray-900 dark:text-zinc-50"
                                  : "text-zinc-500"
                              } dark:bg-slate-900 dark:hover:bg-slate-800 hover:bg-gray-200`}
                              onClick={() => handleTeamClick(team.name)}
                            >
                              {team.name}
                            </button>
                          </Menu.Item>
                        ))}
                  </div>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center text-black font-mono font-bold text-xl dark:text-zinc-500 p-48">
            {selectedTeam.length > 0 && selectedSport.length > 0 ? (
              <span>
                No articles available for selected teams:{" "}
                <span className="text-red-500">{selectedTeam.join(", ")}</span>{" "}
                and selected sports:{" "}
                <span className="text-red-500">{selectedSport.join(", ")}</span>
              </span>
            ) : selectedTeam.length > 0 ? (
              <span>
                No articles available for selected teams:{" "}
                <span className="text-red-500">{selectedTeam.join(", ")}</span>
              </span>
            ) : selectedSport.length > 0 ? (
              <span>
                No articles available for selected sport:{" "}
                <span className="text-red-500">{selectedSport.join(", ")}</span>
              </span>
            ) : (
              "No articles available"
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 sm:grid-cols-2 gap-10">
            {filteredArticles.map((article: Articles) => (
              <div
                key={article.id}
                className="relative overflow-hidden rounded-xl dark:bg-slate-900 bg-slate-100"
              >
                <div className="image-container">
                  <img
                    className="w-full h-44 object-cover rounded-lg"
                    src={article.thumbnail}
                    alt={article.title}
                  />
                </div>
                <div className="flex flex-col justify-between p-4 leading-normal h-full">
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <p className="font-mono text-md font-normal text-gray-900 dark:text-zinc-50">
                        {article.sport.name}
                      </p>
                      <p className="font-mono text-md font-normal opacity-75 text-black dark:text-zinc-50">
                        {new Date(article.date).toLocaleDateString("en-US", {
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <h4 className="mb-2 text-l font-bold text-justify tracking-tight text-gray-900 dark:text-zinc-50">
                      {article.title}
                    </h4>
                    <p className="mb-3 font-normal text-justify text-gray-700 dark:text-gray-300">
                      {article.summary}
                    </p>
                  </div>
                  <div style={{ paddingTop: "2em" }}>
                    <Link
                      key={article.id}
                      to={`/article/${article.id}`}
                      className="absolute bottom-0 left-0 w-full text-center font-mono dark:text-zinc-50 text-white px-4 py-2 rounded-md bg-gray-700 hover:bg-gray-800"
                    >
                      Read More...
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default ArticleListItem;
