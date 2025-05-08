function getLevel(exp) {
    let level = 1;
    while (exp >= 25 * level) {
        exp -= 25 * level;
        level++;
    }
    return { level, currentExp: exp, nextLevelExp: 25 * level };
}

function showLevelProgress() {
    let result = "";
    const exp = getExp();
    const { level, currentExp, nextLevelExp } = getLevel(exp);
    
    result += (`等级：${level}\n`);
    
    // Calculate percentage progress to the next level
    const progress = (currentExp / nextLevelExp) * 100;
    
    // Print progress bar
    const barLength = 20; // Length of the progress bar
    const progressBar = Math.round((progress / 100) * barLength);
    
    result += (`[${'#'.repeat(progressBar)}${'='.repeat(barLength - progressBar)}]\n`);
    result += (`${progress.toFixed(2)}% (${currentExp}/${nextLevelExp} 经验)`);
    
    return result;
}

addMessage("金币:" + getBal() + "\n" + showLevelProgress());
