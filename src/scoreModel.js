import mongoose from "mongoose";

const scoreSchma = new mongoose.Schema({
    score: Number,
    time: Number
})

const Score = mongoose.model("Score", scoreSchma)

export default Score