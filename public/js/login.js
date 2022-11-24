// phần ẩn hiện from login 
let openLogin =$$("#open-login");
let bgLogin =$$("#bg-login");
let showLogin =$$("#show-from");
let closeLogin =$$("#close");
let formLogin = $$("#form-login");
let formSign = $$("#form-sign");

openLogin.onclick = () => {
    bgLogin.classList.remove('hidden');
    formSign.classList.add('hidden');
};

closeLogin.onclick = () => {
    bgLogin.classList.add('hidden');
    formSign.classList.remove('hidden');
};
// hết phần ẩn hiện from

// phần ẩn hiện from sign in 
let openSign = $$(".open-sign");
let closeSign =$$("#close-sign");

openSign.onclick = () => {
    bgLogin.classList.remove('hidden');
    formLogin.classList.add('hidden');
};

closeSign.onclick = () =>{
    bgLogin.classList.add('hidden');
    formLogin.classList.remove('hidden');
};
// hết phần ẩn hiện sign in

// chuyển form 
let changeFormSign = $$('#switch-sign');
let changeFormLog = $$('#switch-log');

changeFormSign.addEventListener('click', function() {
    hideForm(formSign, formLogin);
});

changeFormLog.addEventListener('click', function() {
    hideForm(formLogin, formSign);
});

function hideForm(formHide, formShow) {
    // ẩn form đăng nhập 
    formHide.classList.remove('hidden');

    // hiện form đăng ký
    formShow.classList.add('hidden');
}

// end chuyển form

// kiểm tra from
let formLog = $$("#form-login");
let formSig = $$("#form-sign");

formLog.addEventListener('submit', e => {  //login
    e.preventDefault();

    checkInputFormLog();
});

formSig.addEventListener('submit', e => {   //sign
    e.preventDefault();

    checkInputFormSig();
});

function checkInputFormLog() {   /// kiểm tra login
    let userName = $$('#account');
    let passUser = $$('#password');

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

function checkInputFormSig() {       // kiểm tra sign in
    let userNameSig = $$('#account-1');
    let firstPass = $$('#password-1');
    let secondPass = $$('#password-2');

    let accoutSig = userNameSig.value.trim();
    let firstValuePass = firstPass.value.trim();
    let secondValuePass = secondPass.value.trim();

    if(accoutSig == '') {
        setError(userNameSig, "you have not entered your account name");
    }else {
        successForm(userNameSig);
    }

    if(firstValuePass == '') {
        setError(firstPass, "you have not entered your password name");
    }else {
        successForm(firstPass);
    }

    if(secondValuePass == '') {
        setError(secondPass, "you have not entered your request password name");
    }else {
        successForm(secondPass);
    }
}

function setError(element, message) {     
    element.parentElement.querySelector('.error').innerText = message;
    element.classList.add('border-error-from');
}

function successForm(element) {    
    element.parentElement.querySelector('.error').style.display = "none";
    element.classList.remove('border-error-from');
}