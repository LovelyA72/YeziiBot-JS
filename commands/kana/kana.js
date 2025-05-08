const katakanaToRomaji = [
    ['ア', 'a'], ['イ', 'i'], ['ウ', 'u'], ['エ', 'e'], ['オ', 'o'],
    ['カ', 'ka'], ['キ', 'ki'], ['ク', 'ku'], ['ケ', 'ke'], ['コ', 'ko'],
    ['サ', 'sa'], ['シ', 'shi'], ['ス', 'su'], ['セ', 'se'], ['ソ', 'so'],
    ['タ', 'ta'], ['チ', 'chi'], ['ツ', 'tsu'], ['テ', 'te'], ['ト', 'to'],
    ['ナ', 'na'], ['ニ', 'ni'], ['ヌ', 'nu'], ['ネ', 'ne'], ['ノ', 'no'],
    ['ハ', 'ha'], ['ヒ', 'hi'], ['フ', 'fu'], ['ヘ', 'he'], ['ホ', 'ho'],
    ['マ', 'ma'], ['ミ', 'mi'], ['ム', 'mu'], ['メ', 'me'], ['モ', 'mo'],
    ['ヤ', 'ya'], ['ユ', 'yu'], ['ヨ', 'yo'],
    ['ラ', 'ra'], ['リ', 'ri'], ['ル', 'ru'], ['レ', 're'], ['ロ', 'ro'],
    ['ワ', 'wa'], ['ヲ', 'wo'],
    ['ン', 'n'],
    ['ガ', 'ga'], ['ギ', 'gi'], ['グ', 'gu'], ['ゲ', 'ge'], ['ゴ', 'go'],
    ['ザ', 'za'], ['ジ', 'ji'], ['ズ', 'zu'], ['ゼ', 'ze'], ['ゾ', 'zo'],
    ['ダ', 'da'], ['ヂ', 'ji'], ['ヅ', 'zu'], ['デ', 'de'], ['ド', 'do'],
    ['バ', 'ba'], ['ビ', 'bi'], ['ブ', 'bu'], ['ベ', 'be'], ['ボ', 'bo'],
    ['パ', 'pa'], ['ピ', 'pi'], ['プ', 'pu'], ['ペ', 'pe'], ['ポ', 'po']
];

if (getVars("kana_quiz") == "" || (getVars("argv1") == "")) {
    const randomIndex = Math.floor(Math.random() * katakanaToRomaji.length);
    const randomItem = katakanaToRomaji[randomIndex];

    setVars("kana_quiz", randomItem[0]);
    setVars("kana_quizAns", randomItem[1]);

    addMessageMS(randomItem[0] + "的罗马音是什么？", 10000);

} else {
    const userAnswer = getVars("argv1");

    if (userAnswer != "") {
        const correctAnswer = getVars("kana_quizAns");

        if (userAnswer === correctAnswer) {
            addMessageMS("答对了！正确答案就是" + correctAnswer + "！", 10000);
        } else {
            addMessageMS("错啦，" + getVars("kana_quiz") + "的正确罗马音是" + correctAnswer, 10000);
        }

        setVars("kana_quiz", "");
        setVars("kana_quizAns", "");
    }
}
