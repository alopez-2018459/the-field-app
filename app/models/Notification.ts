import { Document, Schema, model, models } from "mongoose";

// Interface for User document
export interface IUser extends Document {
  recipient: string;
  sender: string;
  type: string;
  updatedAt: Date;
}

// Mongoose schema for User
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Remove leading/trailing whitespaces
      minlength: 3, // Minimum length of 3 characters
      maxlength: 20, // Maximum length of 20 characters
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false }
);

// Create and export the User model
const User = models.User || model<IUser>("User", UserSchema);

export default User;
