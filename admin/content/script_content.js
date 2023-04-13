const menu_main= document.querySelector("#menu_main");
const classify_menu= document.querySelector("#classify_menu");
const rankChek = document.querySelector("#rank_menu_child");
const file_upload = document.querySelector(".file-upload");
const title_file_upload = document.querySelector(".title-file-upload");
const btn_upload = document.querySelector(".btn-upload");
const file_upload_input = document.querySelector("#file-upload-input");
const review_image = document.querySelector(".review-image");
const detail = document.querySelector(".detail");

let count_img = 0;
let count_detail = 0;
let count_detail_img = 0;
let arrRank = [];
let arrMenu = {};
let fileImage = {};
let fileImageDetail = {};
let objDetail = {};

async function getAllRank(id){
    const response = await fetch(urlRankMenuChild + id);
    arrRank = await response.json();
}

rankChek.addEventListener("keyup", debounceFn(function (e) {
    menu_main.value !== "NONE" ?
        arrRank.includes(Number(rankChek.value)) ? 
        rankChek.setAttribute("style", "border-color: red") : 
        rankChek.removeAttribute("style")
    :
    rankChek.setAttribute("style", "border-color: red")
}, 100))

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

async function loadDatacLassifyMenu(){
    const response = await fetch(urlMenu);
    const menu_item = await response.json();
    menu_item.forEach(item => {
        arrMenu[item.ID] = item.MENU;
        classify_menu.innerHTML += `<option value="${item.ID}">${item.NAME}</option>`;
    });
    closeLoading();
}

loadDatacLassifyMenu().catch(handleError);

function loadDataMenu(id){
    menu_main.innerHTML = '<option value="NONE">Chọn ...</option>';
    arrMenu[id].forEach(item => {
        menu_main.innerHTML += `<option value="${item.ID}">${item.NAME}</option>`
    });
    closeLoading();
}

file_upload.addEventListener('dragover', (event) => {
    event.preventDefault();
    title_file_upload.textContent = 'Thả ra để tải ảnh lên';
})

file_upload.addEventListener('dragleave', (event) => {
    event.preventDefault();
    title_file_upload.textContent = 'Kéo thả hình ảnh vào đây'
})

file_upload.addEventListener('drop', (event) => {
    event.preventDefault();
    for (let i = 0; i < event.dataTransfer.files.length; i++) {
        const image = event.dataTransfer.files[i];
        show_file_upload(image, i);
        if (i > 8) {
            alert('chỉ dc đăng tối đa 10 file cùng một nội dung')
            break
        }
    }
    title_file_upload.textContent = 'Kéo thả hình ảnh vào đây'
})

btn_upload.addEventListener('click', () => {
    file_upload_input.click();
})

file_upload_input.addEventListener('change', () => {
    for (let i = 0; i < file_upload_input.files.length; i++) {
        const image = file_upload_input.files[i];
        show_file_upload(image);
        if (i > 8) {
            alert('chỉ dc đăng tối đa 10 file cùng một nội dung')
            break
        }
    }
    file_upload_input.value = ''
})

function show_file_upload(Image){
    if(Image.type.substring(0, 6) === "image/"){
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageBase64 = reader.result;
            fileImage[count_img] = {
                ["IMAGE"]: imageBase64,
                ["DESCRIBE"]: null,
                ["TYPE"]: Image.type
            }
            const template = `<div class="item-image">
                <img class="image" src="${imageBase64}" alt="image">
                <div class="image-infomation">
                    <p class="name-image">${Image.name}</p>
                    <p class="size-image">${(Image.size / 1024).toFixed(1)} kb</p>
                    <input type="text" class="form-control" spellcheck="false" onkeyup="describe_image(this.value, ${count_img});">
                </div>
                <button onclick="remove_image(this, ${count_img});" id="btn_remove_img" class="btn bg-red btn-remove-image">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path></g></svg>
                </button>
            </div>`
            console.log(review_image.childNodes);
            review_image.innerHTML += template;
            count_img++;
        }
        reader.readAsDataURL(Image);
    }
    else{
        const template = `<div class="item-image-error">
                            <div class="image-infomation">
                                <p class="name-image">File ${Image.name} không được hỗ trợ</p>
                            </div>
                            <button onclick="remove_image(this);" class="btn bg-red btn-remove-image">
                                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path></g></svg>
                            </button>
                        </div>`
        review_image.innerHTML += template;       
    }
}
function describe_image(value, count_describe){
    fileImage[count_describe]["DESCRIBE"] = value;
}
// function debounce(func, delay) {
//     let timeoutId;
//     return function(...args) {
//       if(timeoutId) {
//         clearTimeout(timeoutId);
//       }
//       timeoutId = setTimeout(() => {
//         func.apply(this, args);
//       }, delay);
//     };
//   }
function remove_image(obj, count_img){
    if(count_img !== undefined)
        delete fileImage[count_img];
    obj.parentNode.remove();
}

