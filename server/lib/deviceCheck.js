require('dotenv').config()
const fs = require('fs')
const jwt = require('jsonwebtoken')
const {v4: uuidv4} = require('uuid')
const axios = require('axios')

const IS_PROD = process.env.ENVIRONMENT === 'prod'

const TEAM_ID = process.env.APPLE_TEAM_ID
const KEY_ID = process.env.APPLE_KEY_ID
const KEY_PATH = process.env.APPLE_DEVICE_CHECK_KEY_PATH

const DEVICE_CHECK_URL = IS_PROD ?
  'https://api.devicecheck.apple.com/v1/validate_device_token' :
  'https://api.development.devicecheck.apple.com/v1/validate_device_token'

const generateDeviceCheckJwtToken = async () => {
  const key = await fs.promises.readFile(KEY_PATH)
  return jwt.sign({}, key, {
    algorithm: 'ES256',
    keyid: KEY_ID,
    issuer: TEAM_ID,
  })
}

const doDeviceCheck = async (device_token) => {
  const jwtToken = await generateDeviceCheckJwtToken()

  const data = {
    device_token,
    transaction_id: uuidv4(),
    timestamp: Date.now(),
  }

  try {
    const res = await axios.post(DEVICE_CHECK_URL, data, {
      headers: {
        Authorization: `Bearer ${jwtToken}`
      }
    })
    return res.status
  } catch(e) {
    return e.response.status
  }
}

module.exports = {
  generateDeviceCheckJwtToken,
  doDeviceCheck,
}
