"use strict";
//global gameBox variable
var gameBox = document.getElementById('gameBox');
document.addEventListener('click', gameNavigator);

let levels = [
		{
			level: 1,
			bgmusic:"",
			bgsetting:"",
			winvideo:"",
			losevideo:"",
			player:{
				images:{
					versusimage:"",
					winsprite:"",
					losesprite:"",
				}
			},
			boss:{
				name: "Sea King",
				images:{
					versusimage:"",
					winsprite:"",
					losesprite:"",
				},
				bossTimer:500
			}
		}
	];

// ===============================
//   Utility Functions
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
//recreates main menu 
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

function levelStart(level){
	//Variables until i figure out asset management and level params
	let battlePhaseStartTimer,
		playerReactionTimer,
		bossTimer,
		playerImg,
		bossImg;
	for(let each of document.getElementsByTagName('button')){
		each.style.display = 'none';
	}
	const statusBox = document.getElementById("status-box");

	//When round starts tell the player to get ready to react in neutral color
	statusBox.style.color = "deepskyblue";
	statusBox.innerHTML = "Get Ready...";
	function battlePhase(){
		//reset keypressed to null to ensure user can't prefire
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
				for(let each of document.getElementsByTagName('button')){
					each.style.display = 'inline-block';
				}
				clearInterval(stateMonitor);
				return
			}else if (keypressed == 81) {
				statusBox.innerHTML = "Player Wins!!";
				console.log(keypressed)
				for(let each of document.getElementsByTagName('button')){
					each.style.display = 'inline-block';
				}
				clearInterval(stateMonitor);
				return
			}else{

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

// TEST FUNCTION THAT CREATES A DEV UI TO RUN ROUNDS EASIER
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


// Runs main menu on load.
loadMainMenu();