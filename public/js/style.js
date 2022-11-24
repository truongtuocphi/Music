
"use strict";
const api = [
    {
        id: 1,
        song: "Wating for you",
        singer: "Mono",
        des: "Ca Sĩ chuyển Nghiệp",
        avata: "/public/image/momo.jpg",
        link: "/public/uploads/1.mp3",
    },
    {
        id: 2,
        song: "Lệ rơi",
        singer: "Mỹ Tâm",
        des: "Ca Sĩ chuyển Nghiệp",
        avata: "/public/image/mytam.jpg",
        link: "/public/uploads/2.mp3",
    },
    {
        id: 3,
        song: "Anh không biết gì",
        singer: "Lisa",
        des: "Ca Sĩ chuyển Nghiệp",
        avata: "/public/image/lisa.jpg",
        link: "/public/uploads/3.mp3",
    },
    {
        id: 4,
        song: "Có tiền có tất cả",
        singer: "Tuấn Hưng",
        des: "Ca Sĩ chuyển Nghiệp",
        avata: "/public/image/tuanhung.jpg",
        link: "/public/uploads/4.mp3",
    },
    {
        id: 5,
        song: "Không Phải Dạng Vừa Đâu",
        singer: "Sơn Tùng",
        des: "Blackpink",
        avata: "/public/image/sontung.jpg",
        link: "/public/uploads/5.mp3",
    },
    {
        id: 6,
        song: "Đương Tình Duyên",
        singer: "Phạm Hoài Nam",
        des: "Ca Sĩ chuyển Nghiệp",
        avata: "/public/image/eric.jpg",
        link: "/public/uploads/6.mp3",
    },
]
const binhluan=[
    {
        name:"Eric",
        conment:"Bài hát hay quá",
        avata:"/public/image/eric.jpg",
        time:"4 giờ trước"
    },
    {
        name:"Nguyễn Thanh Tùng",
        conment:"Bài hát hay quá,",
        avata:"/public/image/sontung.jpg",
        time:"3 giờ trước"
    },
    {
        name:"Lisa",
        conment:"Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque, quam magni officia necessitatibus repellat aliquid error similique dolorem accusamus laudantium molestiae aut tempora?",
        avata:"/public/image/lisa.jpg",
        time:"2 phút trước"
    }
]

const $$ = document.querySelector.bind(document);
const $$l = document.querySelectorAll.bind(document);

search(api);
menu();
function search(api) {
    const search = $$("#search");
    const boxSearch = $$(".result__search");
    const result__search = $$("#result__search");
    const list_result__search = $$(".list_result__search");

    list_result__search.addEventListener('click', function(e){
        e.stopPropagation();
    })
    boxSearch.addEventListener('click', function(e){
        e.stopPropagation();
    })
    search.addEventListener("input", function (e) {
        let value_search = e.target.value;
        let html = '';
        if (value_search) {
            boxSearch.classList.remove("hidden");
            html = api.map(function (item) {
                if (item.song.includes(value_search) || item.singer.includes(value_search) || item.des.includes(value_search)) {
                    return `
                    <li><a class="singer" href="javascript:void()">
                    <img class="singer--avata" src="${item.avata}" alt="">
                    <div class="singer--imf ps-2">
                        <h3 class="singer--name">${item.song}</h3>
                        <p class="singer--des">${item.singer}</p>
                    </div>
                </a></li>`;
                }
            }).join('');
        } else {
            boxSearch.classList.add("hidden");
        }
        result__search.innerHTML = value_search;
        if(html){
            list_result__search.innerHTML=html;
        }else{
            list_result__search.innerHTML=`<code class="ms-2">Không tìm thấy</code>`;
        }
        
    })
}

function menu() {
    let list__btn_submenu = $$l(".btn_submenu");
    list__btn_submenu.forEach(menuhead => {
        menuhead.addEventListener("click", function (e) {
            e.stopPropagation();
        })
        menuhead.onclick = () => {
            offAll();
            const submenu = menuhead.querySelector(".submenu--settings");
            submenu.classList.toggle("hidden");
            submenu.addEventListener("click", (e) => { e.stopPropagation(); })
        }
    }); 
}
function openMenuSub(element,index){
    let menu__leftsearch=$$l(".menu__leftsearch");
    let btn_menu__leftsearch=$$l(".list--menu__item .openMenuSub");
  
    if(btn_menu__leftsearch){
        btn_menu__leftsearch.forEach(menu=>{
            menu.classList.remove('active');
        })
        menu__leftsearch.forEach(menu=>{
            menu.classList.add('hidden');
        })
        btn_menu__leftsearch[index].classList.add('active');
        menu__leftsearch[index].classList.remove('hidden');
    }
 
  
}
function offAll() {
    const submenu = $$l(".btn_submenu .submenu--settings");
    submenu.forEach(element => {
        element.classList.add("hidden");
    })
}

document.onclick = () => {
    offAll();
    $$(".result__search").classList.add("hidden");
    $$("#search").value="";
}
chagenBgDefault(0);
function chagenBgDefault(index){
    let menu="";
    let container="";
    if(!localStorage.getItem('menu-color')){
         menu='#202020';
         container='#000';
         creatLocal('menu-color').setLocal(menu);
         creatLocal('container-color').setLocal(container);
    }
    switch(index){
        case 1:
            menu='#202020';
            container='#000';
            break;
        case 2:
            menu='#302724';
            container='#251B18';
            break;
        case 3:
            menu='#26275e';
            container='#1e1b3a';
            break;
        default:
            menu= creatLocal('menu-color').getLocal();
            container= creatLocal('container-color').getLocal();
    }
    $$("#menu__color").value=menu;
    $$("#container__color").value=container;

    $$("#menu__color").addEventListener("input", function(e){
        menu=e.target.value;
        creatLocal('menu-color').setLocal(menu);
        document.documentElement.style.setProperty('--bg--menu', menu);
    })
    $$("#container__color").addEventListener("input", function(e){
        container=e.target.value;
        creatLocal('container-color').setLocal(container);
        document.documentElement.style.setProperty('--bg--container', container);
    })
    setColorRoot(menu,container)
}
function setColorRoot(menu,container){
    creatLocal('menu-color').setLocal(menu);
    creatLocal('container-color').setLocal(container);
   document.documentElement.style.setProperty('--bg--menu', menu);
   document.documentElement.style.setProperty('--bg--container', container);
}
function creatLocal(namelocal){
    let result='';
   if(localStorage.getItem(namelocal)){
       result=localStorage.getItem(namelocal);
   }else{
    localStorage.setItem(namelocal,"");
   }
    return {
        getLocal(){
                return result;
        },
        setLocal(value){
            localStorage.setItem(namelocal,value);
        },
        setListLocal(value){
            if(!result) result=[];
            else result=JSON.parse(localStorage.getItem(namelocal));
            if(!Array.from(result).includes(value)){
                result.push(value);
            }
            localStorage.setItem(namelocal,JSON.stringify(result));
        },
        delete(){
            localStorage.removeItem(namelocal);
        },
        reset(){
            localStorage.removeItem(namelocal);
            localStorage.setItem(namelocal,[]);
        }
        
    }
}

// close comment chat  
function close_comment(){
    if($$("#modal__comment")){
        $$(".modal__comment-container").classList.add("hidden");
        $$("#modal__comment").classList.add("hidden");
    }
}


