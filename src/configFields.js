const { Regex } = require('@companion-module/base')

module.exports = {
	getConfigFields() {
		return [
			{
				type: 'static-text',
				id: 'info',
				width: 12,
				label: 'Information',
				value: `This module controls SCS by <a href="https://www.showcuesystems.com/cms/" target="_new">Show Cue Systems</a>.`
			},
			{
				type: 'textinput',
				id: 'host',
				label: 'Target IP',
				width: 6,
				tooltip: 'The IP of the computer running SCS',
				regex: Regex.IP
			},
			{
				type: 'textinput',
				id: 'port',
				label: 'Target port',
				width: 6,
				tooltip: 'The Port of the computer running SCS',
				regex: Regex.PORT
			}
		]
	},
}