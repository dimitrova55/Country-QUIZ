import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import dotenv from 'dotenv'

dotenv.config();

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Database
const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: process.env.DB_PASSWORD,
  port: 5432
});
db.connect();

// Global Variables
let lives = 3;
let totalCorrect = 0;
let currentQuestion = {};
let quiz = [];
let gameOver = false;

// Select everything from database
db.query("select * from countries", (err, res) => {
  if(err)
    console.log(err.message);
  else {
    quiz = res.rows;
  }
  db.end();
});

// GET home page
app.get("/", (req, res) => {

  // setting up initial values
  totalCorrect = 0;
  lives = 3;
  gameOver = false;

  // selecting a random question
  nextQuestion();
  console.log(currentQuestion);

  // render
  res.render("flags.ejs", {
    question: currentQuestion,
    lives: lives,
   });
});


// POST a new post
app.post("/submit-flag", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;

  // check the answer
  if (currentQuestion.country.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }
  else {
    --lives;
    console.log("lives: ", lives);
    
    if(lives <= 0)
      gameOver = true;    
  }

  // console.log("flag: ", isCorrect);
  // render the next question
  res.render("capitals.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
    lives: lives,
    gameOver: gameOver,
  });
});

// POST a new post
app.post("/submit-capital", async (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;

  // check the answer
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
  }
  else {
    --lives;
    console.log("lives: ", lives);
    if(lives <= 0)
      gameOver = true;    
  }
  
  await nextQuestion();
  console.log(currentQuestion);
  // console.log("capital: ", isCorrect);
  
  res.render("flags.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
    lives: lives,
    gameOver: gameOver,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];
  currentQuestion = randomCountry;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
