import { UserStatsResponse } from "../models/UserStatsResponse";
import axios from "axios";


export function getUserStats(id: number): Promise<UserStatsResponse>{
    return axios
    .get<UserStatsResponse>("${id}") //TODO - insert url for backend here 
    .then((response) => {
        return response.data;
    })
}
