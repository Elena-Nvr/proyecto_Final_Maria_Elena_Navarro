import { test, expect } from '../fixtures.js';
import extras from '../../test-data/extras-data.json';

test.describe('Suscripción', () => {
  test(`${extras.subscription.id}: suscribirse desde el pie de página`, async ({
    homePage,
    subscriptionPage,
  }) => {
    // homePage ya abrió el inicio; el formulario está en el pie
    await subscriptionPage.subscribe(extras.subscription.email);
    await expect(subscriptionPage.successMessage).toBeVisible();
  });
});