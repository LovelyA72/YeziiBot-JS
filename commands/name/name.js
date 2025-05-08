if(getVar("argc")<2){
    addMessage("当前用户名：[MLT:master]");
}else{
    setUserName(getVars("argv1"));
    addMessage("用户名已更新\n新用户名：[MLT:master]");
}