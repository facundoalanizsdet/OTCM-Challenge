const  navigationHelper = require('../helpers/navigationHelper');

var SecurityDetailsPage = function() {

    var marketCap = $$("._8AXJn4ourf.sc-htpNat.jtWIOA.sc-bdVaJa.gRrvFh").first().$(".sc-bdVaJa.kYmYWE");
    var date = $(".sc-bdVaJa.fKInnm");
    this.NavigationHelper = navigationHelper;

    this.getInfoFromMarketCap = async function(){
        await this.NavigationHelper.waitForElement(marketCap);
        return marketCap.getText();
    }  
    
    this.getInfoFromDate = async function(){
        await this.NavigationHelper.waitForElement(date);
        return date.getText();
    } 
  
  }

  
  module.exports = new SecurityDetailsPage();