function add_detail(){
    const template = `<div class="content--detail">
        <button onclick="remove_detail(this, ${count_detail});" class="btn bg-red btn-remove--detail">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path></g></svg>
        </button>
        <h2 class="text-center color-text">Nội Dung Chi Tiết</h2>
        <div class="layout--detail">
            <div class="layout-item--detail">
                <label class="color-text" for="name">Tiêu Đề</label>
                <input class="form-control" onkeyup="detail_value(this.value, 'TITLE', ${count_detail});" autocomplete="off" spellcheck="false" type="text" name="title" id="title_detail_${count_detail}">
            </div>
            <div class="layout-item--detail">
                <label class="color-text" for="language">Ngôn Ngữ</label> 
                <input type="text" class="form-control" onkeyup="detail_value(this.value, 'LANGAUGE', ${count_detail});" spellcheck="false" name="language" id="language_detail_${count_detail}">
            </div>
            <div class="layout-item--detail">
                <label class="color-text" for="code">CODE</label>
                <textarea class="form-control" onkeyup="detail_value(this.value, 'CODE', ${count_detail});" spellcheck="false" rows="3" id="code_detail_${count_detail}"></textarea>
            </div>
            <div class="layout-item--detail">
                <label class="color-text" for="describe-detail">Mô tả</label>
                <textarea class="form-control" spellcheck="false" onkeyup="detail_value(this.value, 'DESCRIBE', ${count_detail});" rows="3" id="describe_etail_${count_detail}"></textarea>
            </div>
            <div class="layout-item--detail">
                <label class="color-text" for="note-detail">Ghi Chú</label>
                <textarea class="form-control" onkeyup="detail_value(this.value, 'NOTE', ${count_detail});" spellcheck="false" rows="3" id="note_detail_${count_detail}"></textarea>
            </div>
            <div class="layout-item--detail">
                <div class="file-upload-container--detail">
                    <div class="file-upload--detail" ondragover="dragover_detail(this)" ondragleave="dragleave_detail(this)" >
                        <div class="center" style="line-height: 40px;">
                            <p class="title-file-upload--detail">Kéo thả hình vào đây</p>
                            <p class="text-center color-text">Hoặc</p>
                            <button onclick="upload_image_detail(this, ${count_detail});" id="btn_upload_detail" class="btn-upload--detail">
                                Chọn Hình
                                <span>
                                    <svg viewBox="0 0 1024 1024" class="icon" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M771.676772 844.966484l-493.818868-2.409202C155.877326 826.595933 63.123554 722.814917 63.123554 597.698178c0-130.716368 102.592286-238.521254 231.509687-246.711313 49.19257-103.481018 153.09031-169.576911 268.529285-169.576911 163.496056 0 296.588862 132.64332 297.338346 295.968388 60.968276 35.243157 98.267394 99.284112 98.267394 170.402163 0 97.314157-71.032044 179.008943-165.167037 194.371318l-21.924457 2.814661z m-459.914953-43.849937l458.661718-0.48225c81.031308-4.62489 144.493769-71.770266 144.493768-152.854816 0-59.084327-33.145216-111.895308-86.501928-137.82418l-12.921432-6.284608 0.888732-19.292047c0.127986-1.87371 0.267234-3.736158 0.267234-5.63137 0-139.772633-113.715776-253.488409-253.488409-253.488409-102.463276 0-194.264834 61.086022-233.875886 155.627498l-5.598605 13.370918-14.495144 0.086007c-111.499064 0.653239-202.219399 91.876302-202.2194 203.353864 0 108.704881 85.142208 197.830003 193.825588 202.904379l10.963764 0.515014z" fill="#ffffff"></path><path d="M532.875998 390.961396L370.321916 553.516502l34.921657 34.921657 102.935287-102.935287V711.5317h49.385061V485.502872l102.934263 102.935287 34.93292-34.921657z" fill="#abd3f2"></path></g></svg>
                                </span>
                            </button>
                            <input class="file-upload-input" type="file" multiple accept="image/*" id="file-upload-input--detail" name="file-upload-input--detail" />
                        </div>
                    </div>
                    <div class="review-image--detail"></div>
                </div>
            </div>
        </div>
    </div>`;
    detail.innerHTML += template;
     objDetail[count_detail] = {
        "TITLE": null,
        "LANGAUGE": null,
        "CODE": null,
        "DESCRIBE": null,
        "NOTE": null,
        "IMAGE_DATA": {}
    }
    count_detail++;
}

