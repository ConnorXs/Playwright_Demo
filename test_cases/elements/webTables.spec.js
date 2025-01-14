// @ts-check
const { test, expect } = require('@playwright/test');

/** Step for testing:
 * 1. click on web tables icon to go to page web tables -> verify im at correct page.
 * 2. check if on click btn add show modal. Once show, should be close by either click X button / click outside the modal
 * 3. 
 */

async function clearAndSubmit(page, locator) {
  await page.locator(locator).clear();
  await page.locator('//button[@id="submit"]').click();
}

async function verifyOutput(page, expectedValues) {
  for (const [key, value] of Object.entries(expectedValues)) {
    if (key == 'userEmail') {
        const newKey = 'email'
        await expect(page.locator(`//div[@id="output"]//p[@id="${newKey}"]`)).toContainText(value);
    } else if (key == 'userName') {
      const newKey = 'name'
      await expect(page.locator(`//div[@id="output"]//p[@id="${newKey}"]`)).toContainText(value);
    } else {
      await expect(page.locator(`//div[@id="output"]//p[@id="${key}"]`)).toContainText(value);
    }
    
  }
}

// 1. click on web tables icon to go to page web tables -> verify im at correct page.
test('verify navigated to webtables page', async ({ page }) => {
  await page.goto('https://demoqa.com/elements')

  const textBoxItem = page.locator('//li[@id="item-3"]').nth(0)
  await textBoxItem.click()
  await expect(page).toHaveURL('https://demoqa.com/webtables')
});

// 2. check if on click btn add show modal. Once show, should be close by either click X button / click outside the modal
test('verify modal show on click', async ({ page }) => {
  await page.goto('https://demoqa.com/webtables')

  const addBtn = page.locator('//button[@id="addNewRecordButton"]')
  await addBtn.click()

  await expect(page.locator('//div[@class="fade modal-backdrop show"]')).toBeVisible();
  await expect(page.locator('//div[@class="fade modal show"]')).toBeVisible();
});

// // 3. more test cases
// test('verify each input missing text box page - GPT', async ({ page }) => {
//   await page.goto('https://demoqa.com/text-box');

//   const testData = {
//     userName: `acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`,
//     userEmail: `acbxyz@gmail.com`,
//     currentAddress: `acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`,
//     permanentAddress: `acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`,
//   };

//   // Fill all fields
//   for (const [key, value] of Object.entries(testData)) {
//     await page.locator(`//input[@id="${key}"] | //textarea[@id="${key}"]`).fill(value);
//   }

//   // Clear and test each field
//   for (const key of Object.keys(testData)) {
//     await clearAndSubmit(page, `//input[@id="${key}"] | //textarea[@id="${key}"]`);
//     const expectedValues = { ...testData };
//     delete expectedValues[key];
//     await verifyOutput(page, expectedValues);
//     await page.locator(`//input[@id="${key}"] | //textarea[@id="${key}"]`).fill(testData[key]); // Refill
//   }

//   // Invalid email test
//   await page.locator('//input[@id="userEmail"]').fill(`invalid-email`);
//   await page.locator('//button[@id="submit"]').click();
//   await expect(page.locator('//input[@id="userEmail"]')).toHaveAttribute('class', /field-error/);
// });