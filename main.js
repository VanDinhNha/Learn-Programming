const checkMenu = document.querySelector("#menu_checkbox");
const menu = document.querySelector(".menu");
const mobile_menu_background = document.querySelector(".mobile-menu-background");
const icon_menu = document.querySelector(".icon-menu");
const btn_copy = document.querySelector(".btn-copy");
const content_body = document.querySelector(".content-body");
const menu_list = document.querySelector("#menu_list");
const url = location.href;


//const endpoint = "https://vandinhnha.github.io/Code_Forntend/data.json";
const endpoint = "./data.json"

const showMenuChild = (opj) => {
    if(opj.childNodes.length > 3)
        opj.childNodes[3].classList.toggle("menu-item__child");
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

function showMenuData(icon = "", title = "", child = ""){
    if(menu_list !== null){
        let template_child = "";
        if(child.length > 0 && Array.isArray(child)){
            child.forEach(item =>{
                template_child += `<a href="/?id=${item.id}" class="menu-item__link">
                    ${item.title}
                </a>`;
            })
        }
    
        const template = `<li class="menu-item" onclick="showMenuChild(this)">
            <div class="menu-item__parent">
                ${icon}
                <span class="menu-item__name">${title}</span>
            </div>
            <div class="menu-item__child">
                ${template_child}
            </div>
        </li>`
        menu_list.innerHTML += template;
    }
}

async function loadDataMenu(){
    const response = await fetch(endpoint);
    const menu_item = await response.json();
    menu_item.forEach(item => {
        if(item.basic.length > 0 && Array.isArray(item.basic)){
            item.basic.forEach(i => {
                showMenuData(i.icon, i.title, i.content);
            })
        }
    });
}

loadDataMenu();
//&lt;
function showDataContent(value){
    let template = `<div class="content-body-title">
            <span class="content-body-title--text">
                ${value.title}
            </span>
        </div>
        <p class="content-body--describe">${value.describe}</p>
        `
        if(value.attention.length > 0){
            template += `<P class="content-body--attention">Lưu ý: ${value.attention}</P>`
        }
        if(value.detail.length > 0){
            value.detail.forEach(itemDetail => {
                template += `<div class="content-body-detail">
            <label class="content-body-detail__title--text">${itemDetail.title}</label>
            <div class="content-body-detail__code">
                <button class="btn-copy" onclick="copy_code(this)">
                    <svg width="20px" height="20px" viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#ffffff" stroke="#ffffff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M768 832a128 128 0 0 1-128 128H192A128 128 0 0 1 64 832V384a128 128 0 0 1 128-128v64a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64h64z"></path><path fill="#ffffff" d="M384 128a64 64 0 0 0-64 64v448a64 64 0 0 0 64 64h448a64 64 0 0 0 64-64V192a64 64 0 0 0-64-64H384zm0-64h448a128 128 0 0 1 128 128v448a128 128 0 0 1-128 128H384a128 128 0 0 1-128-128V192A128 128 0 0 1 384 64z"></path></g></svg>
                </button>
                <deckgo-highlight-code language="${itemDetail.language}">
                    <code slot="code">`
                    for(let i = 0; i < Object.keys(itemDetail.code).length; i++){
                        template += `${itemDetail.code[""+i+""]}
`
                    }
                    template += `</code>
                </deckgo-highlight-code>`
                if(itemDetail.describeCode.length > 0){
                    template += `<p class="content-body-detail__code--describe">${itemDetail.describeCode}</p>`
                }
                if(itemDetail.attentionCode.length > 0){
                    template += `<P class="content-body-detail__code--attention">Lưu ý: ${itemDetail.attentionCode}</P>`
                }
                
                // <div class="cotent-body-detail__code--demo">
                    
                // </div>
           template += ` </div>
        </div>`
            })
        }
        console.log(template)
        content_body.innerHTML = template
}

async function loadDataContent(id){
    if(Object.keys(id).length > 0){
        const arrID = id.id.split('-');
        const response = await fetch(endpoint);
        const menu_item = await response.json();
        menu_item.forEach(item => {
            if(item.basic.length > 0 && Array.isArray(item.basic)){
                item.basic.forEach(itemContent => {
                    if(itemContent.id === arrID[0]){
                        itemContent.content.forEach(itemValue => {
                            if(itemValue.id === id.id){
                                console.log(itemValue);
                                showDataContent(itemValue);
                            }
                        })
                    }
                })
            }
        });
    }
}

function getUrlVars(url) {
    if(url !== undefined){
        const vars = {};
        const parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        loadDataContent(vars);
    }
}

getUrlVars(url)
