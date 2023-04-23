function gotoBoardPage() {
    document.location.href = '/bbs/board';
}


function showWriteContainer() {


    tmpHtml = "";
    tmpHtml += "<form action='#' onsubmit='handleSubmit(event)'>";
    tmpHtml += "<div class='boardWrite'>";
    tmpHtml += "<div class='title'>";
    tmpHtml += "<dl><dt>제목</dt><dd><input type='text' id = 'title' autocomplete='off' required placeholder='제목을 입력하세요'></dd></dl>";
    tmpHtml += "</div>";
    tmpHtml += "<div class='info'>";
    tmpHtml += "<dl><dt>비밀번호</dt><dd><input type='password' id = 'pw' autocomplete='off' placeholder='비밀번호를 입력(선택)'></dd></dl>";
    tmpHtml += "</div>";
    tmpHtml += "<div class='content'>";
    tmpHtml += "<textarea type = 'text' id = 'content' autocomplete='off' required placeholder='내용을 입력하세요'></textarea>";
    tmpHtml += "</div>";
    tmpHtml += "</div>";
    tmpHtml += "<div class='boardBtn'>";
    tmpHtml += "<input type='submit' class='on' value='확인'>";
    tmpHtml += "<input type='submit' onclick = 'gotoBoardPage()' value='취소'>";
    tmpHtml += "</div>";
    tmpHtml += "</form>";

    
    $('.boardWriteWrap').html(tmpHtml)
}

function deleteWriteContainwer() {
    tmpHtml = "";
    $('.boardWriteWrap').html(tmpHtml)

}

function getNowDateData () {
    let today = new Date();   

    let year = today.getFullYear();
    let month = today.getMonth() + 1;  
    let date = today.getDate();

    return ( year + "." + month + "." + date )
}

function handleSubmit(event) {

    event.preventDefault();
    
    const title = $('#title').val();
    const pw = $('#pw').val();
    const content = $('#content').val();

    const req = {
        title,
        pw,
        content,
        idx : JSON.parse(localStorage.getItem('user')).idx,
        name : '관리자',
        wdate : getNowDateData(),
    }
    
    //1.
    ThirdCheckAdmin(req)

    //2.
    fetch('/bbs/write',{
        method : "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(req),
    })
     .then((res)=>res.json())
     .then((res)=>{
        alert(res.msg)
        if(res.success) {
            document.location.href = "/bbs/board";
        }
     })


}



function ThirdCheckAdmin(data) {
    if( data.idx !== 'AZ13GB34Zd1R3VYH' ) {
        deleteWriteContainwer()
    }
}

function SecondCheckAdmin() {
    fetch('/bbs/board',{
        method : "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(JSON.parse(localStorage.getItem('user'))),
    })
     .then((res)=>res.json())
     .then((res)=>{
        if(res.success) {
            showWriteContainer()
        } else {
            deleteWriteContainwer()
        }
     })
}

function FirstCheckAdmin() {
    if(localStorage.getItem('user')) {
        SecondCheckAdmin()
    } else {
        deleteWriteContainwer()
    }
}