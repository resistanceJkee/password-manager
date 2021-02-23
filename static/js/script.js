var ALL_CATEGORIES;
var ALL_PASSWORDS;
var flagFirstTimeLoad = true;

/**
 * Получить категории из базы данных
 *
 * Функция выполняет getJSON запрос на сервер, от которого получает данные в json формате. В
 * нём находится массив имён (категорий), которые были найдены в базе данных
 */
function getCategories() {
    $.getJSON(
        "/categories",
        {},
        function (data) {
            ALL_CATEGORIES = data.message;
            displayCategories();
        }
    )
}

/**
 * Отобразить категории
 *
 * Функция отрисовывает категории, которые были получены в getCategories
 */
function displayCategories() {
    let root = $("#categoriesRoot");
    root.empty();
    let text = $("#categories").val();
    for (let i = 0; i < ALL_CATEGORIES.length; i++) {
        if (ALL_CATEGORIES[i].indexOf(text) !== -1) {
            root.append(`<button type="button" class="btn btn-outline-primary m-3">${ALL_CATEGORIES[i]}</button>`);
        }
    }
    if (ALL_CATEGORIES.length === 0) {
        $("#passwordRoot").append(`
            <h2>Добавьте пароль!</h2>
        `);
        return;
    } else {
        if (flagFirstTimeLoad) {
            flagFirstTimeLoad = false;
            let category = $("#openFirstCategory").val();
            if (ALL_CATEGORIES.indexOf(category) !== -1) {
                getPasswords(category);
            } else {
                if (category === "") {
                    getPasswords(ALL_CATEGORIES[0]);
                    return;
                }
                $("#alertErrorLoadCategory").toggleClass("show");
                setTimeout(function () {
                    $("#alertErrorLoadCategory").toggleClass("show");
                }, 5000);
            }
        }
    }
}

/**
 * Добавить пароль
 *
 * Функция добавляет пароль в базу данных. Из инпутов берутся значения, далее выполняется post запрос
 * на сервер, где данные заносятся в базу
 */
function addPassword() {
    /***********************************************/
    let selectCategory = $("#category");
    let selectLogin = $("#login");
    let selectPassword = $("#passwordInput");
    let selectMail = $("#mail");
    let selectPhone = $("#phone");
    let selectDescription = $("#description");
    /***********************************************/
    let category = selectCategory.val().toLowerCase();
    let login = selectLogin.val();
    let password = selectPassword.val();
    let mail = selectMail.val();
    let phone = selectPhone.val();
    let description = selectDescription.val();
    if (category === '') {
        selectCategory.addClass("red-outline");
        return;
    }
    if (login === '') {
        selectLogin.addClass("red-outline");
        return;
    }
    if (password === '') {
        selectPassword.addClass("red-outline");
        return;
    }
    $.post(
        "/password",
        {
            category,
            login,
            password,
            mail,
            phone,
            description
        },
        function (data) {
            let text = JSON.parse(data);
            if (text.message.indexOf("done") !== -1) {
                $("#alertSuccessAdded").toggleClass("show");
                setTimeout(() => {
                    $("#alertSuccessAdded").toggleClass("show")
                }, 5000);
                clearInputsAfterAdding();
                getCategories();
                if ($("#categoryName").text().toLowerCase() === category.toLowerCase()) {
                    getPasswords(category);
                }
                if ($("#focusToNew").is(":checked") && $("#categoryName").text().toLowerCase() !== category.toLowerCase()) {
                    getPasswords(category);
                }
            } else {
                $("#alertDeclineAdded").toggleClass("show");
                setTimeout(() => {
                    $("#alertDeclineAdded").toggleClass("show")
                }, 5000);
            }
        }
    )
}

/**
 * Функция очищает инпуты после добавления пароля
 */
function clearInputsAfterAdding() {
    $("#login").val('')
    $("#passwordInput").val('')
    $("#mail").val('')
    $("#phone").val('')
    $("#description").val('')
}

/**
 * Получить пароли
 *
 * Функция по полученной категории отправляет запрос на сервер, откуда получает данные о паролях, которые
 * находятся в категории
 *
 * @param category - название категории
 */
function getPasswords(category) {
    $("#categoryName").text(category)
    $.get(
        "/password",
        {
            category
        },
        function (data) {
            ALL_PASSWORDS = JSON.parse(data).message
            displayPasswords()
        }
    )
}

/**
 * Отобразить пароли
 *
 * Функция отрисовывает пароли, путём добавления разметки в таблицу. Каждая строка - отдельный логин+пароль+
 * +дополнительные данные.
 */
function displayPasswords() {
    let root = $("#passwordRoot");
    root.empty();
    let text = $("#searchPassInTable").val().toLowerCase();
    for (let i = 0; i < ALL_PASSWORDS.length; i++) {
        let lowerLogin = ALL_PASSWORDS[i].login.toLowerCase();
        if (lowerLogin.indexOf(text) !== -1) {
            root.append(`
                <tr class="tr-appended text-center">
                    <th>${ALL_PASSWORDS[i].id}</th>
                    <td><div class="form-control" contenteditable="true">${ALL_PASSWORDS[i].login}</div></td>
                    <td><div class="form-control" contenteditable="true">${ALL_PASSWORDS[i].pass}</div></td>
                    <td><div class="form-control" contenteditable="true">${ALL_PASSWORDS[i].email === null ? "" : ALL_PASSWORDS[i].email}</div></td>
                    <td><div class="form-control" contenteditable="true">${ALL_PASSWORDS[i].phone === null ? "" : ALL_PASSWORDS[i].phone}</div></td>
                    <td><div class="form-control" contenteditable="true">${ALL_PASSWORDS[i].description === null ? "" : ALL_PASSWORDS[i].description}</div></td>
                    <td class="d-flex flex-row align-items-center justify-content-center">
                        <button class="upd btn btn-primary me-1">&uparrow;</button>
                        <button class="del btn btn-primary btn-close me-1"></button>
                    </td>
                </tr>
            `)
        }
    }
}

