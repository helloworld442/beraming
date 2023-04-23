const url = new URL(window.location.href);
const urlParams = url.searchParams;
const paging = urlParams.get('paging');
const pagingNumber = 10;
var strCnt = pagingNumber * paging;

function isPasswordExistOrDie (data) {
    ( data.pw ) ? ( tmpHtml = "<i class='fa-solid fa-lock'></i>" ) : ( tmpHtml = "" )
    return tmpHtml
}


function showPagingData(boardLength) {

    (paging - 1 >= 0) ? (pagingBefore = Number(paging) - 1) : (pagingBefore = 0);
    (paging + 1 <= parseInt(boardLength / pagingNumber)) ? (pagingAfter = Number( paging ) + 1) : (pagingAfter = parseInt(boardLength / pagingNumber));
    
    tmpHtml = "<a href = '/bbs/board?paging=" + pagingBefore + "' class='btn prev'><</a>";
    
    for(let i = 0; i <= parseInt(boardLength / pagingNumber) ; i++) {
        tmpHtml += "<a class='paingNumber' href = /bbs/board?paging=" + i + ">" + ( i + 1 ) + "</a>";
    }
    
    tmpHtml += "<a href = '/bbs/board?paging=" + pagingAfter + "' class='btn next'>></a>";

    $('.boardPage').html(tmpHtml)
}


function showBoardData(boardData) {

    tmpHtml = "";
    
    var idx = 0;
    while (idx < pagingNumber) {
        if ( strCnt + idx >= boardData.length ) {
            break
        }
        tmpHtml += "<div>";
        tmpHtml += "<div class='num'>" + boardData[strCnt + idx].id + "</div>";
        tmpHtml += "<div class='title'><a href='/bbs/detail?id=" + boardData[strCnt + idx].id + "'>"+ boardData[strCnt + idx].title +" " + isPasswordExistOrDie(boardData[strCnt + idx]) + "</a></div>";
        tmpHtml += "<div class='writer'>" + boardData[strCnt + idx].writer + "</div>";
        tmpHtml += "<div class='date'>" + boardData[strCnt + idx].wdate + "</div>";
        tmpHtml += "<div class='view'>" + boardData[strCnt + idx].view + "</div>";
        tmpHtml += "</div>";

        idx = idx + 1
    }

    $('.boardList').append(tmpHtml)

    showPagingData(boardData.length)

}

function getBoardData() {
    const req = {}

    fetch('/bbs/board',{
        method : "POST",
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(req),  
    })
     .then((res)=>res.json())
     .then((res)=>{
        if(res.success) {
            showBoardData(res.data)
        } else {
            alert(res.msg)
        }
     })
}