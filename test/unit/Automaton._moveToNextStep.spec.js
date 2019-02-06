'use strict';
const chai = require('chai');
const should = chai.should(); // eslint-disable-line 
const expect = chai.expect; // eslint-disable-line 

const TEST_NAME = 'Automaton.moveToNextStep';
const Automaton = require('../../src/Automaton');
describe(TEST_NAME, () => {
	it('should handle no steps',() => {
		let automaton = new Automaton();
		expect(automaton._currentStep).to.be.null;
		expect(automaton._nextStepOverride).to.be.null;
		automaton._moveToNextStep();
		expect(automaton._currentStep).to.be.null;
		expect(automaton._nextStepOverride).to.be.null;
	});
	it('should handle 1 step no $order',() => {
		let automaton = new Automaton({
			stepDefinitions:{
				step1: {}
			}
		});
		expect(automaton._currentStep).to.be.null;
		expect(automaton._nextStepOverride).to.be.null;
		automaton._moveToNextStep();
		expect(automaton._currentStep).to.be.eql('step1');
		expect(automaton._nextStepOverride).to.be.null;
		automaton._moveToNextStep();
		expect(automaton._currentStep).to.be.null;
		expect(automaton._nextStepOverride).to.be.null;
		
	});
	it('should handle multiple steps no $order',() => {
		let automaton = new Automaton({
			stepDefinitions:{
				step1: {},
				step2: {},
				step3: {}
			}
		});
		expect(automaton._currentStep).to.be.null;
		expect(automaton._nextStepOverride).to.be.null;
		automaton._moveToNextStep();
		expect(automaton._currentStep).to.be.eql('step1');
		expect(automaton._nextStepOverride).to.be.null;
		automaton._moveToNextStep();
		expect(automaton._currentStep).to.be.eql('step2');
		expect(automaton._nextStepOverride).to.be.null;
		automaton._moveToNextStep();
		expect(automaton._currentStep).to.be.eql('step3');
		expect(automaton._nextStepOverride).to.be.null;
		automaton._moveToNextStep();
		expect(automaton._currentStep).to.be.null;
		expect(automaton._nextStepOverride).to.be.null;
		
	});
	it('should handle multiple steps with $order',() => {
		let automaton = new Automaton({
			stepDefinitions:{
				step1: {},
				step2: {},
				step3: {},
				$order: ['step2','step1','step3']
			}
		});
		expect(automaton._currentStep).to.be.null;
		expect(automaton._nextStepOverride).to.be.null;
		automaton._moveToNextStep();
		expect(automaton._currentStep).to.be.eql('step2');
		expect(automaton._nextStepOverride).to.be.null;
		automaton._moveToNextStep();
		expect(automaton._currentStep).to.be.eql('step1');
		expect(automaton._nextStepOverride).to.be.null;
		automaton._moveToNextStep();
		expect(automaton._currentStep).to.be.eql('step3');
		expect(automaton._nextStepOverride).to.be.null;
		automaton._moveToNextStep();
		expect(automaton._currentStep).to.be.null;
		expect(automaton._nextStepOverride).to.be.null;
	});
	it('should handle bad $order',() => {
		let automaton = new Automaton({
			stepDefinitions:{
				step1: {},
				$order: ['not-there']
			}
		});
		expect(automaton._currentStep).to.be.null;
		expect(automaton._nextStepOverride).to.be.null;
		expect(()=>{
			automaton._moveToNextStep();
		}).to.throw();
	});
	it('should handle multiple steps no $order using override',() => {
		let automaton = new Automaton({
			stepDefinitions:{
				step1: {},
				step2: {},
				step3: {}
			}
		});
		expect(automaton._currentStep).to.be.null;
		expect(automaton._nextStepOverride).to.be.null;
		automaton.overrideNext('step3')
		automaton._moveToNextStep();
		expect(automaton._currentStep).to.be.eql('step3');
		expect(automaton._nextStepOverride).to.be.null;
		automaton._moveToNextStep();
		expect(automaton._currentStep).to.be.null;
		expect(automaton._nextStepOverride).to.be.null;
		
	});
	it('should handle multiple steps no $order using override',() => {
		let automaton = new Automaton({
			stepDefinitions:{
				step1: {},
				step2: {},
				step3: {},
				$order: ['step2','step1','step3']
			}
		});
		expect(automaton._currentStep).to.be.null;
		expect(automaton._nextStepOverride).to.be.null;
		automaton.overrideNext('step3')
		automaton._moveToNextStep();
		expect(automaton._currentStep).to.be.eql('step3');
		expect(automaton._nextStepOverride).to.be.null;
		automaton._moveToNextStep();
		expect(automaton._currentStep).to.be.null;
		expect(automaton._nextStepOverride).to.be.null;
	});
});