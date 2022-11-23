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
function musicArtists(Element, idMusic, index) {
    let playlists__avata = $$l(".playlists__avata--pause");
    let playlists__wave = $$l(".playlists__avata--playing");

    if (creatLocal('musicArtists').getLocal() != idMusic) {
        playlists__avata.forEach(item => { item.classList.remove("hidden") });
        playlists__wave.forEach(item => { item.classList.add("hidden") });
    }
    playlists__avata[index].classList.toggle("hidden");
    playlists__wave[index].classList.toggle("hidden");
    creatLocal('musicArtists').setLocal(idMusic);
    musicPlayer(api, idMusic);
    audio.play()
};

function cleanActive(listElement) {
    listElement.forEach(element => {
        element.classList.remove("active");
    })
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
            audio.src = musicImformation.link;
            audio.onloadeddata = () => {
                progress.value = 1;
                time__duration.innerText = this.makeUptime(audio.duration);
            }
            sub_progress.style.width = '0%';

            range__volume.value = creatLocal('volume').getLocal();
            sub__volume.style.width = (creatLocal('volume').getLocal() * 100) + "%";

            creatLocal("history").setListLocal(this.currentId);

            if (creatLocal("history").getLocal() && JSON.parse(creatLocal("history").getLocal()).length >= this.songs.length) {
                creatLocal("history").reset();
            }
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
            const cd_thumpAnimation = song__ifm.querySelector("img").animate([
                { transform: 'rotate(360deg)' }], {
                duration: 10000, iterations: Infinity
            }
            )
            cd_thumpAnimation.pause();
            // sự kiện click phát nhạc
            btn_playing.onclick = function () {
                if (_this.isplaying) {
                    audio.pause();
                } else audio.play();

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

            //Tua bài hát
            progress.addEventListener('change', function (e) {
                console.log(e.target.value);
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
