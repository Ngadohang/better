const fs = require('fs');
const path = require('path');
const http = require('http');
const https= require('https');
const URL= require('url').URL;
const element = require('./element');
module.exports={
    clickBySelector: async function(page, location){
        try{
            await page.waitForSelector(location);
            await page.click(location);
        }catch(error){
            throw new Error('Could not click to element');
        }
    },
    clickByJs: async function(page, location){
        try{
            await page.evaluate(async(location) => {
                const item= document.querySelector(location);
                item.click();
                },childItem,expect);
        }catch(error){
            throw new Error('Could not click to element');
        }
    },
    getText: async function(page, location){
        try {
            await page.waitForSelector(location);
            return await page.$eval(location, el => el.textContent);
        } catch (error) {
            throw new Error('Could not get Text from selector');
        }
    },
    getCount: async function(page, location){
        try {
            await page.waitForSelector(location);
            return await page.$$eval(location, element=>element.length);
        } catch (error) {
            throw new Error('Could not get Count from selector'+{location});
        }
    },
    typeText: async function(page, location,text){
        try {
            await page.waitForSelector(location);
            await page.click(location, {clickCount: 3});
            await page.type(location,text);
        } catch (error) {
            throw new Error('Could not found the element typeText');
        }
    },
    typeTextOnce: async function(page, location,text){
        try {
            await page.type(location,text);
        } catch (error) {
            throw new Error('Could not found the element typeText');
        }
    },
    waitForTextVisi: async function(page, location,text){
        try {
            await page.waitForSelector(location);
            await page.click(location, {clickCount: 3});
            await page.type(location,text);
        } catch (error) {
            throw new Error('Could not found the element typeText');
        }
    },
    waitForTextVisible: async function(page, selector){
        try {
            await page.waitForSelector(selector);
            await page.waitForFunction(selector, text => {
                document.querySelector(selector).innerText.include(text),
                {},
                selector,
                text;
            });
        } catch (error) {
            throw new Error('Text not visible');
        }
    },
    shouldNotExist: async function(page,selector){
        try {
            await page.waitForSelector(selector, {hiddern:true})
        } catch (error) {
            throw new Error('Could not found the element shouldNotExist');
        }
    },
    openPageUrl: async function(page,link){
        await page.goto(link);
    },
    closeBrowser: async function(page,selector){
        try {
            await page.close();
        } catch (error) {
            throw new Error('Could not close browser');
        }
    },
    refreshCurrentPage: async function(page){
        try {
            await page.reload();
        } catch (error) {
            throw new Error('Could not refresh page');
        }
    },
    backToPage: async function(page){
        try {
            await page.goBack();
        } catch (error) {
            throw new Error('Could not go back to page');
        }
    },
    forwardToPage: async function(page){
        try {
            await page.goForward();
        } catch (error) {
            throw new Error('Could not go forward to page');
        }
    },
    acceptAlert: async function(page){
        try {
            page.on('dialog', async dialog => {
                await dialog.accept();
            });
        } catch (error) {
            throw new Error('Could not accept alert');
        }
    },
    dismissAlert: async function(page){
        try {
            page.on('dialog', async dialog => {
                await dialog.dismiss();
              });
        } catch (error) {
            throw new Error('Could not cancel alert');
        }
    },
    getTextAlert: async function(page){
        try {
            page.on('dialog', async dialog => {
               return await dialog.message();
            });
        } catch (error) {
            throw new Error('Could not get text alert');
        }
    },
    typeTextAlert: async function(page,text){
        try {
            page.on('dialog', async dialog => {
                await dialog.defaultValue(text);
            });
        } catch (error) {
            throw new Error('Could not input text alert');
        }
    },
    getTitlePage: async function(page){
        try {
            return await page.title();
        } catch (error) {
            throw new Error('Could not get title page');
        }
    },
    getUrlPage: async function(page){
        try {
            return await page.url();
        } catch (error) {
            throw new Error('Could not get title page');
        }
    },
    getElementBySelector: async function(page,selector){
        try {
            return await page.$(selector);
        } catch (error) {
           console.log(error.message);
        }
    },
    getListElementSelector: async function(page,location){
        try {
            await page.waitForSelector(location);
            return await page.$$(location);
        } catch (error) {
           console.log(error.message);
        }
    },
    getElementByXpath: async function(page,location){
        try {
            await page.waitForXPath(location);
            return await page.$x(location);
        } catch (error) {
           console.log(error.message);
        }
    },
    switchWindowAfterClickButton: async function(browser,page,location){
        await page.waitForSelector(location);            
        const link = await page.$(location);            
        const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));   
        await link.click();                          
        const newPage = await newPagePromise; 
    },
    closeAllTabWithoutTitle: async function(browser,page,titleExpect){
        browser.on('targetcreated', async (target) => { 
            if (target.type() === 'page') {             
                const page = await target.page();     
                const titleActual = page.title();
                if(titleActual!=titleExpect){
                    await page.close();
                }
              }
            });      
    },
    sleepInMilisecond: async (page,time)=>{
        await page.waitForTimeout(time);
    },
    selectValueDropdownDefault: async (page,location,value)=> {
        try {
            await page.waitForSelector(location);
            await page.select(location,value);
        } catch (error) {
           console.log(error.message);
        }
    },
    selectMultipleValueDropdownDefault: async (page,location,...value)=>{
        try {
            await page.waitForSelector(location);
            await page.select(location,value);
        } catch (error) {
           console.log(error.message);
        }
    },
    selectValueDropdownCustom: async (page,parentItem,childItem,...expect)=>{
        try {
            await module.exports.clickBySelector(page,parentItem);
            await page.waitForTimeout(3000);
            await page.waitForSelector(childItem);
            await page.evaluate(async(childItem,expect) => {
                const listItem= document.querySelectorAll(childItem);
                for(const el of [...listItem] ){
                    for(const val of expect){
                        if(el.textContent===val) {
                           el.click();
                           break;
                        } 
                   } 
                }
            },childItem,expect);
            await page.waitForTimeout(10000);
        } catch (error) {
            console.log(error.message);
        }
    },
    getValueSelected: async(page,location) =>{
        try {
           await page.waitForSelector(location);
           return await page.$eval(location, selectedValue=> selectedValue.value);
        } catch (error) {
           console.log(error.message);
        }
    },
    selectElement: async(page,location)=>{
        try {
            await page.waitForSelector(location);
            await page.evaluate( location => {
                document.querySelector(location).selected ="true"; 
              });
            return module.exports.getValueSelected(page,location);
        } catch (error) {
           console.log(error.message);
        }
    },
    isElementChecked: async (page,location) =>{
        try {
            await page.waitForSelector(location);
            const checkbox= module.exports.getElementBySelector(page,location);
            return await (await checkbox.getProperty('checked')).jsonValue()!== null;
        } catch (error) {
           console.log(error.message);
        }
    },
    checkToCheckBox: async (page,location) =>{
    try {
            await module.exports.getListElementSelector(page,location);
            if(! await module.exports.isElementSelect(page,location) ){
               await module.exports.click(page, location);
            }
        } catch (error) {
           console.log(error.message);
        }
    },
 
    unCheckToCheckBox: async(page, location)=>{
        try {
            await module.exports.getListElementSelector(page,location);
            if(await module.exports.isElementSelect(page,location) ){
               await module.exports.click(page, location);
            }
        } catch (error) {
           console.log(error.message);
        }
    },
    getIframeBySelector: async(page,location)=>{
        try {
            const iframeHandle= await module.exports.getElementBySelector(page,location);
            return await iframeHandle.contentFrame();
        } catch (error) {
           console.log(error.message);
        }
    },
    goToPage: async(page,url)=>{
        try {         
            await page.goto(url);  
            await page.bringToFront(); 
        } catch (error) {
           console.log(error.message);
        }
    },
    clickButtonToOpenNewPage: async(browser,location)=>{
        try {
           const page= await browser.puppeteer.launch();
           const link = module.exports.getIframeBySelector(page,location);
           const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())));
           await link.click();                            
           return newPage = await newPagePromise;
        } catch (error) {
          console.log(error.message);
        }
    },
    // clickButtonToOpenPopup: async(page,location)=>{
    //     try {
    //        await page.waitForXPath(location);
    //        const link = module.exports.getElementByXpath(page,location);
    //        const newPagePromise = new Promise(x => page.once('popup', x));
    //        await link.click();                            
    //        return newPage = await newPagePromise;
    //     } catch (error) {
    //        console.log(error.message);
    //     }
    // }
    leftClick: async(page,xlocation,ylocation)=>{
        try {
            await page.mouse.click(xlocation,ylocation);
        } catch (error) {
           console.log(error.message);
        }
    },
    doubleClick: async(page,xlocation,ylocation)=>{
        try {
            await page.mouse.click(xlocation,ylocation, {clickCount: 2});
        } catch (error) {
           console.log(error.message);
        }
    },
    hoverMouse: async(page,location)=>{
        try {
            await page.waitForSelector(location);
            await page.hover(location);
        } catch (error) {
           console.log(error.message);
        }
    },
    rightClick: async(page,xlocation,ylocation)=>{
        try {
            await page.mouse.click(xlocation,ylocation,{button:'right'});
        } catch (error) {
           console.log(error.message);
        }
    },
    scaleYmouse: async(page,location,number)=>{
        try {
            module.exports.hoverMouse(page,location);
            await page.mouse.wheel({deltaY: number });
        } catch (error) {
           console.log(error.message);
        }
    },
    scaleXmouse: async(page,location,number)=>{
        try {
            module.exports.hoverMouse(page,location);
            await page.mouse.wheel({deltaX: number });
        } catch (error) {
           console.log(error.message);
        }
    },
    dragAndDrop: async(page,dragX,dragY,dropX,dropY)=>{
        try {
            await page.mouse.move(dragX,dragY);
            await page.mouse.down();
            await page.mouse.move(dropX,dropY);
            await page.mouser.up();
        } catch (error) {
           console.log(error.message);
        }
    },
    focusKey: async(page,location)=>{
        try {
            await page.waitForSelector(page,location);
            await page.focus(location);
        } catch (error) {
           console.log(error.message);
        }
    },
    typeKey: async(page,location,value,numberDelay)=>{
        try {
            await page.waitForSelector(page,location);
            await page.focus(location);
            await page.keyboard.type(value,{delay:numberDelay});
        } catch (error) {
           console.log(error.message);
        }
    },
    pressKey: async(page,location,value)=>{
        try {
            await page.waitForSelector(page,location);
            await page.focus(location);
            await page.keyboard.press(value);
        } catch (error) {
           console.log(error.message);
        }
    },
    downKey: async(page,value)=>{
        try {
            await page.keyboard.down(value);
        } catch (error) {
           console.log(error.message);
        }
    },
    upKey: async(page,value)=>{
        try {
            await page.keyboard.up(value);
        } catch (error) {
            console.log(error.message);
        }
    },
    uploadFile: async(page,location,fileName)=>{
        try {
            const [fileChooser] = await Promise.all([
                page.waitForFileChooser(),
                module.exports.clickBySelector(page,location),
            ])
            await fileChooser.accept([fileName]);
        } catch (error) {
            console.log(error.message);
        }
    },
    getValueAttribute: async(page,location,value)=>{
        try {
            await page.waitForSelector(location);
            return await page.$eval(location,
                element=> element.getAttribute(value));
        } catch (error) {
            console.log(error.message);
        }
    },
    setValueAttribute: async(page,location,attribute,value)=>{
        try {
            await page.waitForSelector(location);
            return await page.evaluate((location,attribute,value)=>{
                const element= document.querySelector(location);
                element.setAttribute(attribute,value);
            },location,attribute,value);
        } catch (error) {
            console.log(error.message);
        }
    },

    //scrollToView
    //popup windown/multiple tab

