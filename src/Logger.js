'use strict';

const CoreLogger = require('@monstermakes/larry-logger');
const componentName='larry-automata';
const logger = CoreLogger.getConsoleLogger(componentName,'trace');

class Logger{
	static getInstance(){
		return logger;
	}
}
module.exports=Logger;