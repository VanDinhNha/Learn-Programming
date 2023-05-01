checkToken();

function checkToken(){
    const local = localStorage.getItem('jwt');
    const session = sessionStorage.getItem('jwt');
    if(local || session){
        window.location='/'
    }
}

document.querySelector("#login").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = this.elements["username"].value;
    const password = this.elements["password"].value;
    const cbx_login = this.elements["cbx_login"].checked;
    
    login(username, password, cbx_login).catch(handleError);
})

async function login(username, password, cbx_login){
    showLoad();
    const response = await fetch(urlLogin,{
        method: "POST",
        body: JSON.stringify({
            "USER_NAME": username, 
            "PASSWORD": password,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    closeLoad();
    const data = await response.json();
    cbx_login ?
        localStorage.setItem('jwt', data.Token) :
        sessionStorage.setItem('jwt', data.Token);
    data.Success ? 
        window.location='/' : 
        showNotification('error', data.Message);
}
//localStorage.removeItem('key');
//'Authorization': 'Bearer ' + token
