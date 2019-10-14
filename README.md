# Grip 판매자센터 API Guide
- Grip 판매자센터 API는 Grip에 연동하여 서비스를 제공하기 위한 서드파티 솔루션 사용자를 위한 API 입니다.
- RESTful API 형태의 표준 HTTP Request Method - GET, POST, PUT, DELETE 를 사용합니다.
- API 요청과 응답은 JSON Format 으로 되어 있습니다.
- Date 타입은 milliseconds로 변환하여 Long 타입으로 사용합니다.

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
| searchTarget | String | N | 검색 대상 | 상품명:productName |
| searchQuery | String | N | 검색어 | 식품 |
| searchStatus | String | N | 검색할 상품 상태. 콤마(,)로 구분해서 여러개 가능 | 판매대기:1, 판매중:2, 품절임박:3, 품절:4, 판매중지: 5 |

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
| start | Integer | N | 페이지 시작 번호. 디폴트 0 | 페이지 사이즈가 20이면 다음 시작 번호는 20 |
| length | Integer | N | 페이지 사이즈. 디폴트 20 |  |
| searchTarget | String | N | 검색 대상 | 상품명:productName |
| searchQuery | String | N | 검색어 | 식품 |
| searchStatus | String | N | 검색할 상품 상태. 콤마(,)로 구분해서 여러개 가능 | 판매대기:1, 판매중:2, 품절임박:3, 품절:4, 판매중지: 5 |

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

- ProductOption

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| types | List&lt;ProductOptionType&gt; | 옵션 종류 목록 |
| names | List&lt;ProductOptionName&gt; | 옵션 종류별 항목 목록 |
| combinations | List&lt;ProductOptionCombination&gt; | 옵션 종류를 조합한 최종 옵션 정보 목록 |

- ProductOptionType

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| typeSeq | Integer | 옵션 종류 번호 |
| optionType | String | 옵션 종류 명칭 |

- ProductOptionName

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| typeSeq | Integer | 옵션 종류 번호 |
| nameSeq | Integer | 옵션 종류별 항목 번호 |
| optionName | String | 옵션 항목 명칭 |

- ProductOptionCombination

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| nameSeqs | List&lt;Integer&gt; | 조합된 옵션 항목 번호 목록 |
| price | Double | 추가 가격 |
| stockCount | Integer | 재고 수량 |
| expose | Boolean | 판매 여부 |

- ProductAfterService

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| asTelephone | String | A/S 전화번호 |
| asPolicy | String | A/S 안내 |
| etc | String | 판매자 특이사항 |

- ProductDelivery

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| serviceType | Integer | 택배배송:1, 새벽배송:2, 배송없음:4, 직접배송:5 |
| chargeType | Integer | 무료배송:1, 조건부 무료배송:2, 유료배송: 3, 수량별 배송비 부과: 4 |
| chargeTimeType | Integer | 선결제:1 |
| bundleType | Integer | 선결제:1 |
| chargePrice | Double | 배송비 |
| deliveryExternal | Boolean | 도서산간지역 배송 여부 |
| chargePriceExternal | Double | 도서산간지역 추가 배송비 |
| chargeFreeCondition | Double | 무료 배송 조건 금액 |
| chargeByQuantity | Integer | 수량별 배송비 부과 선택시 수량 |
| deliveryCompanySeq | Integer | 택배 회사 번호 |
| sendEstimatedTime | Integer | 발송 예정일 |
| originPostalCode | String | 출고지 우편번호 |
| originAddress1 | String | 출고지 주소 |
| originAddress2 | String | 출고지 상세 주소 |
| returnPostalCode | String | 반품/교환 주소지 우편번호 |
| returnAddress1 | String | 반품/교환 주소지 주소 |
| returnAddress2 | String | 반품/교환 주소지 상세 주소 |
| returnCompanySeq | Integer | 반품/교환 택배 회사 번호 |
| returnChargePrice | Double | 반품 택배비 |
| exchangeChargePrice | Double | 교환 택배비 |

### 상품 등록
- 상품을 등록 합니다.
- Request

