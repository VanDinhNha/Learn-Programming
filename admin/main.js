const checkMenu = document.querySelector("#menu_checkbox");
const menu = document.querySelector(".menu");
const mobile_menu_background = document.querySelector(".mobile-menu-background");
const icon_menu = document.querySelector(".icon-menu");
const menu_list = document.querySelector("#menu_list");
const form = document.querySelector("#form_add_menu");
let arrRank = [];

const urlCheckRank = "http://learn-programming-test.com/api/RANK";
const urlPostMenu = "http://learn-programming-test.com/api/MENU";

const showMenuChild = (obj, obj_id = null) => {
    if(obj !== null){
        if(obj.childNodes.length > 3){
            obj.childNodes[1].childNodes[1].classList.toggle("acctive__menu-item__parent--line")
            obj.childNodes[3].classList.toggle("menu-item__child");
            obj.childNodes[1].classList.toggle("acctive__menu-item__parent")
            obj.childNodes[1].childNodes[7].classList.toggle("acctive__hover-test")
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

function scrolledWindow(event){
    if(menu.classList.contains("toggle-menu")){
        window.pageYOffset > 0 ? 
        icon_menu.setAttribute("style", `margin-top: -${window.pageYOffset}px`) : 
        icon_menu.removeAttribute("style")
    }
}
window.addEventListener('scroll', scrolledWindow);

async function getAllRank(){
    const response = await fetch(urlCheckRank);
    arrRank = await response.json();
}

getAllRank().catch(handleError);

function handleError(err){
    window.location="/error.html";
}

async function addMenu(name, rank, icon){
    const respomse = await fetch(urlPostMenu,{
        method: "POST",
        body: JSON.stringify({
            "NAME": name, "RANK": rank, "ICON": icon,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    })
    console.log(respomse.status);
}

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = this.elements["name"].value;
    const rank = this.elements["rank"].value;
    const icon = this.elements["icon"].value;
    addMenu(name, rank, icon);
})