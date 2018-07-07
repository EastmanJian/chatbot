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
        //xhr.setRequestHeader("Authorization", 'Basic ' + btoa(watsonUsr+ ':' + watsonPasswd));
        xhr.setRequestHeader("X-Watson-Authorization-Token", 'l66ltBMtpx9fenIrAXyROt2U9MPmfOiv4fQEuLpWrHaUA7BSaqOtsq7a7wedM6SngqVSV80o33E4YU%2BA%2FZOnbZJ88RoKHBwcHdfa6RTIgrCcLZIGNb%2BpbF8AqB0FvWenLTfWTOUhKdkozvfYTVUN3Vd2cOOpf3%2BUD86rc4VMPRHzU%2FW8ptIyjGsLH9KPkpoY076FiSeXrt7k7zEfmBgQWznmMLvpQienA3W5p%2FCoM%2FjFBQ9D5Ew9vfmWiXmFrwuno40G4zcO83YCc5cM9KStDSj0I8ML2XSJkOWTvFFH5A45KsUZe6nJzYQAzzQuDcepItt68I47gj40ED95KEGaMVjf4o7iXojoM82BgdDBW1Omnir6dtVyQKbB0%2FAZ39FpELo2K9AhcPwu7Mi71uS3v%2BI62yFMey3P0wlUFNua%2Bc5lLPS3Eqh6g%2BVhz7YNBZ2gRzBa892%2BeaU8qFd8lGKrsN0lqWh61eiKi3AkHeGIxrzOMOnNN69iFjSdAP%2Bg85FQ2QgMcCPqS83kDxYQCTl%2B2VRr%2BZOtVXjeJvM2uiaIl9rbJwad7Te1zoXtuLanrjyLH%2FVdWokCEKYi8tmmq%2FzMfMLohadMa3lTqCzaEmfDR%2BqhQL5S14yxNlnR1qXKGV4zfQbOLNq0hRnZvZKxsz1pDxPQS4mQ8KmBEDsFXesmV7Bb2ygWo0aDKxZDw0feR451emAv6FyFcbN8FaIrkDAR0CsaNMH%2BKZxGqe70rpbo6XF7qJ7pC%2BjVN5uBgeeo8fiJL%2BNXapX19qZghYc0J8HYVQ3WyAiDauXbiakwUoSHO%2By97sj45ImvzzMOntcR3NTEdiC5QGo1Qvzrtt421Ox4OT1WXfiGaLv7CQbQ7PBBNWBCjLe5w4kQ01ltwsnWs16WE43ekVxcJql3C8PR%2B2TVBt%2Bcv5KuODrALUoFQU6jMcN12SLDcSe5O22m5dSdh8NKpTLiGLepyfAL9JQ6yPrepmne6HpPfgsb');
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
 


