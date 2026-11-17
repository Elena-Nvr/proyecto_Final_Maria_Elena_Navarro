import { test, expect } from '../fixtures.js';

test.use({ baseURL: process.env.SHOP_URL });

test('REP-01: agregar al carrito con evidencia por paso', async ({
  page,
  homePage,
  productPage,
  cartPage,
}) => {
  await test.step('Abrir el producto Blue Top', async () => {
    await homePage.openProduct('Blue Top');
    await expect(productPage.title).toHaveText('Blue Top');
    await test.info().attach('Producto abierto', {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  });

  await test.step('Agregar al carrito y abrirlo', async () => {
    await productPage.addToCart();
    await productPage.openCart();
    await page.waitForLoadState('load');
    await expect(cartPage.rowFor('Blue Top')).toBeVisible();
    await test.info().attach('Carrito con el producto', {
      body: await page.screenshot(),
      contentType: 'image/png',
    });
  });
});
