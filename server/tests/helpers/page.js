const puppeteer = require("puppeteer");
const sessionFactory = require("../factories/sessionFactory");
const userFactory = require("../factories/userFactory");

class CustomPage {
  static async build() {
    const browser = await puppeteer.launch({
      headless: false,
    });
    const page = await browser.newPage();
    const customPage = new CustomPage(page);

    return new Proxy(customPage, {
      get: function (target, property) {
        return target[property] || browser[property] || page[property];
      },
    });
  }

  constructor(page) {
    this.page = page;
  }

  async login(selector = ".logout-btn") {
    // skip the google auth stuff and fake a login on current page
    // create a new user save it to mongoDb and return it before login
    const user = await userFactory();
    // use that user id to create a the cookies for the browser
    const { session, sig } = sessionFactory(user);

    // add session string and sig to chromium instance cookies
    await this.page.setCookie({ name: "express:sess.sig", value: sig });
    await this.page.setCookie({ name: "express:sess", value: session });
    // reload the page to make the logout button appear
    await this.page.goto("localhost:3000/blogs");
    // check to see if there is a logout button -> login works
    // wait for the button render first
    await this.page.waitForSelector(selector);
  }

  async getContentsOf(selector) {
    return this.page.$eval(selector, (el) => el.innerHTML);
  }

  get(path) {
    return this.page.evaluate(async (_path) => {
      const res = await fetch(_path, {
        method: "GET",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
      });
      return await res.json();
    }, path);
  }

  post(path, body) {
    return this.page.evaluate(
      async (_path, _body) => {
        const response = await fetch(_path, {
          method: "POST",
          credentials: "same-origin",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(_body),
        });
        return await response.json();
      },
      path,
      body
    );
  }
}

module.exports = CustomPage;
