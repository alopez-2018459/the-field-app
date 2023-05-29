import { Document, Schema, model, models} from "mongoose";
import { IOrganization } from "./Organizations";

export interface ITeams extends Document{
    name: string;
    description: string;
    sport: string;
    location: string;
    athletes: string;
    coach: string;
    achievements: string;
    org: IOrganization["_id"];
}

const TeamsSchema = new Schema<ITeams>({
    name: {
        type: String,
        required: [true, "Teams name is required."],
        maxlength: [50, "Name must not exceed 50 characters."],
      },
      description: {
        type: String,
        required: [true, "Teams description is required."],
        maxlength: [250, "Description must not exceed 250 characters."],
      },
      sport: {
        type: String,
        required: [true, "Teams sport is required."],
        maxlength: [50, "Sport must not exceed 50 characters."],
      },
      location: {
        type: String,
        required: [true, "Teams location is required."],
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
      org: {
      type: Schema.Types.ObjectId,
      ref: "Organization",
      required: [true, "Organization is required"],
      }
});


const Organization = models.Organization || model<IOrganization>("Organization");
const Teams = 
  models.Teams ||
  model<ITeams>("Teams", TeamsSchema);

export default Teams;