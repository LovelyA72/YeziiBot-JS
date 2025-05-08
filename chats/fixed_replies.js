function rand(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let query = getVars("message");
let question = query;
if(question.length>0){
    let results = Array.from(queryToml("fixedreply",[question]));
    let result = results[rand(0,results.length)];
    if(result){
        setVars("reply",result);
    }
}