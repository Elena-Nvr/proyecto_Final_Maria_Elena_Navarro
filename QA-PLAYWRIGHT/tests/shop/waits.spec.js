import { test, expect } from '../fixtures.js';

test.use({ baseURL: process.env.SHOP_URL });

test.describe('Esperas condicionales en el carrito', () => {
  test('CP-ESPERA-01: la fila del producto aparece (espera automática de expect)', async ({
    homePage,
    productPage,
    cartPage,
  }) => {
    await homePage.openProduct('Blue Top');
    await productPage.addToCart();
    await productPage.openCart();

    await expect(cartPage.rowFor('Blue Top')).toBeVisible();
    await expect(cartPage.quantityOf('Blue Top')).toHaveText('1');
  });

  test('CP-ESPERA-02: el carrito tiene una fila para eliminar (expect.poll)', async ({
    homePage,
    productPage,
    cartPage,
  }) => {
    await homePage.openProduct('Blue Top');
    await productPage.addToCart();
    await productPage.openCart();

    await expect
      .poll(async () => await cartPage.deleteButtons.count())
      .toBe(1);
  });

  test('CP-ESPERA-03: eliminar el producto y esperar el carrito vacío (toPass)', async ({
    page,
    homePage,
    productPage,
    cartPage,
  }) => {
    await homePage.openProduct('Blue Top');
    await productPage.addToCart();
    await productPage.openCart();
    await page.waitForLoadState('load');

    await expect(async () => {
      await cartPage.deleteButtons.first().click({ timeout: 2000 });
      await expect(page.getByText('Cart is empty!')).toBeVisible({ timeout: 2000 });
    }).toPass({ timeout: 20000 });
  });
});
