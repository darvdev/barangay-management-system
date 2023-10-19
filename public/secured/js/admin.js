document.addEventListener("DOMContentLoaded", function(event) {
    let token = sessionStorage.getItem("token");
    verifyToken(token, onLoad);
});

const onLoad = function() {
    document.querySelector("#loader").style = "display:none;";
    document.querySelector("#body").style = "display:block;";
}