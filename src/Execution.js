'use strict';
const EventEmitter = require('events').EventEmitter;

class Execution extends EventEmitter{
	constructor(){
		super();
		this._results = {};
	}
	/*************************************************************************************/
	/* START PUBLIC API METHODS */
	/*************************************************************************************/
	getResults(){
		return this._results;
	}
	/*************************************************************************************/
	/* END PUBLIC API METHODS */
	/*************************************************************************************/
}
module.exports=Execution;