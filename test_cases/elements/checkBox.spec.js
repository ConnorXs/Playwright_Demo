// @ts-check
const { test, expect } = require('@playwright/test');

test('1 st', async ({ page }) => {
    await page.goto('https://demoqa.com/');

    await page.locator(`//*[text()='Elements']`).click();

    await page.locator(`//span[text()='Check Box']/parent::li[contains(@id,'item')]`).click();

    //Verify page header
    await page.locator(`//h1[text()='Check Box' and @class='text-center']`).isVisible();

    //Click Home checkbox
    await page.locator(`//span[text()='Home']/preceding-sibling::span[contains(@class,'checkbox')]`).isVisible();
    await page.locator(`//span[text()='Home']/preceding-sibling::span[contains(@class,'checkbox')]`).click();

    //Verify result
    const expectedString = 'home,desktop,notes,commands,documents,workspace,react,angular,veu,office,public,private,classified,general,downloads,wordFile,excelFile';
    const results = page.locator(`//span[@class='text-success']`)
    for (let i = 1; i <= (await results.count()); i++) {
        await expect(expectedString).toContain(await results.nth(i).innerText());
    }
});

test('2nd', async ({ page }) => {
    await page.goto('https://demoqa.com/');

    await page.locator(`//*[text()='Elements']`).click();

    await page.locator(`//span[text()='Check Box']/parent::li[contains(@id,'item')]`).click();

    //Verify page header
    await page.locator(`//h1[text()='Check Box' and @class='text-center']`).isVisible();

    //Click Home expand button
    await page.locator(`//span[@class='rct-title' and text()='Home']/parent::label/preceding-sibling::button[contains(@class,'rct-collapse-btn')]`).isVisible();
    await page.locator(`//span[@class='rct-title' and text()='Home']/parent::label/preceding-sibling::button[contains(@class,'rct-collapse-btn')]`).click();

    //Click Desktop checkbox
    await page.locator(`//span[text()='Desktop']/preceding-sibling::span[contains(@class,'checkbox')]`).isVisible();
    await page.locator(`//span[text()='Desktop']/preceding-sibling::span[contains(@class,'checkbox')]`).click();

    //Verify result
    const expectedString = 'desktop,notes,commands';
    const results = page.locator(`//span[@class='text-success']`)
    for (let i = 1; i <= (await results.count()); i++) {
        expect(expectedString).toContain(await results.nth(i).innerText());
    }
});

test('3rd', async ({ page }) => {
    await page.goto('https://demoqa.com/');

    await page.locator(`//*[text()='Elements']`).click();

    await page.locator(`//span[text()='Check Box']/parent::li[contains(@id,'item')]`).click();

    //Verify page header
    await page.locator(`//h1[text()='Check Box' and @class='text-center']`).isVisible();

    //Click Home expand button
    await page.locator(`//span[@class='rct-title' and text()='Home']/parent::label/preceding-sibling::button[contains(@class,'rct-collapse-btn')]`).isVisible();
    await page.locator(`//span[@class='rct-title' and text()='Home']/parent::label/preceding-sibling::button[contains(@class,'rct-collapse-btn')]`).click();

    //Click Documents checkbox
    await page.locator(`//span[text()='Documents']/preceding-sibling::span[contains(@class,'checkbox')]`).isVisible();
    await page.locator(`//span[text()='Documents']/preceding-sibling::span[contains(@class,'checkbox')]`).click();

    //Verify result
    const expectedString = 'documents,workspace,react,angular,veu,office,public,private,classified,general';
    const results = page.locator(`//span[@class='text-success']`)
    for (let i = 1; i <= (await results.count()); i++) {
         expect(expectedString).toContain(await results.nth(i).innerText());
    }
});

test('4th', async ({ page }) => {
    await page.goto('https://demoqa.com/');

    await page.locator(`//*[text()='Elements']`).click();

    await page.locator(`//span[text()='Check Box']/parent::li[contains(@id,'item')]`).click();

    //Verify page header
    await page.locator(`//h1[text()='Check Box' and @class='text-center']`).isVisible();

    //Click Home expand button
    await page.locator(`//span[@class='rct-title' and text()='Home']/parent::label/preceding-sibling::button[contains(@class,'rct-collapse-btn')]`).isVisible();
    await page.locator(`//span[@class='rct-title' and text()='Home']/parent::label/preceding-sibling::button[contains(@class,'rct-collapse-btn')]`).click();

    //Click Downloads checkbox
    await page.locator(`//span[text()='Downloads']/preceding-sibling::span[contains(@class,'checkbox')]`).isVisible();
    await page.locator(`//span[text()='Downloads']/preceding-sibling::span[contains(@class,'checkbox')]`).click();

    //Verify result
    const expectedString = 'downloads,wordFile,excelFile';
    const results = page.locator(`//span[@class='text-success']`)
    for (let i = 1; i <= (await results.count()); i++) {
        await expect(expectedString).toContain(await results.nth(i).innerText());
    }
});