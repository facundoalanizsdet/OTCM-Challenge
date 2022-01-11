 NavigationHelper = function() {

  this.waitForElement = async function(element,errorMessage) {
    let until = protractor.ExpectedConditions;
    await browser.wait(until.presenceOf(element), 30000, errorMessage);
  };

  this.goToUrl = async function(url){
    return await browser.get(url);
  }
  
} 
module.exports = new NavigationHelper();