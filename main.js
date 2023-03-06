const activeMenu = document.querySelector(".menu-item");
console.log(activeMenu.childNodes[3]); 
activeMenu.addEventListener("click", () => {
    activeMenu.childNodes[3].classList.toggle("menu-sub")
})
