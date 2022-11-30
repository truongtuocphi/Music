let showExplore = document.querySelector('#explore');
let findSong = document.querySelector("#find-song");

showExplore.addEventListener('click', function() {
    let pageExplore = document.querySelector("#box-explore");
    pageExplore.classList.remove('hidden');
});

findSong.addEventListener('click', function() {
    // ẩn thông báo tìm nhạc
    let contentExplore = document.querySelector('#in-content-explore');
    contentExplore.classList.add('hidden');
    // thêm class có thuộc tính css mới cho box 
    let resetBoxExplore = document.querySelector('#content-page-explore');
    resetBoxExplore.classList.add('atc-second-page');
    // remove class hidden cho danh sách nhạc
    let listSong = document.querySelector('#recent_playlist');
    listSong.classList.remove('hidden');
});