// (async () => {
//     const browser = await puppeteer.launch({
//         headless: false
//     });
//     const page = await browser.newPage();
//     await page.goto('https://www.yoursite.com');
//     await page.setViewport({
//         width: 1200,
//         height: 800
//     });

//     await autoScroll(page);

//     await page.screenshot({
//         path: 'yoursite.png',
//         fullPage: true
//     });

//     await browser.close();
// })();

// async function autoScroll(page){
//     await page.evaluate(async () => {
//         await new Promise((resolve, reject) => {
//             var totalHeight = 0;
//             var distance = 100;
//             var timer = setInterval(() => {
//                 var scrollHeight = document.body.scrollHeight;
//                 window.scrollBy(0, distance);
//                 totalHeight += distance;

//                 if(totalHeight >= scrollHeight){
//                     clearInterval(timer);
//                     resolve();
//                 }
//             }, 100);
//         });
//     });
// }
//check image dowload success
getTimePageLoaded: async(page)=>{
    try {
        const maxtric= await page.evaluate(()=> {
            JSON.stringify(window.performance)
           });
        const el = JSON.parse(maxtric);
        return el.loadEventEnd - el.navigationStart;
    } catch (error) {
        console.log(error.message);
    }
},
isImageLoaded: async(page,imgSelector)=>{
    try {
        await page.evaluate(async(imgSelector)=>{
            return arg[0].complete && typeof arg[0].naturalWidth != undefined && arg[0].naturalWidth > 0;
        },imgSelector);
    } catch (error) {
        console.log(error.message);
    }
},
takeScreenPage: async(page,nameImage)=>{
    try {
        await page.screenshot({
            path:nameImage,
            type:'jpeg',
            fullPage:'true',
        });
    } catch (error) {
        console.log(error.message);
    }
},
isDowloadeFiledSuccess: async(page,selector)=>{
    try {  
        await page._client.send('Page.setDownloadBehavior', {
            behavior: 'allow', 
            downloadPath: './'
        });   
           // await page.waitForNavigation({ waitUntil: 'networkidle2' });
            await page.click(selector);
   
    } catch(error){
        console.log(error.message);
    }
   
},









    






    
    







    



}