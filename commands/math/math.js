if (getVar("argc")<2) {
    addMessage("Usage:\n%math <expression>\n\nExample:\n%math (2*(5*71)^2)+88\n");
    return;
}
let equation = getVars("argv1");
let unkn = getVars("argv2");
let result = nerdamer(equation);
addMessage("表达式"+equation+"\n结果："+result.toString());