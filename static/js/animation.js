$(document).ready(() => {
    $("#btnMenu").on("click", () => {
        $("#btnMenu").toggleClass("btn-outline-primary").toggleClass("btn-primary")
        $("#menu-body").toggleClass("open").toggleClass("menu-body-close")
    })
})