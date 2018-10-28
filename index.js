var instance_skel = require('../../instance_skel');
var debug;
var log;

function instance(system, id, config) {
	var self = this;
	// super-constructor
	instance_skel.apply(this, arguments);
	self.actions(); // export actions
	return self;
}

instance.prototype.updateConfig = function(config) {
	var self = this;

	self.config = config;
};

instance.prototype.init = function() {
	var self = this;
	self.status(self.STATE_OK); // report status ok!
	debug = self.debug;
	log = self.log;
};

// Return config fields for web config
instance.prototype.config_fields = function () {
	var self = this;
	return [
		{
			type: 'text',
			id: 'info',
			width: 12,
			label: 'Information',
			value: 'This module controls SCS by <a href="https://www.showcuesystems.com/cms/" target="_new">Show Cue Systems</a>.'
		},
		{
			type: 'textinput',
			id: 'host',
			label: 'Target IP',
			width: 6,
			tooltip: 'The IP of the computer running SCS',
			regex: self.REGEX_IP
		},
		{
			type: 'textinput',
			id: 'port',
			label: 'Target port',
			width: 6,
			tooltip: 'The Port of the computer running SCS',
			regex: self.REGEX_PORT
		}
	]
};

// When module gets deleted
instance.prototype.destroy = function() {
	var self = this;
	debug("destory", self.id);;
};

instance.prototype.actions = function(system) {
	var self = this;
	self.system.emit('instance_actions', self.id, {

		'goCue':	{
			label: 'Play (cue)',
			options: [
				{
					type: 'textinput',
					label: 'Cue',
					id: 'cue',
					default: ""
				}
			]
		},

		'stopCue':	{
			label: 'Stop (cue)',
			options: [
				{
					type: 'textinput',
					label: 'Cue',
					id: 'cue',
					default: ""
				}
			]
		},

		'pauseCue':	{
			label: 'Pause / Resume (cue)',
			options: [
				{
					type: 'textinput',
					label: 'Cue',
					id: 'cue',
					default: ""
				}
			]
		},

		'gotoCue':	{
			label: 'Goto (cue)',
			options: [
				{
					type: 'textinput',
					label: 'Cue',
					id: 'cue',
					default: ""
				}
			]
		},

		'hkGo':	{
			label: 'Activate Hotkey',
			options: [
				{
					type: 'textinput',
					label: 'Hot Key',
					id: 'hk',
					default: ""
				}
			]
		},

		'hkOn':	{
			label: 'Activate Note on Hotkey',
			options: [
				{
					type: 'textinput',
					label: 'note',
					id: 'hk',
					default: ""
				}
			]
		},

		'hkOff':	{
			label: 'deactivate Hotkey',
			options: [
				{
					type: 'textinput',
					label: 'Hot Key',
					id: 'hk',
					default: ""
				}
			]
		},

		'mfader':	{
			label: 'Set level on Master fader',
			options: [
				{
					type: 'textinput',
					label: 'Level in dB',
					id: 'fad',
					regex: self.REGEX_FLOAT
				}
			]
		},

		'go':       { label: 'Go' },
		'pause':    { label: 'Pause / Resume all' },
		'stop':     { label: 'Stop' },
		'stopall':  { label: 'Stop all' },
		'top':      { label: 'Goto Top of cuelist' },
		'previous': { label: 'Goto Previous cue in playlist' },
		'next':     { label: 'Goto Next cue in playlist' }

	});
}

instance.prototype.action = function(action) {

	var self = this;
	var opt = action.options;
	var cmd;
	var arg;

	switch (action.action) {

		case 'goCue':

			arg = {
				type: "s",
				value: opt.cue
			}

			cmd = '/scs/cue/go';
			break;

		case 'stopCue':

			arg = {
				type: "s",
				value: opt.cue
			}

			cmd = '/scs/cue/stop';
			break;

		case 'pauseCue':

			arg = {
				type: "s",
				value: opt.cue
			}

			cmd = '/scs/cue/pauseresume';
			break;

		case 'gotoCue':

			arg = {
				type: "s",
				value: opt.cue
			}

			cmd = '/scs/ctrl/goto';
			break;

		case 'go':

			arg = null
			cmd = '/scs/ctrl/go';
			break;

		case 'pauseall':

			arg = null
			cmd = '/scs/ctrl/pauseresumeall';
			break;

		case 'stopall':

			arg = null
			cmd = '/scs/ctrl/stopall';
			break;

		case 'top':

			arg = null
			cmd = '/scs/ctrl/gotop';
			break;

		case 'previous':

			arg = null
			cmd = '/scs/ctrl/goback';
			break;

		case 'next':

			arg = null
			cmd = '/scs/ctrl/gotonext';
			break;

		case 'hkGo':

			arg = {
				type: "s",
				value: opt.hk
			}
			cmd = '/scs/hkey/go';
			break;

		case 'hkOn':

			arg = {
				type: "s",
				value: opt.hk
			}
			cmd = '/scs/hkey/on';
			break;

		case 'hkOff':

			var arg = {
				type: "s",
				value: opt.hk
			}
			cmd = '/scs/hkey/off';
			break;

		case 'mfader':

			arg = {
				type: "f",
				value: opt.fad
			}
			cmd = '/scs/fader/setmaster';
			break;

	};

	if (cmd !== undefined && arg !== null)  {
		debug('sending',cmd,arg,"to",self.config.host);
		self.system.emit('osc_send', self.config.host, self.config.port, cmd, [arg])
	}

	else if (cmd !== undefined && arg == null)  {
		debug('sending',cmd,"to",self.config.host);
		self.system.emit('osc_send', self.config.host, self.config.port, cmd, [])
	}

};

instance_skel.extendedBy(instance);
exports = module.exports = instance;
