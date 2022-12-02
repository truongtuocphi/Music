// "use strict";
const api = [
    {
        id: 1,
        song: "Wating for you",
        singer: "Mono",
        des: "Ca Sĩ chuyển Nghiệp",
        avata: "/public/image/momo.jpg",
        link: "/public/uploads/1.mp3",
        listen: 120000,
        loves: 452000,
    },
    {
        id: 2,
        song: "Lệ rơi",
        singer: "Mỹ Tâm",
        des: "Ca Sĩ chuyển Nghiệp",
        avata: "/public/image/mytam.jpg",
        link: "/public/uploads/2.mp3",
        listen: 120000,
        loves: 452000,
    },
    {
        id: 3,
        song: "Anh không biết gì",
        singer: "Lisa",
        des: "Ca Sĩ chuyển Nghiệp",
        avata: "/public/image/lisa.jpg",
        link: "/public/uploads/3.mp3",
        listen: 120000,
        loves: 452000,
    },
    {
        id: 4,
        song: "Có tiền có tất cả",
        singer: "Tuấn Hưng",
        des: "Ca Sĩ chuyển Nghiệp",
        avata: "/public/image/tuanhung.jpg",
        link: "/public/uploads/4.mp3",
        listen: 120000,
        loves: 452000,
    },
    {
        id: 5,
        song: "Không Phải Dạng Vừa Đâu",
        singer: "Sơn Tùng",
        des: "Blackpink",
        avata: "/public/image/sontung.jpg",
        link: "/public/uploads/5.mp3",
        listen: 120000,
        loves: 452000,
    },
    {
        id: 6,
        song: "Đương Tình Duyên",
        singer: "Phạm Hoài Nam",
        des: "Ca Sĩ chuyển Nghiệp",
        avata: "/public/image/eric.jpg",
        link: "/public/uploads/6.mp3",
        listen: 120000,
        loves: 452000,
    },
]
const apiList = [
    {
        id: 1,
        song: "Wating for you",
        link: "/public/uploads/1.mp3",
        listen: 120000,
        loves: 452000,
        singer: "Lisa",
        avata: "/public/image/eric.jpg",
        birthday: "12/04/2022",
    },
    {
        id: 2,
        song: "Hãy trao cho anh",
        link: "/public/uploads/2.mp3",
        listen: 140000,
        loves: 3520,
        singer: "Lisa",
        avata: "/public/image/eric.jpg",
        birthday: "12/04/2022",
    },
    {
        id: 3,
        song: "Có tiền có tất cả",
        link: "/public/uploads/3.mp3",
        listen: 189000,
        loves: 350,
        singer: "Lisa",
        avata: "/public/image/eric.jpg",
        birthday: "12/04/2022",
    },
    {
        id: 4,
        song: "Này yesssssssssss ssssssssssssssssss sssssssss người yêu ơi",
        link: "/public/uploads/4.mp3",
        listen: 230000,
        loves: 3520000,
        singer: "Lisa",
        avata: "/public/image/eric.jpg",
        birthday: "12/04/2022",
    },

]
const binhluan = [
    {
        name: "Eric",
        conment: "Bài hát hay quá",
        avata: "/public/image/eric.jpg",
        time: "4 giờ trước"
    },
    {
        name: "Nguyễn Thanh Tùng",
        conment: "Bài hát hay quá,",
        avata: "/public/image/sontung.jpg",
        time: "3 giờ trước"
    },
    {
        name: "Lisa",
        conment: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque, quam magni officia necessitatibus repellat aliquid error similique dolorem accusamus laudantium molestiae aut tempora?",
        avata: "/public/image/lisa.jpg",
        time: "2 phút trước"
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

    list_result__search.addEventListener('click', function (e) {
        e.stopPropagation();
    })
    boxSearch.addEventListener('click', function (e) {
        e.stopPropagation();
    })
    search.addEventListener("input", function (e) {
        let value_search = String(e.target.value).toLowerCase();
        let html = '';
        if (value_search) {
            boxSearch.classList.remove("hidden");
            html = api.map(function (item) {

                if (item.song.toLowerCase().includes(value_search) || item.singer.toLowerCase().includes(value_search) || item.des.toLowerCase().includes(value_search)) {
                    return `
                    <li onclick="musicplayClick(${item.id})"><a class="singer" href="javascript:void()">
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
        if (html) {
            list_result__search.innerHTML = html;
        } else {
            list_result__search.innerHTML = `<code class="ms-2">Không tìm thấy</code>`;
        }

    })
}

// creat url

function serUrl(nameURL = '', action = '') {

    if (!nameURL) return false;
    const url = new URL(window.location);
    nameURL = removeVietnameseTones(nameURL.trim());
    if (nameURL.includes('  ')) {
        nameURL = nameURL.replaceAll('  ', ' ')
    }
    if (nameURL.includes(' ')) {
        nameURL = nameURL.replaceAll(' ', '-')
    }
    if (action) {
        nameURL = url.origin + `/${action}/` + nameURL;
    } else {
        nameURL = url.origin + "/" + nameURL;
    }
    //    window.history.pushState({}, '', nameURL);
}
// playlist
function getplaylist(id, element) {
    if (creatLocal('playlist').getLocal()) {
        if (creatLocal('playlist').getLocal().includes(id)) {
            toastMessage("Bạn đã thêm trong danh sách phát")
        } else {
            toastMessage("Thêm thành công danh sách phát")
            if (element.closest('.playlists')) {
                let parent = element.closest('.playlists');
                parent.querySelector('.playlist__heart').innerHTML = `<i onclick="removeIdplaylist(${id},this)" class="fa-solid fa-heart"></i>`;
            }
        }
    }
    creatLocal('playlist').setListLocal(id);
}
// show trang home 
function homeShow() {
    openMenuSub(this, 0);
    serUrl('home');
}

// xoá id playlist
function removeIdplaylist(id, element) {
    if (creatLocal('playlist').getLocal().includes(id)) {
        creatLocal('playlist').deleteID(id);
    }
    if (element.closest('.playlists')) {
        let parent = element.closest('.playlists');
        parent.querySelector('.playlist__heart').innerHTML = `<i onclick="getplaylist(${id},this)" class="fa-regular fa-heart"></i>`;
    }

    toastMessage("Xóa thành công bài hát trong danh sách phát");
}
// Thông báo
function toastMessage(message, time = 3000) {
    const creatBox = document.createElement("div");
    creatBox.className = "toast__container fakeanimation";
    creatBox.innerHTML = `<span class="toast__notice">${message}</span> <button onclick="closeElement('#toast','hidden')" class="btn text-white">X</button>`;
    creatBox.style.animation = `fakeToast 0.6s ease-in,fakeout linear 1s 3s forwards`;
    $$('#toast').appendChild(creatBox);
    setTimeout(() => {
        $$('#toast').removeChild(creatBox);
    }, time)
}
// closeElement
function closeElement(boxElement, classHide) {
    $$(boxElement).classList.add(classHide);
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

function openMenuSub(element, index) {
    let menu__leftsearch = $$l(".menu__leftsearch");
    let btn_menu__leftsearch = $$l(".list--menu__item .openMenuSub");

    if ($$("#sub_astists")) {
        $$("#sub_astists").classList.add("hidden");
    }
    if (btn_menu__leftsearch) {
        btn_menu__leftsearch.forEach(menu => {
            menu.classList.remove('active');
        });

        menu__leftsearch.forEach(menu => {
            menu.classList.add('hidden');
        });
        if (index < 3) {
            btn_menu__leftsearch[index].classList.add('active');
            menu__leftsearch[index].classList.remove('hidden');
        }

    }
    if(creatLocal('history').getLocal()){
        localStorage.removeItem("history");
    }
    $$l('.menuactive').forEach(item => { item.classList.remove('active') });
    element.classList.add('active');
    creatLocal('layout').setLocal("home");
    if (index == 0) {
        serUrl('music');
    } else if (index == 1) {
        serUrl('artists');
    } else if (index == 2) {
        serUrl('trend');
        creatLocal('layout').setLocal("trend");
    } else if (index == 3) {
        serUrl('explore');
        creatLocal('layout').setLocal("explore");
    }
    if (index == 4 || index == 5) {
        creatLocal('layout').setLocal("recent");
        let recent_playlist = $$("#recent_playlist .recent_playlist--title");
        let title = "";
        $$("#recent_playlist").classList.remove("hidden");
        if (index == 4) {
            playlistORRecent("recent");
            title = `<h2># Recent <span onclick="playlistRecent()" class="button_play"><i class="fa-solid fa-circle-play"></i></span></h2>`;
            serUrl('recent');
        } else {
            playlistORRecent("playlist");
            title = `<h2># Playlist <span onclick="playlistRecent()" class="button_play"><i class="fa-solid fa-circle-play"></i></d></h2>`;
            serUrl('playlist');
        }
        recent_playlist.innerHTML = title;
    }
    stopWave('1', true);
    $$("#btn_playing").innerHTML = `<i class="fa-solid fa-circle-play"></i>`;
    $$("audio").pause();


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
    $$("#search").value = "";
}

chagenBgDefault(0);
function chagenBgDefault(index) {
    let menu = "";
    let container = "";
    if (!localStorage.getItem('menu-color')) {
        menu = '#202020';
        container = '#000';
        creatLocal('menu-color').setLocal(menu);
        creatLocal('container-color').setLocal(container);
    }
    switch (index) {
        case 1:
            menu = '#202020';
            container = '#000';
            break;
        case 2:
            menu = '#302724';
            container = '#251B18';
            break;
        case 3:
            menu = '#26275e';
            container = '#1e1b3a';
            break;
        default:
            menu = creatLocal('menu-color').getLocal();
            container = creatLocal('container-color').getLocal();
    }

    $$("#menu__color").value = menu;
    $$("#container__color").value = container;

    $$("#menu__color").addEventListener("input", function (e) {
        menu = e.target.value;
        creatLocal('menu-color').setLocal(menu);
        document.documentElement.style.setProperty('--bg--menu', menu);
    })
    $$("#container__color").addEventListener("input", function (e) {
        container = e.target.value;
        creatLocal('container-color').setLocal(container);
        document.documentElement.style.setProperty('--bg--container', container);
    })
    setColorRoot(menu, container)
}

function setColorRoot(menu, container) {
    creatLocal('menu-color').setLocal(menu);
    creatLocal('container-color').setLocal(container);
    document.documentElement.style.setProperty('--bg--menu', menu);
    document.documentElement.style.setProperty('--bg--container', container);
}

function creatLocal(namelocal) {
    let result = '';
    if (localStorage.getItem(namelocal)) {
        result = localStorage.getItem(namelocal);
    } else {
        localStorage.setItem(namelocal, "");
    }
    return {
        getLocal() {
            if (result.includes(',')) result = JSON.parse(result)
            return result;
        },
        setLocal(value) {
            localStorage.setItem(namelocal, value);
        },
        setListLocal(value) {
            if (!result) result = [];
            else result = JSON.parse(localStorage.getItem(namelocal));
            if (!Array.from(result).includes(value)) {
                result.push(value);
            }
            localStorage.setItem(namelocal, JSON.stringify(result));
        },
        deleteID(value) {
            let result = JSON.parse(localStorage.getItem(namelocal));
            if (result.includes(value)) {
                result.splice(result.findIndex(id => id == value), 1);
            }
            localStorage.setItem(namelocal, JSON.stringify(result));
        },
        delete() {
            localStorage.removeItem(namelocal);
        },
        reset() {
            localStorage.removeItem(namelocal);
            localStorage.setItem(namelocal, []);
        }

    }
}


// close comment chat  
function close_comment() {
    if ($$("#modal__comment")) {
        $$(".modal__comment-container").classList.add("hidden");
        $$("#modal__comment").classList.add("hidden");
    }
}

function makeupNumber(number) {
    if (number >= 1000000) {
        return (number / 1000000).toFixed(1) + "M";
    } else if (number >= 1000) {
        return (number / 1000).toFixed(1) + "K";
    }
    return number;
}


const uploadfile = $$('#uploadfile');
uploadfile.addEventListener('change', function (e) {
    let url = URL.createObjectURL(this.files[0]);
    $$('.main--profiles  img').src = url;
});

function removeVietnameseTones(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    // Some system encode vietnamese combining accent as individual utf-8 characters
    // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
    str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); // ̀ ́ ̃ ̉ ̣  huyền, sắc, ngã, hỏi, nặng
    str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ ̆ ̛  Â, Ê, Ă, Ơ, Ư
    // Remove extra spaces
    // Bỏ các khoảng trắng liền nhau
    str = str.replace(/ + /g, " ");
    str = str.trim();
    // Remove punctuations
    // Bỏ dấu câu, kí tự đặc biệt
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g, " ");
    return str.toLowerCase();
}
function forcusinput() {
    $$("#search").focus();
    const input = $$("#search");
    $$("#search").setAttribute("value", "Hellllo sdasdas");
    console.log($$("#search").value);

}
let isMicSpeak = true;
function openSpeaking() {
    const speaking = $$("#speaking");
    isMicSpeak = !isMicSpeak;
    var recognition = new webkitSpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'vi-VN'; // ở đây ví dụ là Mỹ, còn Việt Nam là 'vi-VN' nhé.
    // start
   
    if (isMicSpeak) {
        speaking.innerHTML = `<i title="Mở Mic"  class="fa-solid fa-microphone-lines-slash "></i>`;
        toastMessage("Đã tắt phần mềm hỗ trợ giọng nói");
        recognition.stop();
    } else {
        speaking.innerHTML = `<i title="Tắt Mic"  class="fa-solid fa-microphone"</i>`;
        toastMessage("Đã mở phần mềm hỗ trợ giọng nói");
        creatvoidreading("We will support you");  
        recognition.start();

        recognition.onresult = function (event) {
            var resultIndex = event.resultIndex;
            var value_search = event.results[resultIndex][0].transcript.toLowerCase();
            localStorage.setItem("speaker",value_search);
            let songss = api.find(function (item) {
                return item.song.toLowerCase().includes(value_search)
            })
            
          if(songss){ 
            musicPlayer(api, songss.id);
            toastMessage("Đã tìm thấy bài hát ");
            speaking.innerHTML = `<i title="Mở Mic" class="fa-solid fa-microphone-lines-slash "></i>    `;
            isMicSpeak = true;
            creatvoidreading(`I find song`);
            recognition.stop();
          }         
             caseSpeaking(value_search);              
        }
    }

  
}
function creatvoidreading(text){
    var msg = new SpeechSynthesisUtterance();
    msg.text = text;
    window.speechSynthesis.speak(msg);
}
function caseSpeaking(textSpeak){
console.log(textSpeak);
    if(textSpeak=="chơi nhạc" || textSpeak=="play" || textSpeak=="phát" || textSpeak.includes("phát nhạc")){
        if($$("audio").paused){
            $$("#btn_playing").click();
        }
       
    }else if(textSpeak=="dừng nhạc"|| textSpeak=="stop" || textSpeak=="dừng lại" || textSpeak.includes("stop")){
        $$("audio").pause();
        stopWave(0,true)
    }else if(textSpeak=="chuyển bài"  || textSpeak=="chuyển nhạc"  || textSpeak=="next song" || textSpeak.includes("tiếp theo")){
        $$(".nextSong").click();   
    }else if(textSpeak=="back song" || textSpeak=="trở về"){
        $$(".preSong").click();     
    }else if(textSpeak=="tắt mic"){
        $$("#speaking").click();
    }
 
}


