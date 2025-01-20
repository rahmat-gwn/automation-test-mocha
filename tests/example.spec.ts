import { test, expect } from '@playwright/test';

test.describe('DEV Community Login Page Tests', () => {

  // 1. Membuka halaman dan memastikan elemen penting terlihat
  test('Verify page loads and all buttons are visible', async ({ page }) => {
    await page.goto('https://dev.to/enter');
    await expect(page.locator('button', { hasText: 'Continue with Apple' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Continue with Facebook' })).toBeVisible();
    await expect(page.locator('button', { hasText: 'Log in' })).toBeVisible();
  });

  // 2. Klik tombol "Continue with GitHub" dan pastikan URL berubah
  test('Click "Continue with GitHub" and verify redirection', async ({ page }) => {
    await page.goto('https://dev.to/enter');
    await page.locator('button', { hasText: 'Continue with GitHub' }).click();
    await expect(page).not.toHaveURL('https://dev.to/enter');
  });

  // 3. Mengisi email dan password yang valid
  test('Fill email and password fields with valid credentials', async ({ page }) => {
    await page.goto('https://dev.to/enter');
    await page.locator('input[name="email"]').fill('valid_email@example.com');
    await page.locator('input[name="password"]').fill('ValidPassword123');
    await page.locator('button', { hasText: 'Log in' }).click();
  });

  // 4. Mencoba login dengan email tidak valid
  test('Attempt login with invalid email', async ({ page }) => {
    await page.goto('https://dev.to/enter');
    await page.locator('input[name="email"]').fill('invalid_email');
    await page.locator('input[name="password"]').fill('ValidPassword123');
    await page.locator('button', { hasText: 'Log in' }).click();
    await expect(page.locator('text=Invalid email or password')).toBeVisible();
  });

  // 5. Memastikan tombol "Forgot password?" berfungsi
  test('Click "Forgot password?" and verify redirection', async ({ page }) => {
    await page.goto('https://dev.to/enter');
    await page.locator('text=Forgot password?').click();
    await expect(page).toHaveURL(/password-reset/);
  });

  // 6. Memastikan "Remember me" checkbox dapat di-klik
  test('Toggle "Remember me" checkbox', async ({ page }) => {
    await page.goto('https://dev.to/enter');
    const checkbox = page.locator('input[type="checkbox"]');
    await checkbox.check();
    await expect(checkbox).toBeChecked();
    await checkbox.uncheck();
    await expect(checkbox).not.toBeChecked();
  });

  // 7. Memastikan tombol "Continue with Google" berfungsi
  test('Click "Continue with Google" and verify action', async ({ page }) => {
    await page.goto('https://dev.to/enter');
    await page.locator('button', { hasText: 'Continue with Google' }).click();
    await page.waitForTimeout(3000); // Tunggu untuk simulasi redirection
    await expect(page.url()).not.toBe('https://dev.to/enter');
  });

  // 8. Menyembunyikan password saat mengetik (cek input tipe)
  test('Ensure password field hides input', async ({ page }) => {
    await page.goto('https://dev.to/enter');
    const passwordField = page.locator('input[name="password"]');
    await passwordField.fill('SecretPassword123');
    const type = await passwordField.getAttribute('type');
    expect(type).toBe('password');
  });

  // 9. Memastikan tombol "Log in" tidak aktif tanpa input
  test('Verify "Log in" button is disabled without input', async ({ page }) => {
    await page.goto('https://dev.to/enter');
    const loginButton = page.locator('button', { hasText: 'Log in' });
    const isDisabled = await loginButton.isDisabled();
    expect(isDisabled).toBeTruthy();
  });

  // 10. Klik tombol "Continue with Twitter" (X)
  test('Click "Continue with Twitter (X)" and verify action', async ({ page }) => {
    await page.goto('https://dev.to/enter');
    await page.locator('button', { hasText: 'Continue with Twitter (X)' }).click();
    await page.waitForTimeout(3000); // Tunggu simulasi redirect
    await expect(page.url()).not.toBe('https://dev.to/enter');
  });
});
