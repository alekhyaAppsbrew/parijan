exports.config = {
seleniumServerJar: '/home/lakshmiy/Downloads/selenium-server-standalone-2.39.0.jar',
specs: [
'EtoE/tests_trial_1.js'
],

seleniumArgs: ['-browserTimeout=60'],
capabilities: {
    'browserName': 'firefox' // or 'safari'
},
baseUrl: 'http://localhost:3004/',
allScriptsTimeout: 30000
};
