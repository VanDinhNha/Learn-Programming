const table = document.querySelector("#table_content");
const classify_menu = document.querySelector("#classify_menu");
const menu_main = document.querySelector("#menu_main");
let arrClassify = [];

async function getAPILassify(){

    const response = await fetch(urlMenu);
    arrClassify = await response.json();
    loadDatacLassify();
}
getAPILassify()//.catch(handleError);

function loadDatacLassify(){    
    let count = 0;
    menu_main.innerHTML = `<option value="NONE">Chọn ...</option>`;
    arrClassify.forEach(element => {
        classify_menu.innerHTML += `<option value="${count}">${element.NAME}</option>`
        count++;
    });
    closeLoading();
}

function loadDataMenu(value){
    let count = 0;
    arrClassify[value].MENU.forEach(item => {
        menu_main.innerHTML += `<option value="${count}">${item.NAME}</option>`
        count++;
    })
}

async function loadDataContent(value){
    let count = 1; 
    table.childNodes[3].innerHTML = '';
    arrClassify[classify_menu.value].MENU[value].MENU_CHILD.forEach(item => {
        showTableContent(count, item.ID_CONTENT, item.NAME, item.ID_CONTENT);
        count++;
    })
}

function showTableContent(i, ID, NAME, ID_CONTENT){
    let template = `<tr id="item_menu_${ID}">
                <td>${i}</td>
                <td>${NAME}</td>
                <td>
                    <a href="/admin/content/edit-content.html?id=${ID}" target="_blank" class="btn bg-green">sửa</a>
                    <button onclick="showModal('${ID}','Xóa Nội Dung', 'Bạn có chắc muốn xóa nội dung ${NAME} không ?');" class="btn bg-red">Xóa</button>
                    <a href="/?id-menu=${ID}&id-content=${ID_CONTENT}" target="_blank" class="btn bg-blue">Xem</a>
                </td>
            </tr>`
    table.childNodes[3].innerHTML += template;
}

async function Delete(id){
    if(id !== null){
        Loading.setAttribute("style", "display: flex;");
        closeModal();
        const respomse = await fetch(urlContentLocal + id,{
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        closeLoading();
        if(respomse.status === 200){
            const tr_menu = document.querySelector("#item_menu_"+id);
            tr_menu.remove();
            getAPILassify().catch(handleError);
        }
        else{
            alert('xóa thất bại')
        }
    }
}