const form = document.querySelector("#form_add_menu");
const rankChek = document.querySelector("#rank");
const iconReview = document.querySelector("#icon");
const review_icon = document.querySelector(".review-icon");
const list_classify = document.querySelector("#classify");
let arrRank = [];

getAllClassify().catch(handleError);

async function getAllClassify(){
    const response = await fetch(urlClassify);
    const classify_item = await response.json();
    classify_item.forEach(item => {
        list_classify.innerHTML += `<option value="${item.ID}">${item.NAME}</option>`
    });
    closeLoading();
    //getAllRank().catch(handleError);
}

async function getAllRankMenu(value){
    const response = await fetch(urlRankMenu + value);
    arrRank = await response.json();
}

async function addMenu(classify, name, rank, icon){
    if(classify === "NONE"){
        alert('chưa chọn phân loại menu')
        return;
    }
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
        method: "POST",
        body: JSON.stringify({
            "ID_CLASSIFY_MENU": classify, "NAME": name, "RANK": rank, "ICON": icon,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    Loading.removeAttribute("style");
    //cần sửa ko reload và tìm cách nhận message từ server
    respomse.status === 200 ? 
        alert('thêm thành công') & location.reload() : 
        alert('thêm thất bại')
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
    const classify = this.elements["classify"].value;
    addMenu(classify, name, rank, icon);
})