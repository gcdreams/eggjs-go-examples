module.exports = appInfo => {
 
  const config = exports = {}

  config.cluster = {
    listen: {
      port: 7001,
      hostname: '127.0.0.1',
    }
  }

  return config
}
