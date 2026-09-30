import { Schema, model } from 'mongoose';

const workoutSchema = new Schema(
  {
    title: { type: String, required: true },
    focusArea: { type: String, required: true },
    difficulty: { type: String, required: true },
    durationMinutes: { type: Number, required: true },
    recommendedFor: [{ type: String, required: true }],
    steps: [{ type: String, required: true }],
  },
  { timestamps: true, collection: 'workouts' },
);

export const Workout = model('Workout', workoutSchema);