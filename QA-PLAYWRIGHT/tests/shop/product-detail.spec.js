import { test, expect } from '../fixtures.js';
import extras from '../../test-data/extras-data.json';

test.describe('Detalle de producto', () => {
  test(`${extras.detail.id}: el detalle muestra nombre, precio, categoría y marca`, async ({
    homePage,
    productDetailPage,
  }) => {
    await homePage.openProduct(extras.detail.product);
    await expect(productDetailPage.name).toHaveText(extras.detail.product);
    await expect(productDetailPage.price).toContainText(extras.detail.price);
    await expect(productDetailPage.category).toContainText(extras.detail.category);
    await expect(productDetailPage.brand).toContainText(extras.detail.brand);
  });

  test(`${extras.review.id}: escribir una reseña muestra el agradecimiento`, async ({
    homePage,
    productDetailPage,
  }) => {
    await homePage.openProduct(extras.detail.product);
    await productDetailPage.writeReview(extras.review);
    await expect(productDetailPage.reviewSuccess).toBeVisible();
  });
});