const url = location.href;
const urlRankMenu = 'http://learn-programming-test.com/api/RANK_MENU/';
const urlRankMenuChild = 'http://learn-programming-test.com/api/RANK_MENU_CHILD/';
const urlMenu = 'http://learn-programming-test.com/api/MENU/';
const urlMenuLocal = 'https://localhost:44358/api/MENU/';
const urlContent = 'http://learn-programming-test.com/api/CONTENT/';
const urlContentLocal = 'https://localhost:44358/api/CONTENT/';
const urlClassify = 'http://learn-programming-test.com/api/CLASSIFY/';
const urlRegisterLocal = 'https://localhost:44358/api/REGISTER/';
const urlRegister = 'http://learn-programming-test.com/api/REGISTER/';
const urlLoginLocal = 'https://localhost:44358/api/LOGIN/'
const urlLogin = 'http://learn-programming-test.com/api/LOGIN/'
const urlUserLocal = 'https://localhost:44358/api/USER/'

const showMenuChild = (obj, obj_id = null) => {
    if(obj !== null){
        if(obj.childNodes.length > 3){
            obj.childNodes[1].childNodes[1].classList.toggle('acctive__menu-item__parent--line')
            obj.childNodes[3].classList.toggle('menu-item__child');
            obj.childNodes[1].classList.toggle('acctive__menu-item__parent')
            obj.childNodes[1].childNodes[7].classList.toggle('acctive__hover-text')
            if(obj_id !== null){
                const menuChild = document.getElementById(obj_id['id-menu']+'_'+obj_id['id-content']);
                menuChild.classList.add('acctive__menu-item__link');
            }
        }
    }
};

document.querySelector('#menu_checkbox') !== null ?
    document.querySelector('#menu_checkbox').addEventListener('click', (e) => {
        acctiveMenu();
    }) :
    ""


const acctiveMenu = () => {
    const menu = document.querySelector('.menu');
    const bg_menu = document.querySelector('.bg-menu');
    const mobile_menu_background = document.querySelector('.mobile-menu-background');
    menu.classList.toggle('toggle-menu');
    bg_menu.classList.toggle('toggle-bg-menu')
    mobile_menu_background.hasAttribute('style') ?
    mobile_menu_background.removeAttribute('style') :
    mobile_menu_background.setAttribute('style', 'display: block')
}

document.querySelector('.menu') !== null ?
    document.querySelector('.menu').addEventListener('scroll', () => {
        const menu = document.querySelector('.menu');
        const icon_menu = document.querySelector('.icon-menu');
        if(!menu.classList.contains('toggle-menu')){
            menu.scrollTop > 0 ? 
            icon_menu.setAttribute('style', `margin-top: -${menu.scrollTop}px`) : 
            icon_menu.removeAttribute('style')
        }
    }) :
    ""

function handleError(err){
    window.location='/error.html';
}

function showModal(id, title, content){
    const modal = document.querySelector('.bg-modal');
    const modal_title = document.querySelector('.modal-title');
    const modal_body = document.querySelector('.modal-body');
    const btn_submit = document.querySelector('#btn-submit');

    modal_body.textContent = content;
    modal_title.textContent = title;
    modal.setAttribute('style', 'display: grid;');
    btn_submit.setAttribute('onclick', `Delete('${id}').catch(handleError);`)//.catch(handleError)
}

function closeModal(){
    const modal = document.querySelector('.bg-modal');
    modal.removeAttribute('style');
}

function showLoad(){
    const loading = document.querySelector('.loading');
    loading.setAttribute('style', 'display: flex;');
}
function closeLoad(){
    const loading = document.querySelector('.loading');
    loading.removeAttribute('style');
}

function getUrlVars(url) {
    if(url !== undefined){
        const vars = {};
        const parts = url.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
            vars[key] = value;
        });
        return vars;
    }
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

