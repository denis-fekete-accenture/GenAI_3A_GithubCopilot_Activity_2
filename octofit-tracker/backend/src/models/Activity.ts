import { Schema, model } from 'mongoose';

const activitySchema = new Schema(
  {
    userName: { type: String, required: true },
    teamName: { type: String, required: true },
    type: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    caloriesBurned: { type: Number, required: true },
    activityDate: { type: Date, required: true },
  },
  { timestamps: true, collection: 'activities' },
);

export const Activity = model('Activity', activitySchema);