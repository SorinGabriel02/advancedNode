const Page = require("./helpers/page");

let page;

beforeEach(async () => {
  // this variable is the proxy that gives access
  // to browser, page, and customPage classes
  page = await Page.build();
  await page.goto("localhost:3000");
});

afterEach(async () => {
  await page.close();
});

describe("Header works properly", () => {
  test("The header has the correct text", async () => {
    const text = await page.getContentsOf("a.brand-logo");

    expect(text).toEqual("Blogster");
  });

  test("Clicking Login starts OAuth flow", async () => {
    await page.waitForSelector(".login-btn");
    await page.click(".login-btn");

    const url = await page.url();
    const expected = new RegExp("https://accounts.google.com/");

    expect(url).toMatch(expected);
  });

  test("When signed in shows logout button", async () => {
    // execute login logic and wait for the selector to show up
    await page.login();
    const text = await page.getContentsOf(".logout-btn");

    expect(text).toEqual("Logout");
  });
});
