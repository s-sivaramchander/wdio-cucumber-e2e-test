import { Given, When, Then } from "@wdio/cucumber-framework";

/**
 * Selectors
 * Title: CURA Healthcare Service
 * 
 * Make Appointment
 * Link Text: Make Appointment
 * 
 */

const CURA_APP_BASE_URL = "https://katalon-demo-cura.herokuapp.com/"
const CURA_APP_TITLE = "CURA Healthcare Service";


Given(/^the user launches the CURA web app$/, async function () {
    await browser.url(CURA_APP_BASE_URL);
    await expect(browser).toHaveTitle(CURA_APP_TITLE);
})


// "=${linkText}" - '=' represents the link text to the selector
When(/^the user clicks on Make Appointment button$/, async function() {
    await $("=Make Appointment").click();
})

// .* is any string but it should end with the following string
Then(/^the login page should be displayed$/, async function () {
    https://katalon-demo-cura.herokuapp.com/profile.php#login
    await expect(browser).toHaveUrl(/.*#login/)
})