function showNotification(type, message = ""){
    const notification = document.querySelector('.notification');
    const delay = 7000;
    let elapsedTime = 0;
    let isMoving = false;
    let startTime, timerHidden, Interval;
    if(type === "error"){
        const template = `<div class="error">
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10zm-1.5-5.009c0-.867.659-1.491 1.491-1.491.85 0 1.509.624 1.509 1.491 0 .867-.659 1.509-1.509 1.509-.832 0-1.491-.642-1.491-1.509zM11.172 6a.5.5 0 0 0-.499.522l.306 7a.5.5 0 0 0 .5.478h1.043a.5.5 0 0 0 .5-.478l.305-7a.5.5 0 0 0-.5-.522h-1.655z" fill="#fff"></path></g></svg>
            <span class="message">${message}</span>
        </div>`;
        notification.insertAdjacentHTML("afterbegin", template);
    }
    else if(type === "success"){
        const template = `<div class="success">
            <svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"><path fill="#fff" d="M512 64a448 448 0 1 1 0 896 448 448 0 0 1 0-896zm-55.808 536.384-99.52-99.584a38.4 38.4 0 1 0-54.336 54.336l126.72 126.72a38.272 38.272 0 0 0 54.336 0l262.4-262.464a38.4 38.4 0 1 0-54.272-54.336L456.192 600.384z"></path></g></svg>
            <span class="message">${message}</span>
        </div>`;
        notification.insertAdjacentHTML("afterbegin", template);
    }
    else if(type === "warning"){
        const template = `<div class="warning">
        <svg fill="#fff" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" stroke="#fff"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>warning</title> <path d="M30.555 25.219l-12.519-21.436c-1.044-1.044-2.738-1.044-3.782 0l-12.52 21.436c-1.044 1.043-1.044 2.736 0 3.781h28.82c1.046-1.045 1.046-2.738 0.001-3.781zM14.992 11.478c0-0.829 0.672-1.5 1.5-1.5s1.5 0.671 1.5 1.5v7c0 0.828-0.672 1.5-1.5 1.5s-1.5-0.672-1.5-1.5v-7zM16.501 24.986c-0.828 0-1.5-0.67-1.5-1.5 0-0.828 0.672-1.5 1.5-1.5s1.5 0.672 1.5 1.5c0 0.83-0.672 1.5-1.5 1.5z"></path> </g></svg>
            <span class="message">${message}</span>
        </div>`;
        notification.insertAdjacentHTML("afterbegin", template);
    }
    else{
        return;
    }
    const arrElement = notification.childNodes;
    const element = arrElement[0];
    function startTimer(){ 
        timerHidden = setTimeout(() => {
            element.setAttribute('style', 'animation: hiddenNotification 3s');
            clearInterval(Interval);
            clearTimeout(timerHidden);
            setTimeout(() => {
                element.remove();
            }, 2500);//4500 là vì thời gian phải nhỏ hơn 5s của animation: hiddenNotification
        }, delay - elapsedTime);
        Interval = setInterval(() => {
            elapsedTime += 1;
        }, 1);
    }
    element.addEventListener('click', () => {
        element.remove();
        clearTimeout(timerHidden);
        clearInterval(Interval);
    });
    element.addEventListener('mouseover', () => {
        clearTimeout(timerHidden);
        clearInterval(Interval);
    });
    element.addEventListener('mouseleave', () => {
        startTimer();
    })
    startTimer();
}

function checkToken(){
    const token = localStorage.getItem('jwt') !== null ?
    localStorage.getItem('jwt') : sessionStorage.getItem('jwt')
    if(token !== null){
        document.querySelector('#logout').addEventListener('click', () => {
            localStorage.removeItem('jwt');
            sessionStorage.removeItem('jwt');
            window.location.href = 'index.html';
        })
        document.querySelector('#login').remove();
        document.querySelector('#register').remove();
        return token;
    }
    else{
        document.querySelector('#logout').remove();
        return null;
    }
}

document.querySelectorAll('.dropdown').length > 0 ?
document.querySelectorAll('.dropdown').forEach(element => {
    const dropdow_list = element.nextElementSibling;
    element.addEventListener('click', (e) => {
        e.preventDefault();
        if(dropdow_list.classList.contains('dropdow-list')){
            dropdow_list.classList.toggle('open');
        }
    })
    document.body.addEventListener("click", (e) => {
        if(!element.contains(e.target)){
            dropdow_list.classList.remove('open');
        }
    })
}) :
""




