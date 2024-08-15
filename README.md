# World Quiz Web Application


## Description

This is a fun and interactive quiz web application where users test their knowledge of world geography. The quiz presents a series of questions based on country flags and capitals. The application pulls data from a PostgreSQL database, ensuring a wide variety of questions.

### How It Works
- **Question 1:** The quiz begins by displaying a country's flag. The user must correctly enter the country's name.
- **Question 2:** The user is then prompted to guess the capital of the country.
- After answering both questions, the application moves on to the next randomly selected country.
- **Lives:** Users start with 3 lives. A life is lost with each incorrect answer. The game ends when all lives are depleted.
- **Game Over:** When the game ends, users have the option to restart and try again.

### Features
- Random selection of countries for each question round.
- Real-time feedback on the correctness of the user's answers.
- A life system that adds challenge and encourages replayability.
- Integration with a PostgreSQL database to dynamically generate quiz content.

## Built With
- Node.js
- Express.js
- PostgreSQL


## Usage

[GIF DEMO]()