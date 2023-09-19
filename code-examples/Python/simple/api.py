import requests
import hmac
import hashlib
import base64
import time

API_HOST = "https://seller.grip.show"
SERVICE_ID = "YOUR_SERVICE_ID"
ACCESS_KEY = "YOUR_ACCESS_KEY"
SECRET_KEY = "YOUR_SECRET_KEY"


def send_http_request(method, fingerprint, api_path, timestamp):
    uri = f"{API_HOST}{api_path}"
    headers = {
        'X-ServiceId': SERVICE_ID,
        'X-AccessKey': ACCESS_KEY,
        'X-Fingerprint': fingerprint,
        'X-Fingerprint-Timestamp': str(timestamp),
    }
    response = requests.request(method, uri, headers=headers)
    return response


def generate_fingerprint(method, api_path, timestamp):
    message = f"{method} {api_path}\n{timestamp}\n{ACCESS_KEY}"
    signing_key = bytes(SECRET_KEY, 'utf-8')
    hmac_obj = hmac.new(signing_key, message.encode('utf-8'), hashlib.sha256)
    encoded_signature = base64.b64encode(hmac_obj.digest()).decode('utf-8')
    return encoded_signature


def api_client():
    timestamp = int(time.time() * 1000)  # Convert to milliseconds
    fingerprint = generate_fingerprint(
        'GET',
        '/api/product/category',
        timestamp
    )
    response = send_http_request(
        'GET',
        fingerprint,
        '/api/product/category',
        timestamp
    )
    return response


if __name__ == "__main__":
    response = api_client()
    if response.status_code == 200:
        print(response.json())
    else:
        print(f"HTTP Error: {response.status_code}")

