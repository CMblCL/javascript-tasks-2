'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
    var phoneRegex = /^[+]?[0-9]+[ ]?((\([0-9]+)\)|[0-9]+)[ ]?([0-9]|-| )+$/;
    var emailregex = /^[A-Z,a-z,0-9,А-Я,а-я]+@[A-Z,a-z,0-9,А-Я,а-я,\.,-]+\.[A-Z,a-z,0-9,А-Я,а-я]+$/;
    if (phoneRegex.test(phone) && emailregex.test(email)) {
        var contact = {
            name: name,
            phone: phone,
            email: email
        };
        phoneBook.push(contact);
        return contact;
    } else {
        return false;
    }
};

/*
   Функция поиска записи в телефонную книгу.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    if (query === undefined) {
        for (var i = phoneBook.length - 1; i >= 0; i--) {
            console.log(phoneBook[i].name + ', ' + phoneBook[i].phone + ', ' + phoneBook[i].email);
        }
    } else {
        for (var i = phoneBook.length - 1; i >= 0; i--) {
            if (phoneBook[i].name.indexOf(query) >= 0 ||
            phoneBook[i].phone.indexOf(query) >= 0 ||
            phoneBook[i].email.indexOf(query) >= 0) {
                console.log(phoneBook[i].name + ', ' +
                            phoneBook[i].phone + ', ' + phoneBook[i].email);
            }
        }
    }
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    var removeCount = 0;
    for (var i = phoneBook.length - 1; i >= 0; i--) {
        if (phoneBook[i].name.indexOf(query) >= 0 ||
        phoneBook[i].phone.indexOf(query) >= 0 ||
        phoneBook[i].email.indexOf(query) >= 0) {
            phoneBook.splice(i, 1);
            //phoneBook[i] = undefined;
            removeCount++;
        }
    }
    console.log('Удален ' + removeCount + ' контакт(ов)');
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var data = require('fs').readFileSync(filename, 'utf-8');

    // Ваша чёрная магия:
    // - Разбираете записи из `data`
    // - Добавляете каждую запись в книгу
};

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {
    var rowWidth = 25;
    var spaceWidth = 0;
    var row;
    console.log('┌─────────────────────────┬─────────────────────────┬─────────────────────────┐');
    console.log('│           Имя           │         Телефон         │          email          │');
    console.log('├─────────────────────────┼─────────────────────────┼─────────────────────────┤');

    for (var i = phoneBook.length - 1; i >= 0; i--) {
        row = '│ ';

        spaceWidth = rowWidth - phoneBook[i].name.length - 1;
        row += phoneBook[i].name;
        for (var j = 0; j < spaceWidth; j++) {
            row += ' ';
        }
        row += '│ ';

        spaceWidth = rowWidth - phoneBook[i].phone.length - 1;
        row += phoneBook[i].phone;
        for (var j = 0; j < spaceWidth; j++) {
            row += ' ';
        }
        row += '│ ';

        spaceWidth = rowWidth - phoneBook[i].email.length - 1;
        row += phoneBook[i].email;
        for (var j = 0; j < spaceWidth; j++) {
            row += ' ';
        }
        row += '│';

        console.log(row);
        //console.log(phoneBook[i].name + ' ' + phoneBook[i].phone + ' ' + phoneBook[i].email);
    }
    console.log('└─────────────────────────┴─────────────────────────┴─────────────────────────┘');
};
