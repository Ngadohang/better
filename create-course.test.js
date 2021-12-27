const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const com = require('./tests/common');
const el = require('./tests/element');
const faker = require('faker/locale/vi');
const path = require('path');
const fs = require('fs');
let browser = null;
let page = null

describe("Create New Deposit", () => {
    before("Before test class", async () => {
        browser = await puppeteer.launch({
            headless: false,
            args: ['--start-fullscreen'],
            slowMo: 50,

        })
        page = await browser.newPage()
        await page.setViewport({ width: 1366, height: 725 });;
        await page.goto('https://vpass.labo.vn/');
        //{ waitUntil: 'domcontentloaded' }
        await com.typeText(page, el.emailInput, 'hieu0304@gmail.com');
        await com.typeText(page, el.passwordInput, 'l3t4h87a');
        await com.clickBySelector(page, el.loginButton);
        await com.clickBySelector(page, 'button.ml-2.btn.btn-danger');
        await com.clickBySelector(page, 'div:nth-child(2)>div>ul>li:nth-child(3)>a');
        await com.clickBySelector(page, 'div:nth-child(2)>div>ul>li:nth-child(3)>ul>li:nth-child(4)>a');

    }),

        // it("Screenshot",async()=>{
        //     await com.takeScreenPage(page,'screenshot.jpg');
        // });
        // it("Dowload file success",async()=>{
        //     await com.isDowloadeFiledSuccess(page,'a#DownloadButtonTop');
        // });

        it("Select tên chủ sở hữu", async () => {
            await com.sleepInMilisecond(page, 2000);
            await com.clickBySelector(page, 'div.card-body>div:nth-child(1)>div>div');
            //await com.typeTextOnce(page,'#react-select-2-input',"Trung");
            await com.sleepInMilisecond(page, 5000);
            await com.downKey(page, 'Enter');
        });

    it("Select sản phẩm kỳ nghỉ exchange", async () => {
        await com.clickBySelector(page, 'div.mb-2.card>div.card-body>div:nth-child(2)>div>div');
        await com.sleepInMilisecond(page, 3000);
        await com.downKey(page, 'Enter');
    });

    it("Input BookID", async () => {
        await com.clickBySelector(page, "input[name='bookingId']");
        await com.typeText(page, "input[name='bookingId']", bookID());
    });
    it("Input Price", async () => {
        await com.clickBySelector(page, "input[name='price']");
        await com.typeText(page, "input[name='price']", price());
    });
    it("Input Price", async () => {
        await com.clickBySelector(page, "input[name='originalPrice']");
        await com.typeText(page, "input[name='originalPrice']", price());
    });
    it("Input Checkin", async () => {
        await com.clickBySelector(page, "input[name='checkin']");
        await com.setValueAttribute(page, "input[name='checkin']", 'type', 'text');
        await com.typeText(page, "input[name='checkin']", '03/22/2021');
    });
    it("Input Checkout", async () => {
        await com.clickBySelector(page, "input[name='checkout']");
        await com.setValueAttribute(page, "input[name='checkout']", 'type', 'text');
        await com.typeText(page, "input[name='checkout']", '03/31/2021')
    });
    it("Input cutOfDate", async () => {
        await com.clickBySelector(page, "input[name='cutOfDate']");
        await com.typeText(page, "input[name='cutOfDate']", '5');
    });
    it("Select Promotion", async () => {
        await com.clickBySelector(page, 'div:nth-child(2)>div.card-body>div:nth-child(2)>div>div');
        await com.downKey(page, 'Enter');
    });
    it("Select fee ground", async () => {
        await com.clickBySelector(page, "#react-select-4-input");
        await com.downKey(page, 'Enter');
    });

    it("verify notifi", async () => {
        await com.clickBySelector(page, 'div.container>div:nth-child(2)>div.card-body>div:nth-child(2)>div.css-1pcexqc-container>div>div.css-1hwfws3');
        await com.downKey(page, 'Enter');
        await com.clickBySelector(page, 'div:nth-child(2)>div.card-body>div:nth-child(3)>div>div.css-bg1rzq-control>div.css-1hwfws3');
        await com.downKey(page, 'Enter');
        await com.clickBySelector(page, 'span>button>span.ladda-label');
        const status= await com.getText(page,'#swal2-title');
        expect(status).to.equal('thất bại');
    });
    
    
    after(async () => {
        // await browser.close();
        //console.log("After test class")
    });
})


function bookID() {
    const chars = '1234567890';
    let bookID = '';
    for (let i = 0; i < 6; i++) {
        bookID += chars[Math.floor(Math.random() * chars.length)];
    }
    return 'Book' + bookID;

}
function price() {
    const chars = '123456789';
    let price = '';
    for (let i = 0; i < 5; i++) {
        price += chars[Math.floor(Math.random() * chars.length)];
    }
    return price;
}
function getDate() {

}

