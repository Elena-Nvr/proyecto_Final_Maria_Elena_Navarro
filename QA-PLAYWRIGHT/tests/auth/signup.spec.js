import { test, expect } from '../fixtures.js';
import signupData from '../../test-data/signup-data.json';

test.describe('Registro de usuario', () => {
  test('CP-REG-01: registrar una cuenta nueva y eliminarla', async ({
    loginPage,
    signupPage,
  }) => {
    // correo único por corrida para no chocar con cuentas anteriores
    const email = `qa.${Date.now()}@example.com`;

    await signupPage.startSignup(signupData.name, email);
    await expect(signupPage.accountInfoTitle).toBeVisible();

    await signupPage.fillAccountForm(signupData);
    await expect(signupPage.accountCreated).toBeVisible();

    await signupPage.continueButton.click();
    await expect(signupPage.loggedInText).toBeVisible();

    // limpieza: la cuenta de prueba no se deja en la tienda
    await signupPage.deleteAccountLink.click();
    await expect(signupPage.accountDeleted).toBeVisible();
  });

  test('CP-REG-02: un correo ya registrado muestra error', async ({
    loginPage,
    signupPage,
    credentials,
  }) => {
    await signupPage.startSignup(signupData.name, credentials.email);
    await expect(signupPage.existingEmailError).toBeVisible();
  });
});


