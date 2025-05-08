loadText("hitokoto");
function hitokoto(index) {
    return getText("hitokoto")[index];
}
function randHitokoto() {
    let t = getText("hitokoto");
    let s = t.length;
    return t[rand(0,s)];
}