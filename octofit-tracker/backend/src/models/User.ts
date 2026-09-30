import { Schema, model } from 'mongoose';

const userSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    teamName: { type: String, required: true },
    profile: {
      age: { type: Number, required: true },
      fitnessGoal: { type: String, required: true },
      preferredActivity: { type: String, required: true },
    },
  },
  { timestamps: true, collection: 'users' },
);

export const User = model('User', userSchema);