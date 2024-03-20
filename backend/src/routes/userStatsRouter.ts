import express, { Router } from 'express';
import { getClient } from '../db';
import { ObjectId } from 'mongodb';
import UserStats from '../models/UserStats';

const userStatsRouter = express.Router();

const errorResponse = (error: any, res: any) => {
  console.error('FAIL', error);
  res.status(500).json({ message: 'Internal Server Error' });
};
userStatsRouter.get('/find/:id', async (req, res) => {
    try {
      const client = await getClient();
      const _id = new ObjectId(req.params.id); // make sure to wrap _id values in new ObjectId
  
      const result = await client.db().collection<UserStats>('userstats').findOne({ _id: _id });
  
      if (result) {
        res.json(result);
      } else {
        res.status(404).send('stats not found');
      }
    } catch (error) {
      errorResponse(error, res)
    }
  });

  userStatsRouter.post('/', async (req, res) => {
    try {
      const client = await getClient();
      const userStats = req.body as UserStats;
  
      if (!userStats.kills || !userStats.deaths) {
        res.status(400).json({ message: "Must provide Kills and Deaths" })
        return
      }
  
      const result = await client.db().collection<UserStats>('userstats').insertOne(userStats);
  
      res.status(201).json({ _id: result.insertedId, ...userStats });
    } catch (error) {
      errorResponse(error, res)
    }
  });
  userStatsRouter.put('/:id', async (req, res) => {
    try {
      const client = await getClient();
      const _id = new ObjectId(req.params.id);
      const userStats = req.body as UserStats;
  
      const result = await client.db().collection<UserStats>('userstats').replaceOne({ _id: _id }, userStats);
  
      if (result.matchedCount && result.modifiedCount) {
        res.json({ _id: _id, ...userStats });
      } else {
        res.status(404).send('K/D not found');
      }
    } catch (error) {
      errorResponse(error, res)
    }
  });