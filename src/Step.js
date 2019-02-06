'use strict';
class Step{
	execute(){
		throw new Error('Must implement execute() to be of type "Step".');
	}
}
Step.$validation= {
}
module.exports=Step;