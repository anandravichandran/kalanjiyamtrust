import mongoose from "mongoose";

// Sub-schema for members information
const memberSchema = new mongoose.Schema({
    name: { type: String, required: false },
    designation: { type: String, required: false },
    degree: { type: String, required: false },
    image: { type: String, required: false },
    standings: { type: Number, required: false, default: 0 }
});

// Sub-schema for events
const eventSchema = new mongoose.Schema({
    title: { type: String, required: false },
    description: { type: String, required: false },
    location: { type: String, required: false },
    date: { type: String, required: false },
    time: { type: String, required: false },
    image: { type: String, required: false }
});

// Main admin schema
const adminSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: {
                validator: function (v) {
                    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
                },
                message: (props) => `${props.value} is not a valid email!`
            }
        },
        password: {
            type: String,
            required: true,
            minlength: 8
        },
        carouselImages: {
            type: [String], // Specify that this is an array of strings
            default: []
        },
        membesrsInformation: {
            type: [memberSchema],
            default: []
        },
        events: {
            type: [eventSchema],
            default: []
        }
    },
    { timestamps: true }
);



const adminModel = mongoose.model("Admin", adminSchema);

export default adminModel;
