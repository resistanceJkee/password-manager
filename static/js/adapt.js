function resizeMenu() {
    let height = document.documentElement.clientHeight - $("#navId").outerHeight();
    $("#menu-body").outerHeight(height);
    $("#tablePasswords").outerHeight(height);
}

$(document).ready(() => {
    resizeMenu();
    $(window).on("resize scroll", () => {
        resizeMenu();
    })
    $(document).on("resize scroll", () => {
        resizeMenu();
    })
})