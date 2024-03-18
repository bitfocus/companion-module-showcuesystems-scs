const { combineRgb } = require('@companion-module/base')

module.exports = {
    initFeedbacks() {
        let self = this;
        const feedbacks = {};

		const foregroundColor = combineRgb(255, 255, 255) // White
        const backgroundColorRed = combineRgb(255, 0, 0) // Red

        self.setFeedbackDefinitions(feedbacks);
    }
}