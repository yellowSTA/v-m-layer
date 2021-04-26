const devConfig = require('./config/config.dev');
const buildConfig = require('./config/config.build');
module.exports = process.env.NODE_ENV === 'production' ? buildConfig : devConfig;