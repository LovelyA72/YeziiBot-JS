/**********************************************
// YeziiBot.js Dummy Main
//
// Copyright 2024 TEAM A72, all rights reserved
// !! Licensed for use in AMLT only !!
//
// Redistribution must be done in human readable
// form. No code obfuscation is permitted.
**********************************************/
let pChar = "";

function init() {
    //Called when first starting the software
    consoleLog("=======================================");
    consoleLog("YeziiBot.js Dummy");
    consoleLog("=======================================");
    consoleLog("");
    pChar = loadSprite("bg1.png", "bg1", 20);
    sprSetSize(pChar, 160, 240);
    sprSetLoc(pChar, 32, 62);
    sprSetVis(pChar, true);
}

function update() {
    
}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function onMessage(msg) {
    flushMessage();
}

function onRenderMessage(msg) {
    
}

function onClick(x, y) {
    
}

function onMinute() {
    
}