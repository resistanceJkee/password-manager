
function validateLogin() {

}

function validatePassword() {

}

function validateMail() {

}

function validatePhone() {

}

$(document).ready(() => {
    $("#category").on("focus", () => {
        $("#category").removeClass("red-outline")
    })
    $("#login").on("focus", () => {
        $("#login").removeClass("red-outline")
    })
    $("#passwordInput").on("focus", () => {
        $("#passwordInput").removeClass("red-outline")
    })
})