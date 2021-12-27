const puppeteer = require('puppeteer');
const expect = require('chai').expect
const common = require('./tests/common');
const faker = require('faker/locale/vi');
let browser = null;
let page = null;
let context= null;
let name, email, phone, password;

describe('HappyCase', () => {

    // Code này được chạy khi bắt đầu chạy unit test
    before(async () => {
        browser = await puppeteer.launch({ headless: false ,
            slowMo:10,
        });
        context = await browser.createIncognitoBrowserContext();
        page = await context.newPage();
        await page.setViewport({
            width: 1920,
            height: 1080 
        });

        // Mặc định, timeout của jest là 5s. 
        // Vì web load có thể lâu nên ta tăng lên thành 60s.
        jest.setTimeout(60000);
    });

    // Đóng trình duyệt sau khi đã chạy xong các test case
    after(async () => {
       // await browser.close();
    });

    // Trước khi chạy mỗi test case, vào trang chủ của lazada
    beforeEach(async () => {
        await page.goto("https://ej2.syncfusion.com/angular/demos/?_ga=2.262049992.437420821.1575083417-524628264.1575083417#/material/drop-down-list/data-binding");
    });

    // test('Register_Success', async () => {
    //     //click to register button
    //     const openRegisterButton = await page.$x("//a[text()='Đăng ký']");
    //     await openRegisterButton[0].click();
    //     await page.waitForSelector('div.uk-text-center>h3');

    //     await new Promise(rel => setTimeout(rel, 1000));
    //     await page.waitForSelector("#preloader.loader-hide");
    //     await page.waitForSelector("input[name='name']");
    //     const nameTextBox = await page.$("input[name='name']");
    //     name = faker.fake("{{name.firstName}} {{name.lastName}}")
    //     await nameTextBox.type(name);
    //     await page.waitForSelector("input[name='email']");
    //     const emailTextBox = await page.$("input[name='email']");
    //     email = makeEmail();
    //     await emailTextBox.type(email);
    //     await page.waitForSelector("input[name='mobile']");
    //     const phoneTextBox = await page.$("input[name='mobile']");
    //     phone = makePhone();
    //     await phoneTextBox.type(phone);
    //     await page.waitForSelector("input[name='newPassword']");
    //     const passwordTextBox = await page.$("input[name='newPassword']");
    //     password = makePassword();
    //     await passwordTextBox.type(password);
    //     await page.waitForSelector("input[name='rePassword']");
    //     const repasswordTextBox = await page.$("input[name='rePassword']");
    //     await repasswordTextBox.type(password);
    //     await page.waitForSelector("button[type='submit']");
    //     const registerButton = await page.$x("//button[@type='submit']");
    //     await registerButton[0].click();
    //     await page.waitForSelector("h2#swal2-title");
    //     const registerSuccessMessage = await page.evaluate(element => document.querySelector('h2#swal2-title').textContent);
    //     expect(registerSuccessMessage).toEqual("Cảm ơn đã đăng ký tài khoản.");

    // });

    // test('Login success', async () => {
    //     await new Promise(rel => setTimeout(rel, 3000))
    //     await page.waitForSelector('div.uk-text-center>h3');
    //     const titleLogin = await page.evaluate(element => document.querySelector('div.uk-text-center>h3').textContent);
    //     expect(titleLogin).toEqual("Đăng nhập");
    //     await page.waitForSelector("input[name='username']");
    //     const usernameTextBox = await page.$("input[name='username']");
    //     await usernameTextBox.type(email);
    //     await page.waitForSelector("input[name='password']");
    //     const passwordTextBox = await page.$("input[name='password']");
    //     await passwordTextBox.type(password);
    //     await page.waitForSelector("button[type='submit']");
    //     const registerButton = await page.$x("//button[@type='submit']");
    //     await registerButton[0].click();
    //     await new Promise(rel => setTimeout(rel, 10000))

    // });

    it('test select dropdown defauls',async()=>{
        await common.selectValueDropdownCustom(page,"span[aria-owns='games_options']","ul#games_options>li","Rugby");
    });
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

   







    




})
