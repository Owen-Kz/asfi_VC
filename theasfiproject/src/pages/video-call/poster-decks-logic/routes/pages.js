const express = require("express");
const pool = require("./db.config");
const fetchDataFromTable = require("../controllers/PosterDecksResult");
const posterDeckTable = require("../controllers/posterDeckTable");
const CreateDeck = require("../controllers/createPosterDeck");
const router = express.Router();
router.use(express.json())

router.get("/", (req,res) =>{
    res.render("posterDeckList")
})
router.get('/getposterdecks/:meetingId', async(req,res) =>{
    const meetingId = req.params.meetingId
    await posterDeckTable(req,res, meetingId)
})

router.get("/AvailableChannels", (req,res) =>{
    res.render("AllChannels")
})
router.get("/allchannels",async (req, res) => {
    await fetchDataFromTable(req, res);
})

router.post("/createDeck", async(req,res) =>{
    await CreateDeck(req,res)
})

router.get("/poster", async (req,res)=>{
    res.render("poster")
})
router.get("/previewPosters", async (req,res) =>{
    res.render("previewPoster")
})

router.get("/sessionDashboard", async(req,res)=>{
    res.render("sessionDashboard")
})
router.get("/uploadPoster", async(req,res)=>{
    res.render("uploadPoster")
})






module.exports = router; 