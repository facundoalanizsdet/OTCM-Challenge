const  navigationHelper = require('../helpers/navigationHelper');

var HomePage = function() {
    var url = 'http://www.otcmarkets.com';
    var searchBox = $("[placeholder='Quote']");
    var dropdownElement = $(".n25xwbL2W3.sc-bdVaJa.gRrvFh");

    this.NavigationHelper = navigationHelper;     


      
    this.getUrl = function(){
        return url;
    };

    this.clickSearchBox = function(){
        searchBox.click();
    };

    this.searchByKeyword = async function(keyword){
        await searchBox.sendKeys(keyword);
    };

    this.searchAndGetResults = async function(keyword){
        this.clickSearchBox();
        await this.searchByKeyword(keyword);
        await this.NavigationHelper.waitForElement(dropdownElement);
        dropdownElement.click()
        // wait for company name element to be present to be sure navigation is correct
        await this.NavigationHelper.waitForElement($('._2D4XgQ0gJK'));
        await this.NavigationHelper.waitForElement($('._1rzoYNl62n'));

    }
  
  }
  
  module.exports = new HomePage();