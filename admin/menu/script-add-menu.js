let arrRank = [];

getAllClassify().catch(handleError);

async function getAllClassify(){
    const list_classify = document.querySelector("#classify");
    const response = await fetch(urlClassify);
    const classify_item = await response.json();
    classify_item.forEach(item => {
        list_classify.innerHTML += `<option value="${item.ID}">${item.NAME}</option>`
    });
    closeLoad();
}

async function getAllRankMenu(value){
    const response = await fetch(urlRankMenu + value);
    arrRank = await response.json();
}

document.querySelector('#classify').addEventListener('change', (e) => {
    getAllRankMenu(e.target.value).catch(handleError)
});

document.querySelector("#rank").addEventListener("keyup", debounceFn(function (e) {
    arrRank.includes(Number(e.target.value)) ? 
    document.querySelector("#rank").setAttribute("style", "border-color: red") : 
    document.querySelector("#rank").removeAttribute("style")
}, 500))

document.querySelector('#icon').addEventListener('input', debounceFn(function (e) {
        document.querySelector(".review-icon").innerHTML = e.target.value;
}, 500))

document.querySelector("#form_add_menu").addEventListener("submit", function (e) {
    e.preventDefault();
    const name = this.elements["name"].value;
    const rank = this.elements["rank"].value;
    const icon = this.elements["icon"].value;
    const classify = this.elements["classify"].value;
    if(classify === "NONE"){
        alert('chưa chọn phân loại menu')
        return;
    }
    if(name === ""){
        alert('chưa nhập tên');
        return;
    }
    if(rank === ""){
        alert('chưa nhập cấp độ');
        return;
    }
    if(icon === ""){
        alert('chưa nhập icon');
        return;
    }
    if(arrRank.includes(Number(rank))){
        if(confirm('cấp độ này đã tồn tại, bạn có muốn sắp sếp lại cấp độ menu không') === false){
            return;
        }
    }
    addMenu(classify, name, rank, icon).catch(handleError);
})

async function addMenu(classify, name, rank, icon){
    showLoad();
    const respomse = await fetch(urlMenu,{
        method: "POST",
        body: JSON.stringify({
            "ID_CLASSIFY_MENU": classify, "NAME": name, "RANK": rank, "ICON": icon,
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    closeLoad();
    respomse.status === 200 ? 
        alert('thêm thành công') & location.reload() : 
        alert('thêm thất bại')
}