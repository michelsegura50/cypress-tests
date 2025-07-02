const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports/mochawesome-report',
    overwrite: false,
    html: true,
    json: true
  },
  e2e: {
    setupNodeEvents(on, config) {
      // Aquí puedes agregar futuros eventos si quieres
    },
    // Opcionalmente puedes definir baseUrl, etc.
    // baseUrl: 'http://localhost:3000'
  }
});
