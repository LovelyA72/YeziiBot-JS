// Depricated!!! This function is the old calc function that uses the native calculation
// function calcExp(exp), which was replaced by Nerdamer-based %math.
// Modified to use the new Nerdamer function for a safer operation.
if (getVar("argc")<2) {
    addMessage("[Depricated command]\nUse %math instead.\nUsage:\n%calc <expression>\n\nExample:\n%calc (2*(5*71)^2)+88");
    return;
}
let exp = getVars("argv1");
addMessage(exp+"="+nerdamer(exp));