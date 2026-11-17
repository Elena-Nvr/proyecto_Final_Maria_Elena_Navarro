import { test, expect } from '../fixtures.js';

test.use({ baseURL: process.env.SHOP_URL });

// Demo de prueba inestable: usa una espera fija. Se ejecuta aparte
test.skip(!process.env.RUN_FLAKY_DEMO, 'Demo: solo corre con RUN_FLAKY_DEMO=1');

test('FLAKY-DEMO: eliminar un producto con espera fija', async ({
  page,
  homePage,
  productPage,
  cartPage,
}) => {
  await homePage.openProduct('Blue Top');
  await productPage.addToCart();
  await productPage.openCart();
  await page.waitForTimeout(500); // espera fija: a veces alcanza y a veces no
  await cartPage.deleteButtons.first().click();
  await expect(page.getByText('Cart is empty!')).toBeVisible();
});