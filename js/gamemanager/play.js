// GLOBAl VARIABLES FOR THE ENTIRE GAME*****

let itemsToCollect = [];
let itemsCollected = [];
let itemFake=[]
let currentScene;
let scenes = {};
let player;
let villian;


//Game Score
let playerScore = 0;
let currentSceneIndex = 0;
let gameState = "playing"; 

// End Global Variables**************
let sound_itemCollected;
let sound_wrongItem;
let sound_sceneComplete;
let sound_gameComplete;
let sound_backgroundMusic;
let sound_villianLaugh;
let sound_playerMove;
let sound_playerHurt;
let sound_playerHeal;
let sound_pointsGained;
let sound_ocean;
let sound_forest;
let sound_desert;

let musicEnabled = true;
let musicStarted = false;

function preload() {
    // Load any assets here if needed
    sound_itemCollected = loadSound('assets/audio/itemPickup.mp3');
    sound_wrongItem=loadSound('assets/audio/wrongItem.mp3');
    sound_backgroundMusic=loadSound('assets/audio/background.mp3');
}

function setupGame() {
    setUpVillian();
    setUpPlayers();
    setupScenes();
   
    
    startScene(currentSceneIndex);
    //startBackgroundMusic();
    
}
//start background music
function startBackgroundMusic(){
    if(sound_backgroundMusic && !sound_backgroundMusic.isPlaying()){
        sound_backgroundMusic.loop();
        sound_backgroundMusic.setVolume(0.045); // set it low
        console.log("Background music started");

    }
}
// stop 
function stopBackgroundMusic(){
    if(sound_backgroundMusic && sound_backgroundMusic.isPlaying()){
        sound_backgroundMusic.stop();
        console.log("Background music stopped");
    }
}
//pause
function pauseBackgroundMusic(){
    if(sound_backgroundMusic && sound_backgroundMusic.isPlaying()){
        sound_backgroundMusic.pause();
        console.log("Background music paused");
    }
}
//unpause
function resumeBackgroundMusic(){
    if(sound_backgroundMusic && !sound_backgroundMusic.isPlaying()){
        sound_backgroundMusic.play();
        console.log("Background music resumed");
    }
}
// Set up the player
function setUpPlayers() {
    player=new Player(500,500);
    if(currentScene){
        player.setTerrain(currentScene.terrain);
    }
}
//set up the villian
function setUpVillian() {
    // this villian should be scene specific
   villian=new Villain(100,500);
   villian.setMagnigication(0.8);
   villian.changeSize();
}
// Initialize or reset game state variables
function initializeGameState(){
    playerScore = 0;
    currentSceneIndex = 0;
    gameState = "playing";
    itemsCollected = [];
}
// start a specific scene by index
function startScene(sceneIndex) {
    currentSceneIndex=sceneIndex;
    currentScene=scenes[sceneIndex];
    if((!currentScene)){
        gameState="ended";
        console.log("Game Ended! Final Score: "+playerScore);
        return;
    }
    // update player terrain for new scene
    if(currentScene && player){
        resetPlayerPosition();
        player.setTerrain(currentScene.terrain);
    }
}
//reset player position to start of scene
function resetPlayerPosition() {
    player.x = 500;
    player.y = 500;
    // Could be more sophisticated based on scene
}

// Setup different scenes And define items to collect in each scene
function setupScenes() {
    scenes={0:new Intro(), 1:new Egypt(), 2:new RainForest(),3:new Ocean(), 4:new TheEnd()};
    // Define what items to collect in each scene
    itemsToCollect = [
        {sceneIndex:1,itemType:"gold",itemName:"Gold Coin",points:30},
        {sceneIndex:1,itemType:"vase",itemName:"vase",points:20},
        {sceneIndex:2,itemType:"relic_fly",itemName:"fly",points:30},
        {sceneIndex:2,itemType:"relic_bow",itemName:"bow",points:20},
        {sceneIndex:3,itemType:"greenFish",itemName:"greenFish",points:10},
        {sceneIndex:3,itemType:"greenFish2",itemName:"greenFish2",points:10},
        {sceneIndex:3,itemType:"scroll",itemName:"Scroll",points:30},   
        {sceneIndex:3,itemType:"mummy2",itemName:"Mummy2",points:50},
       
    ];
    itemFake=[
        {sceneIndex:1,itemType:"fake_vase",itemName:"Fake Vase",points:0},
        {sceneIndex:1,itemType:"fake_coin",itemName:"Fake Coin",points:0},
        {sceneIndex:2,itemType:"fake_fly",itemName:"Fake fly",points:0},
        {sceneIndex:2,itemType:"fake_bow",itemName:"Fake bow",points:0},
        {sceneIndex:3,itemType:"mummy",itemName:"Mummy",points:0},
        {sceneIndex:3,itemType:"guru",itemName:"Guru",points:0},
        {sceneIndex:3,itemType:"seahorse",itemName:"seahorse",points:0},
        {sceneIndex:3,itemType:"ruins",itemName:"ruins",points:0},
       
       
    ];
}

