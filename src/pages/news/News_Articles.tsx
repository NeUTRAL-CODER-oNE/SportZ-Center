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

const News_Articles: React.FC = () => {
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

  const [selectedSport, setSelectedSport] = useState<string>("");
  const [selectedTeam, setSelectedTeam] = useState<string>("");

  const handleSportClick = (sportName: string) => {
    setSelectedSport(sportName);
    setSelectedTeam("");
  };

  const handleTeamClick = (teamName: string) => {
    setSelectedTeam(teamName);
  };

  useEffect(() => {
    fetchSports(sportsDispatch);
    fetchTeams(teamsDispatch);
  }, [sportsDispatch, teamsDispatch]);

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

  const filteredArticlesBySport = selectedSport
    ? articles.filter((article) => article.sport.name === selectedSport)
    : articles;

  let filteredArticlesByTeam = filteredArticlesBySport;

  if (selectedTeam !== "") {
    filteredArticlesByTeam = filteredArticlesByTeam.filter(
      (article) =>
        Array.isArray(article.teams) &&
        article.teams.some((team) => team.name === selectedTeam),
    );
  }

  const filteredArticles = filteredArticlesByTeam;

  return (
    <>
      <div className="max-w-screen-1xl mx-10 p-5 flex justify-between items-center">
        <div className="flex justify-center items-center mb-2">
          <div className="flex-shrink-0">
            <img className="h-10" src={Logo2} alt="Article" />
          </div>
          <h1 className="font-bold text-4xl p-2">News</h1>
        </div>

        <div className="flex justify-between mb-2">
          <Menu as="div" className="relative inline-block text-left pr-8">
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
                        selectedSport === ""
                          ? "bg-gray-200 text-gray-900 dark:text-zinc-50"
                          : "text-zinc-500"
                      } dark:bg-slate-900 dark:hover:bg-slate-800`}
                      onClick={() => handleSportClick("")}
                    >
                      All Sports
                    </button>
                  </Menu.Item>
                  {sports.map((sport) => (
                    <Menu.Item key={sport.id}>
                      <button
                        className={`block w-full text-left px-4 py-2 text-sm ${
                          selectedSport === sport.name
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
              <Menu.Items className="absolute right-0 z-10 mt-2 w-52 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-gray-900 max-h-96 overflow-y-auto">
                <div className="py-1 font-mono font-bold">
                  {selectedSport
                    ? teams
                        .filter((team) => team.plays === selectedSport)
                        .map((team) => (
                          <Menu.Item key={team.id}>
                            <button
                              className={`block w-full text-left px-4 py-2 text-sm ${
                                selectedTeam === team.name
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
                              selectedTeam === team.name
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

      {filteredArticlesBySport.length === 0 && selectedSport && (
        <div className="text-black font-mono font-bold text-sm dark:text-zinc-500">
          No articles available for Sport{" "}
          <span className="text-red-500">{selectedSport}</span>{" "}
        </div>
      )}

      {filteredArticlesByTeam.length === 0 && selectedTeam && (
        <div className="text-black font-mono font-bold text-sm dark:text-zinc-500">
          No articles available for team{" "}
          <span className="text-red-500">{selectedTeam}</span>{" "}
        </div>
      )}

      <div className="max-w-screen-1xl mx-auto p-5">
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mx-10">
          {filteredArticles.map((article: Articles) => (
            <div
              key={article.id}
              className="relative overflow-hidden rounded-xl dark:bg-slate-900 bg-slate-200"
            >
              <div className="image-container">
                <img
                  className="w-full h-52 object-cover rounded-lg"
                  src={article.thumbnail}
                  alt={article.title}
                />
              </div>
              <div className="flex flex-col justify-between p-4 leading-normal h-full">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <p className="font-mono font-normal text-gray-900 dark:text-zinc-50">
                      {article.sport.name}
                    </p>
                    <p className="font-mono font-normal opacity-75 text-black dark:text-zinc-50">
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
      </div>
    </>
  );
};

export default News_Articles;
