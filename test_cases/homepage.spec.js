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
  for (let i=1; i <= count; i++) {
    let newcardXpath = cardXpath+`[${i}]`
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
