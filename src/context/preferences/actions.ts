/* eslint-disable @typescript-eslint/no-explicit-any */
import { API_ENDPOINT } from "../../config/constants";
import { SportsAvailableAction } from "../sports/type";
import { TeamsAvailableAction } from "../teams/type";

export const fetchSports = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: SportsAvailableAction.FETCH_SPORTS_REQUEST });
    const response = await fetch(`${API_ENDPOINT}/sports`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch({
      type: SportsAvailableAction.FETCH_SPORTS_SUCCESS,
      payload: data.sports,
    });
  } catch (error) {
    console.log("Error fetching sports:", error);
    dispatch({
      type: SportsAvailableAction.FETCH_SPORTS_FAILURE,
      payload: "Unable to load sports",
    });
  }
};

export const fetchTeams = async (dispatch: any) => {
  const token = localStorage.getItem("authToken") ?? "";

  try {
    dispatch({ type: TeamsAvailableAction.FETCH_TEAMS_REQUEST });
    const response = await fetch(`${API_ENDPOINT}/teams`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();
    dispatch({ type: TeamsAvailableAction.FETCH_TEAMS_SUCCESS, payload: data });
  } catch (error) {
    console.log("Error fetching teams:", error);
    dispatch({
      type: TeamsAvailableAction.FETCH_TEAMS_FAILURE,
      payload: "Unable to load teams",
    });
  }
};
