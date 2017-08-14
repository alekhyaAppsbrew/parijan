protractor_coverage: {
    options: {
        configFile: 'protractor.config.js', // Default config file
        keepAlive: true, // If false, the grunt process stops when the test fails.
        noColor: false, // If true, protractor will not use colors in its output.
        coverageDir: '<%= dirs.instrumentedE2E %>',
        args: {}
    },
    firefox: {
        options: {
            args: {
                baseUrl: 'http://localhost:3004/',
                // Arguments passed to the command
                'browser': 'firefox'
            }
        }
    }
},
