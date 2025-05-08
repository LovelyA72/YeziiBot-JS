let argc = getVar("argc");

if (argc < 2) {
    consoleError("Error: Please provide a regex pattern and a string to process.");
    return;
}
let regexPattern = getVars("argv1");

let regex;
try {
    regex = new RegExp(regexPattern, 'g');
} catch (e) {
    consoleError("Error: Invalid regex pattern.");
    return;
}

let combinedString = [];
for (let i = 2; i < argc; i++) {
    combinedString.push(getVars("argv" + i));
}
let inputString = combinedString.join(" ");

let matches = inputString.match(regex);
if (matches) {
    addMessage(matches.join(", "));
    
} else {
    addMessage("No matches found.");
}