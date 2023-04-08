const table = document.querySelector("#table_menu");
const endpointMenu = "http://learn-programming-test.com/api/MENU/";
const endpointMenuLocal = "https://localhost:44358/api/MENU/";

function showTableMenu(i, ID, ICON, NAME, RANK){
    let template = `<tr id="item_menu_${ID}">
                <td>${i+1}</td>
                <td>${NAME}</td>
                <td>${RANK}</td>
                <td>
                    <span style="display: flex; justify-content: center;">${ICON}</span>
                    </td>
                <td>
                    <a href="/admin/menu/edit-menu.html?id=${ID}" target="_blank" class="btn bg-green">sửa</a>
                    <button onclick="showModal(${ID},'Xóa Menu', 'Bạn có chắc muốn xóa menu ${NAME} không ?');" class="btn bg-red">Xóa</button>
                </td>
            </tr>`
    table.childNodes[3].innerHTML += template;
}

async function loadDataMenu(){
    const response = await fetch(endpointMenu);
    const menu_item = await response.json();
    table.childNodes[3].innerHTML = '';
    for(let i = 0; i < menu_item.length; i++) {
        showTableMenu(i, menu_item[i].ID, menu_item[i].ICON, menu_item[i].NAME, menu_item[i].RANK);
    };
    Loading.removeAttribute("style");
}
loadDataMenu().catch(handleError);

async function deleteMenu(id){
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

