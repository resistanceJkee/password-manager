
function validateLogin() {

}

function validatePassword() {

}

function validateMail() {

}

function validatePhone() {

}

$(document).ready(() => {
    $("#category").on("click", () => {
        $("#category").removeClass("red-outline")
    })
    $("#login").on("click", () => {
        $("#login").removeClass("red-outline")
    })
    $("#passwordInput").on("click", () => {
        $("#passwordInput").removeClass("red-outline")
    })
})