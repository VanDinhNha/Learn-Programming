const btn_copy = document.querySelector(".btn-copy");
const content_body = document.querySelector(".content-body");
const url = location.href;

function scrolledWindow(event){
    if(menu.classList.contains("toggle-menu")){
        window.pageYOffset > 0 ? 
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
    const response = await fetch(urlMenu);
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
    if(value.IMAGE !== null){
        template += `<img src="/image/${value.IMAGE}" alt="image" class="content-body--image"/>`
    }
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
            // if(itemDetail.IMAGE !== null){
            //     template += `<img src="/image/${itemDetail.IMAGE}" alt="image" class="content-body-detail__image"/>`
            // }
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
        const response = await fetch(urlContent + id["id-content"]);
        const content_item = await response.json();
        console.log(content_item);
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
        loadDataContent(vars).catch(handleError);
    }
}

function handleError(err){
    window.location="/error.html";
}
