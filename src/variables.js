module.exports = {
	initVariables: function () {
		let self = this;
		
		let variables = []
		self.setVariableDefinitions(variables);
	},

	checkVariables: function () {
		let self = this;

		try {
			variableValues = {};
			self.setVariableValues(variableValues);
		}
		catch(error) {
			self.log('error', 'Error setting Variables: ' + String(error))
			console.log(error);
		}
	}
}
