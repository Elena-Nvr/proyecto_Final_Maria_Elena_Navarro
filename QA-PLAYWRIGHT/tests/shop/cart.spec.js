import { test, expect } from '../fixtures.js';

test.use({ baseURL: process.env.SHOP_URL });

const PRODUCTO = 'Blue Top'; // ← el nombre de tu producto

test.describe('Tienda', () => {
  test('CP-TIENDA-01: agregar un producto al carrito', async ({
    homePage,
    productPage,
    cartPage,
  }) => {
    await homePage.openProduct(PRODUCTO);
    await expect(productPage.title).toHaveText(PRODUCTO);
    await productPage.addToCart();
    await expect(productPage.confirmation).toBeVisible();
    await productPage.openCart();
    await expect(cartPage.rowFor(PRODUCTO)).toBeVisible();
    await expect(cartPage.quantityOf(PRODUCTO)).toHaveText('1');
  });
});