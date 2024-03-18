module.exports = {
	initActions: function () {
		let self = this;
		
		let actions = {}

		actions.goCue = {
			name: 'Play (cue)',
			options: [
				{
					type: 'textinput',
					label: 'Cue',
					id: 'cue',
					default: '',
					useVariables: true
				}
			],
			callback: async function (action) {
				let opt = action.options;
				let cue = await self.parseVariablesInString(opt.cue);
				self.sendCommand('/scs/cue/go', { type: "s", value: cue });
			}
		}

		actions.stopCue = {
			name: 'Stop (cue)',
			options: [
				{
					type: 'textinput',
					label: 'Cue',
					id: 'cue',
					default: '',
					useVariables: true
				}
			],
			callback: async function (action) {
				let opt = action.options;
				let cue = await self.parseVariablesInString(opt.cue);
				self.sendCommand('/scs/cue/stop', { type: "s", value: cue });
			}
		}

		actions.pauseCue = {
			name: 'Pause / Resume (cue)',
			options: [
				{
					type: 'textinput',
					label: 'Cue',
					id: 'cue',
					default: '',
					useVariables: true
				}
			],
			callback: async function (action) {
				let opt = action.options;
				let cue = await self.parseVariablesInString(opt.cue);
				self.sendCommand('/scs/cue/pauseresume', { type: "s", value: cue });
			}
		}

		actions.gotoCue = {
			name: 'Goto (cue)',
			options: [
				{
					type: 'textinput',
					label: 'Cue',
					id: 'cue',
					default: '',
					useVariables: true
				}
			],
			callback: async function (action) {
				let opt = action.options;
				let cue = await self.parseVariablesInString(opt.cue);
				self.sendCommand('/scs/ctrl/gotocue', { type: "s", value: cue });
			}
		}

		actions.hkGo = {
			name: 'Activate Hotkey',
			options: [
				{
					type: 'textinput',
					label: 'Hot Key',
					id: 'hk',
					default: '',
					useVariables: true
				}
			],
			callback: async function (action) {
				let opt = action.options;
				let hk = await self.parseVariablesInString(opt.hk);
				self.sendCommand('/scs/hkey/go', { type: "s", value: hk });
			}
		}

		actions.hkOn = {
			name: 'Activate Note on Hotkey',
			options: [
				{
					type: 'textinput',
					label: 'note',
					id: 'hk',
					default: '',
					useVariables: true
				}
			],
			callback: async function (action) {
				let opt = action.options;
				let hk = await self.parseVariablesInString(opt.hk);
				self.sendCommand('/scs/hkey/on', { type: "s", value: hk });
			}
		}

		actions.hkOff = {
			name: 'Deactivate Hotkey',
			options: [
				{
					type: 'textinput',
					label: 'Hot Key',
					id: 'hk',
					default: '',
					useVariables: true
				}
			],
			callback: async function (action) {
				let opt = action.options;
				let hk = await self.parseVariablesInString(opt.hk);
				self.sendCommand('/scs/hkey/off', { type: "s", value: hk });
			}
		}

		actions.mfader = {
			name: 'Set level on Master fader',
			options: [
				{
					type: 'textinput',
					label: 'Level in dB',
					id: 'fad',
					default: '',
					useVariables: true
				}
			],
			callback: async function (action) {
				let opt = action.options;
				let fad = parseFloat(await self.parseVariablesInString(opt.fad));
				self.sendCommand('/scs/fader/setmaster', { type: "f", value: fad });
			}
		}

		actions.go = {
			name: 'Go',
			callback: async function () {
				self.sendCommand('/scs/ctrl/go');
			}
		}

		actions.pauseall = {
			name: 'Pause / Resume all',
			callback: async function () {
				self.sendCommand('/scs/ctrl/pauseresumeall');
			}
		}

		actions.stopall = {
			name: 'Stop all',
			callback: async function () {
				self.sendCommand('/scs/ctrl/stopall');
			}
		}

		actions.fadeall = {
			name: 'Fade all',
			callback: async function () {
				self.sendCommand('/scs/ctrl/fadeall');
			}
		}

		actions.top = {
			name: 'Goto Top of cuelist',
			callback: async function () {
				self.sendCommand('/scs/ctrl/gotop');
			}
		}

		actions.bottom = {
			name: 'Goto End of cuelist',
			callback: async function () {
				self.sendCommand('/scs/ctrl/gotoend');
			}
		}

		actions.previous = {
			name: 'Goto Previous cue in playlist',
			callback: async function () {
				self.sendCommand('/scs/ctrl/goback');
			}
		}

		actions.next = {
			name: 'Goto Next cue in playlist',
			callback: async function () {
				self.sendCommand('/scs/ctrl/gotonext');
			}
		}

		self.setActionDefinitions(actions);
	}
}