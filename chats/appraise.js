function rand(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}

let query = getVars("message");
if (query.startsWith("评价")){
    let question = query.substring(2);
    if(question.length>0){
        let results = Array.from(queryToml("appraise",[question]));
        setVars("reply",results[rand(0,results.length)]);
    }
}