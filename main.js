const checkMenu = document.querySelector("#menu_checkbox");
const menu = document.querySelector(".menu");
const mobile_menu_background = document.querySelector(".mobile-menu-background");
const icon_menu = document.querySelector(".icon-menu");
const btn_copy = document.querySelector(".btn-copy");

const endpoint = "https://vandinhnha.github.io/Code_Forntend/data.json";
//const endpoint = "./data.json"
const menu_list = document.querySelector("#menu_list");

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

function showMenu(icon = "", title = "", child = ""){
    let template_child = "";
    if(child.length > 0 && Array.isArray(child)){
        child.forEach(item =>{
            template_child += `<a href="#" class="menu-item__link">
                ${item.title}
            </a>`;
        })
    }

    const template = `<li class="menu-item" onclick="selectMenu(this)">
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

async function showData(){
    const response = await fetch(endpoint);
    const menu_item = await response.json();
    menu_item.forEach(item => {
        if(item.basic.length > 0 && Array.isArray(item.basic)){
            item.basic.forEach(i => {
                showMenu(i.icon, i.title, i.content);
            })
        }
    });
}

showData();

function getUrlVars(url) {
    var vars = {};
    var parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

const url = location.href;
//location.href = 'http://127.0.0.1:5500/test.html?ok="quá ok"';
//console.log(getUrlVars(url));

// "visual-code":
//             "git": 
//             "html": 
//             "css": 
//             "javascript": 
//                     {
//                         "id": "2",
//                         "content": {
//                             "title": "Chèn Javascript vào HTML",
//                             "describe": "Để chèn Javascript vào HTML ta có 2 cách",
//                             "attention": "Chú ý; klksalkadlala ndsanlksan  ákldlák",
//                             "detail": {
//                                 "detail_1": {
//                                     "title": "cách 1",
//                                     "code": {
//                                         "1": "function scrolledMenu(){",
//                                         "2": "    if(!menu.classList.contains(\"toggle-menu\")){",
//                                         "3": "        menu.scrollTop > 30 ?",
//                                         "4": "        icon_menu.setAttribute(\"style\", `margin-top: -${menu.scrollTop}px`) :",
//                                         "5": "        icon_menu.removeAttribute(\"style\")",
//                                         "6": "    }",
//                                         "7": "}"
//                                     },
//                                     "describeCode": "đây là code test",
//                                     "attentionCode": ""
//                                 }
//                             }
//                         }
//                     }
//                 ]
//             }


// [
//     {
//         "id": "1",
//         "content": {
//             "title": "Chèn Javascript vào HTML",
//             "describe": "Để chèn Javascript vào HTML ta có 2 cách",
//             "attention": "Chú ý; klksalkadlala ndsanlksan  ákldlák",
//             "detail": {
//                 "detail_1": {
//                     "title": "cách 1",
//                     "code": {
//                         "1": "function scrolledMenu(){",
//                         "2": "    if(!menu.classList.contains(\"toggle-menu\")){",
//                         "3": "        menu.scrollTop > 30 ?",
//                         "4": "        icon_menu.setAttribute(\"style\", `margin-top: -${menu.scrollTop}px`) :",
//                         "5": "        icon_menu.removeAttribute(\"style\")",
//                         "6": "    }",
//                         "7": "}"
//                     },
//                     "describeCode": "đây là code test",
//                     "attentionCode": ""
//                 }
//             }
//         }
//     }
// ]

