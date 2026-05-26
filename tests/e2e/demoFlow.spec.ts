import { expect, test } from "@playwright/test";

test("demo flow opens", async ({ page }) => {
  await page.goto("http://127.0.0.1:3000/demo");
  await expect(page.getByText("Expediente inicial")).toBeVisible();
  await expect(page.getByText("Demo publica")).toBeVisible();
});
