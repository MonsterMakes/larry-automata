'use strict';
const Execution = require('./Execution');
const log = (require('./Logger')).getInstance();
const _ = require('lodash');

const STATUS = {
	UNKNOWN:'UNKNOWN',
	INITIALIZING: 'INITIALIZING',
	READY: 'READY',
	EXECUTING_STEPS: 'EXECUTING_STEPS',
	EXECUTION_COMPLETE: 'EXECUTION_COMPLETE',
	EXECUTION_FAILED: 'EXECUTION_FAILED'
};
Object.freeze(STATUS);

let StepDefinition = {
	klass: require('./Step'), // must always be of type step
	injectables: {}, 
	//if $injectables id specified in the class these will override
	
	//if a $order property is provided in the injectables then that will be used instead of the object property order
	funct: ()=>{}, //optional function instead of class
	
	input: [], //optional array of values to pass to the execute() or funct
	validationRules: {}, //optional jsonSchema object to define validation rules of the input
	next: '', //optional name of the next step
};
//
class Automaton extends Execution{
	constructor(options={}){
		super();
		this._setStatus(this.STATUS_STATES.INITIALIZING);
//this._cache = _.get(options,'cache', new Cache());
		this._stepDefinitions = _.get(options,'stepDefinitions', {});
		this._currentStep = null;
		this._nextStepOverride = null;
		this._setStatus(this.STATUS_STATES.READY);
	}
	/*************************************************************************************/
	/* START PRIVATE METHODS */
	/*************************************************************************************/
	_setStatus(status){
		if(this.STATUS_STATES.hasOwnProperty(status)){      
			this._status = status;
		}
		else{
			throw new Error(`Unknown Status, cannot set the status of the Injectable to ${status}`);
		}
	}
	_moveToNextStep(){
		let stepOrder = _.get(this._stepDefinitions,'$order',Object.keys(this._stepDefinitions));
		if(this._nextStepOverride){
			this._currentStep = this._nextStepOverride;
			this._nextStepOverride = null;
		}
		else{
			let currentIndex = 0;
			if(this._currentStep === null){
				this._currentStep = stepOrder[currentIndex] || null;
				this._nextStepOverride = null;
			}
			else{
				currentIndex = stepOrder.indexOf(this._currentStep);
				let nextIndex = currentIndex + 1;
				//Execution is complete
				if(nextIndex >  stepOrder.length - 1){
					this._currentStep = null;
					this._nextStepOverride = null;
				}
				else{
					this._currentStep = stepOrder[nextIndex];
					this._nextStepOverride = null;
				}
			}
		}
		if(this._currentStep && !this._stepDefinitions.hasOwnProperty(this._currentStep)){
			throw new Error(`Cannot move to step (${this._nextStepOverride}), this step does not exist.`);
		}
	}
	_executeNext(){
		this._moveToNextStep();
		if(this._currentStep){
			return Promise.resolve()
				.then(()=>{
					let stepDef = this._stepDefinitions[this._currentStep];
					if(stepDef.hasOwnProperty('klass')){
						return Promise.reject('not yet implemented');
					}
					else if(stepDef.hasOwnProperty('funct')){
						//TODO
						let args = [];
						return stepDef.funct.apply(this,args);
					}
				})
				.catch(err=>{
					//TODO update results based on failure
					return Promise.reject(err);
				})
				.then(()=>{
					//TODO after each step is executed calculate the diff and save it off 
				})
				.then(()=>{
					return this._executeNext();
				});
		}
		//Execution is complete
		else{
			return Promise.resolve();
		}
		
	}
	/*************************************************************************************/
	/* END PRIVATE METHODS */
	/* START PUBLIC API METHODS */
	/*************************************************************************************/
	get STATUS_STATES(){
		return STATUS;
	}
	getStatus(){
		return this._status;
	}
	overrideNext(stepName){
		this._nextStepOverride = stepName;
	}
	removeStep(name){

	}
	addStep(step){
		//TODO validate stepDefinition
	}
	setSteps(steps){
		//TODO validate stepDefinitions
		this._stepDefinitions = steps;
	}
	execute(){
		return Promise.resolve()
			//start listening on port 8080 and register all the common listeners
			.then(()=>{
				//Check if its already started
				switch(this.getStatus()){
				case this.STATUS_STATES.EXECUTING_STEPS:
					return this._executingProm;
				default:
					this._setStatus(this.STATUS_STATES.EXECUTING_STEPS);
					this._executingProm = Promise.resolve()
						.then(()=>{
							return this._executeNext();
						})
						.then(()=>{
							this._setStatus(this.STATUS_STATES.EXECUTION_COMPLETE);
						})
						.catch((e)=>{
							log.error({error:e},`Automaton (${this.constructor.name}) failed during execution.`);
							this._setStatus(this.STATUS_STATES.EXECUTION_FAILED);
							return Promise.reject(e);
						});
					return this._executingProm;
				}
			});
	}
	/*************************************************************************************/
	/* END PUBLIC API METHODS */
	/*************************************************************************************/
}
module.exports=Automaton;