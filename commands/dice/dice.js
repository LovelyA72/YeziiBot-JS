function rollDice(diceInput) {
  const parts = diceInput.split('d');

  const numOfDice = parseInt(parts[0]);
  const diceType = parseInt(parts[1]);

  let rolls = [];
  let total = 0;

  for (let i = 0; i < numOfDice; i++) {
      const roll = Math.floor(Math.random() * diceType) + 1;
      rolls.push(roll);
      total += roll;
  }

  return `${rolls.join('/')} (Total: ${total})`;
}

if (getVars("argv1") != "") {
  addMessage(rollDice(getVars("argv1")));
}
