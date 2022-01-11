var moment = require('moment');
var logger = require('winston');
 require('winston-udp').UDP;

 var logLevels = {
  levels: {
    info: 0,
    warn: 1,
    error: 2,
  },
  colors: {
    info: 'grey',
    warn: 'yellow',
    error: 'red',
  }
};

var logStringformatter = function(options){
  return options.timestamp() + ' [' +
    options.level.toUpperCase() +'] ' +
    (undefined !== options.message ? options.message : '') +
    (options.meta && Object.keys(options.meta).length ? '\n\t' +
    JSON.stringify(options.meta) : '' );
};

var timestampFormat = function(){
  return moment().utcOffset(0).format('YYYY-MM-DD HH:mm:ss,SSS');
};

 var options = {
   name: "udplog",
   level: "info",
   server: "log.ic.despegar.it",
   handleExceptions: true,
   json: false,
   port: "41020",
   timestamp: function() {
     return timestampFormat();
   },
   formatter: function(options) {
     return logStringformatter(options);
   }
 };

 var optionsFile = {
   name: "filelog",
   level: "info",
   filename: "./reports/OTCM-bot.log",
   json: false,
   timestamp: function() {
     return timestampFormat();
   },
   formatter: function(options) {
     return logStringformatter(options);
   }
 };

 var optionsConsole = {
   name: "consolelog",
   level: "info",
   levels: logLevels.levels,
   json: false,
   timestamp: function(){
     return "";
   },
   formatter: function(options) {
     return logStringformatter(options);
   }
 };

 logger.addColors(logLevels.colors);
 logger.remove(logger.transports.Console);
 logger.add(logger.transports.Console, optionsConsole);
 //logger.add(logger.transports.UDP, options);
 logger.add(logger.transports.File, optionsFile);
 logger.exitOnError = false;
 global.logger = logger;
