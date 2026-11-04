import { test, expect } from '@playwright/test';

const URL_LOGIN = 'https://automationexercise.com/login';
const EMAIL = 'navarro.ele.12@gmail.com';
const PASSWORD = '123456';


// ---------- PUNTO 1: login exitoso ----------
test('login exitoso', async ({ page }) => {
  await page.goto(URL_LOGIN);

  await page.getByPlaceholder('Email Address').first().fill(EMAIL);
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page).toHaveURL('https://automationexercise.com/');
  await expect(page.getByText('Logged in as')).toBeVisible();
  await expect(page.getByRole('link', { name: 'Logout' })).toBeVisible();
});

// ----------login- errores ----------
test('correo inexistente', async ({ page }) => {
  await page.goto(URL_LOGIN);

  await page.getByPlaceholder('Email Address').first().fill('noexiste@correo.com');
  await page.getByPlaceholder('Password').fill(PASSWORD);
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  await expect(page).toHaveURL(/login/);
   // FALLA SIMULADA  
  //await expect(page.getByText('Login successful')).toBeVisible();
});

test('contraseña incorrecta', async ({ page }) => {
  await page.goto(URL_LOGIN);

  await page.getByPlaceholder('Email Address').first().fill(EMAIL);
  await page.getByPlaceholder('Password').fill('contraseña-equivocada');
  await page.getByRole('button', { name: 'Login' }).click();

  await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();
  await expect(page).toHaveURL(/login/);
   // FALLA SIMULADA
  //await expect(page.getByText('Login successful')).toBeVisible();
});