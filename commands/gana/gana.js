const hiraganaToRomaji = [
    ['あ', 'a'], ['い', 'i'], ['う', 'u'], ['え', 'e'], ['お', 'o'],
    ['か', 'ka'], ['き', 'ki'], ['く', 'ku'], ['け', 'ke'], ['こ', 'ko'],
    ['さ', 'sa'], ['し', 'shi'], ['す', 'su'], ['せ', 'se'], ['そ', 'so'],
    ['た', 'ta'], ['ち', 'chi'], ['つ', 'tsu'], ['て', 'te'], ['と', 'to'],
    ['な', 'na'], ['に', 'ni'], ['ぬ', 'nu'], ['ね', 'ne'], ['の', 'no'],
    ['は', 'ha'], ['ひ', 'hi'], ['ふ', 'fu'], ['へ', 'he'], ['ほ', 'ho'],
    ['ま', 'ma'], ['み', 'mi'], ['む', 'mu'], ['め', 'me'], ['も', 'mo'],
    ['や', 'ya'], ['ゆ', 'yu'], ['よ', 'yo'],
    ['ら', 'ra'], ['り', 'ri'], ['る', 'ru'], ['れ', 're'], ['ろ', 'ro'],
    ['わ', 'wa'], ['を', 'wo'],
    ['ん', 'n'],
    ['が', 'ga'], ['ぎ', 'gi'], ['ぐ', 'gu'], ['げ', 'ge'], ['ご', 'go'],
    ['ざ', 'za'], ['じ', 'ji'], ['ず', 'zu'], ['ぜ', 'ze'], ['ぞ', 'zo'],
    ['だ', 'da'], ['ぢ', 'ji'], ['づ', 'zu'], ['で', 'de'], ['ど', 'do'],
    ['ば', 'ba'], ['び', 'bi'], ['ぶ', 'bu'], ['べ', 'be'], ['ぼ', 'bo'],
    ['ぱ', 'pa'], ['ぴ', 'pi'], ['ぷ', 'pu'], ['ぺ', 'pe'], ['ぽ', 'po']
];

if (getVars("gana_quiz") == "" || (getVars("argv1")=="")) {
    const randomIndex = Math.floor(Math.random() * hiraganaToRomaji.length);
    const randomItem = hiraganaToRomaji[randomIndex];

    setVars("gana_quiz", randomItem[0]);
    setVars("gana_quizAns", randomItem[1]);

    addMessageMS(randomItem[0]+"的罗马音是什么?",10000);

} else {
    const userAnswer = getVars("argv1");

    if (userAnswer != "") {
        const correctAnswer = getVars("gana_quizAns");

        if (userAnswer === correctAnswer) {
            addMessageMS("答对了！答案就是" + correctAnswer+"!",10000);
        } else {
            addMessageMS("不对哦，"+ getVars("gana_quiz") +"的罗马音是" + correctAnswer,10000);
        }

        setVars("gana_quiz", "");
        setVars("gana_quizAns", "");
    }
}
