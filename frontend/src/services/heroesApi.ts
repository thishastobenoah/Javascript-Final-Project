import axios from 'axios';
import { Hero } from '../models/Hero'

export const fetchHeroes = async (): Promise<Hero[]> => {
  try {
    const response = await axios.get<{ [key: string]: Hero }>('https://api.heroesprofile.com/openApi/Heroes');
    return Object.values(response.data);
  } catch (error) {
    console.error('Error fetching heroes:', error);
    throw error;
  }
};
