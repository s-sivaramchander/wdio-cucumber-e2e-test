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

const ORANGE_HRM_APP_BASE_URL = "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"

const THE_INTERNET_HEROKU_APP_BASE_URL = "https://the-internet.herokuapp.com/"

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


Given(/^A web page is opened$/, async function () {
    await browser.url("/inputs");
    await browser.setTimeout( {'implicit': 15000, 'pageLoad': 10000 } );
    await browser.maximizeWindow();
    await expect(browser).toHaveTitle("The Internet");
})

Then(/^Perform web interactions$/, async function () {
    // Perform web interactions here
    // Example: await $("selector").click();
    // Add your web interaction steps as needed
    const num1 = "1234";
    const num2 = "5678";
    await $("input[type='number']").setValue(num1.toString()); // to fast type, it will not auto clear the value and enter the given value 
    await browser.pause(3000);
    for (let char of num2.toString()) {
        await browser.pause(1000);
        await browser.keys(char);
    }
    await browser.pause(3000);
})