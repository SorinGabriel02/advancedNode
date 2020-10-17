const Page = require("./helpers/page");

let page;

beforeEach(async () => {
  page = await Page.build();
  await page.goto("localhost:3000");
});

afterEach(async () => {
  await page.close();
});

describe("When logged in", () => {
  beforeEach(async () => {
    await page.login();
    await page.click("a.btn-floating");
  });

  test("I can see the blog creation form", async () => {
    const labelText = await page.getContentsOf("form label");

    expect(labelText).toEqual("Blog Title");
  });

  describe("And using VALID inputs", () => {
    const blogTitle = "Cool post, just amazing...";
    const blogContent = "This content is A AMAZING!";

    beforeEach(async () => {
      await page.type("input[name='title']", blogTitle);
      await page.type("input[name='content']", blogContent);
      await page.click("button[type='submit']");
    });

    test("Submitting takes user to review screen", async () => {
      const text = await page.getContentsOf("h5");

      expect(text).toEqual("Please confirm your entries");
    });

    test("Submitting then saving adds blog to the index page", async () => {
      await page.click("button.green");
      await page.waitForSelector(".card-title");

      const titleText = await page.getContentsOf(".card-title");
      const contentText = await page.getContentsOf(".card-content p");

      expect(titleText).toEqual(blogTitle);
      expect(contentText).toEqual(blogContent);
    });
  });

  describe("And using invalid inputs", () => {
    beforeEach(async () => {
      await page.click("form button");
    });

    test("The form shows an error message", async () => {
      const titleError = await page.getContentsOf(".title .red-text");
      const contentError = await page.getContentsOf(".content .red-text");

      expect(titleError).toEqual("You must provide a value");
      expect(contentError).toEqual("You must provide a value");
    });
  });
});
