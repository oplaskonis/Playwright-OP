const { test, expect } = require("@playwright/test");

test.describe("Registration_TEST", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    const signInBtn = page.getByRole("button", { name: "Sign in" });
    const modal = page.locator(".modal-content");
    const registrationBtn = modal.getByRole("button", {
      name: "registration",
    });

    await signInBtn.click();
    await registrationBtn.click();
  });

  test("Registration SUCCESS", async ({ page }) => {
    const modal = page.locator(".modal-content");
    const inputFirstName = modal.locator("#signupName");
    const inputLastName = modal.locator("#signupLastName");
    const inputEmail = modal.locator("#signupEmail");
    const inputPassword = modal.locator("#signupPassword");
    const inputReEnterPassword = modal.locator("#signupRepeatPassword");
    const registerBtn = modal.getByRole("button", { name: "Register" });

    await inputFirstName.fill("Anna");
    await inputLastName.fill("Koval");
    await inputEmail.fill("aqa-kovalA@test.com");
    await inputPassword.fill("Koval123");
    await inputReEnterPassword.fill("Koval123");
    await registerBtn.click();
  });

  test("Registration FAIL 1 - passwords do not match", async ({ page }) => {
    const modal = page.locator(".modal-content");
    const inputFirstName = modal.locator("#signupName");
    const inputLastName = modal.locator("#signupLastName");
    const inputEmail = modal.locator("#signupEmail");
    const inputPassword = modal.locator("#signupPassword");
    const inputReEnterPassword = modal.locator("#signupRepeatPassword");
    const registerBtn = modal.getByRole("button", { name: "Register" });

    await inputFirstName.fill("Olena");
    await inputLastName.fill("Koval");
    await inputEmail.fill("aqa-kovalO@test.com");
    await inputPassword.fill("Koval123");
    await inputReEnterPassword.fill("Koval12345");
    await inputReEnterPassword.blur();
    await expect
      .soft(modal.getByText("Passwords do not match"), "Passwords do not match")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Registration FAIL 2: First name is too short", async ({ page }) => {
    const modal = page.locator(".modal-content");
    const inputFirstName = modal.locator("#signupName");
    await inputFirstName.fill("O");
    await inputFirstName.blur();
    await expect
      .soft(
        modal.getByText("Name has to be from 2 to 20 characters long"),
        "Name has to be from 2 to 20 characters long"
      )
      .toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Registration FAIL 3 - email is incorrect", async ({ page }) => {
    const modal = page.locator(".modal-content");
    const inputFirstName = modal.locator("#signupName");
    const inputLastName = modal.locator("#signupLastName");
    const inputEmail = modal.locator("#signupEmail");
    const inputPassword = modal.locator("#signupPassword");
    const inputReEnterPassword = modal.locator("#signupRepeatPassword");
    const registerBtn = modal.getByRole("button", { name: "Register" });

    await inputFirstName.fill("Iryna");
    await inputLastName.fill("Koval");
    await inputEmail.fill("aqa-kovalI.test.com");
    await inputEmail.blur();
    await expect
      .soft(modal.getByText("Email is incorrect"), "Email is incorrect")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Registration FAIL 4 - passwords is incorrect", async ({ page }) => {
    const modal = page.locator(".modal-content");
    const inputFirstName = modal.locator("#signupName");
    const inputLastName = modal.locator("#signupLastName");
    const inputEmail = modal.locator("#signupEmail");
    const inputPassword = modal.locator("#signupPassword");
    const inputReEnterPassword = modal.locator("#signupRepeatPassword");
    const registerBtn = modal.getByRole("button", { name: "Register" });

    await inputFirstName.fill("Max");
    await inputLastName.fill("Koval");
    await inputEmail.fill("aqa-kovalM@test.com");
    await inputPassword.fill("Kov1");
    await inputPassword.blur();
    await expect
      .soft(
        modal.getByText(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
        ),
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      )
      .toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Registration FAIL 5: Last name is required", async ({ page }) => {
    const modal = page.locator(".modal-content");
    const inputFirstName = modal.locator("#signupName");
    const inputLastName = modal.locator("#signupLastName");
    await inputFirstName.fill("Ben");
    await inputLastName.focus();
    await inputLastName.blur();
    await expect
      .soft(modal.getByText("Last name required"), "Last name required")
      .toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
});
