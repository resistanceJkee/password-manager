$(document).ready(() => {
    $("#btnMenu").on("click", () => {
        $("#btnMenu > div:nth-child(1)").toggleClass("first-div-rotate")
        $("#btnMenu > div:nth-child(2)").toggleClass("second-div-rotate")
        $("#btnMenu > div:nth-child(3)").toggleClass("third-div-none")
        $("#menu-body").toggleClass("open").toggleClass("menu-body-close")
    })
})