import { Document, Schema, model, models} from "mongoose";

// Interface for Notification document
export interface IEvent extends Document{
    name: string;
    description?: string;
    location?: string;
    date: Date;
    sport: string;
}

// Mongoose schema for Notification
const EventSchema = new Schema<IEvent>({
    name: {
        type: String,
        required: [true, "Event name is required."],
        maxlength: [50, "Name must not exceed 50 characters."],
      },
    description: {
        type: String,
        required: [true, "Event description is required."],
        maxlength: [250, "Description must not exceed 250 characters."],
      },
    location: {
        type: String,
        required: [true, "Event location is required."],
        maxlength: [100, "Location must not exceed 100 characters."],
      },
    date: {
        type: Date,
        required: [true, "Event date is required. "],
        maxlength: [30, "Date must not exceed 30 characterters."],
    },
    sport: {
        type: String,
    required: [true, "Organizations email is required."],
    maxlength: [50, "Sport must not exceed 50 characters."],
    },
})
    
// Create and export the Notification model
const Event = 
models.Event ||
model<IEvent>("Event", EventSchema);

export default Event;