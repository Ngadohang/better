const puppeteer = require('puppeteer');
const expect = require('chai').expect;
const com = require('./tests/common');

const faker = require('faker/locale/vi');
let browser=null;
let page= null
describe("Name Test Clase",()=>{
    before("Before test class and sign in",async()=>{
        browser = await puppeteer.launch({
            headless:false,
            //args: ['--start-fullscreen'],
        
        })
        page = await browser.newPage();
                await page.setViewport({
                    width: 1920,
                    height: 1080 
                });
                page = await browser.newPage();
                await page.goto('https://izzilearn.labo.vn/');
                await com.typeText(page,el.emailInput,'hieu0304@gmail.com');
                await com.typeText(page,el.passwordInput,'l3t4h87a');
                await com.clickBySelector(page,el.loginButton);
    }),

    // it("test upload page",async()=>{
    //     const imagePath='D:/puppet-test/tests/uploadFile/jennie.jpg';
    //     await common.uploadFile(page,"span.fileinput-button",imagePath);
    //     await common.sleepInMilisecond(page,3000);
    // }),
    // it("test select dropdown defauls",async()=>{
    //     await common.selectValueDropdownCustom(page,"span#speed-button","ul#speed-menu>li>div","Slow");
    // });
    
    it("Sort data",async()=>{
        const arr =[];
        const elelemts = [...document.querySelectorAll("table>tbody>tr>td:nth-child(6)>i")];
        console.log(elelemts);
        for(const e of content){
           console.log("e.textContent");
           arr.push(e.textContent);
        }
    })


    before(async()=>{
        await browser.close();
       console.log("After test class")
    });
})

