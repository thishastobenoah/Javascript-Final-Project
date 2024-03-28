import axios from 'axios';
import { Legend } from '../models/Legend';

// Define the structure of the entire API response
interface ApiResponse {
  type: string;
  format: string;
  version: string;
  data: { [key: string]: Legend };
}

export const fetchLegends = async (): Promise<Legend[]> => {
  try {
    // Note the change here to match the ApiResponse interface
    const response = await axios.get<ApiResponse>('https://ddragon.leagueoflegends.com/cdn/9.18.1/data/en_US/champion.json');
    // Now we can correctly access the nested data object and convert it to an array
    return Object.values(response.data.data);
  } catch (error) {
    console.error('Error fetching champions:', error);
    throw error;
  }
};