import { test, expect } from '@playwright/test';

test('mapeo de elementos', async ({ page }) => {
    await page.goto('https://automationexercise.com/products');

    // ---------- PARTE 1: MAPEO DE 5 ELEMENTOS ----------
    // 1. Botón Search 
    const bycss = page.locator('#submit_search');
    await expect(bycss).toBeVisible();

    // 2. Campo de búsqueda (por placeholder)
    const byplaceholder = page.getByPlaceholder('Search Product');
    await expect(byplaceholder).toBeVisible();

    // 3. Nombre del primer producto
    //const bytext = page.getByText('Blue Top').first();
    const bytext = page.locator('.productinfo p').first();
    await expect(bytext).toBeVisible();

    // 4. Título de la sección (por rol)"xyz"
    await byplaceholder.fill('xyz');
    await bycss.click();
    const byrole = page.getByRole('heading', { name: 'Searched Products' });
    await expect(byrole).toBeVisible();

    // 5. Nombres de los productos 
    await page.goto('https://automationexercise.com/products');
    //const bynombres = page.locator('.productinfo p').first();
    //await expect(bynombres).toBeVisible();
    const bynombres = page.locator('.productinfo p');
    await expect(bynombres).not.toHaveCount(0);
});


// ---------- PARTE 2: MODO ESTRICTO ----------
// 1. Provocarlo (falla a propósito, por eso test.fail)
test.fail('1. provocar modo estricto', async ({ page }) => {
  await page.goto('https://automationexercise.com/products');
  await page.getByText('Blue Top').click();
});

// 2. Leerlo: Playwright encontró 2 elementos con el texto "Blue Top" y no
// supo cuál elegir. "strict mode violation ... resolved to N elements"
// significa "encontré N, ¿cuál quieres?". No es un fallo de Playwright.

// 3. Resolver por posición
test('3. solución por posición', async ({ page }) => {
  await page.goto('https://automationexercise.com/products');
  await page.getByText('Blue Top').first().click();
});

// 4. Resolver por texto
test('4. solución por texto', async ({ page }) => {
  await page.goto('https://automationexercise.com/products');
  await page.locator('.productinfo p').filter({ hasText: 'Blue Top' }).first().click();
});

// 5. Sobrevive la solución por texto: .first() depende del orden de los
// productos y, si cambia, haría clic en otro. El filtro por texto sigue
// encontrando "Blue Top" donde esté.
