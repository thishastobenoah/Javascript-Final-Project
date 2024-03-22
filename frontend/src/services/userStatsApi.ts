import { UserStatsResponse } from "../models/UserStatsResponse";
import axios from "axios";


// export function getUserStats(id: number): Promise<UserStatsResponse>{
//     return axios
//     .get<UserStatsResponse>("${id}") //TODO - insert url for backend here 
//     .then((response) => {
//         return response.data;
//     })
// }

const BASE_URL = process.env.REACT_APP_API_URL;

export function getUserStats(id: number): Promise<UserStatsResponse> {
  return axios
    .get<UserStatsResponse>(`${BASE_URL}/userstats/${id}`) // Replace '/userstats/${id}' with your actual endpoint
    .then((response) => response.data)
    .catch((error) => {
      console.error("Error fetching user stats:", error);
      throw error;
    });
}
