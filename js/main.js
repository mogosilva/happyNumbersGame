
/* GLOBAL VARIABLES */

var tries= 0;
var abc;
var score= 100;

/* END OF GLOBAL VARIABLES*/

/* FUNCTIONS */

function factorial(number){
	var total=1; 

	
	for(var i=number;i>0;i--){ // Count Down from player's input until it is >0
		total *= i; // Multiply each number to the original total
	}

	return total;

}

function getABC(input1, input2, input3){

	var computerAnswer = ""+input1+input2+input3; // Get player's first, second, and third input and combine them to make ABC
	return computerAnswer;
}

function currentScore(){
	$(".score").text(score); // Display Score
}

function compareAnswers(computerABC, playerABC){

	tries++;
	if(computerABC == playerABC){ // If (ABC = A! + B! + C!)
		currentScore();
		if(tries>1){ // If player succeed after more than 1 try, update number of tries
			$(".win .tries").text(tries + ' tries!');
		}else{
			$(".win .tries").text(tries + ' try!');
		}
		$(".win").addClass("active"); // display win window

	} else{
		score-=10; // Remove 10 points
		currentScore();
		$(".lose").addClass("active"); // display incorrect window
		$("input[type='number']").val(""); // clear inputs
	}
}

function restartGame(){
	$("input[type='number']").val(""); 
	tries = 0;
	score = 100;
	clearMenus();
}

function clearMenus(){
	$(".win, .lose, .hint").removeClass("active"); // Remove all visible windows
}

function findAnswer(){
	var aNumber;
	var bNumber;
	var cNumber;
	var happyNumbers;
	// Starting from 666 count down
	for(var i=6;i>0;i--){  

		aNumber=i; // Counts down 600,500,400,etc.
		for(var j = 6; j>=0; j--){

			bNumber=j; // Counts down 650, 640, 630, etc.
			for(var k=6; k>=0; k--){

				cNumber= k; // Counts down 666, 659, 658, 657, etc.
				abc = getABC(aNumber,bNumber,cNumber); // After decreasing 1 check if ABC = A!+B!+C!
					
				if (abc == factorial(aNumber)+factorial(bNumber)+factorial(cNumber)){ // If ABC does equal A!+B!+C! store answer
							 
						happyNumbers = " " + aNumber+", "+bNumber+", and "+cNumber ;
				}
			} // Continue counting all the way down to 100
		}
	}
	return happyNumbers; // Return the correct answer
}
/* END OF FUNCTIONS */



$(document).ready(function(){

	$("button[value='startGame']").on("click", function(){

		$(this).parent().removeClass("start");
		$(".happyForm").addClass("start");
	});

	$("input[type='number']").on("change", clearMenus);

	$("#happyNumbersGame").on("submit", function(e){

		e.preventDefault(); //Prevent page from refreshing

		var a=$("#A").val(); //Get player's first input
		var b=$("#B").val(); //Get player's second input
		var c=$("#C").val(); //Get player's third input

		abc = getABC(a,b,c); //determine what ABC is

		playerAnswer = factorial(a)+ factorial(b)+ factorial(c); //For player's answer get the factorial of each of their inputs
		compareAnswers(abc, playerAnswer);
	});

	$("#cheat").on("click", function(){
		clearMenus();
		var answer = findAnswer;
		$(".hint span").text( answer );
		$(".hint").addClass("active");
		score=0;
		currentScore();
	});

	$(".continue").on("click", clearMenus);

	$(".restart").on("click", restartGame);




});