//Action Methods

// Check if player is close enough to any item in the current scene to collect it
// If so, collect the item
function  checkItemCollection() {
    //console.log("Checking item collection in scene:", currentScene ? currentScene.name : "None");   
    // Query the items for the current scene to get what to collect
    let currentSceneItems=itemsToCollect.filter(item=>item.sceneIndex===currentSceneIndex);
    let currentFakeItems=itemFake.filter(item=>item.sceneIndex===currentSceneIndex);
    //console.log("Current Fake Items in scene:", currentFakeItems);
    //if there is an item in the scene and player is close enough to collect it
     for(let item of currentSceneItems) {
        //console.log("Checking item:", item);
        if(!isItemCollected(item) && isPlayerNearItem(item)) {  
            //console.log("Collecting item:", item);
            collectItem(item);
        }
     }
     for(let w_item of currentFakeItems){
        //console.log("Checking wrong item:", w_item);
        if(isPlayerNearItem(w_item)){
            console.log("Wrong item! This item is not to be collected in this scene.");
            
            // Get the actual scene item 
            let sceneItem = currentScene[w_item.itemType]; 
            
            if (sceneItem) {
                // wrong sound 
                sceneItem.sound_wrong = sound_wrongItem;
                sceneItem.playSound("wrong");
                playerScore -= 1; // take away points for wrong item
                if(playerScore < 0) playerScore = 0; // negative score check
                console.log("Wrong item! Score penalized. Current Score: " + playerScore);      
                
                
                
            }
        }
    }
}

// redundent now . @todo Remove when Cleaned up
function isWrongItem(item){
    if(item.tobeCollected===false &&isPlayerNearItem(item)){
        return true;
    }
    return false;
}
// Check if the item has already been collected
// return true or false
function isItemCollected(item) {
    // Check if the item is already in the collected list
   return itemsCollected.some(collected => 
        collected.sceneIndex === item.sceneIndex && collected.itemType === item.itemType
    );
}

