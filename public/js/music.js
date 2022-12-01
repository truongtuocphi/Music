const audio = $$("audio");
const progress = $$("#progress-range");
const sub_progress = $$('.slide__sub_progress');
const view_sub_progress = $$('.progress-block--timestamp');
const range__volume = $$("#range__volume");
const sub__volume = $$(".sub_process--volume");
const song__ifm = $$("#song__ifm");
const btn_playing = $$("#btn_playing");
const time__current = $$(".time__current");
const time__duration = $$(".time__duration");
const nextSong = $$(".nextSong");
const preSong = $$(".preSong");
const btn_random = $$(".btn_random");
const btn_repeat = $$(".btn_repeat");
const list_controllerBtn = $$l(".player__control-btn .control-btn");
if (!creatLocal('volume').getLocal()) {
    creatLocal('volume').setLocal(1);
}

musicPlayer(api, 1);

// lấy bình luận theo id
function getbinhluan(id) {
    $$("#modal__comment").classList.toggle("hidden");
    $$(".modal__comment-container").classList.toggle("hidden");
    if (!$$("#modal__comment").className.includes("hidden")) {
        let html = "Hiện tại chưa có bình luận nào";
        // lấy trên database
        html += binhluan.map(comment => `
        <li>
        <div>
            <img src="${comment.avata}" alt="">
        </div>
        <div class="user__comment-ifm">
            <div>
                <user-name>${comment.name}</user-name> . <user-time>${comment.time}</user-time>
            </div>
            <p class="user-content">${comment.conment}</p>
        </div>
    </li>
        `).join('');
        $$(".list__user ul").innerHTML = html;
    }
}
//playmucisc when click
// truyền id music
function musicplayClick(id) {
    musicPlayer(api, id);
    $$("#btn_playing").click();

}
// playlist music singer
function musicSubArtists(idMusic, index) {
    console.log(idMusic)
    creatLocal('musicArtists').setLocal(idMusic);
    musicPlayer(apiList, idMusic);
   $$("#btn_playing").click();
}

function getListAblums(id = 1) {
    cleanActive($$l('.openMenuSub'), 'active');
    $$('.openMenuSub_artists').classList.add('active');
    addlistHidden($$l('.menu__leftsearch'), "hidden");
    $$("#sub_astists").classList.remove("hidden");
    $$("#id_astists").classList.add("hidden");
    musicPlayList(id, apiList);
}

//list recent or playlists
function playlistORRecent(namelocal) {
    let listPlaylist = creatLocal(namelocal).getLocal();
 if(typeof listPlaylist=="string")listPlaylist=JSON.parse(listPlaylist);
    let arrList=[];
    if (listPlaylist.length>0) {
        listPlaylist.forEach(idPlaylist => {
           let song= api.find(song=>song.id === idPlaylist)
           arrList.push(song);
        })
    }
    if(arrList.length>0){
        $$("#recent_playlist .recent__playlist--container").innerHTML=creatPlaylistcontainer(arrList,2);
    }else{
        $$("#recent_playlist .recent__playlist--container").innerHTML="Not music";
    }
}
// list ablums của ca sĩ
function musicPlayList(idsinger, apiList) {
    creatLocal("history").reset();
    const sub_astists = $$("#sub_astists");
    const signer = "Lisa";
    const birthday = "12/04/2022";
    const avata = "./public/image/lisa.jpg";
    let html = '';

    
    $$('.sub_astists-_list__music').innerHTML = creatPlaylistcontainer(apiList,1);
}
function creatPlaylistcontainer(apiList,kind){
    let listPlaylist = (creatLocal('playlist').getLocal());
    let html='';
    html = apiList.map((song, index) => ` <div class="playlists" data-id="${song.id}">
    <div class="playlist--box__item d-flex-align-center-justify-between">
        <div onclick="${kind==1?`musicSubArtists(${song.id},${index})`:`musicplayClick(${song.id})`}"
            class="playlist__singer d-flex-align-center-justify-between">
            <div class="playlist__song-rank">
                <i class="fa-solid fa-music"></i>
            </div>
            <div class="playlists__avata">
                <img src="${song.avata}" alt="">
                <div class="playlists__avata--wave">
                    <div class="playlists__avata--pause">
                        <i class="fa-solid fa-play"></i>
                    </div>
                    <div class="playlists__avata--playing hidden">
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                        <div class="bar"></div>
                    </div>
                </div>
            </div>
            <div>
                <h2 class="playlist__singer-song m-0">${song.song}</h2>
                <p class="playlist__singer-name m-0">${song.singer}</p>
            </div>
        </div>
    </div>
    <div class="playlist__singer-time">
        4:30
    </div>
    <div class="playlist__controller d-flex-align-center-justify-between">
        <div class="playlist__heart me-2">
        ${listPlaylist.includes(song.id) ? `<i onclick="removeIdplaylist(${song.id},this)" class="fa-solid fa-heart"></i>` : `<i onclick="getplaylist(${song.id},this)" class="fa-regular fa-heart"></i>`}     
        </div>
        <div class="playlist__option">
            <i class="fa-solid fa-ellipsis"></i>
            <div style="${index == 0 ? "top:0px" : ""} ${(index == apiList.length - 1) ? "top:unset;bottom:0" : ""}" class="playlist__option-box">
                <div class="option_box-song">
                    <div>
                        <img src="${song.avata}" alt="">
                    </div>
                    <div>
                        <h3 class="fs-6">${song.song}</h3>
                        <div class="fs-6">
                            <i class="fa-regular fa-heart"></i>
                            <span class="total_heart me-2">${makeupNumber(song.loves)}</span>
                            <i class="fa-solid fa-headphones"></i>
                            <span class="total_heart">${makeupNumber(song.listen)}</span>
                        </div>
                    </div>
                </div>
                <div class="option_box--controller">
                    <ul>
                        <li><a href="${song.link}" download><i class="fa-solid fa-download"></i> Tải
                                xuống</a>
                        </li>
                        <li onclick="musicplayClick(${song.id})"><a><i class="fa-solid fa-play"></i> Phát</a></li>
                        <li onclick=getplaylist(${song.id},this)><a><i class="fa-solid fa-plus"></i> Thêm vào playlist</a></li>
                        <li onclick="getbinhluan(${song.id})"><a><i class="fa-solid fa-comment"></i> Bình
                                Luận</a></li>
                    </ul>
                </div>
            </div>

        </div>
    </div>
</div> 
    `).join('');
    return html;
}
// phát nhạc theo trend
function musicArtists(Element, idMusic, index) {
    let playlists__avata = $$l("#id_trends .playlists__avata--pause");
    let playlists__wave = $$l("#id_trends .playlists__avata--playing");

    if (creatLocal('musicArtists').getLocal() != idMusic) {
        playlists__avata.forEach(item => { item.classList.remove("hidden") });
        playlists__wave.forEach(item => { item.classList.add("hidden") });
    }
    playlists__avata[index].classList.toggle("hidden");
    playlists__wave[index].classList.toggle("hidden");
    creatLocal('musicArtists').setLocal(idMusic);
    musicPlayer(api, idMusic);
    audio.play();
};

