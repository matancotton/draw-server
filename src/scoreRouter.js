import express from "express";
import Score from "./scoreModel.js";

const router = new express.Router()

router.get("/high-score", async (req, res) => {
    try {
        const highScore = await Score.find({}).sort({ score: "desc", time: "asc" }).limit(1)
        res.send(highScore[0])
    } catch (err) {
        res.status(400).send({error: err.message})
    }
    
})

export default router
