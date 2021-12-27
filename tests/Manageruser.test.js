const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const func=require('./commonFunction');
const el = require('./element');
const faker = require('faker/locale/vi');
const path = require('path');
const fs = require('fs');
let browser = null;
let page = null

describe("Create New User", () => {
    before("Before test class", async () => {
        browser = await puppeteer.launch({
            headless: false,
            args: ['--start-fullscreen'],
            slowMo: 50,

        })
        page = await browser.newPage()
        await page.setViewport({ width: 1366, height: 725 });;
        await page.goto('http://geetschool.labo.io/#/user/login');
        //{ waitUntil: 'domcontentloaded' }
        await func.inputUserNameLogin(page);
        await func.inputPasswordLogin(page);
        await func.clickToLoginButton(page);

    }),

    it("Create New User", async () => {
       // await func.clickToAddNewButton(page);
        const x =await func.getTextByIndexRowAndIndexColumn(page,1,2);
        expect(x).to.equal('a');
        
    }),
    it('Verify dkjd', async()=>{
        const y =await func.getTextByIndexRowAndIndexColumn(page,1,6);
        expect(y).to.equal('090909088');
    })
    

})


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