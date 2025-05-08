let texts = getTextLists();
let query = getVars("message").replace(/[.,\/#!$%\^&\*;:{}=\-_`~()。…，？；　]/g,"")
texts.forEach(x => {
    for (let i = 0; i < x.length; i++) {
        if(i<x.length-2){
            if(x[i].replace(/[.,\/#!$%\^&\*;:{}=\-_`~()。…，？；　]/g,"")==query){
                setVars("reply",x[i+1]);
            }
        }
    }
});