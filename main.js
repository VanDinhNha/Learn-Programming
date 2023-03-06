const activeMenu = (opj) => {
    if(opj.childNodes.length > 3)
        opj.childNodes[3].classList.toggle("menu-item__child")
};