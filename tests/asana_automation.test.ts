import { test, expect } from '@playwright/test';
import { login } from '../src/login';
import locators from '../data/locators.json';

test.use({
    launchOptions: { headless: true }, // Run browser in headed mode
});

// Helper Function to Replace Placeholders
const replacePlaceholders = (template: string, replacements: Record<string, string>) => {
    return template.replace(/{{(.*?)}}/g, (_, key) => replacements[key] || '');
};

test.describe('Dynamic Task Verification', () => {
    test.beforeEach(async ({ page }) => {
        // Login before each test
        await login(page, locators.login.email, locators.login.password);
    });

    Object.entries(locators.tasks).forEach(([taskName, task]) => {
        test(`Verify details for task: ${task.name}`, async ({ page }) => {
            // Step 1: Navigate to the task's sidebar link
            await page.click(task.navigationLink);

            // Step 2: Verify the task is in the correct column
            const taskColumn = page.locator(task.taskColumn);
            const taskNameSelector = replacePlaceholders(locators.selectors.taskName, { name: task.name });
            await expect(taskColumn.locator(taskNameSelector)).toBeVisible();

            // Step 3: Confirm tags
            const taskContainerSelector = replacePlaceholders(locators.selectors.taskContainer, { taskId: task.taskId });
            const taskContainer = page.locator(taskContainerSelector);
            const tagsContainer = taskContainer.locator(locators.selectors.tagsContainer);

            for (const tag of task.tags) {
                const tagSelector = replacePlaceholders(locators.selectors.tagLocator, { tag });
                await expect(tagsContainer.locator(tagSelector)).toBeVisible();
            }

            console.log(`${taskName} passed! `);
        });
    });
});
