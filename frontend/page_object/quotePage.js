const  navigationHelper = require('../helpers/navigationHelper');

var QuotePage = function() {

    var openValue = element(by.cssContainingText('._1G7n38q1bb.sc-bdVaJa.lbvrig', 'Open')).element(by.tagName('p'));
    var marketCap = element(by.cssContainingText('._1G7n38q1bb.sc-bdVaJa.lbvrig', 'Market Cap')).element(by.tagName('p'));
    this.NavigationHelper = navigationHelper;     


    this.getInfofromOpenValue = async function(){
        await this.NavigationHelper.waitForElement(openValue);
        return openValue.getText();
    }  
    
    this.getInfoFromMarketCap = async function(){
        await this.NavigationHelper.waitForElement(marketCap);
        return marketCap.getText();
    } 

    this.isMarketCapPresent = async function(){
        return marketCap.isPresent();
    }

  
  }

  
  module.exports = new QuotePage();