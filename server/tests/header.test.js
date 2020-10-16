const puppeteer = require("puppeteer");
const sessionFactory = require("./factories/sessionFactory");
const userFactory = require("./factories/userFactory");

let browser;
let page;

beforeEach(async () => {
  browser = await puppeteer.launch({
    headless: false,
  });
  page = await browser.newPage();
  await page.goto("localhost:3000");
});

afterEach(async () => {
  await browser.close();
});

test("The header has the correct text", async () => {
  const text = await page.$eval("a.brand-logo", (el) => el.innerHTML);

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
  // skip the google auth stuff and fake a login on current page
  // create a new user save it to mongoDb and return it before login
  const user = await userFactory();
  // use that user id to create a the cookies for the browser
  const { session, sig } = sessionFactory(user);

  // add session string and sig to chromium instance cookies
  console.log(session, sig);
  await page.setCookie({ name: "express:sess.sig", value: sig });
  await page.setCookie({ name: "express:sess", value: session });
  // reload the page to make the logout button appear
  await page.goto("localhost:3000");
  // check to see if there is a logout button -> login works
  // wait for the button render first
  await page.waitForSelector(".logout-btn");
  const text = await page.$eval(".logout-btn", (el) => el.innerHTML);

  expect(text).toEqual("Logout");
});
