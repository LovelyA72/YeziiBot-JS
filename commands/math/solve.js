if (getVar("argc")<3) {
    addMessage("Usage:\n%math.solve <equation> <unknown>\n\nExample:\n%math.solve 2x+5=11 x\n");
    return;
}
let equation = getVars("argv1");
let unkn = getVars("argv2");
let result = nerdamer.solveEquations(equation,unkn);
addMessage("等式"+equation+"\n"+unkn+"="+result.toString());