import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage.js';
import { HomePage } from '../pages/HomePage.js';
import { ProductPage } from '../pages/ProductPage.js';
import { CartPage } from '../pages/CartPage.js';
import { CheckoutPage } from '../pages/CheckoutPage.js';
import { PaymentPage } from '../pages/PaymentPage.js';
import checkoutData from '../test-data/checkout-data.json';



// Si falta una variable de entorno(nunca muestra su valor)
function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Falta la variable ${name}. Copia .env.example a .env y complétala.`);
  }
  return value;
}

const ADS = /googlesyndication|doubleclick|googleads|adservice|pagead/;

export const test = base.extend({
  //bloquea los anuncios de terceros que tapan la página y hacen fallar los clics
  page: async ({ page }, use) => {
    await page.route(ADS, (route) => route.abort());
    await use(page);
  },

  loginPage: async ({ page }, use) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await use(loginPage);
  },

  //obtiene las credenciales de login desde variables de entorno
  credentials: async ({}, use) => {
    await use({
      email: requireEnv('LOGIN_EMAIL'),
      password: requireEnv('LOGIN_PASSWORD'),
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
  checkoutPage: async ({ page }, use) => {
    await use(new CheckoutPage(page));
  },
  paymentPage: async ({ page }, use) => {
    await use(new PaymentPage(page));
  },

  //el camino hasta Address Details: login, producto, carrito y checkout
  checkoutAtAddress: async (
    { loggedInPage, homePage, productPage, cartPage, checkoutPage },
    use
  ) => {
    await cartPage.empty();
    await homePage.goto();
    await homePage.openProduct(checkoutData.product);
    await productPage.addToCart();
    await productPage.openCart();
    await cartPage.startCheckout();
    await checkoutPage.waitForSavedAddress();
    await use(checkoutPage);
  },

  //mismo camino, pero sin login: exige que el contexto ya traiga la sesión guardada
  checkoutAtAddressWithSession: async (
    { homePage, productPage, cartPage, checkoutPage },
    use
  ) => {
    await cartPage.empty();
    await homePage.goto();
    await homePage.openProduct(checkoutData.product);
    await productPage.addToCart();
    await productPage.openCart();
    await cartPage.startCheckout();
    await checkoutPage.waitForSavedAddress();
    await use(checkoutPage);
  },

  //sesión guardada: inicia sesión una vez por proceso y comparte el estado (en memoria)
  shopStorageState: [
    async ({ browser }, use) => {
      const context = await browser.newContext({
        baseURL: process.env.BASE_URL,
        locale: 'en-US',
      });
      await context.route(ADS, (route) => route.abort());
      const page = await context.newPage();
      const login = new LoginPage(page);
      await login.goto();
      await login.login(requireEnv('LOGIN_EMAIL'), requireEnv('LOGIN_PASSWORD'));
      await expect(login.loggedInText).toBeVisible();
      const state = await context.storageState();
      await context.close();
      await use(state);
    },
    { scope: 'worker' },
  ],
});

export { expect };