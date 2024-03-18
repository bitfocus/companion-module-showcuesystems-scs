const { InstanceStatus } = require('@companion-module/base')

module.exports = {
	sendCommand: function(cmd, arg = null) {
		let self = this;

		if (arg === null) {
			self.oscSend(self.config.host, self.config.port, cmd, []);
		}
		else {
			self.oscSend(self.config.host, self.config.port, cmd, [arg]);
		}
	}
}