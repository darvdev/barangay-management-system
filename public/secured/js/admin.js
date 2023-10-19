

const baseUrl = window.location.protocol + "//" + window.location.host;

document.addEventListener("DOMContentLoaded", function(event) {
    let token = sessionStorage.getItem("token");

    if (token) {
        verifyToken(token);
    } else {
        window.location.href = '/secured/login.html';
    }
});


const verifyToken = async function(token) {

    fetch(baseUrl + '/secured/verifyToken', {
        method: 'POST',
        headers: {"Content-Type": "application/json",},
        body: JSON.stringify({'token': token}),
    }).then(async (res)=>{

        console.log('res:', res.status);
        const json = await res.json();
        console.log('json:', json);

        if (res.status !== 200) {
            sessionStorage.clear();
            window.location.href = '/secured/login.html';
        } else {
            document.querySelector("#loader").style = "display:none;";
            document.querySelector("#body").style = "display:block;";

            getDocs();
        }

    }).catch((error) => {
        console.log('Error login:', error);
        sessionStorage.clear();
        window.location.href = '/secured/login.html';
    });

}

const logout = function() {
    sessionStorage.clear();
    window.location.href = '/secured/login.html';
}

const getDocs = async function() {

    let token = sessionStorage.getItem("token");

    fetch(baseUrl + '/secured/docs', {
        method: 'GET',
        headers: {"Content-Type": "application/json", 'x-bsm-token': token},
    }).then(async (res)=>{

        console.log('res:', res.status);
        const json = await res.json();
        console.log('docs:', json);

        if (res.status == 200) {
            
        }

    }).catch((error) => {
        console.log('Error getDocs:', error);
    });
}