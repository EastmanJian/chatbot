var ws = new WebSocket("wss://eastmanjian.cn/chatbot/chatbotSOE");

ws.onopen = function (evt) {
    console.log("Connection open ...");
};

ws.onmessage = function (evt) {
    console.log("Bot: " + evt.data);
    let answer = JSON.parse(evt.data);
    let respTxt = answer.output.text;
    for (let i = 0; i < respTxt.length; i++) {
        log("Bot: " + respTxt[i]);
    }

};

ws.onclose = function (evt) {
    log("Connection closed.");
};


function sendMsg() {
    let msg = document.getElementById("msgInput").value;
    log("I say: " + msg);
    ws.send(msg);
    document.getElementById("msgInput").value = "";
}

function log(msg) {
    let msgbox = document.getElementById("msgDiag");
    msgbox.append(msg + "\n");
    msgbox.scrollTop = msgbox.scrollHeight;
}

function closeCon() {
    ws.close();
}

function handleKeyUp() {
    var code = event.keyCode;
    if(code == 13){ //Enter Key Pressed
        sendMsg();
    }
}