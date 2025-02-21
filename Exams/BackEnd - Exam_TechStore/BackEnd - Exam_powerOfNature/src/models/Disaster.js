import { Schema, model, Types } from "mongoose";

const disasterSchema = new Schema({
    disasterName: { type: String, required: [true, 'Name is required!'], minLength: 2 },
    disasterType: {
        type: String,
        required: [true, 'Type is required!'],
        enum: ["Wildfire", "Flood", "Earthquake", "Hurricane", "Drought", "Tsunami", "Other"],
        message: "Disaster type must be one of: Wildfire, Flood, Earthquake, Hurricane, Drought, Tsunami, Other"
    },
    year: { type: Number, required: [true, 'Year is required!'], min: 0, max: 2024 },
    location: { type: String, required: [true, 'Location is required!'], minLength: 3 },
    image: { type: String, required: [true, 'Image is required!'], match: /^https?:\/\// },
    description: { type: String, required: [true, 'Description is required!'], min: 10 },
    interestedList: [{
        type: Types.ObjectId,
        ref: 'User'
    }],
    owner: {
        type: Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: true });

const Disaster = model('Disaster', disasterSchema);

export default Disaster;