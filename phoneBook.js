'use strict';

var phoneBook = []; // Здесь вы храните записи как хотите

/*
   Функция добавления записи в телефонную книгу.
   На вход может прийти что угодно, будьте осторожны.
*/
module.exports.add = function add(name, phone, email) {
    var phoneRegex = /^([+]?[0-9]+|[0-9]*)+[ ]?((\([0-9]{3})\)|[0-9]{3})[ ]?[0-9][0-9 \-]{6,8}$/;
    var emailRegex = /^[A-Za-z0-9\.\-_]+@[A-Za-z0-9А-ЯЁа-яё\.\-_]+\.[A-Za-z0-9А-ЯЁа-яё]{2,}$/;
    if (phoneRegex.test(phone) && emailRegex.test(email)) {
        var contact = {
            name: name,
            phone: phone,
            email: email
        };
        if (!contact.name) {
            contact.name = phone;
        }
        var i = phoneBook.push(contact) - 1;
        return phoneBook[i];
    } else {
        return false;
    }
};

/*
    Выводит содержимое контакта через ','
*/
function showContacts(contacts) {
    for (var i = 0, j = contacts.length; i < j; i++) {
        console.log(contacts[i].name + ', ' + contacts[i].phone + ', ' + contacts[i].email);
    }
}

/*
    Проверяет есть ли в полях контакта строка поиска
*/
function queryInContact(query, contact) {
    return (contact.name.toLowerCase().includes(query.toLowerCase()) ||
            contact.phone.toLowerCase().includes(query.toLowerCase()) ||
            contact.email.toLowerCase().includes(query.toLowerCase())
    );
    //return (contact.name.indexOf(query) >= 0 || contact.phone.indexOf(query) >= 0 || contact.email.indexOf(query) >= 0);
}


/*
   Функция поиска записи в телефонной книге.
   Поиск ведется по всем полям.
*/
module.exports.find = function find(query) {
    var foundContacts;
    if (query === undefined) {
        foundContacts = phoneBook;
    } else {
        foundContacts = phoneBook.filter(function (contact) {
            return queryInContact(query, contact);
        });
    }
    showContacts(foundContacts);
};

/*
   Функция удаления записи в телефонной книге.
*/
module.exports.remove = function remove(query) {
    var removeCount = 0;
    for (var i = phoneBook.length - 1; i >= 0; i--) {
        if (queryInContact(query, phoneBook[i])) {
            phoneBook.splice(i, 1);
            removeCount++;
        }
    }
    console.log('Удалено контактов: ' + removeCount);
};

/*
   Функция импорта записей из файла (задача со звёздочкой!).
*/
module.exports.importFromCsv = function importFromCsv(filename) {
    var rows = require('fs').readFileSync(filename, 'utf-8').replace(/\r/g, '').split('\n');
    var row;

    for (var i = 0, j = rows.length; i < j; i++) {
        row = rows[i].split(';');
        if (row.length == 3) {
            if (!module.exports.add(row[0], row[1], row[2])) {
                console.error('Не удалось добавить строчку ' + (i + 1) + '. Неправильный формат данных.');
            }
        } else {
            console.error('Не удалось добавить строчку ' + (i + 1));
        }
    }
};


/*
   Формирует поле для вывода в таблице
*/
function createField(length, data) {
    var row = '';
    if (data.length > length) {
        row += data.slice(0, length - 3) + '..';
    } else {
        var spaceWidth = length - data.length;
        row += data;
        for (var j = 0; j < spaceWidth; j++) {
            row += ' ';
        }
    }
    return row;
}

/*
   Функция вывода всех телефонов в виде ASCII (задача со звёздочкой!).
*/
module.exports.showTable = function showTable() {
    var spaceWidth = 0;
    var row = '';
    var rowWidth = {name: 25, phone: 20, email: 30};
    console.log('┌─────────────────────────┬────────────────────┬──────────────────────────────┐');
    console.log('│           Имя           │      Телефон       │             Email            │');
    console.log('├─────────────────────────┼────────────────────┼──────────────────────────────┤');

    for (var i = 0, l = phoneBook.length; i < l; i++) {
        row = '│';
        row += createField(rowWidth.name, phoneBook[i].name) + '│';
        row += createField(rowWidth.phone, phoneBook[i].phone) + '│';
        row += createField(rowWidth.email, phoneBook[i].email) + '│';
        console.log(row);
        //console.log(phoneBook[i].name + ' ' + phoneBook[i].phone + ' ' + phoneBook[i].email);
    }
    console.log('└─────────────────────────┴────────────────────┴──────────────────────────────┘');
};
