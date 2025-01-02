// @ts-check
const { test, expect } = require('@playwright/test');

/** Step for testing:
 * 1. click on Text Box icon to go to page Text Box -> verify im at correct page.
 * 2. check if all input entered shown correctly on id="output", class="border col-md-12 col-sm-12"
 * 3. 4 more test cases for each missing input.
 */

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

// 3. 4 more test cases for each missing input.
test('verify each input missing text box page', async ({ page }) => {
  await page.goto('https://demoqa.com/text-box')

  const arrayCheck = [
    {
      locator: '//input[@id="userName"]',
      data: `acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`
    },
    {
      locator: '//input[@id="userEmail"]',
      data: `acbxyz@gmail.com`
    },
    {
      locator: '//textarea[@id="currentAddress"]',
      data: `acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`
    },
    {
      locator: '//textarea[@id="permanentAddress"]',
      data: `acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`
    }
  ]

  for (let i=0; i<arrayCheck.length; i++) {
    await page.locator(arrayCheck[i].locator).fill(arrayCheck[i].data)
  }

  //clear name
  await page.locator(arrayCheck[0].locator).clear()
  await page.locator('//button[@id="submit"]').click()
  await expect(page.locator('//div[@id="output"]//p[@id="email"]')).toContainText(`acbxyz@gmail.com`)
  await expect(page.locator('//div[@id="output"]//p[@id="currentAddress"]')).toContainText(`acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`)
  await expect(page.locator('//div[@id="output"]//p[@id="permanentAddress"]')).toContainText(`acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`)

  // fill back name and clear email
  await page.locator(arrayCheck[0].locator).fill(`acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`)
  await page.locator(arrayCheck[1].locator).clear()
  await page.locator('//button[@id="submit"]').click()
  await expect(page.locator('//div[@id="output"]//p[@id="name"]')).toContainText(`acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`)
  await expect(page.locator('//div[@id="output"]//p[@id="currentAddress"]')).toContainText(`acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`)
  await expect(page.locator('//div[@id="output"]//p[@id="permanentAddress"]')).toContainText(`acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`)

  // fill back email and clear currentAddress
  await page.locator(arrayCheck[1].locator).fill(`acbxyz@gmail.com`)
  await page.locator(arrayCheck[2].locator).clear()
  await page.locator('//button[@id="submit"]').click()
  await expect(page.locator('//div[@id="output"]//p[@id="name"]')).toContainText(`acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`)
  await expect(page.locator('//div[@id="output"]//p[@id="email"]')).toContainText(`acbxyz@gmail.com`)
  await expect(page.locator('//div[@id="output"]//p[@id="permanentAddress"]')).toContainText(`acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`)

  // fill back currentAddress and clear permanentAddress
  await page.locator(arrayCheck[2].locator).fill(`acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`)
  await page.locator(arrayCheck[3].locator).clear()
  await page.locator('//button[@id="submit"]').click()
  await expect(page.locator('//div[@id="output"]//p[@id="name"]')).toContainText(`acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`)
  await expect(page.locator('//div[@id="output"]//p[@id="email"]')).toContainText(`acbxyz@gmail.com`)
  await expect(page.locator('//div[@id="output"]//p[@id="currentAddress"]')).toContainText(`acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+`)
  
  // clear userEmail and fill incorrect data
  await page.locator(arrayCheck[1].locator).clear()
  await page.locator(arrayCheck[1].locator).fill(`acbxyzuâèbảỡựí,./;'[]-=123<>?:"Ơ{}!~!@#$%^&*()_+@gmail.com`)
  await page.locator('//button[@id="submit"]').click()
  await expect(page.locator('//input[@id="userEmail"]')).toHaveAttribute('class', 'mr-sm-2 field-error form-control')
});