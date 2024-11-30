import { expect, Page } from '@playwright/test';

/**
 * Reusable login function for Asana
 * @param page - The Playwright page object
 * @param email - The email address for login
 * @param password - The password for login
 */
export async function login(page: Page, email: string, password: string) {
    // Navigate to the login URL
    await page.goto('https://app.asana.com/-/login');

    // Step 1: Enter email and hit "Continue"
    await page.fill('input[name="e"]', email); 
    await page.click('div.LoginEmailForm-continueButton[role="button"]');

    // Step 2: Enter password after the email step
    await page.fill('input[name="p"]', password); 
    await page.click('div[role="button"]:has-text("Log in")');

    // Verify successful login
    await page.waitForSelector('text=Home');
    console.log('Login successful and post-login page loaded.');
 
} 
    // 