// Check if player is near the item ..simple distance check
// need to implement actual item positions in scenes.....
// uses the items isCloseToPlayer method to check distance
// 50 is default distance to check
// 
function isPlayerNearItem(item, howclose=50) {
    //return dist(player.x, player.y, item.x, item.y) < 50;
    // check the item types first .
   
    if(item.itemType === "gold" && currentScene.gold && !currentScene.gold.collected){
        return currentScene.gold.isCloseToPlayer(player, 50);              
    }  
    if(item.itemType === "relic_fly" && currentScene.relic_fly && !currentScene.relic_fly.collected){
        return currentScene.relic_fly.isCloseToPlayer(player, 50);
    }
    if(item.itemType === "vase" && currentScene.vase && !currentScene.vase.collected){
        return currentScene.vase.isCloseToPlayer(player, 50);
    }
    if(item.itemType==="fake_vase" && currentScene.fake_vase){
        //console.log("Checking closeness for fake item:", item);
        return currentScene.fake_vase.isCloseToPlayer(player,50);
    }
    if(item.itemType==="fake_coin" && currentScene.fake_coin){
        return currentScene.fake_coin.isCloseToPlayer(player,50);
    }
    if(item.itemType==="fake_fly" && currentScene.fake_fly){
        return currentScene.fake_fly.isCloseToPlayer(player,50);
    }
    if(item.itemType==="fake_bow" && currentScene.fake_bow){
        return currentScene.fake_bow.isCloseToPlayer(player,50);
    }
    if(item.itemType === "relic_bow" && currentScene.relic_bow && !currentScene.relic_bow.collected){
        return currentScene.relic_bow.isCloseToPlayer(player, 50);
    }
    if(item.itemType==="mummy" && currentScene.mummy){
        return currentScene.mummy.isCloseToPlayer(player,30);
    }
    if(item.itemType==="guru" && currentScene.guru){
        return currentScene.guru.isCloseToPlayer(player,30);    
    }
    if(item.itemType==="greenFish" && currentScene.greenFish && !currentScene.greenFish.collected){
        return currentScene.greenFish.isCloseToPlayer(player,50);
    }
    if(item.itemType==="greenFish2" && currentScene.greenFish2 && !currentScene.greenFish2.collected){
        return currentScene.greenFish2.isCloseToPlayer(player,50);
    }
    if(item.itemType=="scroll" && currentScene.scroll&& !currentScene.scroll.collected){
        return currentScene.scroll.isCloseToPlayer(player,50);
    }
    if(item.itemType==="shark" && currentScene.shark){
        return currentScene.shark.isCloseToPlayer(player,50);
    }
    if(item.itemType==="mummy2" && currentScene.mummy2 && !currentScene.mummy2.collected){   
        return currentScene.mummy2.isCloseToPlayer(player,50);
    }
    if(item.itemType==="seahorse" && currentScene.seahorse){
        return currentScene.seahorse.isCloseToPlayer(player,50);
    }
    if(item.itemType==="ruins" && currentScene.ruins){
        return currentScene.ruins.isCloseToPlayer(player,50);
    }
   
    return false; // for now
}
// Collect the item
// Add to collected list
// Add points to score
// Mark the item as collected in the scene
// Play sound if set to be played
function collectItem(item) {
    // add to collected list
  itemsCollected.push(item);
    
    // Add points to score
    playerScore += item.points;
    console.log(`Collected ${item.itemName}! Score: ${playerScore}`);
    
   // Need to know the actual item instance in the scene to mark as collected
    let sceneItem = currentScene[item.itemType]; // Gets currentScene.gold, etc.
    // if the item exists in the scene, mark it as collected
    if (sceneItem) {
        sceneItem.collected = true;
        
        // Play sound if available
        // set alll the sounds here
        if (sceneItem.playSound_collected && sound_itemCollected) {
            sceneItem.sound_collected = sound_itemCollected;
            
            sceneItem.playSound_collected();
        }
    }
    
   // just in case
    if (sound_itemCollected && !sound_itemCollected.isPlaying()) {
        sound_itemCollected.play();
    }
    
    checkSceneCompletion();
}
// if the scene is complete, move to next scene
// A scene is complete when all items for that scene are collected
// This is checked against the itemsToCollect list
// and cross checked with itemsCollected list
function checkSceneCompletion() {
    let currentScenItem=itemsToCollect.filter(item=>item.sceneIndex===currentSceneIndex);
    let allCollected = currentScenItem.every(item => isItemCollected(item));
   
    if(allCollected && currentScenItem.length > 0){
        completeScene();
    }

}

// Move to the next scene
// Need to make this smoother
// need to add some transition effect

function completeScene() {
    setTimeout(() => {
        gotoNextScene();
    });
}

function gotoNextScene() {
    let nextSceneIndex = currentSceneIndex + 1;
    if (scenes[nextSceneIndex]) {
        startScene(nextSceneIndex);
    }
    else{
        completeGame();
    }
}
// When all scenes are done
function completeGame() {
    gameState = "ended";
    console.log("Game Completed! Final Score: " + playerScore);
    console.log("Items Collected: ", itemsCollected);
    startScene(3); // TheEnd scene

}
// Main game loop when in playing state
function playGame() {
    if (gameState !== "playing") {
        return;
    }
    if (currentScene) {
        currentScene.show();
    }
    if (player) {
        player.show();
        player.smootherMove(player.speed);
    }
    if (villian) {
        // Hide for now
       // villian.show();
    }
    checkItemCollection();
    if(currentScene.name!=="TheEnd"){
    displayGameStuff();
    }
    howtoplay();
}
// Not sure where to put this 
// For now just display on screen
function displayGameStuff() {
    push();
    fill(0, 0, 0, 100);
    noStroke();
   //stroke(255, 255, 255);
   // strokeWeight(0.02);
    rectMode(CORNER);
    rect(25, 25, 300, 110, 8);
    fill(255);
    textFont("Arial");
    textAlign(LEFT, TOP);
    textSize(25);
    textStyle(BOLD);
    fill(255);
    text(`Score: ${playerScore}`, 30, 25);
    textSize(14);
    textStyle(BOLD);
    fill(255); 
    text(`Scene: ${currentScene ? currentScene.name : "None"}`, 30, 48);
    // Goal
    textSize(12);
    textStyle(BOLD);
    fill(255); 
    text(`Goal: ${currentScene ? currentScene.goal : "None"}`, 30, 68);
    // Items collected 
    textSize(12);
    textStyle(BOLD);
    fill(255);
    text(`Items Collected: ${itemsCollected.length}/${itemsToCollect.length}`, 30, 88);

    // Show Progress Bar
    let progressWidth = 260;
    let progressHeight = 12;
    let progress = itemsToCollect.length > 0 ? itemsCollected.length / itemsToCollect.length : 0;
    // Background of the bar
    fill(100);
    stroke(80);
    strokeWeight(1);
    rect(30, 103, progressWidth, progressHeight, 3);
   // Filled part of the bar
    fill(100, 255, 100);
    noStroke();
    rect(30, 103, progressWidth * progress, progressHeight, 3);
    pop();
}

