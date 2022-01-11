const { browser, element } = require('protractor');
const  navigationHelper = require('../helpers/navigationHelper');

var CommonElements = function() {

    var companyName = element(by.xpath("//h1[@class='_1rzoYNl62n']"))
    var companySymbol = element(by.xpath("//h1[@class='_2D4XgQ0gJK']"))
    var quoteTab = element(by.xpath("//a[normalize-space()='Quote']"))
    var securityDetailsTab = element(by.xpath("//a[normalize-space()='Security Details']"))


    this.NavigationHelper = navigationHelper;
    
  
    this.getSymbol = async function(){
        await this.NavigationHelper.waitForElement(companySymbol);
        return companySymbol.getText();
    };

    this.getCompanyName = async function(){
        await this.NavigationHelper.waitForElement(companyName);
        return companyName.getText();
    };

    this.clickQuoteTab = async function(){
        await quoteTab.click();
    }
    
    this.clickSecurityDetailsTab = async function(){
        await securityDetailsTab.click();
    }

}
  
  module.exports = new CommonElements();