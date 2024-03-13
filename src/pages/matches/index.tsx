import { useEffect } from "react";
import MatchesListItems from "./MatchesListItems";
import { fetchMatches } from "../../context/matches/actions";
import { useMatchesDispatch } from "../../context/matches/context";

const Matches = () => {
  const MatchesDispatch = useMatchesDispatch();

  useEffect(() => {
    fetchMatches(MatchesDispatch);
  }, [MatchesDispatch]);

  return (
    <div className="w-full dark:bg-black">
      <MatchesListItems match={{
        id: 0,
        name: "",
        location: "",
        sportName: "",
        isRunning: false,
        score: undefined,
        teams: [],
        playingTeam: undefined
      }} onClick={function (): void {
        throw new Error("Function not implemented.");
      } } />
    </div>
  );
};

export default Matches;
