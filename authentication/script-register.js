checkToken();

function checkToken(){
    const local = localStorage.getItem('jwt');
    const session = sessionStorage.getItem('jwt');
    if(local || session){
        window.location='/'
    }
}

document.querySelector("#register").addEventListener("submit", function (e) {
    e.preventDefault();
    const username = this.elements["username"].value;
    const displayname = this.elements["displayname"].value;
    const email = this.elements["email"].value;
    const password = this.elements["password"].value;
    const confirm_password = this.elements["confirm_password"].value;
    const cbx_register = this.elements["cbx_register"].checked;
    
    addUser(username, displayname, email, password, confirm_password, cbx_register).catch(handleError);
})

async function addUser(username, displayname, email, password, confirm_password, cbx_register){
    showLoad();
    const response = await fetch(urlRegister,{
        method: "POST",
        body: JSON.stringify({
            "USER_NAME": username, 
            "DISPLAY_NAME": displayname, 
            "EMAIL": email, 
            "PASSWORD": password,
            "CONFIRM_PASSWORD": confirm_password,
            "CBX_REGISTER": cbx_register,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    closeLoad();
    const data = await response.json();
    data.Success ? 
        window.location='./login.html' : 
        showNotification('error', data.Message)
}