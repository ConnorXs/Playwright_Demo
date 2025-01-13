// @ts-check
const { test, expect } = require('@playwright/test');
const { promises } = require('node:dns');

/** Step for testing:
 * 1. click on Radio Button icon to go to page Radio Box -> verify im at correct page.
 * 2. check if onclick radio, shown correctly on class="text-success"
 * 3. check if on mouse hover radio btn No, shown correctly icon 
 */

// 1. click on Radio Button icon to go to page Radio Button -> verify im at correct page.
test('verify navigated to radio page', async ({ page }) => {
  await page.goto('https://demoqa.com/elements')

  const textBoxItem = page.locator('//li[@id="item-2"]').nth(0)
  await textBoxItem.click()
  await expect(page).toHaveURL('https://demoqa.com/radio-button')
});

// 2. check if onclick radio, shown correctly on class="text-success"
test('verify clickable btn in Radio Button page', async ({ page }) => {
  await page.goto('https://demoqa.com/radio-button')

  const yesRadioBtn = page.locator('//label[@for="yesRadio"]')
  await yesRadioBtn.click()
  await expect(page.locator('//span[@class="text-success"]')).toContainText(`Yes`)


  const impressiveRadioBtn = page.locator('//label[@for="impressiveRadio"]')
  await impressiveRadioBtn.click()
  await expect(page.locator('//span[@class="text-success"]')).toContainText(`Impressive`)
});

// 3. check if on mouse hover radio btn No, shown correctly icon 
test('verify not clickable btn in Radio Button page', async ({ page }) => {
  await page.goto('https://demoqa.com/radio-button')

  const noRadioDiv = page.locator('//div[@class="custom-control disabled custom-radio custom-control-inline"]')
  const noRadioBtn = page.locator('//label[@for="noRadio"]')

  //check if radioBtn cant click
  const disabled = await noRadioBtn.isDisabled()
  expect(disabled).toBe(true)

  // check if on hover div, mouse change style
  await noRadioDiv.hover()
  const cursorStyle = await noRadioDiv.evaluate((element) => {
    return window.getComputedStyle(element).cursor;
  });
  expect(cursorStyle).toBe('not-allowed')

});
