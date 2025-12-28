import { test, expect } from "@playwright/test";

test.describe("Landing Page", () => {
    test("homepage loads successfully", async ({ page }) => {
        await page.goto("/");

        // Check that the page title is correct
        await expect(page).toHaveTitle(/SmallBiz Growth Platform/);

        // Check that the hero section is visible
        const heroHeading = page.locator("h1").first();
        await expect(heroHeading).toBeVisible();
        await expect(heroHeading).toContainText("Launch your business website");

        // Check that CTA buttons are visible
        const startTrialButton = page.getByRole("link", { name: /Start Free Trial/i }).first();
        await expect(startTrialButton).toBeVisible();

        const viewTemplatesButton = page.getByRole("link", { name: /View Templates/i });
        await expect(viewTemplatesButton).toBeVisible();
    });

    test("navigation links work", async ({ page }) => {
        await page.goto("/");

        // Click on Templates link
        await page.getByRole("link", { name: "Templates" }).first().click();
        await expect(page).toHaveURL(/\/templates/);

        // Go back and click on Pricing
        await page.goto("/");
        await page.getByRole("link", { name: "Pricing" }).first().click();
        await expect(page).toHaveURL(/\/pricing/);
    });

    test("features section is visible", async ({ page }) => {
        await page.goto("/");

        // Scroll to features section
        await page.locator("#features").scrollIntoViewIfNeeded();

        // Check that features are displayed
        const featuresHeading = page.getByText("Everything you need to grow online");
        await expect(featuresHeading).toBeVisible();
    });
});
