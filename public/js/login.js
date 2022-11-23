// phần ẩn hiện from login 
let openLogin =$$("#open-login");
let bgLogin =$$("#bg-login");
let showLogin =$$("#show-from");
let closeLogin =$$("#close");

openLogin.addEventListener('click', function() {
    bgLogin.classList.add('atc-bg-login');
    showLogin.classList.add('act-from');
});

closeLogin.addEventListener('click', function() {
    bgLogin.classList.remove('atc-bg-login');
    showLogin.classList.remove('act-from');
});
// hết phần ẩn hiện from

// kiểm tra from
let form =$$("#form");
let userName =$$('#account');
let passUser =$$('#password');

form.addEventListener('submit', e => {
    e.preventDefault();
    
    checkInputForm();
});

function checkInputForm() {
    let accout = userName.value.trim();
    let pass = passUser.value.trim();

    if(accout === '') {
        setError(userName, "you have not entered your account name");
    }else {
        successForm(userName);
    }

    if(pass === '') {
        setError(passUser, "you have not entered your password name");
    }else {
        successForm(passUser);
    }
}

function setError(element, message) {
    element.parentElement.querySelector('.error').innerText = message;
    element.classList.add('border-error-from');
}

function successForm(element) {
    console.log(element.parentElement.querySelector('.error'));;
    element.classList.remove('border-error-from');
}