const menu_main= document.querySelector("#menu_main");
const rankChek = document.querySelector("#rank_menu_child");
const file_upload = document.querySelector(".file-upload");
const title_file_upload = document.querySelector(".title-file-upload");
const btn_upload = document.querySelector(".btn-upload");
const file_upload_input = document.querySelector(".file-upload-input");
const review_image = document.querySelector(".review-image");

let arrRank = [];
let fileImage = [];

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

async function loadDataMenu(){
    const response = await fetch(urlMenu);
    const menu_item = await response.json();
    menu_item.forEach(item => {
        menu_main.innerHTML += `<option value="${item.ID}">${item.NAME}</option>`
    });
    Loading.removeAttribute("style");
}

loadDataMenu().catch(handleError);

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
        show_file_upload(image, i);
        if (i > 8) {
            alert('chỉ dc đăng tối đa 10 file cùng một nội dung')
            break
        }
    }
})

function show_file_upload(Image, i){
    console.log(Image.type.substring(0, 6));
    if(Image.type.substring(0, 6) === "image/"){
        const reader = new FileReader();
        reader.onload = (event) => {
            const imageBase64 = reader.result;
            //fileImage.push(imageBase64)
            const template = `<div class="item-image">
                                <img class="image" src="${imageBase64}" alt="image">
                                <div class="image-infomation">
                                    <p class="name-image">${Image.name}</p>
                                    <p class="size-image">${(Image.size / 1024).toFixed(1)} kb</p>
                                </div>
                                <button onclick="remove_image(this);" class="btn bg-red btn-remove-image">
                                    <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#ffffff" d="M195.2 195.2a64 64 0 0 1 90.496 0L512 421.504 738.304 195.2a64 64 0 0 1 90.496 90.496L602.496 512 828.8 738.304a64 64 0 0 1-90.496 90.496L512 602.496 285.696 828.8a64 64 0 0 1-90.496-90.496L421.504 512 195.2 285.696a64 64 0 0 1 0-90.496z"></path></g></svg>
                                </button>
                            </div>`
                            review_image.innerHTML += template;
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
function remove_image(obj){
    obj.parentNode.remove();
}

