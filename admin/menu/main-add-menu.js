const form = document.querySelector("#form_add_menu");
const rankChek = document.querySelector("#rank");
const iconReview = document.querySelector("#icon");
const review_icon = document.querySelector(".review-icon");
let arrRank = [];

async function getAllRank(){
    const response = await fetch(urlRankMenu);
    arrRank = await response.json();
    Loading.removeAttribute("style");
}

getAllRank().catch(handleError);

async function addMenu(name, rank, icon){
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
    const respomse = await fetch(urlMenu,{
        method: "POST",
        body: JSON.stringify({
            "NAME": name, "RANK": rank, "ICON": icon,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    //console.log(response);
    Loading.removeAttribute("style");
    respomse.status === 200 ? alert('thêm thành công') : alert('thêm thất bại')
}
rankChek.addEventListener("keyup", debounceFn(function (e) {
    arrRank.includes(Number(rankChek.value)) ? 
    rankChek.setAttribute("style", "border-color: red") : 
    rankChek.removeAttribute("style")
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

form.addEventListener("submit", function (e) {
    e.preventDefault();
    const name = this.elements["name"].value;
    const rank = this.elements["rank"].value;
    const icon = this.elements["icon"].value;
    addMenu(name, rank, icon);
})