| 파라메터 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| yourProductId | String | N | 자체 상품 아이디 | |
| productName | String | Y | 상품명 | |
| categorySeq | Integer | Y | 상품 카테고리 번호 | 말단 카테고리의 번호만 허용 |
| legalSeq | Integer | Y | 상품정보 제공고시 번호 | |
| legalItems | List&lt;LegalItem&gt; | Y | 상품정보 제공고시 상세 | |
| introduction | String | Y | 상품 설명 | |
| useOption | Boolean | Y | 옵션 사용 여부 | |
| option | ProductOption | N | 옵션 정보 | useOption이 Y면 필수 |
| costPrice | Double | Y | 원가 | |
| sellingPrice | Double | Y | 판매가 | |
| liveSellingPrice | Double | Y | 라이브 판매가 | |
| originName | String | Y | 원산지 | |
| manufacturer | String | N | 제조사 | |
| brandName | String | N | 브랜드 | |
| modelName | String | N | 모델명 | |
| ondemand | Boolean | Y | 주문제작 여부 | |
| returnImpossible | Boolean | N | 반품 불가 여부 | returnImpossible이 Y면 필수 |
| taxType | Integer | Y | 부가세. 과세상품:1, 면세상품:2, 영세상품: 3 | |
| startAt | Date | Y | 판매 시작일시 | |
| endAt | Date | Y | 판매 종료일시 | |
| stockCount | Integer | Y | 재고 수량 | |
| useMinOrderQuantity | Boolean | Y | 최소 구매 개수 사용 여부 | |
| useMaxOrderQuantity | Boolean | Y | 최대 구매 개수 사용 여부 | |
| minOrderQuantity | Integer | N | 최소 구매 개수 | useMinOrderQuantity가 Y면 필수 |
| maxOrderQuantity | Integer | N | 최대 구매 개수 | useMaxOrderQuantity가 Y면 필수 |
| customDelivery | Boolean | Y | 커스텀 배송 정보 사용 여부 | N이면 판매자 기본 배송 정보 사용|
| delivery | ProductDelivery | N | 상품 배송 정보 | customDelivery가 Y면 필수 |
| customAs | Boolean | Y | 커스텀 A/S 사용 여부 | N이면 판매자 기본 A/S 정보 사용 |
| as | ProductAfterService | N | 상품 A/S 정보 | customAs가 Y면 필수 |
| supportMarketing | Boolean | Y | 그리퍼 지원 요청 여부 | |
| tags | List&lt;String&gt; | Y | 태그 목록 | |
| previewImageUrls | List&lt;String&gt; | Y | 상품 상단 이미지 URL 목록 | 이미지를 미리 업로드하고 받은 URL 사용. 최대 10개 |
| detailImageUrls | List&lt;String&gt; | Y | 상품 상세 이미지 URL 목록 | 이미지를 미리 업로드하고 받은 URL 사용. 최대 15개 |


```
POST /api/product
```

- Response

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| productId | String | 상품 아이디 |

### 상품 수정
- 상품을 수정 합니다.
- Request는 상품 등록과 동일합니다.

```
PUT /api/product/{productId}
```

- Response

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| productId | String | 상품 아이디 |

### 상품 삭제
- 상품을 삭제 합니다.

```
DELETE /api/product/{productId}
```

- Response

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| productId | String | 상품 아이디 |

### 상품 판매 시작
- 상품을 판매 시작 합니다.

```
PUT /api/product/{productId}/start
```

- Response

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| productId | String | 상품 아이디 |

### 상품 판매 중지
- 상품을 판매 중지 합니다.

```
PUT /api/product/{productId}/stop
```

- Response

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| productId | String | 상품 아이디 |


## 주문/반품/교환 목록
반품 및 교환은 Grip 판매자센터에서 직접 처리해야 합니다. API를 통해서는 조회만 가능합니다.

### 주문 개수
- 주문 개수를 조회합니다.
- Request

| 파라메터 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| searchTarget | String | N | 검색 대상 | 구매자 닉네임:buyerNickname, 구매자 이름:buyerName, 구매자 연락처:buyerPhoneNumber, 수령인:recipientName, 주문번호:orderSeq, 주문상품번호:orderProductSeq |
| searchQuery | String | N | 검색어 | 구매자 |
| searchStatus | String | N | 검색할 주문 상태. 콤마(,)로 구분해서 여러개 가능 | 결제완료:1, 배송준비중:10, 배송중:11, 배송완료:13, 발송지연:12, 구매확정:90, 반품신청:40, 교환신청:50, 환불완료:42, 판매취소:60, 주문취소:80, 입금대기중:2  |
| searchStartAt | Date | N | 검색할 주문/결제 시작일시  | |
| searchEndAt | Date | N | 검색할 주문/결제 종료일시  | |

