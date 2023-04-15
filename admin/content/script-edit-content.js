const menu_main= document.querySelector("#menu_main");
const classify_menu= document.querySelector("#classify_menu");
const rankChek = document.querySelector("#rank_menu_child");
const file_upload = document.querySelector(".file-upload");
const title_file_upload = document.querySelector(".title-file-upload");
const btn_upload = document.querySelector(".btn-upload");
const file_upload_input = document.querySelector("#file-upload-input");
const review_image = document.querySelector(".review-image");
const detail = document.querySelector(".detail");

let arrRank = [];
let objMenu = {};
let arrContent = [];

async function loadDataMenu(){
    const response = await fetch(urlMenu);
    const menu_item = await response.json();
}

async function loadDatacLassifyMenu(){
    const response = await fetch(urlMenu);
    const menu_item = await response.json();
    menu_item.forEach(item => {
        objMenu[item.ID] = item.MENU;
        
        classify_menu.innerHTML += `<option value="${item.ID}">${item.NAME}</option>`;
    });
    closeLoading();
}

loadDatacLassifyMenu()//.catch(handleError);

async function loadDataContent(id){
    if(Object.keys(id).length > 0){
        const response = await fetch(urlContent + id);
        arrContent = await response.json();
        console.log(arrContent);
        //showDataContent(content_item, id);
    }
    closeLoading();
}
loadDataContent(getUrlVars(url)["id"])
function getUrlVars(url) {
    if(url !== undefined){
        const vars = {};
        const parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
}