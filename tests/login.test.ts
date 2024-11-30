import { test, expect } from '@playwright/test';
import { login } from '../src/login';

test.use({
    launchOptions: { headless: false }, // Run browser in headed mode
});

test('Login to Asana with step-by-step flow', async ({ page }) => {
    // Call the reusable login function
    await login(page, 'ben+pose@workwithloop.com', 'Password123');


}); 



