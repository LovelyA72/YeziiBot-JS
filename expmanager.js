// YeziiBot.js for AMLT
// LovelyA72
//
// Code for rendering character's expressions

let expressionsPtrs = []
let expOverride = 0;
let expressionTimer = 0;
function updateExp() {
    if(expressionTimer == 0){
        if (expressionsPtrs.length > 1) {
            for (let i = 1; i < expressionsPtrs.length; i++) {
                sprSetVis(expressionsPtrs[i],false);
            }
        }
        if (expressionsPtrs.length > 0){
            sprSetVis(expressionsPtrs[0],true);
        }
        sprSetVis(pMusicNote,true);
    }else{
        expressionsPtrs.forEach(x => {
            sprSetVis(x,false);
        });
        sprSetVis(expressionsPtrs[expOverride],true);
        sprSetVis(pMusicNote,false);
        expressionTimer--;
    }
}

function initExp() {
    expressionsPtrs.push(loadSprite("exp0.png","expNormal",40));
    expressionsPtrs.push(loadSprite("exp1.png","expSleepy",40));
    expressionsPtrs.push(loadSprite("exp2.png","expSus",40));
    expressionsPtrs.forEach(x => {
        sprSetSize(x, 160, 240);
        sprSetLoc(x, 32, 62);
    });
}

function overrideExp(id,ticks) {
    expressionTimer = ticks;
    expOverride = id;
}