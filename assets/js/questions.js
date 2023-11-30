
var triviaQuestions = [
	{
		question: "What are the primitive types of javascript?",
		answers: [
			"String, Number, Boolean",
			"String, Number, Boolean, Undefined",
			"String, Number, Boolean, Object",
			"String, Int, Float, Boolean",
			"String, Int, Float, Boolean, Undefined"
		],
		correctAnswer: 0
	},
	{
		question: "What is hoisting in javascript?",
		answers: [
			"When a variable is used before it is declared",
		],
		correctAnswer: 0
	},
	{
		question: "The condition in an if/else statement is enclosed within ____.",
		answers: [
			"quotes",
			"curly brackets",
			"parentheses",
			"square brackets"
		],
		correctAnswer: 2
	},
	{
		question: "Arrays in javascript can be used to store ____.",
		answers: [
			"Numbers and Strings",
			"other Arrays",
			"booleans",
			"all of the above"
		],
		correctAnswer: 3
	},
	{
		question: "String values must be enclosed within ____ when being assigned to variables.",
		answers: [
			"commas",
			"parentheses",
			"square brackets",
			"single quotes",
			"double quotes",
			"single and double quotes"
		],
		correctAnswer: 5
	}
]

/*
var fileName = ".questions.json";



function loadFile() {
	var input, file, fr;

    if (typeof window.FileReader !== 'function') {
      alert("The file API isn't supported on this browser yet.");
      return;
    }

    input = document.getElementById('fileinput');
    if (!input) {
      alert("Um, couldn't find the fileinput element.");
    }
    else if (!input.files) {
      alert("This browser doesn't seem to support the `files` property of file inputs.");
    }
    else if (!input.files[0]) {
      alert("Please select a file before clicking 'Load'");
    }
    else {
      file = input.files[0];
      fr = new FileReader();
      fr.onload = receivedText;
      fr.readAsText(file);
    }

    function receivedText(e) {
      let lines = e.target.result;
      var newArr = JSON.parse(lines); 
    }
  }

*/
