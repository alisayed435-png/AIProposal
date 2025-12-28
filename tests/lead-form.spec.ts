import { test, expect } from "@playwright/test";

test.describe("Lead Form", () => {
    test("plumber landing page loads and shows lead form", async ({ page }) => {
        await page.goto("/landing/plumber");

        // Check that the page loads with the right content
        await expect(page).toHaveTitle(/Professional Plumbing Services/);

        // Check that the hero heading is visible
        const heroHeading = page.locator("h1").first();
        await expect(heroHeading).toBeVisible();
        await expect(heroHeading).toContainText("Expert Plumbing Services");

        // Check that the lead form is visible
        const form = page.locator("form").first();
        await expect(form).toBeVisible();

        // Check form fields exist
        await expect(page.locator('input[placeholder="John Smith"]')).toBeVisible();
        await expect(page.locator('input[placeholder="john@business.com"]')).toBeVisible();
    });

    test("lead form submission works", async ({ page }) => {
        await page.goto("/landing/plumber");

        // Fill out the form
        await page.locator('input[placeholder="John Smith"]').fill("Test User");
        await page.locator('input[placeholder="john@business.com"]').fill("test@example.com");

        // Select business type
        await page.locator("select").first().selectOption("plumber");

        // Fill message
        await page.locator('textarea[placeholder*="Tell us about"]').fill("This is a test message from Playwright");

        // Submit the form
        const submitButton = page.getByRole("button", { name: /Request Quote/i });
        await submitButton.click();

        // Should redirect to thank you page
        await expect(page).toHaveURL(/\/thank-you/, { timeout: 10000 });

        // Check thank you page content
        const thankYouHeading = page.locator("h1");
        await expect(thankYouHeading).toContainText("Thank you");
    });

    test("dentist landing page loads", async ({ page }) => {
        await page.goto("/landing/dentist");

        // Check that the page loads
        await expect(page).toHaveTitle(/Family Dental Care/);

        // Check hero content
        const heroHeading = page.locator("h1").first();
        await expect(heroHeading).toBeVisible();
        await expect(heroHeading).toContainText("Expert Care");
    });
});
