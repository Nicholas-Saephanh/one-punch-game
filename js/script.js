"use strict";
//global gameBox variable
var gameBox = document.getElementById('gameBox');


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



// ===============================
//   Helper Functions
// ===============================
//create a random integer between a range and return it. 
function randomIntWithinRange(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}
//Finds and returns the keycode of any key pressed while body is focused
var keypressed;
document.body.onkeyup = function(e){
	console.log("KEY PRESSED " + e.keyCode);
	keypressed = e.keyCode;
    return keypressed;
}
//Clear Game Box
function clearGameBox(){
	gameBox.innerHTML = null;
}
function loadStage(){
	var statusBox = document.createElement("div");
	var playBtn = document.createElement("button");
	playBtn.id = "play";
	playBtn.type = "button";
	playBtn.innerHTML = "play";
	var homeBtn = document.createElement("button");
	homeBtn.id = "menuGameTitle";
	homeBtn.type = "button";
	homeBtn.innerHTML = "home";
	statusBox.id = "status-box";
	statusBox.className = "status-box";

	gameBox.appendChild(statusBox);
	gameBox.appendChild(playBtn);
	gameBox.appendChild(homeBtn);

	document.getElementById("play").addEventListener("mouseup", levelStart, false);
}
// Game Navigation. Handles stopping/deleting/routing for game.
function gameNavigator(e){
	// console.log(e.target.id);
	switch (e.target.id){
		case 'menuGameTitle':
			clearGameBox();
			loadMainMenu();
			console.log('menuGameTitle Fired');
			break
		case 'menuNewGame':
			clearGameBox();
			loadStage();
			console.log('menuNewGame Fired');
			break
		case 'menuChooseLevel':
			
			console.log('menuChooseLevel Fired');
			break
		case 'menuDevMode':
			console.log('menuDevMode Fired');
			break
		case 'menuMore':
			console.log('menuMore Fired');
			break
		case 'contiue':
			console.log('contiue Fired');
			break
		default:
			console.log('default Fired');
			break
	}
}
function loadGame(){
	// load game assets()
	// run intro() with cancel key
	// 
	// create menu and items()
	// fade append main menu()
	console.log('working onload')
	loadMainMenu();
}
function loadMainMenu(){
	//Creating the dom elements of main menu
	var menuGameTitle = document.createElement("h1");
	var menuNewGame = document.createElement("h2");
	var menuChooseLevel = document.createElement("h2");
	var menuDevMode = document.createElement("h2");
	var menuMore = document.createElement("h2");

	//Give Each Element a matching ID
	menuGameTitle.id =   'menuGameTitle';
	menuNewGame.id =     'menuNewGame';
	menuChooseLevel.id = 'menuChooseLevel';
	menuDevMode.id =     'menuDevMode';
	menuMore.id =        'menuMore';


	//Creating Text Nodes for Created Dom Elements
	var menuGameTitle_Text = document.createTextNode('One Punch Man');
	var menuNewGame_Text = document.createTextNode('New Game');
	var menuChooseLevel_Text = document.createTextNode('Choose Level');
	var menuDevMode_Text = document.createTextNode('Dev Mode');
	var menuMore_Text = document.createTextNode('See My Shit');

	//Putting Text Nodes Into Their Respective Elements
	menuGameTitle.appendChild(menuGameTitle_Text);
	menuNewGame.appendChild(menuNewGame_Text);
	menuChooseLevel.appendChild(menuChooseLevel_Text);
	menuDevMode.appendChild(menuDevMode_Text);
	menuMore.appendChild(menuMore_Text);

	//Sending new Dom Elements with Text to parent on DOM
	gameBox.appendChild(menuGameTitle);
	gameBox.appendChild(menuNewGame);
	gameBox.appendChild(menuChooseLevel);
	gameBox.appendChild(menuDevMode);
	gameBox.appendChild(menuMore);

}

// ===============================
//  [END] Helper Functions
// ===============================


// ===============================
//   Game Load Function
// ===============================

loadGame();
document.addEventListener('click', gameNavigator);


// Game Mechanics  KEEP SEPARATE UNTIL NAVIGATION LOGIC IS COMPLETE
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

function levelStart(level){
	let battlePhaseStartTimer,
		playerReactionTimer,
		bossTimer;

	const statusBox = document.getElementById("status-box");

	//When round starts tell the player to get ready to react in neutral color
	statusBox.style.color = "deepskyblue";
	statusBox.innerHTML = "Get Ready...";
	function battlePhase(){
		document.getElementById("play").removeEventListener("mouseup", levelStart);
		//reset keypressed to null to enure user can't prefire
		keypressed = null
		//GAME STATE MONITOR - repeats constantly checking the state of keypressed variable to see if target key is hit
		let stateMonitor = setInterval(function(){
			//Gets current time every interval to compare to bossTimer
			let currentTime = Date.now()

			//Double check to see that events can fire in between recursion
			console.log("check state")

			// logic to test to see if currentTime needs to trigger win/lose mechanics
			if (currentTime > bossTimer) {
				statusBox.innerHTML = "Boss Wins!!";
				console.log(keypressed)
				keypressed = null;
				document.getElementById("play").addEventListener("mouseup", levelStart, false);
				clearInterval(stateMonitor);
				return
			}else if (keypressed == 81) {
				statusBox.innerHTML = "Player Wins!!";
				console.log(keypressed)
				keypressed = null;
				document.getElementById("play").addEventListener("mouseup", levelStart, false);
				clearInterval(stateMonitor);
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
	}, randomIntWithinRange(750, 6000))
}

