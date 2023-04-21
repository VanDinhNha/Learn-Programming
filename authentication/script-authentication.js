const login_form = document.querySelector(".login-form"); 
const register_form = document.querySelector(".register-form"); 
const tab_login = document.querySelector("#tab_login");
const tab_register = document.querySelector("#tab_register");
const url = location.href;

function handleError(err){
    window.location="/error.html";
}
getUrlVars(url)
function getUrlVars(url) {
    if(url !== undefined){
        const vars = {};
        const parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        show_form(vars["form"])
    }
}

function show_form(form){
    if(form === "login"){
        login_form.classList.remove("hidden");
        register_form.classList.add("hidden");
        tab_login.classList.add("tab-acctive")
        tab_register.classList.remove("tab-acctive")
    }
    else if(form === "register"){
        login_form.classList.add("hidden");
        register_form.classList.remove("hidden");
        tab_login.classList.remove("tab-acctive")
        tab_register.classList.add("tab-acctive")
    }
}