function detail_value(value, key, count_detail){
    objDetail[count_detail][key] = value;
}
function dragover_detail(obj){
    obj.childNodes[1].childNodes[1].textContent = 'Thả ra để tải ảnh lên';
}
function dragleave_detail(obj){
    obj.childNodes[1].childNodes[1].textContent = 'Kéo thả hình vào đây';
}
// function drop_detail(e){
//     e.preventDefault();
//     const image = e.dataTransfer.files[0];
//     obj.childNodes[1].childNodes[1].textContent = 'Kéo thả hình vào đây';
// }
// let a = document.querySelector(".file-upload--detail");
// console.log(a);
// a.addEventListener('drop', (event) => {
//     event.preventDefault();
//     const image = event.dataTransfer.files[i];
//     console.log(image);
// })
function upload_image_detail(obj, count_detail){
    obj.nextElementSibling.click();
    obj.nextElementSibling.addEventListener('change', () => {
        for (let i = 0; i < obj.nextElementSibling.files.length; i++) {
            const image = obj.nextElementSibling.files[i];
            show_file_upload_detail(obj, image, count_detail);
            if (i > 8) {
                alert('chỉ dc đăng tối đa 10 file cùng một nội dung')
                break
            }
        }
        obj.nextElementSibling.value = ''
    })
}
function show_file_upload_detail(obj, Image, count_detail){
    if(Image.type.substring(0, 6) === "image/"){
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageBase64 = reader.result;
            objDetail[count_detail]["IMAGE_DATA"][count_detail_img] = {
                ["IMAGE"]: imageBase64,
                ["DESCRIBE"]: null,
                ["TYPE"]: Image.type
            }
            const template = `<div class="item-image">
                <img class="image" src="${imageBase64}" alt="image">
                <div class="image-infomation">
                    <p class="name-image">${Image.name}</p>
                    <p class="size-image">${(Image.size / 1024).toFixed(1)} kb</p>
                    <input type="text" class="form-control" spellcheck="false" onkeyup="describe_image_detail(this.value, ${count_detail}, ${count_detail_img});">
                </div>
                <button onclick="remove_image_detail(this, ${count_detail}, ${count_detail_img});" class="btn bg-red btn-remove-image">
                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path></g></svg>
                </button>
            </div>`
            obj.parentNode.parentNode.nextElementSibling.innerHTML += template;
            count_detail_img++;
        }
        reader.readAsDataURL(Image);
    }
    else{
        const template = `<div class="item-image-error">
                            <div class="image-infomation">
                                <p class="name-image">File ${Image.name} không được hỗ trợ</p>
                            </div>
                            <button onclick="remove_image(this);" class="btn bg-red btn-remove-image">
                                <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path></g></svg>
                            </button>
                        </div>`
        review_image.innerHTML += template;       
    }
}

function remove_detail(obj, count_detail){
    delete objDetail[count_detail];
    obj.parentNode.remove();
}

function describe_image_detail(value, count_detail, count_detail_img){
    objDetail[count_detail]["IMAGE_DATA"][count_detail_img]["DESCRIBE"] = value;
}

function remove_image_detail(obj, count_detail, count_detail_img){
    if(count_detail !== undefined && count_detail_img !== undefined)
        delete objDetail[count_detail]["IMAGE_DATA"][count_detail_img];
    obj.parentNode.remove();
}
//nhận message from web api
async function save(){
    const ID_MENU = document.querySelector("#menu_main").value;
    const ID_CLASSIFY = document.querySelector("#classify_menu").value;
    const NAME = document.querySelector("#name_menu_child").value;
    const RANK = document.querySelector("#rank_menu_child").value;
    const DESCRIBE = document.querySelector("#describe").value;
    const NOTE = document.querySelector("#note").value;
    if(ID_CLASSIFY === "NONE"){
        alert('chưa chọn phân loại menu')
        return;
    }
    if(ID_MENU === "NONE"){
        alert('chưa chọn menu');
        return;
    }
    if(NAME === ""){
        alert('chưa nhập tên menu con');
        return;
    }
    if(RANK === ""){
        alert('chưa nhập tên thứ tự');
        return;
    }
    if(arrRank.includes(Number(rankChek.value))){
        alert('số thứ tự đã tồn tại');
        return;
    }
    showLoading();
    const respomse = await fetch(urlContentLocal,{
        method: "POST",
        body: JSON.stringify({
            "ID_MENU": ID_MENU,
            "RANK": RANK,
            "NAME": NAME, 
            "DESCRIBE": DESCRIBE, 
            "NOTE": NOTE, 
            "IMAGES": JSON.stringify(fileImage),
            "DETAIL": JSON.stringify(objDetail)
        }),
        headers: {
            "Content-type": "application/json; charset=UTF-8",
        },
    });
    closeLoading()
    console.log(respomse);
    respomse.status === 200 ? alert('thêm thành công') : alert('thêm thất bại')
}