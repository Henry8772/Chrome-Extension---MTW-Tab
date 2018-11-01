
let mockWordBase = [
	["Bizarre",["happy","weird","handsome"],"weird",2],
	["Exalt",["extol","degrade","get"],"extol",2],
	["Exalt1",["extol","degrade","get"],"extol",2],
	["Exalt2",["extol","degrade","get"],"extol",3],

];
//[Word, [Word Option(Maximum 4)], corectOption, familarity(0 - None, 1 - A bit, 2 Fluent, 3 - Master)]


let yesButton = document.getElementById('yesButton');
let noButton = document.getElementById('noButton');
let main_text = document.getElementById('main_text');
let yesNoField = document.getElementById("yesNoField");
let listOfOptions = document.getElementById("listOfOptions");
var statusBar = document.getElementById("statusBar");
var countDown = document.getElementById("countDown");
var numberOfAll = document.getElementById("numberOfAll");
let quizCompleteInfo = document.getElementById("quizCompleteInfo");
let score = document.getElementById("score");
let reDoButton = document.getElementById("reDoButton");



var wordOption0 = document.getElementById("wordOption0");
var wordOption1 = document.getElementById("wordOption1");
var wordOption2 = document.getElementById("wordOption2");
var wordOption3 = document.getElementById("wordOption3");


var currentList = -1;
var time = -1;
var currentWordList = [];
var wordCorrect = "";
var correctAndWrong = [0,0];
var initQuizArr = [];
var t;

/*window.onload = function(){
	chrome.storage.sync.get('usertext', function(data) {
  		textfield.innerHTML = data.usertext;
	});
	
}*/

yesButton.onclick = function(element) {
    main_text.innerText = "Sure! Let's do some";
    yesNoField.style.display = "none";
    setTimeout(three,1500);
};

noButton.onclick = function(element) {
    main_text.innerText = "Maybe later";
};

function three(){
	main_text.innerText = "3";
	setTimeout(two,1000);
    
}

function two(){
	main_text.innerText = "2";
	setTimeout(one,1000);
    
}

function one(){
	main_text.innerText = "1";
	setTimeout(takeQuiz,1000);
}


function timer(){
	if(time <= -1){
		countDown.innerText = "Time up";
		wrongWord();
	}
	else{
		countDown.innerText = time + " sec";
		time--;
	}
	
}

function takeQuiz(){
	currentList = -1;
	correctAndWrong = [0,0];
	currentWordList = [];
	wordCorrect = "";
	correctAndWrong = [0,0];
	quizCompleteInfo.style.display = "none";
	reDoButton.style.display = "none";
	listOfOptions.style.display = "block";
	statusBar.style.display = "block";
	initQuiz();
	nextWord();
	
}

function cleanOptionText(){
	wordOption0.innerText = "";
	wordOption1.innerText = "";
	wordOption2.innerText = "";
	wordOption3.innerText = "";
}

function initQuiz(){
	initQuizArr = [];
	for(i=0;i<mockWordBase.length;i++){
		if(mockWordBase[i][3] < 3){
			initQuizArr.push(mockWordBase[i]);
		}
	}

}

function nextWord(){
	if(currentList == initQuizArr.length - 1){
		
		quizComplete();
		if(initQuizArr.length == 0){
			noMoreWords();
		}
	}
	
	else{
		currentList++;

		var a = currentList + 1;
		main_text.innerText = a.toString() + ". " + initQuizArr[currentList][0];
		numberOfAll.innerText = a.toString() + " of " + initQuizArr.length;

		cleanOptionText();

		for(i=0;i<initQuizArr[currentList][1].length;i++){
			if(i==0){
				wordOption0.innerText = initQuizArr[currentList][1][i];
			}
			else if(i==1){
				wordOption1.innerText = initQuizArr[currentList][1][i];
			}
			else if(i==2){
				wordOption2.innerText = initQuizArr[currentList][1][i];
			}
			else if(i==3){
				wordOption3.innerText = initQuizArr[currentList][1][i];
			}
		}
		currentWordList = initQuizArr[currentList][1];
		wordCorrect = initQuizArr[currentList][2];
		time = 10;

		t = setInterval(timer, 1000);
	}
	
}

function correctWord(){
	initQuizArr[currentList][3]++;
	main_text.innerText = "Correct!";
	correctAndWrong[0]++;
	cleanOptionText();
	clearInterval(t);
	setTimeout(nextWord,1500);
}

function wrongWord(){
	initQuizArr[currentList][3]--;
	main_text.innerText = "Wrong";
	correctAndWrong[1]++;
	cleanOptionText();
	clearInterval(t);
	setTimeout(nextWord,1500);
}

function noMoreWords(){
	main_text.innerText = "Congradulations, you have mastered all the words";
	quizCompleteInfo.style.display = "none";
	reDoButton.style.display = "none";
	listOfOptions.style.display = "none";
	statusBar.style.display = "none";
	cleanOptionText();
}

wordOption0.onclick = function(element){
	if(currentWordList[0] == wordCorrect){
		correctWord();
	}
	else{
		wrongWord();
	}
}

wordOption1.onclick = function(element){
	if(currentWordList[1] == wordCorrect){
		correctWord();
	}
	else{
		wrongWord();
	}
}

wordOption2.onclick = function(element){
	if(currentWordList[2] == wordCorrect){
		correctWord();
	}
	else{
		wrongWord();
	}
}

wordOption3.onclick = function(element){
	if(currentWordList[3] == wordCorrect){
		correctWord();
	}
	else{
		wrongWord();
	}
}

reDoButton.onclick = function(element){
	takeQuiz();
}




function quizComplete(){
	clearInterval(t);
	main_text.innerText = "Quiz complete";
	statusBar.style.display = "none";
	listOfOptions.style.display = "none";
	quizCompleteInfo.style.display = "block";
	var total = correctAndWrong[0] + correctAndWrong[1];
	var percentage = (correctAndWrong[0] / total) * 100;

	var scoreString = "";
	if(percentage > 70){
		scoreString += "You got " + "<span style='color:green'>" + correctAndWrong[0] + "</span>" +  " out of " + total + "  ";
	}
	else if(percentage > 40 && percentage < 70){
		scoreString += "You got " + "<span style='color:orange'>" + correctAndWrong[0] + "</span>" +  " out of " + total + "  ";
	}
	else{
		scoreString += "You got " + "<span style='color:red'>" + correctAndWrong[0] + "</span>" +  " out of " + total + "  "; 
	}
	score.innerHTML = scoreString;
	reDoButton.style.display = "block";
}




