import axios from 'axios';
import { ValorantAgent } from '../models/Agent';

export const fetchAgents = async (): Promise<ValorantAgent[]> => {
  try {
    const response = await axios.get<{ data: ValorantAgent[] }>('https://valorant-api.com/v1/agents');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching agents:', error);
    throw error;
  }
};
