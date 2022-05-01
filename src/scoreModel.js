import mongoose from "mongoose";

const scoreSchma = new mongoose.Schema({
    points: Number,
    time: Number
})

const Score = mongoose.model("Score", scoreSchma)

export default Score