```
GET /api/order/count
```

- Response

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| orderCount | Integer | 주문 개수 |

### 주문 목록
- 주문 목록을 조회합니다.
- Request

| 파라메터 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| start | Integer | N | 페이지 시작 번호. 디폴트 0 | 페이지 사이즈가 20이면 다음 시작 번호는 20 |
| length | Integer | N | 페이지 사이즈. 디폴트 20 |  |
| searchTarget | String | N | 검색 대상 | 구매자 닉네임:buyerNickname, 구매자 이름:buyerName, 구매자 연락처:buyerPhoneNumber, 수령인:recipientName, 주문번호:orderSeq, 주문상품번호:orderProductSeq |
| searchQuery | String | N | 검색어 | 구매자 |
| searchStatus | String | N | 검색할 주문 상태. 콤마(,)로 구분해서 여러개 가능 | 결제완료:1, 배송준비중:10, 배송중:11, 배송완료:13, 발송지연:12, 구매확정:90, 반품신청:40, 교환신청:50, 환불완료:42, 판매취소:60, 주문취소:80, 입금대기중:2  |
| searchStartAt | Date | N | 검색할 주문/결제 시작일시  | |
| searchEndAt | Date | N | 검색할 주문/결제 종료일시  | |

```
GET /api/order
```

- Response

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| orderList | List&lt;OrderList&gt; | 주문 목록 |

- OrderList

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| orderSeq | Long | 주문 번호 |
| orderProductSeq | Long | 주문 상품 번호 |
| orderedAt | Date | 주문결제일시 |
| orderState | OrderProductState | 주문 상태 |
| yourProductId | String | 자체 상품 아이디 |
| productId | String | Grip 상품 아이디 |
| productName | String | 주문 당시 상품명 |
| optionName | String | 주문 당시 옵션명 |
| price | Double | 구매가 |
| quanity | Integer | 수량 |
| shippingAmount | Double | 배송비 |
| shippingExtraAmount | Double | 도서/산간지역 추가 배송비 |
| productAmount | Double | 상품 주문 금액 |
| couponAmount | Double | 쿠폰 할인 금액 |
| buyerNickname | String | 구매자 닉네임 |
| buyerName | String | 구매자 이름 |
| buyerPhoneNumber | String | 구매자 전화번호 |
| recipientName | String | 수령인 이름 |
| recipientPhoneNumber | String | 수령인 전화번호 |
| recipientPostalCode | String | 수령인 우편번호 |
| recipientAddress | String | 수령인 주소 |
| deliveryRequest | String | 배송 메시지 |
| dawnDeliveryRequest | String | 새벽 배송 메시지 |

- OrderProductState
| 설명 | 값 | 비고 |
| -----------  | ------------ | ------------ |
| 결제완료 | 1 | |
| 입금대기중 | 2 | |
| 결제실패(미입금) | 3 | |
| 배송준비중 | 10 | |
| 배송중 | 11 | |
| 발송지연 | 12 | |
| 배송완료 | 13 | |
| 반품진행중(반품신청) | 40 | |
| 반품진행중(상품대기) | 41 | |
| 반품진행중(상품확인) | 42 | |
| 반품완료 | 43 | |
| 반품완료(환불완료) | 44 | |
| 반품완료(환불계좌 입력대기) | 45 | |
| 반품진행중(환불대기) | 46 | Grip에서 구매자에게 입금전 |
| 반품취소(구매자) | 47 | |
| 반품취소(판매자) | 48 | |
| 교환신청 | 50 | |
| 교환진행중 | 51 | |
| 교환취소(판매자) | 52 | |
| 교환(배송중) | 53 | |
| 교환(배송완료) | 54 | |
| 교환취소(구매자) | 55 | |
| 판매취소 | 60 | |
| 판매취소(환불완료) | 61 | |
| 판매취소(미입금) | 62 | |
| 판매취소(환불계좌 입력대기) | 63 | |
| 판매취소(환불대기) | 64 | Grip에서 구매자에게 입금전 |
| 주문취소 | 80 | |
| 주문취소(환불완료) | 81 | |
| 주문취소(미입금) | 82 | |
| 주문취소(환불계좌 입력대기) | 83 |  |
| 주문취소(환불대기) | 84 | Grip에서 구매자에게 입금전 |
| 구매확정 | 90 | |
| 구매확정(리뷰작성) | 91 | |

