var userScoreElement = document.getElementById("user-score");
var startButton = document.getElementById("start-button");
var questionBlockElement = document.getElementById("question-block");
var answerBlockElement = document.getElementById("answer-block");

// The user score which is nothing more than a countdown implementation.
// The theoretical max is 100. To avoid potential many-way ties in the
// scoreboard, user score incudes the first two decimal places (hundreths of a second)
// I felt changing the displayed score every 10 milliseconds was visually noisy and
// so the displayed score is changed once a second here
//
// Both start/stopScore handle all internal score-handling
var userScore;
var scoreInterval;
var answeredQuestions = 0;
const quizLength = Math.min(10, triviaQuestions.length);

function startScore() {
	userScore = 100;
	scoreInterval = setInterval(function() {
		userScore -= 0.01;
		userScoreElement.textContent = Math.ceil(userScore);
		if (userScore <= 0) {
			stopScore();
			gameLost();
		}
	}, 10);
}
function stopScore() {
	clearInterval(scoreInterval);
}

// Helper function to destructively retrieve a random element from an array.
// This pattern is used twice - for retrieving a random question as well as randomly sorting the question answers
function randPop(array) {
	var randIndex = Math.floor(Math.random()*array.length);
	return array.splice(randIndex, 1)[0];
}

function renderQuestion() {
	var newQuestion = randPop(triviaQuestions);

	// Grab the correct answer before we shuffle and lose its index
	var correctAnswer = newQuestion.answers[newQuestion.correctAnswer];

	// Next, we shuffle our answer choices to combat disingenuous play
	var randAnswers = [];
	while (newQuestion.answers.length) {
		randAnswers.push(randPop(newQuestion.answers));
	}
	newQuestion.answers = randAnswers;

	questionBlockElement.textContent = newQuestion.question;

	// Create a <ol> element to place our answer choices in
	var answerList = document.createElement('ol');
	answerList.setAttribute("type", "A");
	answerBlockElement.appendChild(answerList);

	// Add all of our answer choices to the newly created <ol>
	for (let i=0; i<newQuestion.answers.length; i++) {
		var answerChoiceElement = document.createElement('li');
		answerChoiceElement.textContent = newQuestion.answers[i];
		answerChoiceElement.setAttribute("class", "answer-choice");
		answerChoiceElement.addEventListener("click", function() {
			if (newQuestion.answers[i] !== correctAnswer) {
				userScore -= 10;
			}
			clearQuestion();
			renderQuestion();
		});
		answerList.appendChild(answerChoiceElement);
	}
}
// Clear the currently displayed question
function clearQuestion() {
	questionBlockElement.textContent = "";
	answerBlockElement.innerHTML = "";
}

function gameLost() {
	console.log("You lost!!");
	// TODO - HANDLE LOST GAME
}

function gameWon() {
	console.log("You won!!");
	// TODO - HANDLE WON GAME
}

function startGame() {
	startScore();
	renderQuestion();
}
//console.log(triviaQuestions[0].question);

startButton.addEventListener("click", startGame); 

// console.log(document.visbilityState);
// console.log(document.hidden);
/*
document.addEventListener("visibilitychange", (event) => {
  if (document.visibilityState == "visible") {
    console.log("tab is active");
  } else {
    console.log("tab is inactive");
  }
});
*/

