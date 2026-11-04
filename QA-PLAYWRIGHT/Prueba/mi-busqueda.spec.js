import { test, expect } from '@playwright/test';
//---------------Paso 3 del laboratorio----------
test('búsqueda sin resultados', async ({ page }) => {
  await page.goto('https://automationexercise.com/products');
  await page.getByPlaceholder('Search Product').fill('xyz');
  await page.locator('#submit_search').click();

  // Expect propuestos por la IA 
  await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
  await expect(page.getByRole('link', { name: 'View Product' })).toHaveCount(0);
//await expect(page.getByRole('link', { name: 'View Product' })).toHaveCount(1);


// ---------------------PARTE 4-----------

// lectura única (no espera)
//expect(await page.getByRole('heading', { name: 'Searched Products' }).isVisible()).toBe(true);

// espera fija, antes de la lectura
//await page.waitForTimeout(3000);
//expect(await page.getByRole('heading', { name: 'Searched Products' }).isVisible()).toBe(true);

//  espera explícita (la correcta)
await expect(page.getByRole('heading', { name: 'Searched Products' })).toBeVisible();
});


