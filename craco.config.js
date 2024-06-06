const MillionCompiler = require('@million/lint');
 
module.exports = {
  plugins: [MillionCompiler.craco({ legacyHmr: true })],
};