import axios from 'axios';
import { Legend } from '../models/Legend'

export const fetchLegends = async (): Promise<Legend[]> => {
  try {
    const response = await axios.get<{ [key: string]: Legend }>('https://ddragon.leagueoflegends.com/cdn/9.18.1/data/en_US/champion.json');
    return Object.values(response.data);
  } catch (error) {
    console.error('Error fetching champions:', error);
    throw error;
  }
};