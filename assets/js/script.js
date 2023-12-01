var userScoreElement = document.getElementById("user-score");
var startButton = document.getElementById("start-button");
var questionBlockElement = document.getElementById("question-block");
var answerBlockElement = document.getElementById("answer-block");
var feedbackBlockElement = document.getElementById("feedback-block");

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
			gameOver();
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
			answeredQuestions += 1;
			if (newQuestion.answers[i] !== correctAnswer) {
				userScore -= 10;
				feedbackBlockElement.textContent = "WRONG :(";
			} else {
				feedbackBlockElement.textContent = "CORRECT :)";
			}
			// Clear the feedback after 1 second
			setTimeout(() => {
				feedbackBlockElement.textContent = "";
			}, 1000);
			clearQuestion();
			if (answeredQuestions >= quizLength) {
				gameOver();
			} else {
				renderQuestion();
			}
		});
		answerList.appendChild(answerChoiceElement);
	}
}
// Clear the currently displayed question
function clearQuestion() {
	questionBlockElement.textContent = "";
	answerBlockElement.innerHTML = "";
}

function gameOver() {
	clearInterval(scoreInterval);

	// Create an input form for the user's high score
	
	formEl = document.createElement("form");

	inputEl = document.createElement("input");
	inputEl.setAttribute("type", "text");
	inputEl.setAttribute("required", "true");
	inputEl.setAttribute("placeholder", "Enter your Initials Here");
	
	submitButton = document.createElement("button");
	submitButton.setAttribute("type", "submit");
	submitButton.textContent = "Submit your Highscore!";

	formEl.addEventListener("submit", (event) => {
		event.preventDefault();
		
		// Store our high score in local storage
		localStorage.setItem(inputEl.value, userScore);
		renderHighScores();
	});
	formEl.appendChild(inputEl);
	formEl.appendChild(submitButton);
	answerBlockElement.appendChild(formEl);

}

function renderHighScores() {
	// Ensure pages HTML content is cleared
	questionBlockElement.innerHTML = "";
	answerBlockElement.innerHTML = "";

	// Create a high score header
	var h2El = document.createElement("h2");
	h2El.textContent = "Highscores";
	questionBlockElement.appendChild(h2El);

	// Place an <ol> where a question would normally go
	var highScoreList = document.createElement("ol");
	var highestScores = [];
	
	for (let i=0; i<localStorage.length; i++) {
		var nameT = localStorage.key(i);
		var scoreT = Number.parseFloat(localStorage.getItem(nameT));
		highestScores.push({
			name: nameT,
			score: scoreT
		});
	}

	// Sort our scores
	highestScores.sort(function(a, b) {
		return b.score - a.score;
	});

	// Iterate through AT-MOST our top 10 highest scores
	highestScores.slice(0, 10).forEach(function(element) {
		listEl = document.createElement("li");
		listEl.textContent = element.name + " -- " + element.score.toFixed(2).toString();
		highScoreList.appendChild(listEl);
	});
	questionBlockElement.appendChild(highScoreList);

	// Clear the add score button
	answerBlockElement.innerHTML = "";
}
	




function startGame() {
	startScore();
	renderQuestion();
}

// Handle the first game in a special manner
function start1stGame() {
	// Change the score and question count display to visibility:visible
	document.getElementById("score-display").style.visibility = "visible";

	// Remove 'start-quiz' button
	startButton.style.display = "none";

	// Now we can start normally
	startGame();
}
// Set up our main event listeners: the "Start Quiz" and "View Highscores" buttons
startButton.addEventListener("click", start1stGame);

// Attach the function 'renderHighscores' to our "view Highscores" button
document.getElementById("highscore-view").addEventListener("click", renderHighScores);






