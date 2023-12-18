from enum import Enum
from dotenv import load_dotenv
import os
import requests
import hmac
import hashlib
import base64
import time
import json
from requests_toolbelt import MultipartEncoder


class HttpMethod(Enum):
    GET = "GET"
    POST = "POST"
    DELETE = "DELETE"
    PUT = "PUT"


load_dotenv()
API_HOST = os.getenv('API_HOST')
SERVICE_ID = os.getenv('SERVICE_ID')
ACCESS_KEY = os.getenv('ACCESS_KEY')
SECRET_KEY = os.getenv('SECRET_KEY')


def load_json(file_path):
    with open(file_path, 'r') as file:
        return json.load(file)


product_data = load_json('./data/product.json')
order_keys_data = load_json('./data/order_keys.json')
delivery_shipping_data = load_json('./data/delivery_shipping.json')
API_LIST = [
    {'title': '카테고리 목록', 'path': '/api/product/category',
        'method': HttpMethod.GET.value},
    {'title': '상품정보 제공고시 목록', 'path': '/api/product/legal',
        'method': HttpMethod.GET.value},
    {'title': '인증 정보 목록', 'path': '/api/product/cert',
        'method': HttpMethod.GET.value},
    {'title': '모델 목록', 'path': '/api/product/model', 'method': HttpMethod.GET.value},
    {'title': '브랜드 목록', 'path': '/api/product/brand', 'method': HttpMethod.GET.value},
    {'title': '제조사 목록', 'path': '/api/product/manufacturer',
        'method': HttpMethod.GET.value},
    {'title': '상품 등록', 'path': '/api/product',
        'method': HttpMethod.POST.value, 'data': product_data},
    # TODO: if a user wants to start selling a product, it needs to get an input of the product code.
    {'title': '상품 판매 시작', 'path': '/api/product/q3xmypxq/start',
        'method': HttpMethod.PUT.value},
    {'title': '발주(접수)가 필요한 주문 개수', 'path': '/api/delivery/prepare/count',
     'method': HttpMethod.GET.value},
    {'title': '발주(접수)할 주문 목록', 'path': '/api/delivery/prepare',
     'method': HttpMethod.GET.value},
    {'title': '발주(접수) 요청', 'path': '/api/delivery/prepare/result',
     'method': HttpMethod.PUT.value, 'data': order_keys_data},
    {'title': '발송이 필요한 주문 목록', 'path': '/api/delivery/start',
        'method': HttpMethod.GET.value},
    {'title': '택배회사 목록', 'path': '/api/delivery/company',
        'method': HttpMethod.GET.value},
    {'title': '택배 정보 설정', 'path': '/api/delivery/shipping/result',
        'method': HttpMethod.PUT.value, 'data': delivery_shipping_data},
    {'title': '발송 요청', 'path': '/api/delivery/start/result',
        'method': HttpMethod.PUT.value, 'data': order_keys_data},
    {'title': '배송(사용) 현황 확인이 가능한 주문 목록',
     'path': '/api/delivery/status/count', 'method': HttpMethod.GET.value}
]


def generate_timestamp():
    return int(time.time() * 1000)


def send_http_request(method, fingerprint, api_path, timestamp, data=None):
    uri = f"{API_HOST}{api_path}"
    print(f'\nSending a request to {uri}...\n')
    headers = generate_headers(fingerprint, timestamp)
    response = requests.request(method, uri, headers=headers, json=data)
    return response


def generate_fingerprint(method, api_path, timestamp):
    message = f"{method} {api_path}\n{timestamp}\n{ACCESS_KEY}"
    signing_key = bytes(SECRET_KEY, "utf-8")
    hmac_obj = hmac.new(signing_key, message.encode("utf-8"), hashlib.sha256)
    encoded_signature = base64.b64encode(hmac_obj.digest()).decode("utf-8")
    return encoded_signature


def generate_headers(fingerprint, timestamp):
    headers = {
        "X-ServiceId": SERVICE_ID,
        "X-AccessKey": ACCESS_KEY,
        "X-Fingerprint": fingerprint,
        "X-Fingerprint-Timestamp": str(timestamp),
    }
    return headers


def api_client(api_path, method, data=None):
    timestamp = generate_timestamp()
    fingerprint = generate_fingerprint(
        method,
        api_path,
        timestamp
    )
    response = send_http_request(
        method,
        fingerprint,
        api_path,
        timestamp,
        data
    )
    return response


def upload_image():
    api_path = "/api/product/image"
    timestamp = generate_timestamp()
    fingerprint = generate_fingerprint(
        "POST",
        api_path,
        timestamp
    )
    uri = f"{API_HOST}{api_path}"
    headers = generate_headers(fingerprint, timestamp)
    current_directory = os.getcwd()
    image_path = os.path.join(current_directory, "sample.jpg")
    fields = {"image": ("sample.jpg", open(image_path, "rb"), "image/jpeg")}
    multipart_data = MultipartEncoder(fields=fields)
    headers["Content-Type"] = multipart_data.content_type
    response = requests.post(uri, data=multipart_data, headers=headers)
    return response


def replace_image_urls(json_data):
    product_data['previewImageUrls'][0] = json_data['image']
    product_data['detailImageUrls'][0] = json_data['image']

    with open('./data/product.json', 'w') as file:
        json.dump(product_data, file, indent=4, ensure_ascii=False)


def request_api(api_path, api_title, method, data=None):
    response = api_client(api_path, method, data)
    print(f"[{api_title}]")
    print(f"HTTP Status Code: {response.status_code}")
    parsed_json = response.json()
    print('Response:')
    print(json.dumps(parsed_json, indent=4, ensure_ascii=False))
    print('\n')


def display_menu():
    print("This program sends Grip Seller API requests to a selected environment.\n")
    for i, entry in enumerate(API_LIST):
        title = entry.get('title')
        method = entry.get('method')
        no = i + 1
        print(f'{no}. {title} ({method})')
    print('\n')
    choice = input("Choose a number ('q' to quit or 'i' to upload an image): ")
    return choice


if __name__ == "__main__":
    while True:
        user_choice = display_menu()

        if user_choice.lower() == 'q':
            print('Terminating the program...')
            break
        elif user_choice.isdigit():
            i = int(user_choice) - 1
            if 0 <= i < len(API_LIST):
                entry = API_LIST[i]
                title = entry['title']
                path = entry['path']
                method = entry['method']
                data = API_LIST[i]['data'] if 'data' in API_LIST[i] else None
                request_api(path, title, method, data)
        elif user_choice.lower() == 'i':
            response = upload_image()
            if response.status_code == 200:
                replace_image_urls(response.json())
