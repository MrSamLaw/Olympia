const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
    day: {
        type: Date,
        default: () => Date.now();
    },
    exercises: [
        {
            type: {
                type: String,
                trin: true,
                required: true
            },
            length: {
                type: Number,
                default: 0,
                allowNull: true
            },
            weight: {
                type: Number,
                default: 0,
                allowNull: true
            },
            sets: {
                type: Number,
                default: 1,
                allowNull: true
            },
            reps: {
                type: Number,
                default: 1,
                allowNull: true
            },
            distance: {
                type: Number,
                default: 0,
                allowNull: true
            },
        },
    ],
})

const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout;