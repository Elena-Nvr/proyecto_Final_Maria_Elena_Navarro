import { test, expect } from '../fixtures.js';

test.describe('Autenticación', () => {
  // ---------- Login exitoso ----------
  test('login exitoso', async ({ page, loginPage, credentials }) => {
    await loginPage.login(credentials.email, credentials.password);

    await expect(page).toHaveURL('/');
    await expect(loginPage.loggedInText).toBeVisible();
    await expect(loginPage.logoutLink).toBeVisible();
  });

  // ---------- Login con errores ----------
  test('correo inexistente', async ({ page, loginPage, credentials }) => {
    await loginPage.login('noexiste@correo.com', credentials.password);

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(/login/);
  });

  test('contraseña incorrecta', async ({ page, loginPage, credentials }) => {
    await loginPage.login(credentials.email, 'contraseña-equivocada');

    await expect(loginPage.errorMessage).toBeVisible();
    await expect(page).toHaveURL(/login/);
  });

  // ---------- Cerrar sesión ----------
  test('cerrar sesión', async ({ page, loggedInPage, loginPage }) => {
    await loginPage.logoutLink.click();

    await expect(page).toHaveURL(/login/);
    await expect(loginPage.loginButton).toBeVisible();
  });
});