function setup() {
    createCanvas(900, 900);
    setupGame();
}

function draw() {
    background(220);
    if (currentScene && currentScene.name === "Intro") {
        currentScene.show(); // Only show intro screen
    } else {
        playGame(); // Normal game loop
    }
}
// Restart the game When R is pressed
function restartGame(){
    console.log("Restarting Game !!!!! ...");
    // To restart the game properly. 
    // I will have to make this into swich case to handle different game states
    stopBackgroundMusic();
    gameState="playing";
    currentSceneIndex=0;
    itemsCollected=[];
    playerScore=0;
    startScene(0);
    setupGame();    
}
// Pass the key to the player to control movement
// Also use key presses for other game controls
function keyPressed() {
    // Control the player
   player.control_move(key);
   // start Music on first key press
    if (!musicStarted) {
        startBackgroundMusic();
        musicStarted = true;
        console.log("Musiv started on user pressed any key");
    }
   if (key === 'n' || key === 'N') {
        // @todo add transition effect
        //@todo check if current scene is complete
        gotoNextScene(); // Next scene for testing
    }
    if(key==='b'|| key==='B'){
        //go back to previous scene
        let prevSceneIndex=currentSceneIndex-1;
        if(scenes[prevSceneIndex]){
            startScene(prevSceneIndex);
        }
    }
    if (key === 'r' || key === 'R') {
        // Restart
        restartGame(); 
    }
    if (key === 'm' || key === 'M') {
         // on offf
        toggleMusic();
    }
    if (key === 'p' || key === 'P') {
        // Pause
        pauseBackgroundMusic(); 
    }
}

// Tuen music on or off
function toggleMusic() {
    if (musicEnabled) {
        stopBackgroundMusic();
        musicEnabled = false;
        console.log("Music disabled");
    } else {
        startBackgroundMusic();
        musicEnabled = true;
        console.log("Music enabled");
    }
}

// Show how to play instructions on screen for all scenes
function howtoplay(){
    
    push();
        // Control Panel........
        let panelX = 250;
        let panelY = 794;
        let panelWidth = 420;
        let panelHeight = 100;
        let padding = 5;
        // background
        fill(255, 180, 20);
        noStroke();
        //stroke(180, 90, 0);
        //strokeWeight(2);
        rectMode(CORNER);
        rect(panelX, panelY, panelWidth, panelHeight, 8);
        //title
        fill(0);
        textSize(16);
        textStyle(BOLD);
        textAlign(LEFT, TOP);
        text("Game Controls", panelX + padding, panelY + padding - 3);
        stroke(180, 90, 0);
        strokeWeight(1);
        line(panelX + padding, panelY + padding + 18, panelX + panelWidth - padding, panelY + padding + 18);

        // Button oinstructions
        fill(0);
        textSize(12);
        textStyle(NORMAL);
        textAlign(LEFT, TOP);
        let startX = panelX + padding;
        let startY = panelY + padding + 28;
        let lineHeight = 18;
        let space = 210;

        const keyList = [
            "ARROW KEYS / WASD — Move",
            "N — Next Scene",
            "R — Restart",
            "B — Go Back",
            "M — Music On/Off",
            "P — Pause Music"
        ];
        //breask into columns
        let midPoint = keyList.length / 2;
        keyList.forEach((control, i) => {
            if (i < midPoint) {
                // Left
                text(control, startX, startY + i * lineHeight);
            } else {
                // Right 
                text(control, startX + space, startY + (i - midPoint) * lineHeight);
            }
        });

    pop();


    
}
function mousePressed() {
    // Check if we're in intro scene and clicked the button area
    if (currentScene && currentScene.name === "Intro") {
        if (mouseX >= width/2 - 100 && mouseX <= width/2 + 100 &&
            mouseY >= height/2 + 50 && mouseY <= height/2 + 110) {
            
            console.log("Start button clicked! Moving to scene 1");
            gameState = "playing";
            currentSceneIndex = 1;
            startScene(1); // Go directly to Egypt scene
        }
    }
}


// End of play.js


