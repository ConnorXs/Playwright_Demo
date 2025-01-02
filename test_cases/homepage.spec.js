// @ts-check
const { test, expect } = require('@playwright/test');

// 1st case: verify image title
test('verify image title visibility', async ({ page }) => {
  //go to page
  await page.goto('https://demoqa.com/');

  // get xpath for image at header
  // page.locator = interactive with element at xpath
  const img = page.locator(`//img[@src='/images/Toolsqa.jpg']`);

  // Expect at locator contain image title toBeVisible
  await expect(img).toBeVisible();
});

// 2nd case: verify homepage contains 6 cards
test('verify homepage elements', async ({ page }) => {
  //go to page
  await page.goto('https://demoqa.com/');

  //get xpath of element that need to check 
  let cardXpath = `//div[@class='card mt-4 top-card']`

  //ready to be interactive with element at xpath
  const card = page.locator(cardXpath);

  //base on page locator, count.
  const count = await card.count()

  //expect count = 6 or fail
  expect(count).toBe(6);

  //for loop, check for toBeVisible at each page locator.
  for (let i = 1; i <= count; i++) {
    let newcardXpath = cardXpath + `[${i}]`
    await expect(page.locator(newcardXpath)).toBeVisible()
  }

  /** Selecting the nth <footer> in the document
  If there are multiple <footer> elements:

  <footer><span>Footer 1</span></footer>
  <footer><span>Footer 2</span></footer>

  To select the second <footer>: //footer[2]

  -> instead of let newcardXpath = cardXpath+`[${i}]` and page.locator(newcardXpath)
  i can use cards.nth(i)
   */
});

// 3rd case: verify all 6 widgets navigate to correct page
/** Im understanding that i have to check all cards appeared. Then simulate the click action. Once loaded -> check url
 */
test('verify navigate to correct pages', async ({ page }) => {
  //go to page
  await page.goto('https://demoqa.com/');

  //get xpath of element that need to check 
  let cardXpath = `//div[@class='card mt-4 top-card']`

  //ready to be interactive with element at xpath
  const cards = page.locator(cardXpath);

  //base on page locator, count.
  const count = await cards.count()

  //expect count = 6 or fail
  expect(count).toBe(6);

  for (let i = 0; i < count; i++) {
    // Locate the card and header dynamically
    const card = cards.nth(i)

    //check for toBeVisible at each page locator.
    await expect(card).toBeVisible()

    // Locate header text and toBeVisible
    const header = card.locator('.card-body').locator('h5');
    await expect(header).toBeVisible();
    const text = await header.textContent();

    // Click the card to navigate
    await card.click();

    // Validate the URL based on header text
    switch (text) {
      case 'Elements':
        await expect(page).toHaveURL('https://demoqa.com/elements');
        break;
      case 'Forms':
        await expect(page).toHaveURL('https://demoqa.com/forms');
        break;
      case 'Alerts, Frame & Windows':
        await expect(page).toHaveURL('https://demoqa.com/alertsWindows');
        break;
      case 'Widgets':
        await expect(page).toHaveURL('https://demoqa.com/widgets');
        break;
      case 'Interactions':
        await expect(page).toHaveURL('https://demoqa.com/interaction');
        break;
      case 'Book Store Application':
        await expect(page).toHaveURL('https://demoqa.com/books');
        break;
      default:
        throw new Error(`Unexpected header text: "${text}"`);
    }

    // Navigate back to the homepage before the next iteration
    await page.goto('https://demoqa.com/');
  }
})