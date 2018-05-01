var watsonUsr = 'be81bea7-cd64-4716-bfa1-c4f99de778f2';
var watsonPasswd = 'KcvZn5XuyE76';

function ajaxRestReq(params) {
    return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onload = () => {
            if (xhr.status == 200) {
                resolve(xhr.responseText);
            } else {
                reject("Server Error: " + xhr.status);
            }
        }
        xhr.onerror = () => {
            reject("Cannot Make AJAX Request");
        }
        xhr.open(params.type, params.url, true);
        xhr.setRequestHeader("Content-type", params.contentType);
        xhr.setRequestHeader("Accept", params.accept);
        xhr.withCredentials = true;
        xhr.setRequestHeader("Authorization", 'Basic ' + btoa(watsonUsr+ ':' + watsonPasswd));
        xhr.setRequestHeader("User-Agent", 'curl/7.59.0');
        xhr.send(params.data);
    });
}

function sendQuestion() {
    //let user = document.querySelector("#userName").value;
    //console.log("user=" + user);
    let workspaceId = '4af6bf4e-6413-4eda-96a1-0339b33137d1'
    let question = {
        "input": {
            "text": "Turn on the lights"
        },
        "alternate_intents": true
    };

    ajaxRestReq({
        url: 'https://gateway.watsonplatform.net/assistant/api/v1/workspaces/' + workspaceId + '/message?version=2018-02-16&nodes_visited_details=false',
        type: 'POST',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(question),
        accept: 'application/json',
    }).then(handleAnswer, logErr);
}



function handleAnswer(jsonString) {
    console.log('AnswerString=' + jsonString);
    let answer = JSON.parse(jsonString);
}

function logErr (reason) {
    console.log(reason);
}

function getRecentComments() {
    let howManyComments = 10;
    let requestData = {
        pageURL: 'eastmanjian.cn/blog/demo/',
        lastN: howManyComments
    };
    ajaxRestReq({
        url: 'https://eastmanjian.cn/delightalk/rest/ejBlog/getRecentComments',
        type: 'PUT',
        contentType: 'application/json; charset=UTF-8',
        data: JSON.stringify(requestData),
        accept: 'application/json',
    }).then(renderRecentComments, logErr);
}

function renderRecentComments(jsonString) {
    console.log('AnswerString=' + jsonString);
}
 


