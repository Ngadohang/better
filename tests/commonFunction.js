
const com = require('./common');
const el = require('./element');
const faker = require('faker/locale/vi');
let fileImage = '';
let name = '';
let time = '2021-04-20';
let password = makePassword();

module.exports = {
    inputNameTextBox: async function (page) {
        name = faker.fake("{{name.firstName}} {{name.lastName}}");
        await com.typeText(page, el.nameTextBox, name);
    },
    inputEmailTextBox: async function (page) {
        await com.typeKey(page, el.emailTextBox, makeEmail());
    },
    inputUserNameLogin: async function (page) {
        await com.typeText(page, el.emailLogin, "dungtho090883@gmail.com");
    },
    inputPhoneNumberTexBox: async function (page) {
        await com.typeText(page, el.phoneTextBox, makePhone());
    },
    inputDateTimeTextBox: async function (page) {
        await com.setValueAttribute(page, el.datetimeTextBox, "value", time);
        await com.downKey(page, 'Enter');
    },
    inputPasswordLogin: async function (page) {
        let pass = makePassword();
        await com.typeText(page, el.passwordLogin, "123456");
    },
    inputPasswordTextBox: async function (page) {
        await com.typeText(page, el.passwordTextBox, password);
    },
    inputComfirmPasswordTextBox: async function (page) {
        await com.typeText(page, el.confirmPasswordTextBox, password);
    },
    selectDropdownCustom: async function (page, parentItem, childItem, expect) {
        await com.selectValueDropdownCustom(page, parentItem, childItem, expect);
    },
    uploadImage: async function (page, location, fileName) {
        await com.clickBySelector(page, location);
        await com.uploadFile(page, "", fileName);
    },
    clickToLoginButton: async function (page) {
        await com.clickBySelector(page, el.loginButton);
    },
    clickToAddNewButton: async function (page) {
        await com.clickBySelector(page, el.addNewButton);
    },
    getTextByIndexRowAndIndexColumn: async function (page, row, column) {
        try {
            const location= el.index(row, column);
            await page.waitForSelector(location);
            return await page.$eval(location, element=> element.textContent);
        } catch (error) {
            throw new Error('Could not get Text from selector');
        }
    },
    

}

function makeEmail() {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890';
    let email = '';
    for (let i = 0; i < 10; i++) {
        email += chars[Math.floor(Math.random() * chars.length)];
    }
    return email + '@gmail.com';

}
function makePhone() {
    const chars = '0123456789';
    let phone = '';
    for (let i = 0; i < 6; i++) {
        phone += chars[Math.floor(Math.random() * chars.length)];
    }
    return '0912' + phone;
}
function makePassword() {
    const chars = 'abcdefghijklmnopqrstuvwxyz1234567890ZXCVBNMASDFGHJKLQWERTYUIOP';
    let password = '';
    for (let i = 0; i < 8; i++) {
        password += chars[Math.floor(Math.random() * chars.length)];
    }
    return password;
}

