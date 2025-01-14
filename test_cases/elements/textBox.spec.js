// @ts-check
const { test, expect } = require('@playwright/test');

/** Step for testing:
 * 1. click on Text Box icon to go to page Text Box -> verify im at correct page.
 * 2. check if all input entered shown correctly on id="output", class="border col-md-12 col-sm-12"
 * 3. 4 more test cases for each missing input.
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

// 1. click on Text Box icon to go to page Text Box -> verify im at correct page.
test('verify navigated to text box page', async ({ page }) => {
  await page.goto('https://demoqa.com/elements')

  const textBoxItem = page.locator('//li[@id="item-0"]').nth(0)
  await textBoxItem.click()
  await expect(page).toHaveURL('https://demoqa.com/text-box')
});

// 2. check if all input entered shown correctly on id="output"
test('verify all input in text box page', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box')

  const fullNameBox = page.locator('//input[@id="userName"]')
  await fullNameBox.fill(`acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`)

  const emailBox = page.locator('//input[@id="userEmail"]')
  await emailBox.fill(`acbxyzu@gmail.com`)

  const currentAddressBox = page.locator('//textarea[@id="currentAddress"]')
  await currentAddressBox.fill(`acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`)

  const permanentAddressBox = page.locator('//textarea[@id="permanentAddress"]')
  await permanentAddressBox.fill(`acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`)

  await page.locator('//button[@id="submit"]').click()

  await expect(page.locator('//div[@id="output"]//p[@id="name"]')).toContainText(`acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`)
  await expect(page.locator('//div[@id="output"]//p[@id="email"]')).toContainText(`acbxyzu@gmail.com`)
  await expect(page.locator('//div[@id="output"]//p[@id="currentAddress"]')).toContainText(`acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`)
  await expect(page.locator('//div[@id="output"]//p[@id="permanentAddress"]')).toContainText(`acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`)
});

// 3. more test cases for each missing input.
test('verify each input missing text box page - GPT', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box');

  const testData = {
    userName: `acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`,
    userEmail: `acbxyz@gmail.com`,
    currentAddress: `acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`,
    permanentAddress: `acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`,
  };

  // Fill all fields
  for (const [key, value] of Object.entries(testData)) {
    await page.locator(`//input[@id="${key}"] | //textarea[@id="${key}"]`).fill(value);
  }

  // Clear and test each field
  for (const key of Object.keys(testData)) {
    await clearAndSubmit(page, `//input[@id="${key}"] | //textarea[@id="${key}"]`);
    const expectedValues = { ...testData };
    delete expectedValues[key];
    await verifyOutput(page, expectedValues);
    await page.locator(`//input[@id="${key}"] | //textarea[@id="${key}"]`).fill(testData[key]); // Refill
  }

  // Invalid email test
  await page.locator('//input[@id="userEmail"]').fill(`invalid-email`);
  await page.locator('//button[@id="submit"]').click();
  await expect(page.locator('//input[@id="userEmail"]')).toHaveAttribute('class', /field-error/);
});
