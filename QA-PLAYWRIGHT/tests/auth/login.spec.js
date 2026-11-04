import { test, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage.js';

test.describe('Autenticación', () => {
  let loginPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    await loginPage.goto();
  });

  // ---------- Login exitoso ----------
  test('login exitoso', async ({ page }) => {
    await loginPage.login(process.env.LOGIN_EMAIL, process.env.LOGIN_PASSWORD);

    await expect(page).toHaveURL('/');
    await expect(loginPage.loggedInText).toBeVisible();
    await expect(loginPage.logoutLink).toBeVisible();
  });

  // ---------- Login con errores ----------
  test('correo inexistente', async ({ page }) => {
    await loginPage.login('noexiste@correo.com', process.env.LOGIN_PASSWORD);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(/login/);
  });

  test('contraseña incorrecta', async ({ page }) => {
    await loginPage.login(process.env.LOGIN_EMAIL, 'contraseña-equivocada');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(/login/);
  });
});
