const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 2000;

app.use(express.json());
app.use(cors());

let globalRole = "";
let questions = [];

let candidates = [];

app.get("/api/getrole", async(req,res) => {
    if(globalRole) {
        res.send(globalRole);
    }
    else {
        res.status(404).send({message: "No role is defined"})
    }
})

app.post("/api/setrole", async(req,res) => {
    const role = req.body;
    globalRole = role;
    try {
        res.status(200).send(role);
    }
    catch(err) {
        res.status(500).send({message: err});
    }
})

app.post("/api/logout",async(req,res) => {
    globalRole = "";
})

// Question creation

app.get("/api/getquestions", async(req,res) => {
    res.send(questions);
})

app.post("/api/createquestion", async(req,res) => {
    const {question, difficulty, answerA, answerB, answerC, answerD, correctAnswer} = req.body;
    try {
        const newQuestion = {
            question: question,
            difficulty: difficulty,
            answerA: answerA,
            answerB: answerB,
            answerC: answerC,
            answerD: answerD,
            correctAnswer: correctAnswer
        }
        questions.push(newQuestion);
        res.send(questions)
    }
    catch(err) {
        res.status(500).send({message: err});
    }
})

app.get("/api/getcandidates", async(req,res) => {
    res.send(candidates);
})

app.post("/api/createcandidate", async(req,res) => {
    const {candidate} = req.body;
    candidates.push(candidate);
})

app.post("/api/deletecandidate", async(req,res) => {
    const {id} = req.body;
    candidates = candidates.filter((c) => c.id !== id);
    res.send(candidates);
})


app.listen(PORT, () => {
    console.log("Server is running on " + PORT);
});