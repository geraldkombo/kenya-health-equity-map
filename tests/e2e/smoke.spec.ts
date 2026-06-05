import { test, expect } from "@playwright/test";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

test.describe("Nairobi Health Equity Map smoke tests", () => {
  test("home page loads and shows title", async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator("h1")).toContainText("Nairobi Health Equity Map");
  });

  test("method page loads", async ({ page }) => {
    await page.goto(`${BASE_URL}/method`);
    await expect(page.locator("h1")).toContainText("Methodology");
  });

  test("compare page loads and allows ward selection", async ({ page }) => {
    await page.goto(`${BASE_URL}/compare`);
    await expect(page.locator("h1")).toContainText("Compare wards");
    await page.selectOption("#ward-a", "KE047-001");
    await page.selectOption("#ward-b", "KE047-003");
    await expect(page.locator("text=Priority Gap Score")).toBeVisible();
  });

  test("brief page shows message without ward parameter", async ({ page }) => {
    await page.goto(`${BASE_URL}/brief`);
    await expect(page.locator("text=Generate brief")).toBeVisible();
  });

  test("brief page loads with ward parameter", async ({ page }) => {
    await page.goto(`${BASE_URL}/brief?ward=KE047-001`);
    await expect(page.locator("h1")).toContainText("Karen");
  });
});
