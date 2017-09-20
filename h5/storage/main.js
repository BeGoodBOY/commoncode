window.onload = function() {
    let storage = window.sessionStorage,
    // let storage = window.localStorage,
        name = document.querySelector('#name'),
        pwd = document.querySelector('#pwd'),
        btn = document.querySelector('#btn');
    if (!storage.name) {

    } else {
        name.value = storage.name;
        pwd.value = storage.value;
    };

    btn.onclick = function() {
        storage.name = name.value;
        storage.pwd = pwd.value;
    };

};