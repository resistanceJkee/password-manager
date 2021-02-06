var ALL_CATEGORIES;
var ALL_PASSWORDS;

/**
 * Получить категории из базы данных
 *
 * Функция выполняет getJSON запрос на сервер, от которого получает данные в json формате. В
 * нём находится массив имён (категорий), которые были найдены в базе данных
 */
function getCategories() {
    $.getJSON(
        "/get_categories",
        {},
        function (data) {
            ALL_CATEGORIES = data.message
            displayCategories(ALL_CATEGORIES)
        }
    )
}

/**
 * Отобразить категории
 *
 * Функция отрисовывает категории, которые были получены в getCategories
 *
 * @param categories - массив имён
 */
function displayCategories(categories) {
    let root = $("#categoriesRoot")
    root.empty()
    let text = $("#categories").val()
    for (let i = 0; i < categories.length; i++) {
        if (categories[i].indexOf(text) !== -1) {
            root.append(`<button type="button" class="btn btn-outline-primary m-3">${categories[i]}</button>`)
        }
        // root.append(`<button type="button" class="btn btn-outline-primary m-3">${categories[i]}</button>`)
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
    let selectCategory = $("#category")
    let selectLogin = $("#login")
    let selectPassword = $("#passwordInput")
    let selectMail = $("#mail")
    let selectPhone = $("#phone")
    let selectDescription = $("#description")
    /***********************************************/
    let category = selectCategory.val().toLowerCase()
    let login = selectLogin.val()
    let password = selectPassword.val()
    let mail = selectMail.val()
    let phone = selectPhone.val()
    let description = selectDescription.val()
    if (category === '') {
        selectCategory.addClass("red-outline")
        return
    }
    if (login === '') {
        selectLogin.addClass("red-outline")
        return
    }
    if (password === '') {
        selectPassword.addClass("red-outline")
        return
    }
    $.post(
        "/add_password",
        {
            category,
            login,
            password,
            mail,
            phone,
            description
        },
        function (data) {
            let text = JSON.parse(data)
            console.log(text.message)
            if (text.message.indexOf("done") !== -1) {
                $("#alertSuccessAdded").toggleClass("show")
                setTimeout(() => {
                    $("#alertSuccessAdded").toggleClass("show")
                }, 5000)
                clearInputsAfterAdding()
                getCategories()
            } else {
                $("#alertDeclineAdded").toggleClass("show")
                setTimeout(() => {
                    $("#alertDeclineAdded").toggleClass("show")
                }, 5000)
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
 * Получить категории
 *
 * Функция по полученной категории отправляет запрос на сервер, откуда получает данные о паролях, которые
 * находятся в категории
 *
 * @param category - название категории
 */
function getPasswords(category) {
    $("#categoryName").text(category)
    $.get(
        "/get_passwords",
        {
            category
        },
        function (data) {
            ALL_PASSWORDS = JSON.parse(data).message
            displayPasswords(ALL_PASSWORDS)
        }
    )
}

/**
 * Отобразить пароли
 *
 * Функция отрисовывает пароли, путём добавления разметки в таблицу. Каждая строка - отдельный логин+пароль+
 * +дополнительные данные.
 *
 * @param passwords - массив паролей
 */
function displayPasswords(passwords) {
    let root = $("#passwordRoot")
    root.empty()
    let text = $("#searchPassInTable").val()
    for (let i = 0; i < passwords.length; i++) {
        if (passwords[i].login.indexOf(text) !== -1) {
            root.append(`
            <tr class="tr-appended text-center">
                <th>${passwords[i].id}</th>
                <td><div class="form-control" contenteditable="true">${passwords[i].login}</div></td>
                <td><div class="form-control" contenteditable="true">${passwords[i].pass}</div></td>
                <td><div class="form-control" contenteditable="true">${passwords[i].email}</div></td>
                <td><div class="form-control" contenteditable="true">${passwords[i].phone}</div></td>
                <td><div class="form-control" contenteditable="true">${passwords[i].description}</div></td>
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
        url: "/update_password",
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
        url: "/delete_password",
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
 * experimental
 */
function getSettings() {
    let copy = $("#autoCopy").val()
    console.log(copy)
    $.getJSON(
        "/get_settings",
        {},
        function (data) {
            console.log(data)
        }
    )
}

function setSettings() {

}

$(document).ready(() => {
    getSettings();
    getCategories();
    $("#addPassBtn").on("click", () => {
        addPassword()
    })
    $("#categoriesRoot").on("click", (e) => {
        if (e.target.tagName === 'BUTTON') {
            getPasswords($(e.target).text())
        }
    })
    $("#searchPassInTable").keyup(() => {
        displayPasswords(ALL_PASSWORDS)
    })
    $("#categories").keyup(() => {
        displayCategories(ALL_CATEGORIES)
    })
    $("#passwordRoot").on("click", (e) => {
        if (e.target.tagName === 'BUTTON' && e.target.classList.contains("upd")) {
            let tdParent = $(e.target).parent()
            let siblingsItems = $(tdParent).siblings()
            let id = $(siblingsItems[0]).text()
            let login = $(siblingsItems[1]).children().text()
            let password = $(siblingsItems[2]).children().text()
            let mail = $(siblingsItems[3]).children().text() === "null" ? null : $(siblingsItems[3]).children().text()
            let phone = $(siblingsItems[4]).children().text() === "null" ? null : $(siblingsItems[4]).children().text()
            let description = $(siblingsItems[5]).children().text() === "null" ? null : $(siblingsItems[5]).children().text()
            updatePassword(id, login, password, mail, phone, description)
        }
        if (e.target.tagName === 'BUTTON' && e.target.classList.contains("del")) {
            let th = $(e.target).parent().siblings()[0]
            let id = $(th).text()
            let element = $(th).parent()
            console.log("Родитель:", element)
            deletePassword(id, element)
        }
        if (e.target.tagName === "DIV" && e.target.contentEditable === 'true') {
            document.execCommand("selectAll", false, null)
            if ($("#autoCopy").is(":checked")) {
                document.execCommand("copy")
            }
        }
    })
    $("#saveSettings").on("click", () => {

    })
})