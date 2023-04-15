const table = document.querySelector("#table_menu");
const classify_menu = document.querySelector("#classify_menu");
const endpointMenu = "http://learn-programming-test.com/api/MENU/";
const endpointMenuLocal = "https://localhost:44358/api/MENU/";
let arrClassify = [];

function showTableMenu(i, ID, ICON, NAME, RANK, ID_CLASSIFY){
    let template = `<tr id="item_menu_${ID}">
                <td>${i+1}</td>
                <td>${NAME}</td>
                <td>${RANK}</td>
                <td>
                    <span style="display: flex; justify-content: center;">${ICON}</span>
                    </td>
                <td>
                    <a href="/admin/menu/edit-menu.html?id-classify=${ID_CLASSIFY}&id-menu=${ID}" target="_blank" class="btn bg-green">sửa</a>
                    <button onclick="showModal(${ID},'Xóa Menu', 'Bạn có chắc muốn xóa menu ${NAME} không ?');" class="btn bg-red">Xóa</button>
                </td>
            </tr>`
    table.childNodes[3].innerHTML += template;
}

async function loadDataClassify(){
    let count = 0;
    const response = await fetch(endpointMenu);
    arrClassify = await response.json();
    
    arrClassify.forEach(element => {
        classify_menu.innerHTML += `<option value="${count}">${element.NAME}</option>`
        count++;
    });
    closeLoading();
}
loadDataClassify()//.catch(handleError);

function loadDataMenu(value){
    let count = 1;
    table.childNodes[3].innerHTML = '';
    arrClassify[value].MENU.forEach(item => {
        showTableMenu(count, item.ID, item.ICON, item.NAME, item.RANK, arrClassify[value].ID);
        count++;
    })
}

async function Delete(id){
    if(id !== null){
        Loading.setAttribute("style", "display: flex;");
        closeModal();
        const respomse = await fetch(urlMenuLocal + id,{
            method: "DELETE",
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        });
        Loading.removeAttribute("style");
        const tr_menu = document.querySelector("#item_menu_"+id);
        tr_menu.remove();
    }
}

