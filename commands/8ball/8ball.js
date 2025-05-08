function magic8Ball() {
    const responses = [
        "确实如此",           // It is certain
        "毫无疑问",           // Without a doubt
        "你能依靠它",        // You may rely on it
        "肯定是的",           // Yes, definitely
        "据我所见，是的",     // As I see it, yes
        "很有可能",           // Most likely
        "前景不错",           // Outlook good
        "是的",               // Yes
        "迹象显示是的",       // Signs point to yes
        "回答笼统，请再试一次", // Reply hazy, try again
        "稍后再问",           // Ask again later
        "现在不告诉你更好",   // Better not tell you now
        "现在我无法预测",       // Cannot predict now
        "集中精力，再问一次", // Concentrate and ask again
        "想得美",            // Don't count on it
        "我的回答是，不",     // My reply is no
        "我的消息来源说，不",   // My sources say no
        "前景不太好",         // Outlook not so good
        "非常可疑"            // Very doubtful
    ];

    const randomIndex = Math.floor(Math.random() * responses.length);

    return responses[randomIndex];
}

addMessage(magic8Ball());
