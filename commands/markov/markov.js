
let lines = readRawTexts("wolfc.txt");
let markov = new MarkovGenerator(3, 280);
let result = "";

// Feed one line at a time
for (let i = 0; i < lines.length; i++) {
  markov.feed(lines[i]);
}

let argtotal = "";
for (let i = 0; i < getVar("argc"); i++) {
    argtotal += getVars("argv"+i)+" "
}
result += markov.generate()+"\n\n";
result += markov.generate()+"\n\n";
result += markov.generate()+"\n\n";
result += markov.generate()+"\n\n";
result += markov.generate()+"\n\n";
showTextDialog(result);
addMessage(`[MLT:master]，我这段时间在读狼与香辛料，我给你分享一些我最喜欢的段落吧！\n什么？我才没喝醉呢...`);
//addMessage("[MLT:name]我收到了"+getVar("argc")+"个参数,分别为\n"+argtotal,3000)
//addMessage("keep up the good work![MLT:sound,src=assets/audio/chime.mp3]",2000)
