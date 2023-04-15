const checkMenu = document.querySelector("#menu_checkbox");
const menu = document.querySelector(".menu");
const mobile_menu_background = document.querySelector(".mobile-menu-background");
const icon_menu = document.querySelector(".icon-menu");
const menu_ul_li = document.querySelector(".menu-ul-li");

const url = location.href;
const urlRankMenu = "http://learn-programming-test.com/api/RANK_MENU/";
const urlRankMenuChild = "http://learn-programming-test.com/api/RANK_MENU_CHILD/";
const urlMenu = "http://learn-programming-test.com/api/MENU/";
const urlMenuLocal = "https://localhost:44358/api/MENU/";
const urlContent = "http://learn-programming-test.com/api/CONTENT/";
const urlContentLocal = "https://localhost:44358/api/CONTENT/";
const urlClassify = "http://learn-programming-test.com/api/CLASSIFY/";

const showMenuChild = (obj, obj_id = null) => {
    if(obj !== null){
        if(obj.childNodes.length > 3){
            obj.childNodes[1].childNodes[1].classList.toggle("acctive__menu-item__parent--line")
            obj.childNodes[3].classList.toggle("menu-item__child");
            obj.childNodes[1].classList.toggle("acctive__menu-item__parent")
            obj.childNodes[1].childNodes[7].classList.toggle("acctive__hover-text")
            if(obj_id !== null){
                const menuChild = document.getElementById(obj_id["id-menu"]+"_"+obj_id["id-content"]);
                menuChild.classList.add("acctive__menu-item__link");
            }
        }
    }
};

checkMenu.onclick = (e) => {
    acctiveMenu();
};

const acctiveMenu = () => {
    menu.classList.toggle("toggle-menu");
    mobile_menu_background.hasAttribute("style") ?
    mobile_menu_background.removeAttribute("style") :
    mobile_menu_background.setAttribute("style", "display: block")
}

function scrolledMenu(){
    if(!menu.classList.contains("toggle-menu")){
        menu.scrollTop > 0 ? 
        icon_menu.setAttribute("style", `margin-top: -${menu.scrollTop}px`) : 
        icon_menu.removeAttribute("style")
    }
}
menu.addEventListener('scroll', scrolledMenu);

// function scrolledWindow(event){
//     if(menu.classList.contains("toggle-menu")){
//         window.pageYOffset > 0 ? 
//         icon_menu.setAttribute("style", `margin-top: -${window.pageYOffset}px`) : 
//         icon_menu.removeAttribute("style")
//     }
// }
// window.addEventListener('scroll', scrolledWindow);

function handleError(err){
    window.location="/error.html";
}

function showModal(id, title, content){
    const modal = document.querySelector(".bg-modal");
    const modal_title = document.querySelector(".modal-title");
    const modal_body = document.querySelector(".modal-body");
    const btn_submit = document.querySelector("#btn-submit");

    modal_body.textContent = content;
    modal_title.textContent = title;
    modal.setAttribute("style", "display: grid;");
    btn_submit.setAttribute("onclick", `Delete('${id}').catch(handleError);`)//.catch(handleError)
}

function closeModal(){
    const modal = document.querySelector(".bg-modal");
    modal.removeAttribute("style");
}

function showLoading(){
    const loading = document.querySelector(".loading");
    loading.setAttribute("style", "display: flex;");
}
function closeLoading(){
    const loading = document.querySelector(".loading");
    loading.removeAttribute("style");
}

