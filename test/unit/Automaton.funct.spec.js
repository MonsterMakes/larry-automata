'use strict';
const chai = require('chai');
const should = chai.should(); // eslint-disable-line 
const expect = chai.expect; // eslint-disable-line 

const TEST_NAME = 'Automaton';
const Automaton = require('../../src/Automaton');
describe(TEST_NAME, () => {
	it('should execute no steps',() => {
		let automaton = new Automaton();
		automaton.getStatus().should.eql('READY');
		automaton.execute()
			.then(()=>{
				automaton.getStatus().should.eql('EXECUTION_COMPLETE');
			});
	});
	it('should execute a step',() => {
		let count = 0;
		function increment(){
			count++;
		}
		let automaton = new Automaton({
			stepDefinitions: {
				step1: {
					funct: increment
				}
			}
		});
		automaton.getStatus().should.eql('READY');
		count.should.eql(0);
		automaton.execute()
			.then(()=>{
				automaton.getStatus().should.eql('EXECUTION_COMPLETE');
				count.should.eql(1);
			});
	});
	it('should execute multiple steps',() => {
		let count = 0;
		function increment(){
			count++;
		}
		let automaton = new Automaton({
			stepDefinitions: {
				step1: {
					funct: increment
				},
				step2: {
					funct: increment
				}
			}
		});
		automaton.getStatus().should.eql('READY');
		count.should.eql(0);
		automaton.execute()
			.then(()=>{
				automaton.getStatus().should.eql('EXECUTION_COMPLETE');
				count.should.eql(2);
			});
	});
	it.only('should execute a single asynchronous step',() => {
		let count = 0;
		function increment(){
			return new Promise((resolve,reject)=>{
				try{
					setTimeout(()=>{
						count++;
						resolve();
					},300);
				}
				catch(e){
					reject(e);
				}
			});
		}
		let automaton = new Automaton({
			stepDefinitions: {
				step1: {
					funct: increment
				}
			}
		});
		automaton.getStatus().should.eql('READY');
		count.should.eql(0);
		return automaton.execute()
			.then(()=>{
				automaton.getStatus().should.eql('EXECUTION_COMPLETE');
				count.should.eql(1);
			});
	});
	it('should execute multiple asynchronous steps',() => {
		let count = 0;
		function increment(){
			return new Promise((resolve,reject)=>{
				try{
					setTimeout(()=>{
						count++;
						resolve();
					},300);
				}
				catch(e){
					reject(e);
				}
			});
		}
		let automaton = new Automaton({
			stepDefinitions: {
				step1: {
					funct: increment
				},
				step2: {
					funct: increment
				}
			}
		});
		automaton.getStatus().should.eql('READY');
		count.should.eql(0);
		return automaton.execute()
			.then(()=>{
				automaton.getStatus().should.eql('EXECUTION_COMPLETE');
				count.should.eql(2);
			});
	});
});