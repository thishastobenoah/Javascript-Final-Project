import axios from 'axios';
import { Agent } from '../models/Agent';

export const fetchAgents = async (): Promise<Agent[]> => {
  try {
    const response = await axios.get('https://valorant-api.com/v1/agents');
    if (!Array.isArray(response.data.data)) {
      throw new Error('Expected an array of agents, but did not receive one.');
    }
    return response.data.data;
  } catch (error) {
    console.error('Error fetching agents:', error);
    throw error;
  }
};