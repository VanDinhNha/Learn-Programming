const checkMenu = document.querySelector("#menu_checkbox");
const menu = document.querySelector(".menu");
const mobile_menu_background = document.querySelector(".mobile-menu-background");
const icon_menu = document.querySelector(".icon-menu");
const btn_copy = document.querySelector(".btn-copy");
const content_body = document.querySelector(".content-body");
const menu_list = document.querySelector("#menu_list");
const url = location.href;

const endpointMenu = "http://learn-programming-test.com/api/MENU";
const endpointContent = "http://learn-programming-test.com/api/CONTENT/";
// const endpoint = "./data.json"

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

function showMenuData(id = "", icon = "", name = "", menu_child){
    let template_child = "";
    if(menu_child !== null){
        if(menu_child.length > 0 && Array.isArray(menu_child)){
            menu_child.forEach(item =>{
                template_child += `<a href="/?id-menu=${id}&id-content=${item.ID_CONTENT}" id="${id}_${item.ID_CONTENT}" class="menu-item__link">
                    ${item.NAME}
                </a>`;
            })
        }
    }
    const template = `<li class="menu-item" id="${id}" onclick="showMenuChild(this)">
    <div class="menu-item__parent">
        <span class="menu-item__parent--line"></span>
        ${icon}
        <span class="menu-item__name">${name}</span>
        <span class="hover-text" aria-hidden="true">${name}</span>
    </div>
    <div class="menu-item__child">
        ${template_child}
    </div>
</li>`
    menu_list.innerHTML += template; 
}

async function loadDataMenu(){
    const response = await fetch(endpointMenu);
    const menu_item = await response.json();
    menu_item.forEach(item => {
        showMenuData(item.ID, item.ICON, item.NAME, item.MENU_CHILD);
    });
    getUrlVars(url)
}

loadDataMenu().catch(handleError);
//&lt;
function showDataContent(value, obj_id){
    let template = `<div class="content-body-title">
            <span class="content-body-title--text">
                ${value.TITLE}
            </span>
        </div>
        <p class="content-body--describe">${value.DESCRIBE}</p>
        `
    if(value.NOTE !== null){
        template += `<P class="content-body--attention">Lưu ý: ${value.NOTE}</P>`
    }
    if(value.CODE.length > 0){
        value.CODE.forEach(itemDetail => {
            template += `<div class="content-body-detail">
        <label class="content-body-detail__title--text">${itemDetail.TITLE}</label>
        <div class="content-body-detail__code">
            <button class="btn-copy" onclick="copy_code(this)">
                <svg width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"></path><path fill="#ffffff" d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"></path></g></svg>
            </button>
            <deckgo-highlight-code language="${itemDetail.LANGUAGE}">
            <code slot="code">${itemDetail.CODE}</code>
            </deckgo-highlight-code>`
            if(itemDetail.DESCRIBE !== null){
                template += `<p class="content-body-detail__code--describe">${itemDetail.DESCRIBE}</p>`
            }
            if(itemDetail.NOTE !== null){
                template += `<P class="content-body-detail__code--attention">Lưu ý: ${itemDetail.NOTE}</P>`
            }
            
            // <div class="cotent-body-detail__code--demo">
                
            // </div>
        template += ` </div>
    </div>`
        })
    }
    content_body.innerHTML = template
    const acctiveMenu = document.getElementById(obj_id["id-menu"]);
    showMenuChild(acctiveMenu, obj_id);
}

async function loadDataContent(id){
    if(Object.keys(id).length > 0){
        const response = await fetch(endpointContent + id["id-content"]);
        const content_item = await response.json();
        showDataContent(content_item, id);
    }
    Loading.removeAttribute("style");
}

function getUrlVars(url) {
    if(url !== undefined){
        const vars = {};
        const parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        loadDataContent(vars).catch(handleError);;
    }
}

function handleError(err){
    window.location="/error.html";
}
