

const baseUrl = window.location.protocol + "//" + window.location.host;

const login = function() {

    const username = document.querySelector('#username');
    const password = document.querySelector('#password');

    fetch(baseUrl + '/secured/login', {
        method: 'POST',
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({'username': username.value, 'password': password.value}),
    }).then(async (res)=>{

        console.log('res:', res.status);
        const json = await res.json();
        console.log('json:', json);

        if (res.status == 200) {
            sessionStorage.setItem("username", json.data.username);
            sessionStorage.setItem("token", json.data.token);
    
            window.location.href = "/secured/admin.html";
        } else {
            alert(json.message);
        }


    }).catch((error) => {
        console.log('Error login:', error);
    });
}



document.addEventListener("DOMContentLoaded", function(event) { 
    let token = sessionStorage.getItem("token");

    console.log('token', token);

    if (token) {
        window.location.href = "/secured/admin.html";
    } else {

        document.getElementById("username").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("password").focus();
            }
        });
    
        document.getElementById("password").addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("login").click();
            }
        });
    }




});