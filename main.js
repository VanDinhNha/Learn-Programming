const menu_html = document.querySelector("#html");
const menu_htnl_sub = document.querySelector("#html_sub");
menu_html.addEventListener("click", () => {
    menu_htnl_sub.classList.toggle("menu-sub");
})