const url = new URL(window.location.href);
const urlParams = url.searchParams;
const id = urlParams.get('id');



function checkAdminIsRight() {
    if(localStorage.getItem('user')) {
        deleteBoardData()
    } else {
        alert('관리자가 아니기에 삭제가 안됩니다.')
        document.location.href = "/bbs/board";
    }
}
function deleteBoardData() {
    
    const req = {id}

    fetch('/bbs/delete',{
        method : "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(req),
    })
     .then((res)=>res.json())
     .then((res)=>{
        alert(res.msg)
        document.location.href = "/bbs/board"
     })
}


function showBoardData(data) {

    tmpHtml = "";
    tmpHtml += "<div class='title'>" + data.title + "</div>";
    tmpHtml += "<div class='info'>";
    tmpHtml += "<dl><dt>번호</dt><dd>" + data.id + "</dd></dl>";
    tmpHtml += "<dl><dt>작성자</dt><dd>" + data.writer + "</dd></dl>";
    tmpHtml += "<dl><dt>작성일</dt><dd>" + data.wdate + "</dd></dl>";
    tmpHtml += "<dl><dt>조회</dt><dd>" + data.view + "</dd></dl>";
    tmpHtml += "</div>";
    tmpHtml += "<div class='content'>" + data.content + "</div>";

    $('.boardView').html(tmpHtml)


    updateViewCount()

}

function getBoardData() {

    const req = {id : id};

    fetch('/bbs/detail',{
        method : "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(req),
    })
     .then((res)=>res.json())
     .then((res)=>{
        if(res.success) {
            isPasswordExistOrDie(res.data)
        } else {
            alert(res.msg)
        }
     })
}

function  checkPasswordisRight(data) {
    const input = prompt('비밀번호를 입력하세요.')
    if (input == data.pw) {
        showBoardData(data)
    } else {
        alert('비밀번호가 틀렸습니다.')
    }
}

function isPasswordExistOrDie(data) {
    if(data.pw) {
        checkPasswordisRight(data)
    }
    else {
        showBoardData(data)
    }
}

function updateViewCount() {

    
    const req = {id : id}


    fetch('/bbs/view',{
        method : "POST",
        headers : {
            'Content-Type':'application/json'
        },
        body : JSON.stringify(req)
    })
}