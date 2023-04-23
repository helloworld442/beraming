function checkLoginData(data) {
    fetch('/login', {
        method : 'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body: JSON.stringify(data),
    })
     .then((res)=>res.json())
     .then((res)=>{
        alert(res.msg);
        if(res.success) {
            data.idx = res.idx
            localStorage.setItem('user',JSON.stringify(data))
            document.location.href = "/";
        } 
     })
}



function handleSubmit(event) {
    event.preventDefault();

    const id = $('#id').val();
    const pw = $('#pw').val();

    const req = {
        id,
        pw,
    }

    checkLoginData(req)
}