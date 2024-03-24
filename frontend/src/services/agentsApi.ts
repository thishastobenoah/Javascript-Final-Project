import axios from 'axios';
import { Agent } from '../models/Agent';

export const fetchAgents = async (): Promise<Agent[]> => {
  try {
    const response = await axios.get<{ data: Agent[] }>('https://valorant-api.com/v1/agents');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching agents:', error);
    throw error;
  }
};