### 주문 취소(판매 취소)
- 재고 부족과 같은 사유로 판매자가 주문을 취소합니다.
- Request

| 파라메터 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKeys | List&lt;OrderKey&gt; | Y | 대상 주문 | |
| reason | String | Y | 주문 취소 사유 | |

- OrderKey

| 파라메터 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderSeq | Long | Y | 주문 번호 | |
| orderProductSeq | Long | Y | 주문 상품 번호 | |

```
POST /api/order/cancel
```

- Response

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| affected | Integer | 취소 성공한 주문 수 |

### 반품 개수
- 반품 개수를 조회합니다.
- Request

| 파라메터 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| searchTarget | String | N | 검색 대상 | 구매자 닉네임:buyerNickname, 구매자 이름:buyerName, 구매자 연락처:buyerPhoneNumber, 수령인:recipientName, 주문번호:orderSeq, 주문상품번호:orderProductSeq, 송장번호:trackingNumber |
| searchQuery | String | N | 검색어 | 구매자 |
| searchStatus | String | N | 검색할 주문 상태. 콤마(,)로 구분해서 여러개 가능 | 반품신청:40, 반품진행중(상품대기):41, 반품진행중(상품확인):42, 반품취소(판매자):48, 반품완료(환불완료):44, 반품완료(환불대기):46  |
| searchStartAt | Date | N | 검색할 반품신청 시작일시  | |
| searchEndAt | Date | N | 검색할 반품신청 종료일시  | |

```
GET /api/return/count
```

- Response

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| returnCount | Integer | 반품 개수 |

### 반품 목록
- 반품 목록을 조회합니다.
- Request

| 파라메터 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| start | Integer | N | 페이지 시작 번호. 디폴트 0 | 페이지 사이즈가 20이면 다음 시작 번호는 20 |
| length | Integer | N | 페이지 사이즈. 디폴트 20 |  |
| searchTarget | String | N | 검색 대상 | 구매자 닉네임:buyerNickname, 구매자 이름:buyerName, 구매자 연락처:buyerPhoneNumber, 수령인:recipientName, 주문번호:orderSeq, 주문상품번호:orderProductSeq, 송장번호:trackingNumber |
| searchQuery | String | N | 검색어 | 구매자 |
| searchStatus | String | N | 검색할 주문 상태. 콤마(,)로 구분해서 여러개 가능 | 반품신청:40, 반품진행중(상품대기):41, 반품진행중(상품확인):42, 반품취소(판매자):48, 반품완료(환불완료):44, 반품완료(환불대기):46  |
| searchStartAt | Date | N | 검색할 반품신청 시작일시  | |
| searchEndAt | Date | N | 검색할 반품신청 종료일시  | |

```
GET /api/return
```

- Response

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| returnList | List&lt;ReturnList&gt; | 반품 목록 |

- ReturnList

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| orderSeq | Long | 주문 번호 |
| orderProductSeq | Long | 주문 상품 번호 |
| orderedAt | Date | 주문결제일시 |
| orderState | OrderProductState | 주문 상태 |
| returnRequestAt | Date | 반품신청일시 |
| buyerReturnReasonType | Integer | 반품사유. 단순변심:1, 다른 상품 잘못 주문:3, 서비스 불만족:4, 배송 지연:5, 상품 파손 및 불량:7, 상품정보 상이:8, 다른 상품 잘못 배송:10 |
| buyerReturnReason | String | 구매자 반품 사유 |
| sellerReturnReason | String | 판매자 반품 불가 메시지 |
| sellerPermitMessage | String | 판매자 반품 접수 안내 메시지 |
| yourProductId | String | 자체 상품 아이디 |
| productId | String | Grip 상품 아이디 |
| productName | String | 주문 당시 상품명 |
| optionName | String | 주문 당시 옵션명 |
| price | Double | 구매가 |
| quanity | Integer | 수량 |
| shippingAmount | Double | 배송비 |
| shippingExtraAmount | Double | 도서/산간지역 추가 배송비 |
| productAmount | Double | 상품 주문 금액 |
| couponAmount | Double | 쿠폰 할인 금액 |
| buyerNickname | String | 구매자 닉네임 |
| buyerName | String | 구매자 이름 |
| buyerPhoneNumber | String | 구매자 전화번호 |
| recipientName | String | 수령인 이름 |
| recipientPhoneNumber | String | 수령인 전화번호 |
| recipientPostalCode | String | 수령인 우편번호 |
| recipientAddress | String | 수령인 주소 |

