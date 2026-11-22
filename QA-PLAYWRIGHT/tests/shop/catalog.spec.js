import { test, expect } from '../fixtures.js';
import catalog from '../../test-data/catalog-data.json';

test.describe('Categorías y marcas', () => {
  for (const { id, group, sub } of catalog.categories) {
    test(`${id}: filtrar por categoría ${group} - ${sub}`, async ({ page, productListPage }) => {
      await productListPage.openCategory(group, sub);
      await expect(page).toHaveURL(/category_products/);
      await expect(productListPage.title).toContainText(`${group} - ${sub} Products`, {
        ignoreCase: true,
      });
      await expect(productListPage.cards.first()).toBeVisible();
    });
  }

  for (const { id, name } of catalog.brands) {
    test(`${id}: filtrar por la marca ${name}`, async ({ page, productListPage }) => {
      await productListPage.openBrand(name);
      await expect(page).toHaveURL(/brand_products/);
      await expect(productListPage.title).toContainText(`Brand - ${name} Products`, {
        ignoreCase: true,
      });
      await expect(productListPage.cards.first()).toBeVisible();
    });
  }
});
