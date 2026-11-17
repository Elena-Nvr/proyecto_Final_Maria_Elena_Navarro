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
  

    test('CP-TIENDA-03: eliminar un producto del carrito', async ({
    page,
    homePage,
    productPage,
    cartPage,
  }) => {
    await homePage.openProduct('Blue Top');
    await productPage.addToCart();
    await productPage.openCart();
    await page.waitForLoadState('load');
    await expect(cartPage.rowFor('Blue Top')).toBeVisible();

    await cartPage.deleteButtons.first().click();

    await expect(cartPage.rowFor('Blue Top')).toHaveCount(0);
    await expect(page.getByText('Cart is empty!')).toBeVisible();
  });

});
