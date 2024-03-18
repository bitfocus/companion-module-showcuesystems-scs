const { InstanceBase, InstanceStatus, runEntrypoint } = require('@companion-module/base')

const UpgradeScripts = require('./src/upgrades');

const configFields = require('./src/configFields');
const actions = require('./src/actions');
const feedbacks = require('./src/feedbacks');
const variables = require('./src/variables');

const api = require('./src/api');

class SCSInstance extends InstanceBase {
	constructor(internal) {
		super(internal)

		this.INTERVAL = null;
		this.boolValue = false; //this will get flipped every time the interval runs

		// Assign the methods from the listed files to this class
		Object.assign(this, {
			...configFields,
			...actions,
			...feedbacks,
			...variables,
			...api,
		})
	}

	async init(config) {
		this.updateStatus(InstanceStatus.Connecting);
		this.configUpdated(config);
	}

	async configUpdated(config) {
		if (config) {
			this.config = config
		}

		this.initActions();
		this.initFeedbacks();
		this.initVariables();

		this.updateStatus(InstanceStatus.Ok);
	}

	async destroy() {
		//close out any connections
		this.stopInterval();
	}
}

runEntrypoint(SCSInstance, UpgradeScripts)