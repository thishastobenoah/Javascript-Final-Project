import axios from "axios";
import { UserStatsResponse } from "../models/UserStatsResponse";

const BASE_URL = process.env.REACT_APP_API_URL;

export function getUserStatsByUserId(userId: string): Promise<UserStatsResponse[]> {
  return axios
    .get<UserStatsResponse[]>(`${BASE_URL}/userStats/byUser/${userId}`)
    .then(response => response.data)
    .catch(error => {
      console.error("Error fetching user stats:", error);
      throw error;
    });
}

export function saveHeroStats({
  userId,
  characterName,
  kills,
  deaths,
}: {
  userId: string;
  characterName: string;
  kills: number;
  deaths: number;
}): Promise<void> { 
  return axios
    .post(`${BASE_URL}/heroStats`, {
      userId,
      characterName,
      kills,
      deaths,
    })
    .then(response => response.data)
    .catch(error => {
      console.error("Error saving hero stats:", error);
      throw error;
    });
}