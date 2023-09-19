import { Buffer } from 'node:buffer'
import crypto from 'crypto'
import fetch from 'node-fetch'

const ACCESS_KEY = 'YOUR_ACCESS_KEY'
const SECRET_KEY = 'YOUR_SECRET_KEY'
const SERVICE_ID = 'YOUR_SERVICE_ID'
const API_HOST = 'https://seller.grip.show'
const ApiPaths = {
  PRODUCT_CATEGORY: '/api/product/category',
  PRODUCT_IMAGE: '/api/product/image',
}
const HttpMethods = {
  GET: 'GET',
}

const sendHttpRequest = async (method, fingerprint, apiPath, timestamp) => {
  const uri = `${API_HOST}${apiPath}`
  const headers = {
    'X-ServiceId': SERVICE_ID,
    'X-AccessKey': ACCESS_KEY,
    'X-Fingerprint': fingerprint,
    'X-Fingerprint-Timestamp': timestamp,
  }
  const response = await fetch(uri, {
    method,
    headers,
  })
  return response
}

const generateFingerprint = (method, apiPath, timestamp) => {
  const message = `${method} ${apiPath}\n${timestamp}\n${ACCESS_KEY}`
  const signingKey = Buffer.from(SECRET_KEY, 'utf-8')
  const hmac = crypto.createHmac('sha256', signingKey)
  hmac.update(message, 'utf-8')
  const encodeBase64String = hmac.digest('base64')
  return encodeBase64String
}

export const apiClient = async () => {
  const timestamp = Date.now()
  const fingerprint = generateFingerprint(
    HttpMethods.GET,
    ApiPaths.PRODUCT_CATEGORY,
    timestamp
  )
  const response = await sendHttpRequest(
    HttpMethods.GET,
    fingerprint,
    ApiPaths.PRODUCT_CATEGORY,
    timestamp
  )
  return response
}

