//const { test, expect } = require("@playwright/test");

export class BaseComponents {
  constructor(page, url) {
    this._page = page;
    this._url = url;
  }

  async navigate() {
    return this._page.goto(this._url);
  }
}
