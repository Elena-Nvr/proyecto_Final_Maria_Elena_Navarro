import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';



export const test = base.extend({
  //bloquea los anuncios de terceros que tapan la página y hacen fallar los clics
  page: async ({ page }, use) => {
    await page.route(
      /googlesyndication|doubleclick|googleads|adservice|pagead/,
      (route) => route.abort()
    );
    await use(page);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  //metodo para obtener las credenciales de login desde variables de entorno
  credentials: async ({}, use) => {
    await use({
      email: process.env.LOGIN_EMAIL,
      password: process.env.LOGIN_PASSWORD,
    });
  },
  loggedInPage: async ({ page, loginPage, credentials }, use) => {
    await loginPage.login(credentials.email, credentials.password);
    await expect(loginPage.loggedInText).toBeVisible();
    await use(page);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    await homePage.goto();
    await use(homePage);
  },
  productPage: async ({ page }, use) => {
    await use(new ProductPage(page));
  },
  cartPage: async ({ page }, use) => {
    await use(new CartPage(page));
  },
});

export { expect };