/**
 * Обновить пароль
 *
 * Функция обновляет пароли через отправку запроса на сервер
 *
 * @param id - <td> №1 - id в таблице
 * @param login - <td> №2 - логин в таблице
 * @param password - <td> №3 - пароль в таблице
 * @param mail - <td> №4 - почта в таблице
 * @param phone - <td> №5 - телефон в таблице
 * @param description - <td> №6 - примечание в таблице
 */
function updatePassword(id, login, password, mail, phone, description) {
    $.ajax({
        url: "/password",
        type: "PUT",
        data: {
            id,
            login,
            password,
            mail,
            phone,
            description
        },
        success: function (data) {
            let text = JSON.parse(data)
            console.log(text.message)
            if (text.message.indexOf("done") !== -1) {
                $("#alertSuccessUpdated").toggleClass("show")
                setTimeout(() => {
                    $("#alertSuccessUpdated").toggleClass("show")
                }, 5000)
            } else {
                $("#alertDeclineUpdated").toggleClass("show")
                setTimeout(() => {
                    $("#alertDeclineUpdated").toggleClass("show")
                }, 5000)
            }
        }
    })
}

/**
 * Удалить пароль
 *
 * Функция удаляет пароль по id в таблице
 *
 * @param id - id в таблице
 * @param element - строка в таблице (tr)
 */
function deletePassword(id, element) {
    $.ajax({
        url: "/password",
        type: "DELETE",
        data: {id},
        success: function (data) {
            let text = JSON.parse(data)
            console.log(text.message)
            if (text.message.indexOf("done") !== -1) {
                $("#alertSuccessDeleted").toggleClass("show")
                setTimeout(() => {
                    $("#alertSuccessDeleted").toggleClass("show")
                }, 5000)
                deleteElement(element)
            } else {
                $("#alertDeclineDeleted").toggleClass("show")
                setTimeout(() => {
                    $("#alertDeclineDeleted").toggleClass("show")
                }, 5000)
            }
        }
    })
}

/**
 * Удалить элемент
 *
 * После удаления в базе данных, данная функция удаляет tr из таблицы
 *
 * @param element - строка в таблице (tr)
 */
function deleteElement(element) {
    $(element).animate({
        height: "0px",
        opacity: 0
    }, 500)
    setTimeout(() => {
        $(element).remove()
    }, 700)
}

/**
 * Устанавливает настройки во вкладке настроек (модалке)
 */
function getSettings() {
    $.getJSON(
        "/settings",
        {},
        function (data) {
            setSettings(data);
        }
    )
}

/**
 * Ставит чекбоксы в нужное состояние в графе настроек.
 * 
 * @param data - объект с настройками
 */
function setSettings(data) {
    $("#autoCopy").prop("checked", data.autoCopy === "true");
    $("#focusToNew").prop("checked", data.focusToNew === "true");
    console.log(data.openThisCategory);
    $("#openFirstCategory").val(data.openThisCategory);
}

/**
 * Функция берёт текущее состояние чекбоксов и отправляет их на сервер
 */
function saveSettings() {
    let autoCopy = $("#autoCopy").prop("checked") === true;
    let focusToNew = $("#focusToNew").prop("checked") === true;
    let openThisCategory = $("#openFirstCategory").val().toLowerCase();
    $.ajax({
        type: "PUT",
        url: "/settings",
        data: {
            autoCopy: autoCopy,
            focusToNew: focusToNew,
            openThisCategory: openThisCategory
        },
        success: function () {
            getSettings();
        }
    });
}

$(document).ready(() => {
    getSettings();
    getCategories();
    $("#btnMenu").on("click", () => {
        $("#btnMenu").toggleClass("btn-outline-primary").toggleClass("btn-primary")
        $("#menu-body").toggleClass("open").toggleClass("menu-body-close")
    })
    $("#addPassBtn").on("click", () => {
        addPassword();
    })
    $("#categoriesRoot").on("click", (e) => {
        if (e.target.tagName === 'BUTTON') {
            getPasswords($(e.target).text());
            $("#categories").val('');
            displayCategories();
        }
    })
    $("#searchPassInTable").keyup(() => {
        displayPasswords();
    })
    $("#categories").keyup(() => {
        displayCategories();
    })
    $("#passwordRoot").on("click", (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.classList.contains("upd")) {
            let tdParent = $(e.target).parent();
            let siblingsItems = $(tdParent).siblings();
            let id = $(siblingsItems[0]).text();
            let login = $(siblingsItems[1]).children().text();
            let password = $(siblingsItems[2]).children().text();
            let mail = $(siblingsItems[3]).children().text() === "null" ? null : $(siblingsItems[3]).children().text();
            let phone = $(siblingsItems[4]).children().text() === "null" ? null : $(siblingsItems[4]).children().text();
            let description = $(siblingsItems[5]).children().text() === "null" ? null : $(siblingsItems[5]).children().text();
            updatePassword(id, login, password, mail, phone, description);
        }
        if (e.target.tagName === 'BUTTON' && e.target.classList.contains("del")) {
            let th = $(e.target).parent().siblings()[0];
            let id = $(th).text();
            let element = $(th).parent();
            deletePassword(id, element);
        }
        if (e.target.tagName === "DIV" && e.target.contentEditable === 'true') {
            document.execCommand("selectAll", false, null);
            if ($("#autoCopy").is(":checked")) {
                document.execCommand("copy");
            }
        }
    })
    $("#saveSettings").on("click", (e) => {
        saveSettings();
    })
})