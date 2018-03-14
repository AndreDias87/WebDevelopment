//variables
var numberOfSquares = 6;
var colors = [];
var pickedColor;


//selectors
var messageDisplay = document.querySelector("#message");
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");

init();

function init(){
	//adding event listeners to mode buttons
	setupModeButtons();	

	//adding event listeners to Squares
	setupSquares();
	
	reset();
}


function reset(){
	//generate all new colors
	colors = generateRandomColors(numberOfSquares);
	//pick a new random color from array
	pickedColor = pickColor();
	//change color display to match picked color
	colorDisplay.textContent = pickedColor;
	//change colors of squares;
	for (var i = 0; i < squares.length; i++) {
		//add initial colors to squares
		if (colors[i]) {
			squares[i].style.backgroundColor = colors[i];
			squares[i].style.display = "block";
		} else {
			squares[i].style.display = "none";
		}
	}
	//change background back to original color
	h1.style.backgroundColor = "steelblue";

	//change the text of the button back to "new colors"
	resetButton.textContent = "New colors";

	//erase display message
	messageDisplay.textContent = "";
}

resetButton.addEventListener("click", function(){
	reset();
})




function changeColors(color) {
	for (var i = 0; i < squares.length; i++) {
		squares[i].style.backgroundColor = color;
	}
}

function pickColor(){	
	var random = getRandomInt(0,colors.length);
	return colors[random];
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomColors(number){
	var colorsArray = [];
	var color;
	for (var i = 0; i<number; i++){		
		color = randomColor();
		colorsArray.push(color);
	}
	return colorsArray;
}

function randomColor(){
	var r = getRandomInt(0, 256);
	var g = getRandomInt(0, 256);
	var b = getRandomInt(0, 256);
	var	color = "rgb("+r+", "+g+", "+b+")";
	return color;
}


function setupModeButtons(){
	for(var i = 0; i < modeButtons.length; i++){
		modeButtons[i].addEventListener("click", function(){
		modeButtons[0].classList.remove("selected");
		modeButtons[1].classList.remove("selected");
		this.classList.add("selected");

		if(this.textContent === "Easy"){
			numberOfSquares = 3;
		} else {
			numberOfSquares = 6;
		}
		reset();
		})
	}
}

function setupSquares() {
	for (var i = 0; i < squares.length; i++) {
	//add initial colors to squares
		squares[i].style.backgroundColor = colors[i];

		//add click listener to squares
		squares[i].addEventListener("click", function() {
			//grab color of clicked square
			var clickedColor = this.style.backgroundColor;
			//compare to answer
			if(clickedColor === pickedColor){
				messageDisplay.textContent = "Correct!";
				changeColors(clickedColor);
				h1.style.backgroundColor = clickedColor;
				resetButton.textContent = "Play Again?";
			} else {
				this.style.backgroundColor = "#232323";
				messageDisplay.textContent = "Try Again";
			}
		});
	}
}