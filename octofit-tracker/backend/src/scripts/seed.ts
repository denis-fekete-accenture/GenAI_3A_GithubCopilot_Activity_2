import mongoose from 'mongoose';
import { Activity, LeaderboardEntry, Team, User, Workout } from '../models/index.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

const users = [
  {
    username: 'mroberts',
    firstName: 'Maya',
    lastName: 'Roberts',
    email: 'maya.roberts@example.com',
    teamName: 'Velocity Vibe',
    profile: { age: 31, fitnessGoal: 'Run a spring half marathon', preferredActivity: 'Running' },
  },
  {
    username: 'jchen',
    firstName: 'Jordan',
    lastName: 'Chen',
    email: 'jordan.chen@example.com',
    teamName: 'Core Crushers',
    profile: { age: 27, fitnessGoal: 'Build strength and mobility', preferredActivity: 'Strength training' },
  },
  {
    username: 'aparker',
    firstName: 'Avery',
    lastName: 'Parker',
    email: 'avery.parker@example.com',
    teamName: 'Stride Squad',
    profile: { age: 36, fitnessGoal: 'Improve daily consistency', preferredActivity: 'Cycling' },
  },
];

const teams = [
  {
    name: 'Velocity Vibe',
    mascot: 'Lightning Bolt',
    city: 'Atlanta',
    members: ['mroberts'],
    weeklyGoalMinutes: 720,
  },
  {
    name: 'Core Crushers',
    mascot: 'Kettlebell',
    city: 'Austin',
    members: ['jchen'],
    weeklyGoalMinutes: 600,
  },
  {
    name: 'Stride Squad',
    mascot: 'Trail Marker',
    city: 'Denver',
    members: ['aparker'],
    weeklyGoalMinutes: 840,
  },
];

const activities = [
  {
    userName: 'mroberts',
    teamName: 'Velocity Vibe',
    type: 'Running',
    durationMinutes: 48,
    caloriesBurned: 455,
    activityDate: new Date('2026-09-22T12:30:00Z'),
  },
  {
    userName: 'jchen',
    teamName: 'Core Crushers',
    type: 'Strength training',
    durationMinutes: 55,
    caloriesBurned: 390,
    activityDate: new Date('2026-09-23T18:00:00Z'),
  },
  {
    userName: 'aparker',
    teamName: 'Stride Squad',
    type: 'Cycling',
    durationMinutes: 72,
    caloriesBurned: 610,
    activityDate: new Date('2026-09-24T13:15:00Z'),
  },
];

const leaderboard = [
  { userName: 'aparker', teamName: 'Stride Squad', rank: 1, totalMinutes: 310, totalCalories: 2380, points: 920 },
  { userName: 'mroberts', teamName: 'Velocity Vibe', rank: 2, totalMinutes: 285, totalCalories: 2210, points: 870 },
  { userName: 'jchen', teamName: 'Core Crushers', rank: 3, totalMinutes: 245, totalCalories: 1905, points: 790 },
];

const workouts = [
  {
    title: 'Tempo Builder Run',
    focusArea: 'Cardio endurance',
    difficulty: 'Intermediate',
    durationMinutes: 45,
    recommendedFor: ['Running', 'Half marathon training'],
    steps: ['Warm up for 10 minutes', 'Run 20 minutes at tempo pace', 'Cool down for 15 minutes'],
  },
  {
    title: 'Total Body Strength Circuit',
    focusArea: 'Strength',
    difficulty: 'Beginner',
    durationMinutes: 35,
    recommendedFor: ['Strength training', 'Mobility'],
    steps: ['Complete bodyweight squats', 'Alternate pushups and rows', 'Finish with core holds'],
  },
  {
    title: 'Hill Climb Ride',
    focusArea: 'Cycling power',
    difficulty: 'Advanced',
    durationMinutes: 60,
    recommendedFor: ['Cycling', 'Power intervals'],
    steps: ['Spin easy for 15 minutes', 'Complete 6 hill intervals', 'Recover with a steady ride home'],
  },
];

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);

    console.log('Connected to octofit_db');
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    await User.insertMany(users);
    await Team.insertMany(teams);
    await Activity.insertMany(activities);
    await LeaderboardEntry.insertMany(leaderboard);
    await Workout.insertMany(workouts);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
