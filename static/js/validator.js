function validateMail() {
    let field = $("#mail");
    let currentVal = field.val();
    if (currentVal.match(/[\w\.]+@[\w]{2,10}\.[\w]{2,8}/)) {
        field.removeClass("border-danger");
        field.addClass("border-success");
    } else {
        field.removeClass("border-success");
        field.addClass("border-danger");
    }
}

function validatePhone() {
    let field = $("#phone");
    let currentVal = field.val();
    if (currentVal.match(/[\d]{8,12}/)) {
        field.removeClass("border-danger");
        field.addClass("border-success");
    } else {
        field.removeClass("border-success");
        field.addClass("border-danger");
    }
}

function togglePassVision() {
    let pi = $("#passwordInput");
    if (pi.attr("type") === "password") {
        pi.attr("type", "text");
    } else {
        pi.attr("type", "password");
    }
}

function randomPass() {
    let randomSymbols = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!№;%:?*()_+=";
    let password = "";
    for (let i = 0; i < 16; i++) {
        password += randomSymbols.charAt(Math.floor(Math.random() * randomSymbols.length));
    }
    $("#passwordInput").val(password);
}

$(document).ready(() => {
    $("#category").on("focus", () => {
        $("#category").removeClass("red-outline")
    });
    $("#login").on("focus", () => {
        $("#login").removeClass("red-outline")
    });
    $("#passwordInput").on("focus", () => {
        $("#passwordInput").removeClass("red-outline")
    });
    $("#randBtn").on("click", () => {
        randomPass();
    });
    $("#seePass").on("click", () => {
        togglePassVision();
    });
    $("#mail").on("keyup", () => {
        validateMail();
    });
    $("#phone").on("keyup", () => {
        validatePhone();
    });
})