### 교환 개수
- 교환 개수를 조회합니다.
- Request

| 파라메터 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| searchTarget | String | N | 검색 대상 | 구매자 닉네임:buyerNickname, 구매자 이름:buyerName, 구매자 연락처:buyerPhoneNumber, 수령인:recipientName, 주문번호:orderSeq, 주문상품번호:orderProductSeq, 송장번호:trackingNumber |
| searchQuery | String | N | 검색어 | 구매자 |
| searchStatus | String | N | 검색할 주문 상태. 콤마(,)로 구분해서 여러개 가능 | 교환신청:50, 교환진행중:51, 교환(배송중):53, 교환(배송완료):54, 교환불가:52  |
| searchStartAt | Date | N | 검색할 교환신청 시작일시  | |
| searchEndAt | Date | N | 검색할 교환신청 종료일시  | |

```
GET /api/exchange/count
```

- Response

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| exchangeCount | Integer | 교환 개수 |

### 교환 목록
- 교환 목록을 조회합니다.
- Request

| 파라메터 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| start | Integer | N | 페이지 시작 번호. 디폴트 0 | 페이지 사이즈가 20이면 다음 시작 번호는 20 |
| length | Integer | N | 페이지 사이즈. 디폴트 20 |  |
| searchTarget | String | N | 검색 대상 | 구매자 닉네임:buyerNickname, 구매자 이름:buyerName, 구매자 연락처:buyerPhoneNumber, 수령인:recipientName, 주문번호:orderSeq, 주문상품번호:orderProductSeq, 송장번호:trackingNumber |
| searchQuery | String | N | 검색어 | 구매자 |
| searchStatus | String | N | 검색할 주문 상태. 콤마(,)로 구분해서 여러개 가능 | 교환신청:50, 교환진행중:51, 교환(배송중):53, 교환(배송완료):54, 교환불가:52  |
| searchStartAt | Date | N | 검색할 교환신청 시작일시  | |
| searchEndAt | Date | N | 검색할 교환신청 종료일시  | |

```
GET /api/exchange
```

- Response

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| exchangeList | List&lt;ExchangeList&gt; | 교환 목록 |

- ReturnList

| 결과 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| orderSeq | Long | 주문 번호 |
| orderProductSeq | Long | 주문 상품 번호 |
| orderedAt | Date | 주문결제일시 |
| orderState | OrderProductState | 주문 상태 |
| exchangeRequestAt | Date | 교환신청일시 |
| buyerChangeReasonType | Integer | 교환사유. 색상 및 사이즈 변경:2, 다른 상품 잘못 주문:3, 상품 파손 및 불량:7, 다른 상품 잘못 배송:10 |
| buyerChangeReason | String | 구매자 교환 사유 |
| yourProductId | String | 자체 상품 아이디 |
| productId | String | Grip 상품 아이디 |
| productName | String | 주문 당시 상품명 |
| optionName | String | 주문 당시 옵션명 |
| price | Double | 구매가 |
| quanity | Integer | 수량 |
| shippingAmount | Double | 배송비 |
| shippingExtraAmount | Double | 도서/산간지역 추가 배송비 |
| productAmount | Double | 상품 주문 금액 |
| couponAmount | Double | 쿠폰 할인 금액 |
| buyerNickname | String | 구매자 닉네임 |
| buyerName | String | 구매자 이름 |
| buyerPhoneNumber | String | 구매자 전화번호 |
| recipientName | String | 수령인 이름 |
| recipientPhoneNumber | String | 수령인 전화번호 |
| recipientPostalCode | String | 수령인 우편번호 |
| recipientAddress | String | 수령인 주소 |

## 배송 관리


## 1:1 문의 관리


## 리뷰 관리




