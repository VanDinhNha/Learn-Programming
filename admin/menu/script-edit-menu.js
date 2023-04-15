const form = document.querySelector("#form_edit_menu");
const name = document.querySelector("#name");
const rank = document.querySelector("#rank");
const icon = document.querySelector("#icon");
const review_icon = document.querySelector(".review-icon");
let arrRank = [];

async function getAllRank(id){
    const response = await fetch(urlRankMenu+id);
    arrRank = await response.json();
    showValueMenu(getUrlVars(url)["id-menu"]).catch(handleError);
}

getAllRank(getUrlVars(url)["id-classify"]).catch(handleError);

function getUrlVars(url) {
    if(url !== undefined){
        const vars = {};
        const parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
}

async function showValueMenu(id){
    const response = await fetch(urlMenu + id);
    const data = await response.json();
    name.value = data.NAME;
    rank.value = data.RANK;
    icon.value = data.ICON;
    review_icon.innerHTML = data.ICON;
    Loading.removeAttribute("style");
}

async function editMenu(id, name, rank, icon){
    if(name === ""){
        alert('chưa nhập tên');
        return;
    }
    if(rank === ""){
        alert('chưa nhập rank');
        return;
    }
    if(icon === ""){
        alert('chưa nhập icon');
        return;
    }
    Loading.setAttribute("style", "display: flex;");
    const respomse = await fetch(urlMenuLocal,{
        method: "PATCH",
        body: JSON.stringify({
            "ID": id, "NAME": name, "RANK": rank, "ICON": icon,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    Loading.removeAttribute("style");
    respomse.status === 200 ? alert('Sửa thành công') : alert('Sủa thất bại')
}
rank.addEventListener("keyup", debounceFn(function (e) {
    arrRank.includes(Number(rank.value)) ? 
    rank.setAttribute("style", "border-color: red") : 
    rank.removeAttribute("style")
}, 100))

function reviewIcon(obj){
    review_icon.innerHTML = obj.value;
}

function debounceFn(func, wait, immediate) {
    let timeout;
    return function () {
        let context = this,
            args = arguments;
        let later = function () {
            timeout = null;
            if (!immediate) func.apply(context, args);
        };
        let callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if(callNow) func.apply(context, args);
    };
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    editMenu(getUrlVars(url)["id-menu"], name.value, rank.value, icon.value)//.catch(handleError);
})