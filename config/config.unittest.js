module.exports = appInfo => {
 
  const config = exports = {}
  config.cluster = {
    listen: {
      port: 7001,
      hostname: '0.0.0.0',
    }
  }

  return config
}


