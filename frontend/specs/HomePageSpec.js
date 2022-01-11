const { browser } = require('protractor');
var navigationHelper = require('../helpers/navigationHelper'),
    commel = require('../page_object/CommonElements'),
    homePage = require('../page_object/homePage'),
    quotePage = require('../page_object/quotePage');
    securityDetailsPage = require('../page_object/securityDetailsPage');
    company = require('../config/test_data/companyData');
    using = require('jasmine-data-provider');

describe("Feature: As a User, I want to search for specific quote for a company", function() {

    using(company.companyData, function(data, description) {

    beforeAll(async function() {
        await browser.waitForAngularEnabled(false)
        this.CommonElements = commel;
        this.HomePage = homePage;
        this.QuotePage = quotePage;
        this.SecurityDetailsPage = securityDetailsPage;
        this.NavigationHelper =  navigationHelper;
        await this.NavigationHelper.goToUrl(this.HomePage.getUrl());
        await browser.waitForReact();
    });

        describe('Scenario: Navigation to Home Page and search for ' + data.symbol + ' quote', function() {

            


            it("Given I open a web browser", async function () {              
            });

            it("And I navigate to OTC Market homepage", async function () {         
            });

            it("When I search for " + data.symbol + " quote in the textbox", async function () {
                await this.HomePage.searchAndGetResults(data.symbol);
            });

            it("Then I should be directed to the " + description + " page", async function () {
                expect(await this.CommonElements.getSymbol()).toBe(data.symbol);
                browser.sleep(1000); //using as a last resort due to element failing to show.
                expect(await this.CommonElements.getCompanyName()).toBe(description);
            });



                        
        });

        describe('Scenario: Check the Quote and Security Details tabs info matches', function() {


            it("Given I am on the quote page", async function () {  
                await this.CommonElements.clickQuoteTab();          
            });
        
            it("When I compare Market Cap and Open values from Quote tab with the ones in Security Details tab", async function () {
                var openValueInQuoteTab = await this.QuotePage.getInfofromOpenValue();
                marketCapInQuoteTab = await this.QuotePage.getInfoFromMarketCap(); 
                this.CommonElements.clickSecurityDetailsTab();
            });

            it("Then the values should match", async function () {
                expect(marketCapInQuoteTab).toBe(await this.SecurityDetailsPage.getInfoFromMarketCap());
                console.log("Market Cap " + await this.SecurityDetailsPage.getInfoFromMarketCap() + " on " + await this.SecurityDetailsPage.getInfoFromDate());
            });

                    
        });

    });

});
