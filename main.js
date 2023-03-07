const checkMenu = document.querySelector("#menu_checkbox");
const menu = document.querySelector(".menu");
const mobile_menu_background = document.querySelector(".mobile-menu-background");
const icon_menu = document.querySelector(".icon-menu");
const btn_copy = document.querySelector(".btn-copy");

const selectMenu = (opj) => {
    if(opj.childNodes.length > 3)
        opj.childNodes[3].classList.toggle("menu-item__child");
};

checkMenu.onclick = (e) => {
    menu.classList.toggle("toggle-menu");
    mobile_menu_background.hasAttribute("style") ?
    mobile_menu_background.removeAttribute("style") :
    mobile_menu_background.setAttribute("style", "display: block")
};

function scrolledMenu(){
    if(!menu.classList.contains("toggle-menu")){
        menu.scrollTop > 30 ? 
        icon_menu.setAttribute("style", `margin-top: -${menu.scrollTop}px`) : 
        icon_menu.removeAttribute("style")
    }
}
menu.addEventListener('scroll', scrolledMenu);

function scrolledWindow(event){
    if(menu.classList.contains("toggle-menu")){
        window.pageYOffset > 30 ? 
        icon_menu.setAttribute("style", `margin-top: -${window.pageYOffset}px`) : 
        icon_menu.removeAttribute("style")
    }
}
window.addEventListener('scroll', scrolledWindow);

const copy_code = (opj) => {
    navigator.clipboard.writeText(opj.parentElement.childNodes[3].childNodes[1].textContent)
}

