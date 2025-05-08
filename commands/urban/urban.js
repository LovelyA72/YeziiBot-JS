let response = JSON.parse(getHttpResponse("https://api.urbandictionary.com/v0/random"));
addMessage(response.list[0].word+"\n\n"+response.list[0].definition);