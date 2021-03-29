Менеджер паролей "Монокль"
---
### Навигатор
1. [О программе](#about)
2. [Функциональная составляюща](#func)
3. [Особенности программы](#spec)
4. [Системные требования](#sysconf)
5. [Для разработчиков](#for_pr)
6. [Разработчик](#student)
7. [Контактные данные](#cont)
---
### <a name="about">О программе</a> 
> Программа "Монокль" предназначена для хранения накопившихся в большом количестве паролей и логинов, а также прочих данных, которые могут относится к этим самым паролям. В программе каждый пароль относится к своей категории, то есть: существует, например, Yandex-почта, у вас накопилось 3-4 пароля от неё, все они будут относится к тегу Yandex и т. д.
---
### <a name="func">Функциональность программы</a>
* Добавление данных
* Изменение данных
* Удаление данных
* Шифрование и дешифрование данных
---
### <a name="spec">Особенности программы</a>
* Безопасность данных. Благодаря созданию случайного пароля самой программой и шифрованию данных, смысл от кражи базы данных просто нет, так как расшифровать данные не скоро получится
* Кроссплатформенность. Программа создана на языке Python, а также создан браузерный тип работы, чтобы программа могла работать как в windows, так и в unix подобных системах
---
### <a name="sysconf">Системные требования</a>
#### Минимальные системные требования **\***

| Характеристика       | Требование                                       |
| :------------------- | :----------------------------------------------- |
| Операционная система | Windows 7, 8, 8.1, 10 / Debian подобные **\*\*** |
| Размер экрана        | 1280х720 и выше                                  |
| Процессора           | Intel Pentium G4560 и выше / AMD fx-8350 и выше  |
| Оперативная память   | От 4 Гб и выше                                   |
| Дополнительное ПО    | Python 3.7+                                      |
| Браузер              | Любой браузер с поддержкой стандарта ES6         |

#### Рекомендуемые системные требования

| Характеристика       | Требование                                |
| :------------------- | :---------------------------------------- |
| Операционная система | Windows 10 / Ubuntu 20.04                 |
| Размер экрана        | 1920x1080 и выше                          |
| Процессора           | Intel Core i3 и выше / AMD Ryzen 3 и выше |
| Оперативная память   | От 6 Гб и выше                            |
| Дополнительное ПО    | Python 3.9+                               |
| Браузер              | Любой браузер с поддержкой стандарта ES6  |

* \* - наличие данных характеристик является минимальным требованием для запуска программы. Это значит, что запуск на ещё более слабом железе не гарантирует стабильную работ
* \*\* - данный продукт разрабатывался на языке программирования Python (если смотреть на серверную часть), следовательно, можно предположить, что продукт будет работать везде, где может запуститься Python код, однако, само тестирование происходило на windows 10 и ubuntu 20.04, из чего можно сделать вывод, что лучше всего будет использовать именно эти ОС.
* ES6 - стандарт 2015 года. Поддерживается всеми браузерами, за исключением Internet Explorer.
---
### <a name="patch">Обновления</a>
* **Версия 0.9**
  1. Добавлена возможность импорта и экспорта ключа и базы данных. Данный функционал разделён на 6 функций: импорт/экспорт только ключа, импорт/экспорт только базы данных, импорт/экспорт ключа и дб вместе.
  2. Добавлена возможность при добавлении пароля посмотреть, какой текст был введён в поле (кнопка eye в дальнейшем будет заменена на иконку с глазом)
  3. Добавлена возможность рандомить пароль при добавлении его в базу
  4. Исправлен баг, когда при выборе определённой категории грузилась первая категория из списка, а не та, которая была указана в настройках
* **Версия 0.8.5**
  1. Добавлен пункт в настройках "Переключаться на только что добавленный пароль". Данная функция, если активирована, автоматически открывает окно с категорией, в которую добавили новый пароль
  2. Поле текстового ввода "Введите логин" (поиск пароля) теперь реагирует на любой регистр. Это значит, что при поиске логина "Test" можно ввести первую букву "t" в нижнем регистре и программа всё равно покажет этот логин
  3. Запуск сервера и запуск браузера разделены на 2 потока так, чтобы сначала запускался сервер, а потом браузер. Это временное решение до момента, пока не будет найдено более лучшее решение
  4. Улучшена производительность функций по отрисовке категорий и паролей
  5. Добавлен раздел минимальных системных требований
  6. Добавлен раздел рекомендуемых системных требований
  7. Удалён раздел для разработчиков
  8. Удалены лишние файлы из репозитория (оставлены разделённые min и prod файлы, релизе будет только min)
* **Версия 0.8**
  * Добавлены настройки. Сама секция настроек будет обновляться по мере необходимости или новых идей. Настройки хранятся по пути путь/до/password-manager/settings/settings.json и могут обновляться как вручную, так и средствами gui
  * Исправлена ошибка на unix-подобных системах, когда база данных оказывалась за пределами директории password-manager
* **Версия 0.2**
  * Добавлены уведомления на добавление, обновление, удаление паролей
  * Добавлены настройки с тестовым параметром (пока что не сохраняются глобально при shutdown`е сервера)
  * Добавлено автовыделение полей при клике (focus`е)
  * Добавлен тестовый параметр в настройки - автокопирование текущего поля
  * Изменена разметка с заделом на будущие изменения (одна из них - настройки пользователя)
  * Добавлены функции с заделом на будущие изменения
  * Закомментирована часть функций (роутинги сервера не документируются)
* **Версия 0.1**
  * Создана изначальная версия программы
---
### <a name="student">Разработчик</a> 
* Разработал: Умывалкин Максим
* ВУЗ: Ульяновский Государственный Технический Университет
* Факультет: Информационные системы и технологии
* Группа: Информатика и вычислительная техника. Автоматизированные системы
* Курс: 2
---
### <a name="cont">Контактные данные</a>
* [ВКонтакте](https://vk.com/resistancejkee)
* [Twitter](https://twitter.com/resistancejkee)
* [Instagram](https://www.instagram.com/resistancejkee)
* Почта: maximkostenko123@gmail.com