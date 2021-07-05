const router = require("express").Router();
const db = require("../models");

// Create workout
router.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
        .then(dbWorkout => {
            console.log(dbWorkout);
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

// Get all workouts, with total duration of exercises
router.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
            },
        },
    ])
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            console.log(err);
            console.log(dbWorkout)
            res.status(400).json(err);
        });
});

router.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
        {
            $addFields: {
                totalDuration: { $sum: "$exercises.duration" },
            },
        },
    ])
        // Sort & limit data
        .sort({ _id: -1 })
        .limit(7)
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
});

//Add exercise
router.put("/api/workouts/:id", (req, res) => {
    console.log(req.body);
    db.Workout.findByIdAndUpdate(
        { _id: req.params.id },
        { $push: { exercises: req.body } },
        { upsert: true }
    )
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.status(400).json(err);
        });
})
module.exports = router;