function cleanActive(listElement, classname) {
    Array.from(listElement).forEach(element => {
        element.classList.remove(classname);
    })
}
function addlistHidden(listElement, classname) {
    Array.from(listElement).forEach(element => {
        element.classList.add(classname);
    })
}

$$('#playmain_home').onclick = function () {
    if (this.innerHTML.includes("fa-play")) {
        this.innerHTML = 'Pause <i class="ms-2 fa-solid fa-pause"></i>';

    } else {
        this.innerHTML = 'Play Now <i class="ms-2 fa-solid fa-play"></i>';

    }
    $$("#btn_playing").click();
    let sss = `<i class="ms-2 fa-solid fa-pause"></i>`;
}
function musicPlayer(api, idMusic = 1) {  
    const app = {
        currentId: idMusic,
        songs: api,
        time_duration: 0,
        isrepeat: false,
        israndom: false,
        volume: creatLocal('volume').getLocal(),
        isplaying: false,
        defineProperties: function () {
            Object.defineProperty(this, 'currentSong', {
                get: function () {
                    return this.songs.find(song => song.id == this.currentId);
                }
            })
        },
        loadCurrentSong() {
            let musicImformation = this.currentSong;
            song__ifm.querySelector("img").src = musicImformation.avata;
            song__ifm.querySelector("marquee").innerText = musicImformation.song;
            song__ifm.querySelector(".song--des").innerText = musicImformation.singer;
            serUrl(musicImformation.song);
            audio.src = musicImformation.link;
            audio.onloadeddata = () => {
                progress.value = 1;
                time__duration.innerText = this.makeUptime(audio.duration);
            }
            sub_progress.style.width = '0%';
            range__volume.value = creatLocal('volume').getLocal();
            sub__volume.style.width = (creatLocal('volume').getLocal() * 100) + "%";
            creatLocal("history").setListLocal(this.currentId);
            creatLocal("recent").setListLocal(this.currentId);
            if (creatLocal("history").getLocal() && creatLocal("history").getLocal().length >= this.songs.length) {
                creatLocal("history").reset();
            }
            stopWave(this.currentId);
        },
        makeUptime(time) {
            let minute = Math.floor(time / 60);
            time -= minute * 60;
            let seconds = Math.floor(time);
            minute = minute > 9 ? minute : '0' + minute;
            seconds = seconds > 9 ? seconds : '0' + seconds;
            return `${minute}:${seconds}`;
        },
        handleEvent() {
            const _this = this;
            //Xử lý quay CD play / stop
            const cd_thumpAnimation = $$(".music__player--container  img").animate([
                { transform: 'rotate(359deg)' }], {
                duration: 10000, iterations: Infinity
            }
            )
            cd_thumpAnimation.pause();
            // sự kiện click phát nhạc
            btn_playing.onclick = function () {
                if (_this.isplaying) {
                    audio.pause();
                    toastMessage("Bài hát đã bị dừng lại", 1000);
                    return true;
                } else audio.play();
                toastMessage("Bài hát đang được phát", 1000);
            };

            audio.onplay = function () {
                _this.isplaying = true;
                cd_thumpAnimation.play();
                btn_playing.innerHTML = `<i class="fa-solid fa-circle-pause"></i>`;
            };
            audio.onpause = function () {
                _this.isplaying = false;
                cd_thumpAnimation.pause();
                btn_playing.innerHTML = `<i class="fa-solid fa-circle-play"></i>`;

            };

            audio.onloadeddata = () => {
                time__duration.innerText = this.makeUptime(audio.duration);
            }
            let percent = (audio.currentTime / audio.duration) * 100;

            // Tiến độ bài hát
            audio.addEventListener("timeupdate", function (e) {
                const duration_time = audio.duration;
                let current_time = audio.currentTime;
                let percent = ((current_time / duration_time) * 100).toFixed(2);
                if (percent) {
                    time__current.innerText = _this.makeUptime(current_time);
                    sub_progress.style.width = percent + '%';
                    progress.value = percent;
                }

            })

            let mouseClick = 0;
            progress.addEventListener('mousemove', function (e) {
                let lentMouseX = e.pageX;
                let lenpage = progress.getBoundingClientRect().x;
                let percentMouseMouse = (lentMouseX - lenpage);
                let lenpageWidth = progress.getBoundingClientRect().width;
                let percent_subview = (percentMouseMouse * 100 / lenpageWidth).toFixed(2);
                let music_percent = percent_subview * (audio.duration / 100)
                if (music_percent <= 0) music_percent = 0
                view_sub_progress.style.left = (percent_subview) + '%';

                view_sub_progress.innerText = _this.makeUptime(music_percent);
                mouseClick = music_percent;
            })
            progress.onclick = () => {
                audio.currentTime = mouseClick;
            }
            // Chỉnh âm lượng
            range__volume.onchange = function (e) {
                let measure_volume = e.target.value;
                creatLocal('volume').setLocal(measure_volume);
                audio.volume = measure_volume;
                sub__volume.style.width = measure_volume * 100 + "%"
            }
            // next song
            nextSong.onclick = () => {
                if (_this.israndom) {
                    _this.playRandom();
                } else {
                    _this.nextSong();
                }
                audio.play();
              
            }
            // pre song
            preSong.onclick = () => {
                if (_this.israndom) {
                    _this.playRandom();
                } else {
                    _this.backSong();
                }
                audio.play();
              
            }
            // random song
            btn_random.onclick = () => {
                _this.israndom = !_this.israndom;
                btn_random.classList.toggle("active", _this.isrepeat);
                this.playRandom();
            }
            // Repeat  song
            btn_repeat.onclick = () => {
                _this.isrepeat = !_this.isrepeat;
                btn_repeat.classList.toggle("active", _this.isrepeat)
            }
            // video kết thúc
            audio.onended = () => {
                if (_this.isrepeat) {
                    audio.play()
                } else {
                    nextSong.click();
                }
                
            }
        },
        nextSong() {
            let indexsss = this.songs.findIndex((song) => {
                return song.id == this.currentId;
            });
            if (indexsss + 1 >= this.songs.length) {
                this.currentId = this.songs[0].id
            } else {
                this.currentId = this.songs[indexsss + 1].id
            }

            this.loadCurrentSong();
        },
        backSong() {
            let indexsss = this.songs.findIndex((song) => {
                return song.id == this.currentId;
            });
            if (indexsss <= 0) {
                this.currentId = this.songs[this.songs.length - 1].id
            } else {
                this.currentId = this.songs[indexsss - 1].id
            }

            this.loadCurrentSong();

        },
        playRandom() {
            var index_random;
            let listId = this.songs.map(song => song.id);
            let history = [];
            if (creatLocal("history").getLocal()) {
                history = JSON.parse(creatLocal("history").getLocal());
            }
            do {
                index_random = listId[Math.floor(Math.random() * listId.length)];
            } while (history.includes(index_random))
            this.currentId = index_random;
            this.loadCurrentSong();
            if (this.israndom) btn_random.classList.add("active");
            audio.play();
        },

        render() {

        },
        start() {
            this.defineProperties();
            this.handleEvent();
            this.loadCurrentSong();
            this.render();
        }
    }
    app.start();
    return {
        setCurrentIndex(index) {
            app.currentIndex = index;
            app.start();
        }
    };
}

function stopWave(idMusic){
    const listPlaylists = $$l(".playlists .playlists__avata--playing");
    const playlists__avata = $$l(".playlists .playlists__avata--pause");
    playlists__avata.forEach(item => { item.classList.remove("hidden") });
    listPlaylists.forEach(item => { item.classList.add('hidden') })
    const playlists=$$l('.playlists');
    playlists.forEach(element=>{        
        if(element.getAttribute('data-id')==idMusic){
            element.querySelector(".playlists__avata--playing").classList.remove('hidden');
            element.querySelector(".playlists__avata--pause").classList.add('hidden');;
        }
    })
}