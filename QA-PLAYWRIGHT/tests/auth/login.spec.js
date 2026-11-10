import { test, expect } from '../fixtures.js';
import dataLogin from '../../test-data/data-login.json';


test.describe('Autenticación', () => {
  // ---------- Login exitoso ----------
  test('CP-AUTH-01:login exitoso', async ({ page, loginPage, credentials }) => {
    await loginPage.login(credentials.email, credentials.password);

    await expect(page).toHaveURL('/');
    await expect(loginPage.loggedInText).toBeVisible();
    await expect(loginPage.logoutLink).toBeVisible();
  });

   // ---------- Login con errores: un test por cada fila en JSON ----------
  for (const { id, name, email, password, error } of dataLogin) {
    test(`${id}: ${name}`, async ({ page, loginPage, credentials }) => {
      await loginPage.login(email ?? credentials.email, password);

      await expect(loginPage.errorMessage).toHaveText(error);
      await expect(page).toHaveURL(/login/);
    });
  }

  // ---------- Cerrar sesión ----------
  test('CP-AUTH-05:cerrar sesión', async ({ page, loggedInPage, loginPage }) => {
    await loginPage.logoutLink.click();
    await expect(page).toHaveURL(/login/);
    await expect(loginPage.loginButton).toBeVisible();
  });
});