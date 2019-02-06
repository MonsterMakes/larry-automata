'use strict';
const chai = require('chai');
const should = chai.should(); // eslint-disable-line 
const expect = chai.expect; // eslint-disable-line 

const TEST_NAME = 'Automaton';
const Automaton = require('../../src/Automaton');
describe(TEST_NAME, () => {
	it('should execute no steps',() => {
		let automaton = new Automaton();
		automaton.getStatus();
		automaton.execute();
		automaton.getStatus();
	});
});