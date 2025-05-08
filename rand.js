function rand(min,max) {
    return Math.floor(Math.random() * (max - min) + min);
}
function getRandomItem(collection) {
    const randomIndex = Math.floor(Math.random() * collection.length);
    return collection[randomIndex];
  }