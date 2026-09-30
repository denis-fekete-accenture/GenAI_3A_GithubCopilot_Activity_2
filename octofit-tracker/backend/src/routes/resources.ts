import { Router } from 'express';
import type { Model } from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

type ResourceName = 'users' | 'teams' | 'activities' | 'leaderboard' | 'workouts';

const resources: Record<ResourceName, Model<any>> = {
  users: User,
  teams: Team,
  activities: Activity,
  leaderboard: LeaderboardEntry,
  workouts: Workout,
};

export function createResourceRouter(resourceName: ResourceName) {
  const router = Router();

  router.get('/', async (_request, response, next) => {
    try {
      const data = await resources[resourceName].find().lean();
      response.json({ data });
    } catch (error) {
      next(error);
    }
  });

  return router;
}