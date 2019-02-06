# @monstermakes/larry-automata

[![npm version](https://badge.fury.io/js/@monstermakes/larry-automata.svg)](https://badge.fury.io/js/@monstermakes/larry-automata)

[![https://nodei.co/npm/@monstermakes/larry-automata.png?downloads=true&downloadRank=true&stars=true](https://nodei.co/npm/@monstermakes/larry-automata.png?downloads=true&downloadRank=true&stars=true)](https://www.npmjs.com/package/@monstermakes/larry-automata)


## Description
This project gives the developer the ability to describe workflows or state machines in a simple and repeatable fashion. We are stealing concepts from the Nondeterministic finite automaton (NFA) state machine found in Automata Theory. Dont worry, the concepts are mostly around the terminology and the high level concept that we can move through the state machin in a non-determinstic type of way.

--- 

## Larry Automata Concepts

A Finite Automata consists of the following:

- Q : Finite set of states.
- Σ : set of Input Symbols.
- q : Initial state.
- F : set of Final States.
- Δ : Transition Function.

In a Larry Automata we deviate from these by combining States and Transition Functions and adding execution history to the Final States. Larry Automata encapsulates the initial input, a centralized cache, the states to be executed, the input for each state, and the history of all the previously executed states. The below sections will provide and overview of each of these concepts. 

### Execution
An Execution refers to the launch of one or more Automatons. 

A NFA includes the "final states", which describes how things ended up after execution, in our case we are just as interested in what happened as we are in what was the final result. Thus an Execution will keep track of the changes in the execution steps (Execution History) and the final results of the execution, this will be refered to as the "Execution Results".

### Step
A step combines the state, input symbols, and tranisiton function concepts in an NFA into one construct. A step declares its inputs (required and optional), defines the business logic to execute, produces outputs and has the ability to alter the flow of the execution.

### Automaton
An Automaton declaritively defines all of the steps and their order of execution, prior to a run. The key take away here is the during an execution each step can alter the available steps and the subsequent order of execution.  Therefore the Automaton is simply declaring the initial state machine but as things execute the Execution History is the most accurate definition of what the actual state machine end up as.

### Cache
During an Execution each state will want to access the current results (think of this as the output/results of previously executed states). The cache provides a mechanism for each of the states to share data and results from one stage of the execution to the next.

### Stages
When a step is executed everything that happened (changes to the steps, cache, inputs etc..) during that stage of the execution will be recorded in order in the Execution History as a "stage". These stages can be reviewed in subsequent steps or after execution concludes.

---

## Larry Automata Software Components
TODO

---

## Larry Automata User's Guide
TODO

---
## TODOs
- add Execution Results
- add Dependency Injection for step execution
- add an API around the Cache

---

## Idea Scratch pad
- What kind of hooks should we put in the Automaton???
	- prevent steps from continuing onNextStep
		- registered hooks vs event emitter and delay
