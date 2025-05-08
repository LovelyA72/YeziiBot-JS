let text = "My name is AMLT and I am a virtual assistant. I will refactor this later. Wok hei (or wok hay) refers to the unique, smoky flavor imparted to food cooked in a wok at very high heat. This flavor comes from the Maillard reaction, which happens when food is seared at high temperatures, creating complex, savory flavors. Here’s how wok hei works: High Heat: The wok is heated to a very high temperature (over 200°C or 400°F). This allows the food to cook quickly, with a searing effect that enhances flavor. Fast Cooking: Because the food is cooked rapidly, it retains its texture and nutrients. Stir-frying in such high heat minimizes cooking time, making the food crisp but not soggy. Oil Vaporization: At such high temperatures, the oil used in cooking can vaporize, giving the food a slight smoky flavor. The smoke also gives off a distinct charred aroma, contributing to wok hei. Tossing Action: The movement of the food in the wok is crucial. Chefs toss the ingredients to expose them evenly to the wok's high heat. This uniform exposure enhances the searing effect. Maillard Reaction: The high heat causes amino acids and sugars in the food to react, forming new, complex flavor compounds. This browning reaction is key to the savory, rich taste of wok hei. Breathing Room: A good stir-fry in a wok allows the food to be cooked in small batches so that the heat stays constant and doesn’t get trapped by moisture, preventing steaming.";
let order = 4;
let len = 300;
let ngrams = {};

for (let i = 0; i <= text.length - order; i++) {
    let gram = text.substring(i, i + order);

    if (!ngrams[gram]) {
        ngrams[gram] = [];
    }
    ngrams[gram].push(text.charAt(i + order));
}

let res = "";

function markovIt() {
    let currentGram = text.substring(0, order);
    let result = currentGram;
    for (let i = 0; i < len; i++) {
        let possibleItems = ngrams[currentGram];
        if(!possibleItems){
            break;
        }
        let next = getRandomItem(possibleItems);
        result += next;
        currentGram = result.substring(result.length-order,result.length);
    }
    return result;
}



for (let i = 0; i < 10; i++) {
    res += markovIt()+"\n\n";
}


showTextDialog(res);