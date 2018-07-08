var botui;
var ws;

window.onload = function () {
    botui = new BotUI('my-botui-app');
    ws = new WebSocket("wss://eastmanjian.cn/chatbot/chatbotSOE");

    ws.onopen = function (evt) {
        console.log("Connection open ...");
        showUserInput();
    };

    ws.onmessage = function (evt) {
        console.log("Bot: " + evt.data);
        let answer = JSON.parse(evt.data);
        let respTxt = answer.output.text;
        for (let i = 0; i < respTxt.length; i++) {
            botui.message.bot({ // show next message
                delay: 1000,
                content: respTxt[i]
            });
        }
        showUserInput();
    };

    ws.onclose = function (evt) {
        botui.message.bot({ // show next message
            delay: 1000,
            content: "Connection closed."
        });
    };

}

function showUserInput() {
    botui.action.text({ // show 'text' action
        delay: 1500,
        action: {
            size: 60,
            placeholder: 'Your question here...'
        }
    }).then(function (res) {
        sendMsg(res);
    });
}

function sendMsg(res) {
    console.log(res);
    let msg = res.value;
    ws.send(msg);
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
    if (code == 13) { //Enter Key Pressed
        sendMsg();
    }
}