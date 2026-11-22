import { test, expect } from '../fixtures.js';
import searchData from '../../test-data/search-data.json';

test.describe('Búsqueda de productos', () => {
  // un test por cada búsqueda del JSON
  for (const { id, term, expected } of searchData.found) {
    test(`${id}: buscar "${term}" muestra el producto ${expected}`, async ({
      productListPage,
    }) => {
      await productListPage.search(term);
      // primero el título: confirma que ya cargaron los resultados de la búsqueda
      await expect(productListPage.title).toContainText('Searched Products', {
        ignoreCase: true,
      });
      await expect(productListPage.productNamed(expected)).toBeVisible();
    });
  }

  test(`${searchData.notFound.id}: un término inexistente no muestra productos`, async ({
    productListPage,
  }) => {
    await productListPage.search(searchData.notFound.term);
    await expect(productListPage.title).toContainText('Searched Products', {
      ignoreCase: true,
    });
    await expect(productListPage.cards).toHaveCount(0);
  });
});