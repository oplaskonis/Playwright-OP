const { test, expect } = require("@playwright/test");
import { HomeComponents } from "C:/Hillel/Git/Playwright-OP/tests/src/pages/HomeComponents";
import { Registration } from "C:/Hillel/Git/Playwright-OP/tests/src/pages/Registration";

test.describe("Registration_TEST", () => {
  let registrationprocedure = Registration;

  test.beforeEach(async ({ page }) => {
    const newPage = new HomeComponents(page);
    await newPage.navigate();
    registrationprocedure = await newPage.openRegistration();
  });

  test("Registration FAIL 1 - passwords do not match", async () => {
    await registrationprocedure.inputFirstName.fill("Olena");
    await registrationprocedure.inputLastName.fill("Koval");
    await registrationprocedure.inputEmail.fill("aqa-kovalO@test.com");
    await registrationprocedure.inputPassword.fill("Koval123");
    await registrationprocedure.inputReEnterPassword.fill("Koval12345");
    await registrationprocedure.inputReEnterPassword.blur();
    await expect
      .soft(
        registrationprocedure.modal.getByText("Passwords do not match"),
        "Passwords do not match"
      )
      .toBeVisible();
    await expect
      .soft(
        registrationprocedure.modal.getByText("Passwords do not match"),
        "Passwords do not match"
      )
      .toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Registration FAIL 2: First name is too short", async () => {
    await registrationprocedure.inputFirstName.fill("O");
    await registrationprocedure.inputFirstName.blur();
    await expect.soft(
      registrationprocedure.modal.getByText(
        "Name has to be from 2 to 20 characters long"
      ),
      "Name has to be from 2 to 20 characters long"
    ).toBeVisible;
    await expect
      .soft(
        registrationprocedure.modal.getByText(
          "Name has to be from 2 to 20 characters long"
        ),
        "Name has to be from 2 to 20 characters long"
      )
      .toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Registration FAIL 3 - email is incorrect", async () => {
    await registrationprocedure.inputFirstName.fill("Iryna");
    await registrationprocedure.inputLastName.fill("Koval");
    await registrationprocedure.inputEmail.fill("aqa-kovalI.test.com");
    await registrationprocedure.inputEmail.blur();
    await expect.soft(
      registrationprocedure.modal.getByText("Email is incorrect"),
      "Email is incorrect"
    ).toBeVisible;
    await expect
      .soft(
        registrationprocedure.modal.getByText("Email is incorrect"),
        "Email is incorrect"
      )
      .toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Registration FAIL 4 - passwords is incorrect", async () => {
    await registrationprocedure.inputFirstName.fill("Max");
    await registrationprocedure.inputLastName.fill("Koval");
    await registrationprocedure.inputEmail.fill("aqa-kovalM@test.com");
    await registrationprocedure.inputPassword.fill("Kov1");
    await registrationprocedure.inputPassword.blur();
    await expect.soft(
      registrationprocedure.modal.getByText(
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      ),
      "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
    ).toBeVisible;
    await expect
      .soft(
        registrationprocedure.modal.getByText(
          "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
        ),
        "Password has to be from 8 to 15 characters long and contain at least one integer, one capital, and one small letter"
      )
      .toHaveCSS("border-color", "rgb(220, 53, 69)");
  });

  test("Registration FAIL 5: Last name is required", async () => {
    await registrationprocedure.inputFirstName.fill("Ben");
    await registrationprocedure.inputLastName.focus();
    await registrationprocedure.inputLastName.blur();
    await expect.soft(
      registrationprocedure.modal.getByText("Last name required"),
      "Last name required"
    ).toBeVisible;
    await expect
      .soft(
        registrationprocedure.modal.getByText("Last name required"),
        "Last name required"
      )
      .toHaveCSS("border-color", "rgb(220, 53, 69)");
  });
  test("Registration SUCCESS", async () => {
    await registrationprocedure.inputFirstName.fill("Anna");
    await registrationprocedure.inputLastName.fill("Koval");
    await registrationprocedure.inputEmail.fill("aqa-kovalA@test.com");
    await registrationprocedure.inputPassword.fill("Koval123");
    await registrationprocedure.inputReEnterPassword.fill("Koval123");
    await registrationprocedure.registerBtn.click();
  });
});
