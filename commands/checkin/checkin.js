function rand(min,max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

const date = new Date();
const formattedDate = Number(
  date.getFullYear().toString() +
  (date.getMonth() + 1).toString().padStart(2, '0') +
  date.getDate().toString().padStart(2, '0')
);

const lastCheckInDate = getSaveDataNumber("checkin_lastChecked");

if(lastCheckInDate<formattedDate){
    let coinAdd = rand(20,40);
    let expAdd = rand(50,100);
    setSaveDataNumber("checkin_lastChecked",formattedDate);
    modBal(coinAdd);
    modExp(expAdd);
    modMorale(250);
    addMessage("签到成功了啾！获得了"+coinAdd+"金币和"+expAdd+"经验值！");
}else{
    addMessage("今天签到过了，明天再来吧！");
}
flushSaveData();