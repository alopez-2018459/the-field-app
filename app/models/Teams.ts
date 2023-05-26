import { Document, Schema, model, models} from "mongoose";


export interface ITeams extends Document{
    name: string;
    description: string;
    sport: string;
    location: string;
    athletes: string;
    coach: string;
    achievements: string;
    organization: string;
}

const TeamsSchema = new Schema<ITeams>({
    name: {
        type: String,
        required: [true, "Organizations name is required."],
        maxlength: [50, "Name must not exceed 50 characters."],
      },
      description: {
        type: String,
        required: [true, "Teams description is required."],
        maxlength: [250, "Description must not exceed 250 characters."],
      },
      sport: {
        type: String,
        required: [true, "Organizations email is required."],
        maxlength: [50, "Sport must not exceed 50 characters."],
      },
      location: {
        type: String,
        required: [true, "Organizations location is required."],
        maxlength: [100, "Location must not exceed 100 characters."],
      },
      athletes: {
      type:String,
      required: [true, "Teams athletes is required"],
      maxlength: [50, "Athletes must not exceed 50 characters."],
      },
      coach: {
      type:String,
      required: [true, "Coach is required"],
      maxlength: [50, "Coach must not exceed 50 characters."],
      },
      achievements: {
      type:String,
      required: [true, "Achievements is required"],
      maxlength: [50, "Achievements must not exceed 50 characters."],
      },
      organization: {
      type:String,
      required: [true, "Organization is required"],
      maxlength: [50, "Organization must not exceed 50 characters."],
      }
});

const Teams = 
  models.Teams ||
  model<ITeams>("Teams", TeamsSchema);

export default Teams;