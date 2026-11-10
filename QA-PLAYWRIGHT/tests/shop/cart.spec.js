import { test, expect } from '../fixtures.js';

test.use({ baseURL: process.env.SHOP_URL });

const products = ['Blue Top', 'Men Tshirt'];

test.describe('Tienda', () => {
  for (const name of products) {
    test(`CP-TIENDA-01: agregar ${name} al carrito`, async ({
      homePage,
      productPage,
      cartPage,
    }) => {
      await homePage.openProduct(name);
      await expect(productPage.title).toHaveText(name);
      await productPage.addToCart();
      await expect(productPage.confirmation).toBeVisible();
      await productPage.openCart();
      await expect(cartPage.rowFor(name)).toBeVisible();
      await expect(cartPage.quantityOf(name)).toHaveText('1');
    });
  }
});
