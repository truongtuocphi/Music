let showExplore = document.querySelector('#explore');
let findSong = document.querySelector("#find-song");

showExplore.addEventListener('click', function() {
    let pageExplore = document.querySelector("#box-explore");
    pageExplore.classList.remove('hidden');
});

findSong.addEventListener('click', function() {
    let contentExplore = document.querySelector('#in-content-explore');
    contentExplore.classList.add('hidden');

    let resetBoxExplore = document.querySelector('#content-page-explore');
    resetBoxExplore.classList.add('atc-second-page');

    let listSong = document.querySelector('#recent_playlist');
    listSong.classList.remove('hidden');
});

