import { test, expect } from '../fixtures.js';
import extras from '../../test-data/extras-data.json';

test.describe('Contacto', () => {
  test(`${extras.contact.id}: enviar el formulario de contacto`, async ({ contactPage }) => {
    await contactPage.send(extras.contact);
    await expect(contactPage.successMessage).toBeVisible();
  });
});