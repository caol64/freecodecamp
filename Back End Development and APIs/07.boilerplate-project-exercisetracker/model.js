const mongoose = require('mongoose');

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true }
});

const exerciseSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    description: String,
    duration: Number,
    date: { type: Date, default: Date.now }
});

exports.UserModel = mongoose.model('User', userSchema, 'user');
exports.ExerciseModel = mongoose.model('Exercise', exerciseSchema, 'exercise');