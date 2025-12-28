import { test, expect } from "@playwright/test";

test.describe("Portal", () => {
    test("portal redirects to login or shows demo mode", async ({ page }) => {
        await page.goto("/portal");

        // In demo mode, should show the portal with demo banner
        // OR redirect to login page
        const url = page.url();

        if (url.includes("/login")) {
            // Check login page
            await expect(page.locator("h1")).toContainText(/Welcome back|Create your account/);
        } else {
            // Check portal loaded with demo banner
            const demoBanner = page.getByText(/Demo Mode/);
            await expect(demoBanner).toBeVisible();

            // Check dashboard content
            await expect(page.locator("h1")).toContainText("Dashboard");
        }
    });

    test("demo login works", async ({ page }) => {
        await page.goto("/login");

        // Click the demo login button
        const demoButton = page.getByRole("button", { name: /Try Demo/i });
        await expect(demoButton).toBeVisible();
        await demoButton.click();

        // Should redirect to portal
        await expect(page).toHaveURL(/\/portal/, { timeout: 10000 });

        // Check that dashboard loads
        await expect(page.locator("h1")).toContainText("Dashboard");
    });

    test("portal navigation works", async ({ page }) => {
        // Start at login and do demo login
        await page.goto("/login");
        await page.getByRole("button", { name: /Try Demo/i }).click();
        await expect(page).toHaveURL(/\/portal/);

        // Navigate to Leads
        await page.getByRole("link", { name: "Leads" }).click();
        await expect(page).toHaveURL(/\/portal\/leads/);
        await expect(page.locator("h1")).toContainText("Leads");

        // Navigate to Bookings
        await page.getByRole("link", { name: "Bookings" }).click();
        await expect(page).toHaveURL(/\/portal\/bookings/);
        await expect(page.locator("h1")).toContainText("Bookings");

        // Navigate to AI Assistant
        await page.getByRole("link", { name: "AI Assistant" }).click();
        await expect(page).toHaveURL(/\/portal\/ai/);
        await expect(page.locator("h1")).toContainText("AI Assistant");
    });

    test("leads page shows data table", async ({ page }) => {
        await page.goto("/login");
        await page.getByRole("button", { name: /Try Demo/i }).click();
        await page.goto("/portal/leads");

        // Check that the leads table is visible
        const table = page.locator("table");
        await expect(table).toBeVisible();

        // Check that demo leads are displayed
        const rows = page.locator("tbody tr");
        await expect(rows).toHaveCount(5); // Demo has 5 leads
    });
});
