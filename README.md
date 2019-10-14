# Grip 판매자센터 API Guide
- Grip 판매자센터 API는 Grip에 연동하여 서비스를 제공하기 위한 서드파티 솔루션 사용자를 위한 API 입니다.
- RESTful API 형태의 표준 HTTP Request Method - GET, POST, PUT, DELETE 를 사용합니다.
- API 요청과 응답은 JSON Format 으로 되어 있습니다.

# 판매자센터 API 이용 신청하기
- 판매자센터 우상단에 있는 프로필을 클릭하여 API 사용을 시작합니다.
- 'SecretKey 신청'을 클릭하면 AccessKey와 SecretKey가 생성됩니다.
- SecretKey가 유출되면 'SecretKey 재발급'을 클릭하여 SecretKey를 새로 발급 받을 수 있습니다.
- AccessKey는 변경되지 않습니다.

# 사전 정보
- SecretKey : 판매자센터에서 발급 받은 SecretKey. API인증을 위한 Fingerprint를 만들때 사용.
- AccessKey : 판매자센터에서 발급 받은 AccessKey.
- API host : 개발서버(https://dev-seller.grip.show), 리얼서버(https://seller.grip.show)
 
# HTTP 응답 코드
- HTTP 응답 코드는 성공인 경우에는 200이고 실패인 경우에는 500입니다. 실패인 경우에는 응답 결과의 message에 실패사유가 내려갑니다.

# API 호출하기
- Grip 판매자센터 API를 통해서 상품 관리, 주문/반품/교환 조회, 배송 관리, 1:1문의 관리, 리뷰 관리를 할 수 있습니다.
- 이미지 업로드를 제외한 모든 API의 Content-Type은 application/json 입니다.
- 모든 API는 아래의 Header를 포함해야 합니다.

| Header  | 설명 |
|----|----|
| X-AccessKey | 판매자센터에서 발급 받은 AccessKey |
| X-Fingerprint | SecretKey로 암호화한 Fingerprint. HMAC 암호화 알고리즘은 HmacSHA256 사용 |
| X-Fingerprint-Timestamp | Fingerprint를 암호화할때 사용한 timestamp. Grip 서버와 시간차가 10분 이상 나는 경우 유효하지 않은 요청으로 간주 |

- Fingerprint는 아래와 같이 생성할 수 있습니다. (uri는 QueryString을 포함합니다.)
- QueryString의 value 부분은 URLEncoder( https://docs.oracle.com/javase/8/docs/api/java/net/URLEncoder.html )를 이용하여 Encoding 하는 것이 안전합니다.
```java
public String makeFingerprint(String method, String uri, long timestamp) throws Exception {
		String space = " "; // one space
		String newLine = "\n"; // new line

		String message = new StringBuilder() //
				.append(method) // 'GET'
				.append(space) //
				.append(uri) // '/api/product/count?searchTarget=productName&searchQuery=Test'
				.append(newLine) //
				.append(timestamp) //
				.append(newLine) //
				.append(accessKey) //
				.toString();

		SecretKeySpec signingKey = new SecretKeySpec(secretKey.getBytes("UTF-8"), "HmacSHA256");
		Mac mac = Mac.getInstance("HmacSHA256");
		mac.init(signingKey);

		byte[] rawHmac = mac.doFinal(message.getBytes("UTF-8"));
		String encodeBase64String = Base64.encodeBase64String(rawHmac);

		return encodeBase64String;
}
```

## 상품 관리
### 이미지 업로드
- 상품을 등록하기 전에 미리 이미지를 업로드 해야 합니다.
- Content-Type은 multipart/form-data 로 설정해야 합니다.
- Request

```
POST /api/product/images
```
| 파라메터 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| image | multipart | Y | 업로드할 이미지| |

- Response

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| image | String | 업로드한 이미지 URL |

### 카테고리 목록
- 상품에 설정할 수 있는 카테고리 목록입니다.
- Request

```
GET /api/product/category
```

- Response

| 결과 이름 | 타입 | 설명 | 
| ----------- | ------------ |------------ | 
| category | List&lt;Category&gt; | 카테고리 정보 |

- Category

| 이름 | 타입 | 설명 | 
| ----------- | ------------ |------------ | 
| categorySeq | Integer | 카테고리 번호 |
| parentCategorySeq | Integer | 부모 카테고리 번호 |
| level | Integer | 카테고리 레벨 |
| categoryName | String | 카테고리 이름 |


### 상품정보 제공고시 목록
- 상품에 설정할 수 있는 상품정보 제공고시 목록입니다.
- Request

```
GET /api/product/legal
```

- Response

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| legal | List&lt;Legal&gt; | 상품정보 제공고시 정보 |

- Legal

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| legalSeq | Integer | 상품정보 제공고시 번호 |
| legalName | String | 상품정보 제공고시 이름 |
| items | List&lt;LegalItem&gt; | 세부 항목 |

- LegalItem

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| itemSeq | Integer | 세부 항목 번호 |
| title | String | 세부 항목 이름 |
| body | String | 세부 항목 설명 |

### 상품 개수
- 상품 개수를 조회합니다.
- Request

| 파라메터 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| searchTarget | String | N | 검색 대상 | 상품명(productName) |
| searchQuery | String | N | 검색어 | 식품 |

```
GET /api/product/count
```

- Response

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| productCount | Integer | 상품 개수 |

### 상품 목록
- 상품 목록을 조회합니다.
- Request

| 파라메터 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| start | Integer | N | 페이지 시작 번호. 디폴트 0 |  |
| length | Integer | N | 페이지 사이즈. 디폴트 20 |  |
| searchTarget | String | N | 검색 대상 | 상품명(productName) |
| searchQuery | String | N | 검색어 | 식품 |

```
GET /api/product
```

- Response

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| productList | List&lt;ProductList&gt; | 상품 목록 |

- ProductList

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| yourProductId | String | 자체 상품 아이디 |
| productId | String | Grip 상품 아이디 |
| productName | String | 상품명 |
| mainImageUrl | String | 대표 이미지 URL |
| categorySeq | Integer | 상품 카테고리 번호 |
| legalSeq | Integer | 상품정보 제공고시 번호 |
| expose | Boolean | 판매 여부 |
| useOption | Boolean | 옵션 사용 여부 |
| costPrice | Double | 원가 |
| sellingPrice | Double | 판매가 |
| liveSellingPrice | Double | 라이브 판매가 |
| originName | String | 원산지 |
| manufacturer | String | 제조사 |
| brandName | String | 브랜드 |
| modelName | String | 모델명 |
| ondemand | Boolean | 주문제작 여부 |
| returnImpossible | Boolean | 반품 불가 여부 |
| taxType | Integer | 부가세. 과세상품:1, 면세상품:2, 영세상품: 3 |
| startAt | Date | 판매 시작일시 |
| endAt | Date | 판매 종료일시 |
| stockCount | Integer | 재고 수량 |
| useMinOrderQuantity | Boolean | 최소 구매 개수 사용 여부 |
| useMaxOrderQuantity | Boolean | 최대 구매 개수 사용 여부 |
| minOrderQuantity | Integer | 최소 구매 개수 |
| maxOrderQuantity | Integer | 최대 구매 개수 |
| supportMarketing | Boolean | 그리퍼 지원 요청 여부 |
| createdAt | Date | 등록일시 |
| modifiedAt | Date | 수정일시 |

### 상품 상세
- 상품 상세 정보를 조회합니다.

```
GET /api/product/{productId}
```

- Response

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| product | Product | 상품 상세 |

- Product

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| yourProductId | String | 자체 상품 아이디 |
| productId | String | Grip 상품 아이디 |
| productName | String | 상품명 |
| categorySeq | Integer | 상품 카테고리 번호 |
| legalSeq | Integer | 상품정보 제공고시 번호 |
| legalItems | List&lt;LegalItem&gt; | 상품정보 제공고시 상세 |
| introduction | String | 상품 설명 |
| expose | Boolean | 판매 여부 |
| useOption | Boolean | 옵션 사용 여부 |
| option | ProductOption | 옵션 정보 |
| costPrice | Double | 원가 |
| sellingPrice | Double | 판매가 |
| liveSellingPrice | Double | 라이브 판매가 |
| originName | String | 원산지 |
| manufacturer | String | 제조사 |
| brandName | String | 브랜드 |
| modelName | String | 모델명 |
| ondemand | Boolean | 주문제작 여부 |
| returnImpossible | Boolean | 반품 불가 여부 |
| taxType | Integer | 부가세. 과세상품:1, 면세상품:2, 영세상품: 3 |
| startAt | Date | 판매 시작일시 |
| endAt | Date | 판매 종료일시 |
| stockCount | Integer | 재고 수량 |
| useMinOrderQuantity | Boolean | 최소 구매 개수 사용 여부 |
| useMaxOrderQuantity | Boolean | 최대 구매 개수 사용 여부 |
| minOrderQuantity | Integer | 최소 구매 개수 |
| maxOrderQuantity | Integer | 최대 구매 개수 |
| customDelivery | Boolean | 커스텀 배송 정보 사용 여부 |
| delivery | ProductDelivery | 상품 배송 정보 |
| customAs | Boolean | 커스텀 A/S 사용 여부 |
| as | ProductAfterService | 상품 A/S 정보 |
| supportMarketing | Boolean | 그리퍼 지원 요청 여부 |
| tags | List&lt;String&gt; | 태그 목록 |
| previewImageUrls | List&lt;String&gt; | 상품 상단 이미지 URL 목록 |
| detailImageUrls | List&lt;String&gt; | 상품 상세 이미지 URL 목록 |
| createdAt | Date | 등록일시 |
| modifiedAt | Date | 수정일시 |


## 주문/반품/교환 목록


## 배송 관리


## 1:1 문의 관리


## 리뷰 관리




