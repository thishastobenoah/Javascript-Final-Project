import axios from 'axios';
import { Champion } from '../models/League'

export const fetchChampions = async (): Promise<Champion[]> => {
  try {
    const response = await axios.get<{ [key: string]: Champion }>('https://ddragon.leagueoflegends.com/cdn/9.18.1/data/en_US/champion.json');
    return Object.values(response.data);
  } catch (error) {
    console.error('Error fetching champions:', error);
    throw error;
  }
};