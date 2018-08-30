
//   Helper Functions
// ===============================
//create a random integer between a range and return it. 
function getRandomArbitrary(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
//Finds and returns the keycode of any key pressed while body is focused
var keypressed;
document.body.onkeyup = function(e){
	console.log("KEY PRESSED " + e.keyCode);
	keypressed= e.keyCode;
    return keypressed;
}

// //   Game Loop Function using requestAnimationFrame()
// // ==========================================================




// Event Triggered Game Paper Prototype
//=============================================
//Game Load   WINDOW.LOAD STARTGAME();

//When Game is loaded play OPM Intro

//When Intro is Over, Load Menu [Start Game Button, Choose Level Button, More/Education Mode]

//Start Game Active = Load level based on object

//Versus intro showing close ups to exacerbate duel mood

//after Versus Intro, start round

//= Round chooses a random time between 1-6 seconds to trigger FIGHT

//= Player must press designated key as soon as FIGHT Triggers
//== If player is faster than boss timer, player wins
//==== Continue to next round on player ready
//== If player is slower than boss timer, player loses
//==== Try Again Prompt. Yes == restart round / No == Load Main Menu
//== If player is same than boss timer, player draws
//==== Try Again Prompt. Yes == restart round / No == Load Main Menu

let levels = [
		{
			level: 1,
			bgmusic:"",
			bgsetting:"",
			winvideo:"",
			losevideo:"",
			player:{
				versusimage:"",
				sprites:{
					winsprite:"",
					losesprite:"",
				}
			},
			boss:{
				versusimage:"",
				sprites:{
					winsprite:"",
					losesprite:"",
				},
				bossTimer:1000
			}
		}
	];

function roundStart(){
	let battlePhaseStartTimer,
		playerReactionTimer,
		bossTimer;

	const statusBox = document.getElementById("status-box");

	//When round starts tell the player to get ready to react in neutral color
	statusBox.style.color = "deepskyblue";
	statusBox.innerHTML = "Get Ready...";
	function battlePhase(){

		//reset keypressed to null
		keypressed = null

		//GAME STATE MONITOR - repeats constantly checking the state of keypressed variable to see if target key is hit
		let stateMonitor = setInterval(function(){

			//Gets current time every interval to compare to bossTimer
			let currentTime = Date.now()

			//Double check to see that events can fire in between recursion
			console.log("check state")

			// logic to test to see if currentTime needs to trigger win/lose mechanics
			if (currentTime > bossTimer) {
				console.log(keypressed)
				keypressed = null;
				statusBox.innerHTML = "Boss Wins!!";
				clearInterval(stateMonitor);
				return
			}else if (keypressed == 81) {
				statusBox.innerHTML = "Player Wins!!";
				clearInterval(stateMonitor);
				console.log(keypressed)
				keypressed = null;
				return
			}
		}, 10)
	}
	//setTimeout a random time delay between 1-6 seconds for player to react to
	setTimeout(function(){
		//after delay, change status box contents to FIGHT!!! in red to signal player to react ASAP to win
		statusBox.style.color = "red";
		statusBox.innerHTML = "FIGHT!!!";
		//Creates a vari
		battlePhaseStartTimer = Date.now();
		bossTimer = battlePhaseStartTimer + 500;
		battlePhase();
	}, getRandomArbitrary(750, 6000))
}

document.getElementById("play").addEventListener("mouseup", roundStart, false);