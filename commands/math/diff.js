if (getVar("argc")<3) {
    addMessage("Usage:\n%math.diff <expression> <diff variable>\n\nExample:\n%math.diff cos(x)*sin(x) x\n");
    return;
}
let equation = getVars("argv1");
let unkn = getVars("argv2");
let result = nerdamer.diff(equation,unkn);
addMessage("表达式"+equation+"\n"+unkn+"导数为"+result.toString());