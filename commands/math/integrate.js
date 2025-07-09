if (getVar("argc")<3) {
    addMessage("Usage:\n%math.integrate <expression> <integrate variable>\n\nExample:\n%math.integrate sec(x)^2 x\n");
    return;
}
let equation = getVars("argv1");
let unkn = getVars("argv2");
let result = nerdamer.integrate(equation,unkn);
addMessage("表达式"+equation+"\n"+unkn+"积分为"+result.toString());