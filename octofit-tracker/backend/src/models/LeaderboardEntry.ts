import { Schema, model } from 'mongoose';

const leaderboardEntrySchema = new Schema(
  {
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    rank: { type: Number, required: true },
    totalMinutes: { type: Number, required: true },
    totalCalories: { type: Number, required: true },
    points: { type: Number, required: true },
  },
  { timestamps: true, collection: 'leaderboard' },
);

export const LeaderboardEntry = model('LeaderboardEntry', leaderboardEntrySchema);