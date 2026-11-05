import { test, expect } from '../fixtures.js';

test.use({ baseURL: process.env.SHOP_URL });

const PRODUCT = 'Blue Top';

test.describe('Tienda', () => {
  test('CP-TIENDA-01: agregar un producto muestra confirmación y aparece en el carrito', async ({
    homePage,
    productPage,
    cartPage,
  }) => {
    await homePage.openProduct(PRODUCT);
    await expect(productPage.title).toHaveText(PRODUCT);
    await productPage.addToCart();
    await expect(productPage.confirmation).toBeVisible();
    await productPage.openCart();
    await expect(cartPage.rowFor(PRODUCT)).toBeVisible();
    await expect(cartPage.quantityOf(PRODUCT)).toHaveText('1');
  });
});