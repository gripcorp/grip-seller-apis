# Grip 판매자센터 API Guide
- Grip 판매자센터 API는 Grip에 연동하여 서비스를 제공하기 위한 서드파티 솔루션 사용자를 위한 API 입니다.
- RESTful API 형태의 표준 HTTP Request Method - GET, POST, PUT, DELETE 를 사용합니다.
- API 요청과 응답은 JSON Format 으로 되어 있습니다.
- Date 타입은 milliseconds로 변환하여 Long 타입으로 사용합니다.
- API의 성능을 보장하기 위해 검색 범위는 최근 90일까지만 가능합니다.

# 판매자센터 API 이용 신청하기
- 판매자센터 우상단에 있는 프로필을 클릭하여 API 사용을 시작합니다.
- 'SecretKey 신청'을 클릭하면 AccessKey와 SecretKey가 생성됩니다.
- SecretKey가 유출되면 'SecretKey 재발급'을 클릭하여 SecretKey를 새로 발급 받을 수 있습니다.
- AccessKey는 변경되지 않습니다.

# 사전 정보
- SecretKey : 판매자센터에서 발급 받은 SecretKey. API인증을 위한 Fingerprint를 만들때 사용.
- AccessKey : 판매자센터에서 발급 받은 AccessKey.
- API host : https://seller.grip.show
 
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
| X-Fingerprint-Timestamp | Fingerprint를 암호화할때 사용한 timestamp(**milliseconds**). Grip 서버와 시간차가 10분 이상 나는 경우 유효하지 않은 요청으로 간주 |

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
- 배송/반품/교환 정보와 A/S 및 특이사항 정보는 Grip 판매자센터에서 설정한 판매자 기본 설정을 사용할 수 있습니다.
- 기본으로 설정한 정보와 상이한 경우에만 설정하는 것을 권장합니다.

### 이미지 업로드
- 상품을 등록하기 전에 미리 이미지를 업로드 해야 합니다.
- 이미지의 크기는 5M 이하여야 합니다.
- JPG, PNG, GIF만 지원합니다.
- Content-Type은 multipart/form-data 로 설정해야 합니다.
- Request

```
POST /api/product/image
```
| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| image | multipart | Y | 업로드할 이미지| |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| image | String | 업로드한 이미지 URL |

### 카테고리 목록
- 상품에 설정할 수 있는 카테고리 목록입니다.
- Request

```
GET /api/product/category
```

- Response

| 이름 | 타입 | 설명 | 
| ----------- | ------------ |------------ | 
| category | List&lt;Category&gt; | 카테고리 정보 |

- Category

| 이름 | 타입 | 설명 | 비고 |
| ----------- | ------------ |------------ | ------------ |
| categorySeq | Integer | 카테고리 번호 | |
| parentCategorySeq | Integer | 부모 카테고리 번호 | |
| level | Integer | 카테고리 레벨 | |
| categoryName | String | 카테고리 이름 | 최대 20자 |


### 상품정보 제공고시 목록
- 상품에 설정할 수 있는 상품정보 제공고시 목록입니다.
- Request

```
GET /api/product/legal
```

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| legal | List&lt;Legal&gt; | 상품정보 제공고시 정보 |

- Legal

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ |
| legalSeq | Integer | 상품정보 제공고시 번호 | |
| legalName | String | 상품정보 제공고시 이름 | 최대 40자 |
| items | List&lt;LegalItem&gt; | 세부 항목 | |

- LegalItem

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ |
| itemSeq | Integer | 세부 항목 번호 | |
| title | String | 세부 항목 이름 | 최대 60자 |
| body | String | 세부 항목 설명 | 최대 2,000자 |

### 상품 개수
- 상품 개수를 조회합니다.
- Request

```
GET /api/product/count
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| searchTarget | String | N | 검색 대상 | 상품명:productName |
| searchQuery | String | N | 검색어 | 최대 40자 |
| searchStatus | String | N | 검색할 상품 상태. 콤마(,)로 구분해서 여러개 가능 | 판매대기:1, 판매중:2, 품절임박:3, 품절:4, 판매중지: 5 |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| productCount | Integer | 상품 개수 |

### 상품 목록
- 상품 목록을 조회합니다.
- Request

```
GET /api/product
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| start | Integer | N | 페이지 시작 번호. 디폴트 0 | 페이지 사이즈가 20이면 다음 시작 번호는 20 |
| length | Integer | N | 페이지 사이즈. 디폴트 20, 최대 100 |  |
| searchTarget | String | N | 검색 대상 | 상품명:productName |
| searchQuery | String | N | 검색어 | 최대 40자 |
| searchStatus | String | N | 검색할 상품 상태. 콤마(,)로 구분해서 여러개 가능 | 판매대기:1, 판매중:2, 품절임박:3, 품절:4, 판매중지: 5 |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| productList | List&lt;ProductList&gt; | 상품 목록 |

- ProductList

| 이름 | 타입 | 설명 | 
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
| returnImpossible | Boolean | 반품 불가 여부. 주문제작 여부가 true인 경우에만 사용. |
| taxType | Integer | 부가세. 과세상품:1, 면세상품:2, 영세상품: 3 |
| startAt | Date | 판매 시작일시 |
| endAt | Date | 판매 종료일시 |
| stockCount | Integer | 재고 수량 |
| useMinOrderQuantity | Boolean | 최소 구매 개수 사용 여부 |
| useMaxOrderQuantity | Boolean | 최대 구매 개수 사용 여부 |
| minOrderQuantity | Integer | 최소 구매 개수 |
| maxOrderQuantity | Integer | 최대 구매 개수 |
| allowCoupon | Boolean | 쿠폰 적용 불가 상품 여부. 쿠폰 사용 가능이면 Y, 불가면 N |
| overseasDirect | Boolean | 해외배송 여부 |
| createdAt | Date | 등록일시 |
| modifiedAt | Date | 수정일시 |

### 상품 상세
- 상품 상세 정보를 조회합니다.

```
GET /api/product/{productId}
```

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| product | Product | 상품 상세 |

- Product

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| yourProductId | String | 자체 상품 아이디 | 최대 40자 |
| productId | String | Grip 상품 아이디 | 최대 16자 |
| productName | String | 상품명 | 최대 40자 |
| categorySeq | Integer | 상품 카테고리 번호 | |
| legalSeq | Integer | 상품정보 제공고시 번호 | |
| legalItems | List&lt;LegalItem&gt; | 상품정보 제공고시 상세 | |
| introduction | String | 상품 설명 | 최대 50자 |
| expose | Boolean | 판매 여부 | |
| useOption | Boolean | 옵션 사용 여부 | |
| option | ProductOption | 옵션 정보 | |
| costPrice | Double | 원가 | |
| sellingPrice | Double | 판매가 | |
| liveSellingPrice | Double | 라이브 판매가 | |
| originName | String | 원산지 | 최대 20자 |
| manufacturer | String | 제조사 | 최대 32자 |
| brandName | String | 브랜드 | 최대 32자 |
| modelName | String | 모델명 | 최대 32자 |
| ondemand | Boolean | 주문제작 여부 | |
| returnImpossible | Boolean | 반품 불가 여부 | |
| taxType | Integer | 부가세. 과세상품:1, 면세상품:2, 영세상품: 3 | |
| startAt | Date | 판매 시작일시 | |
| endAt | Date | 판매 종료일시 | |
| stockCount | Integer | 재고 수량 | |
| useMinOrderQuantity | Boolean | 최소 구매 개수 사용 여부 | |
| useMaxOrderQuantity | Boolean | 최대 구매 개수 사용 여부 | |
| minOrderQuantity | Integer | 최소 구매 개수 | |
| maxOrderQuantity | Integer | 최대 구매 개수 | |
| allowCoupon | Boolean | 쿠폰 적용 불가 상품 여부. 쿠폰 사용 가능이면 Y, 불가면 N | |
| overseasDirect | Boolean | 해외배송 여부 | |
| customDelivery | Boolean | 커스텀 배송 정보 사용 여부 | |
| delivery | ProductDelivery | 상품 배송 정보 | |
| customAs | Boolean | 커스텀 A/S 사용 여부 | |
| as | ProductAfterService | 상품 A/S 정보 | |
| tags | List&lt;String&gt; | 태그 목록 | 최대 20개 |
| previewImageUrls | List&lt;String&gt; | 상품 상단 이미지 URL 목록 | |
| detailImageUrls | List&lt;String&gt; | 상품 상세 이미지 URL 목록 | |
| createdAt | Date | 등록일시 | |
| modifiedAt | Date | 수정일시 | |

- ProductOption

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| types | List&lt;ProductOptionType&gt; | 옵션 종류 목록. 최대 3개 |
| names | List&lt;ProductOptionName&gt; | 옵션 종류별 항목 목록. 종류별로 최대 100개 |
| combinations | List&lt;ProductOptionCombination&gt; | 옵션 종류를 조합한 최종 옵션 정보 목록 |

- ProductOptionType

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ |
| typeSeq | Integer | 옵션 종류 번호 | |
| optionType | String | 옵션 종류 명칭 | ex) 색상. 최대 30자 |

- ProductOptionName

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ |
| typeSeq | Integer | 옵션 종류 번호 | |
| nameSeq | Integer | 옵션 종류별 항목 번호 | |
| optionName | String | 옵션 항목 명칭 | ex) 블루, 블랙, 레드. 최대 120자 |

- ProductOptionCombination

| 이름 | 타입 | 설명 |
| -----------  | ------------ |------------ | 
| optionKey | String | 조합된 옵션의 키 |
| nameSeqs | List&lt;Integer&gt; | 조합된 옵션 항목 번호 목록 |
| price | Double | 추가 가격. 마이너스 가격 가능. 0원인 조합이 1개 이상 있어야 함 |
| stockCount | Integer | 재고 수량 |
| expose | Boolean | 판매 여부 |

- ProductAfterService

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ |
| asTelephone | String | A/S 전화번호 | |
| asPolicy | String | A/S 안내 | 최대 1,000자 |
| etc | String | 판매자 특이사항 | 최대 1,000자 |

- ProductDelivery

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ |
| serviceType | Integer | 택배배송:1, 새벽배송:2, 해외배송:3, 배송없음:4, 직접배송:5 | |
| chargeType | Integer | 무료배송:1, 조건부 무료배송:2, 유료배송: 3, 수량별 배송비 부과: 4 | |
| chargeTimeType | Integer | 선결제:1 | 현재 선결제만 있음 |
| bundleType | Integer | 최대 배송비:1, 최소 배송비2, 개별 계산:3 | 묶음 배송에 대한 배송비 |
| chargePrice | Double | 배송비 | |
| deliveryExternal | Boolean | 도서산간지역 배송 여부 | |
| chargePriceExternal | Double | 도서산간지역 추가 배송비 | |
| chargeFreeCondition | Double | 무료 배송 조건 금액 | |
| chargeByQuantity | Integer | 수량별 배송비 부과 선택시 수량 | |
| deliveryCompanySeq | Integer | 택배 회사 번호 | |
| sendEstimatedTime | Integer | 발송 예정일 | 2 ~ 21 |
| originPostalCode | String | 출고지 우편번호 | 최대 8자 |
| originAddress1 | String | 출고지 주소 | 최대 100자 |
| originAddress2 | String | 출고지 상세 주소 | 최대 100자 |
| returnPostalCode | String | 반품/교환 주소지 우편번호 | 최대 8자 |
| returnAddress1 | String | 반품/교환 주소지 주소 | 최대 100자 |
| returnAddress2 | String | 반품/교환 주소지 상세 주소 | 최대 100자 |
| returnCompanySeq | Integer | 반품/교환 택배 회사 번호 | |
| returnChargePrice | Double | 반품 택배비 | |
| exchangeChargePrice | Double | 교환 택배비 | |

### 상품 등록
- 상품을 등록 합니다.
- Request

```
POST /api/product
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| yourProductId | String | N | 자체 상품 아이디 | 최대 40자 |
| productName | String | Y | 상품명 | 최대 40자 |
| categorySeq | Integer | Y | 상품 카테고리 번호 | 말단 카테고리의 번호만 허용 |
| legalSeq | Integer | Y | 상품정보 제공고시 번호 | |
| legalItems | List&lt;LegalItem&gt; | Y | 상품정보 제공고시 상세 | |
| introduction | String | N | 상품 설명 | 최대 50자 |
| useOption | Boolean | Y | 옵션 사용 여부 | |
| option | ProductOption | N | 옵션 정보 | useOption이 Y면 필수 |
| costPrice | Double | Y | 원가 | 최소 200원 또는 0원 |
| sellingPrice | Double | Y | 판매가 | 최소 200원 또는 0원 |
| liveSellingPrice | Double | Y | 라이브 판매가 | 최소 200원 또는 0원 |
| originName | String | Y | 원산지 | 최대 20자 |
| manufacturer | String | N | 제조사 | 최대 32자 |
| brandName | String | N | 브랜드 | 최대 32자 |
| modelName | String | N | 모델명 | 최대 32자 |
| ondemand | Boolean | Y | 주문제작 여부 | |
| returnImpossible | Boolean | N | 반품 불가 여부 | returnImpossible이 Y면 필수 |
| taxType | Integer | Y | 부가세. 과세상품:1, 면세상품:2, 영세상품: 3 | |
| startAt | Date | Y | 판매 시작일시 | 최소 2019-02-01 00:00:00. 현재시간 권장 |
| endAt | Date | Y | 판매 종료일시 | 최대 2048-12-31 23:59:59 |
| stockCount | Integer | Y | 재고 수량 | useOption이 Y인 경우에 option에 있는 ProductOptionCombination에서 expose가 Y인 것으로 자동 설정 됨 |
| useMinOrderQuantity | Boolean | Y | 최소 구매 개수 사용 여부 | |
| useMaxOrderQuantity | Boolean | Y | 최대 구매 개수 사용 여부 | |
| minOrderQuantity | Integer | N | 최소 구매 개수 | useMinOrderQuantity가 Y면 필수 |
| maxOrderQuantity | Integer | N | 최대 구매 개수 | useMaxOrderQuantity가 Y면 필수 |
| allowCoupon | Boolean | N | 쿠폰 적용 불가 상품 여부. 디폴트 Y | 쿠폰허용이면 Y, 불가면 N|
| overseasDirect | Boolean | N | 해외배송 여부. 디폴트 N |
| customDelivery | Boolean | Y | 커스텀 배송 정보 사용 여부 | N이면 판매자 기본 배송 정보 사용|
| delivery | ProductDelivery | N | 상품 배송 정보 | customDelivery가 Y면 필수 |
| customAs | Boolean | Y | 커스텀 A/S 사용 여부 | N이면 판매자 기본 A/S 정보 사용 |
| as | ProductAfterService | N | 상품 A/S 정보 | customAs가 Y면 필수 |
| tags | List&lt;String&gt; | Y | 태그 목록 | 최대 20개, 최대 32자, 특수문자 불가. 대소문자 구분없음 |
| previewImageUrls | List&lt;String&gt; | Y | 상품 상단 이미지 URL 목록 | 이미지를 미리 업로드하고 받은 URL 사용. 최대 10개. 750px X 750px 권장. 비율이 다를시 Center Crop. 첫번째 이미지가 대표 이미지. PNG, JPG 허용 |
| detailImageUrls | List&lt;String&gt; | Y | 상품 상세 이미지 URL 목록 | 이미지를 미리 업로드하고 받은 URL 사용. 최대 30개. 가로 860px 권장. PNG, JPG, GIF 허용 |

- Response

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ |-----------|
| productId | String | 상품 아이디 | 최대 16자 |

### 상품 수정
- 상품을 수정 합니다.
- Request는 상품 등록과 동일합니다.

```
PUT /api/product/{productId}
```

- Response

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ |-----------|
| productId | String | 상품 아이디 | 최대 16자 |

### 상품 삭제
- 상품을 삭제 합니다.

```
DELETE /api/product/{productId}
```

- Response

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ |-----------|
| productId | String | 상품 아이디 | 최대 16자 |

### 상품 판매 시작
- 상품을 판매 시작 합니다.

```
PUT /api/product/{productId}/start
```

- Response

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ |-----------|
| productId | String | 상품 아이디 | 최대 16자 |

### 상품 판매 중지
- 상품을 판매 중지 합니다.

```
PUT /api/product/{productId}/stop
```

- Response

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ |-----------|
| productId | String | 상품 아이디 | 최대 16자 |


## 주문/반품/교환 목록
- 반품 및 교환은 Grip 판매자센터에서 직접 처리해야 합니다. API를 통해서는 조회만 가능합니다.
- 하나의 주문은 하나 이상의 상품 구매 정보로 구성되므로 '주문 번호'와 '주문 상품 번호'를 키 값으로 사용합니다.

- OrderKey

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderSeq | Long | Y | 주문 번호 | |
| orderProductSeq | Long | Y | 주문 상품 번호 | |

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

- PaymentMethod

| 설명 | 값 | 비고 |
| -----------  | ------------ | ------------ |
| 신용카드 | 1 | |
| 실시간 계좌이체 | 2 | |
| 가상계좌 | 3 | |
| 카카오페이 | 4 | |
| 네이버페이 | 5 | |
| 페이코 | 6 | |
| 그립지원 | 99 | |

- OrderResult

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| orderSeq | Long | 주문 번호 | |
| orderProductSeq | Long | 주문 상품 번호 | |
| result | Boolean | 성공 여부 | |
| message | String | 실패 사유 | 실패인 경우에만 있음. 최대 100자 |

### 주문 개수
- 주문 개수를 조회합니다.
- Request

```
GET /api/order/count
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| searchTarget | String | N | 검색 대상 | 구매자 닉네임:buyerNickname, 구매자 이름:buyerName, 구매자 연락처:buyerPhoneNumber, 수령인:recipientName, 주문번호:orderSeq, 주문상품번호:orderProductSeq |
| searchQuery | String | N | 검색어 | 최대 40자 |
| searchStatus | String | N | 검색할 주문 상태. 콤마(,)로 구분해서 여러개 가능 | 결제완료:1, 배송준비중:10, 배송중:11, 배송완료:13, 발송지연:12, 구매확정:90, 반품신청:40, 교환신청:50, 환불완료:42, 판매취소:60, 주문취소:80, 입금대기중:2  |
| searchDate | String | N | 검색할 주문/결제 날짜 대상. 디폴트 orderedAt | 주문결제일시:orderedAt, 구매확정일시:confirmAt, 주문취소일시:cancelAt |
| searchStartAt | Date | N | 검색할 주문/결제 시작일시. 디폴트 30일전 | |
| searchEndAt | Date | N | 검색할 주문/결제 종료일시. 디폴트 오늘 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| orderCount | Integer | 주문 개수 |

### 주문 목록
- 주문 목록을 조회합니다.
- Request

```
GET /api/order
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| start | Integer | N | 페이지 시작 번호. 디폴트 0 | 페이지 사이즈가 20이면 다음 시작 번호는 20 |
| length | Integer | N | 페이지 사이즈. 디폴트 20, 최대 100 |  |
| searchTarget | String | N | 검색 대상 | 구매자 닉네임:buyerNickname, 구매자 이름:buyerName, 구매자 연락처:buyerPhoneNumber, 수령인:recipientName, 주문번호:orderSeq, 주문상품번호:orderProductSeq |
| searchQuery | String | N | 검색어 | 최대 40 |
| searchStatus | String | N | 검색할 주문 상태. 콤마(,)로 구분해서 여러개 가능 | 결제완료:1, 배송준비중:10, 배송중:11, 배송완료:13, 발송지연:12, 구매확정:90, 반품신청:40, 교환신청:50, 환불완료:42, 판매취소:60, 주문취소:80, 입금대기중:2  |
| searchDate | String | N | 검색할 주문/결제 날짜 대상. 디폴트 orderedAt | 주문결제일시:orderedAt, 구매확정일시:confirmAt, 주문취소일시:cancelAt |
| searchStartAt | Date | N | 검색할 주문/결제 시작일시. 디폴트 30일전 | |
| searchEndAt | Date | N | 검색할 주문/결제 종료일시. 디폴트 오늘 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| orderList | List&lt;OrderList&gt; | 주문 목록 |

- OrderList

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| orderSeq | Long | 주문 번호 | |
| orderProductSeq | Long | 주문 상품 번호 | |
| orderedAt | Date | 주문 결제 일시 | |
| confirmAt | Date | 구매 확정 일시 | |
| cancelAt | Date | 주문(판매) 취소 일시 | |
| orderState | OrderProductState | 주문 상태 | |
| yourProductId | String | 자체 상품 아이디 | 최대 40자 |
| productId | String | Grip 상품 아이디 | 최대 16자 |
| productName | String | 주문 당시 상품명 | 최대 40자 |
| optionNameSeqs | List<Integer> | 조합된 옵션의 종류 번호 | |
| optionName | String | 주문 당시 옵션명 | 최대 120자 |
| price | Double | 구매가 | |
| quantity | Integer | 수량 | |
| productAmount | Double | 상품 주문 금액 | |
| shippingAmount | Double | 배송비 | |
| shippingExtraAmount | Double | 도서/산간지역 추가 배송비 | |
| couponAmount | Double | 쿠폰 할인 금액 | |
| paymentMethod | Integer | 결제 수단 | |
| buyerNickname | String | 구매자 닉네임 | 최대 30자 |
| buyerName | String | 구매자 이름 | 최대 20자 |
| buyerPhoneNumber | String | 구매자 전화번호 | 최대 13자 |
| recipientName | String | 수령인 이름 | 최대 20자 |
| recipientPhoneNumber | String | 수령인 전화번호 | 최대 13자 |
| recipientPostalCode | String | 수령인 우편번호 | 최대 8자 |
| recipientAddress | String | 수령인 주소 | 최대 200자 |
| deliveryRequest | String | 배송 메시지 | 최대 60자 |
| dawnDeliveryRequest | String | 새벽 배송 메시지 | 최대 60자 |
| clearanceCode | String | 개인 통관 번호 | 최대 16자 |

### 주문 취소(판매 취소)
- 재고 부족과 같은 사유로 판매자가 주문을 취소합니다.
- Request

```
POST /api/order/cancel
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKeys | List&lt;OrderKey&gt; | Y | 대상 주문 | |
| reasonType | Integer | Y | 주문 취소 유형 | 고객요청-단순변심:1, 고객요청-서비스불만족:2, 재고부족:3, 상품문제발생:4, 배송문제발생:5 |
| reason | String | Y | 주문 취소 사유 | 최대 50자 |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| affected | Integer | 주문 취소 성공한 주문 수 |

```
PUT /api/order/cancel/result
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKeys | List&lt;OrderKey&gt; | Y | 대상 주문 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| result | List&lt;OrderResult&gt; | 주문 취소 요청 결과 |

### 반품 개수
- 반품 개수를 조회합니다.
- Request

```
GET /api/return/count
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| searchTarget | String | N | 검색 대상 | 구매자 닉네임:buyerNickname, 구매자 이름:buyerName, 구매자 연락처:buyerPhoneNumber, 수령인:recipientName, 주문번호:orderSeq, 주문상품번호:orderProductSeq, 송장번호:trackingNumber |
| searchQuery | String | N | 검색어 | 최대 40자 |
| searchStatus | String | N | 검색할 주문 상태. 콤마(,)로 구분해서 여러개 가능 | 반품신청:40, 반품진행중(상품대기):41, 반품진행중(상품확인):42, 반품취소(구매자):47, 반품취소(판매자):48, 반품완료(환불완료):44, 반품완료(환불대기):46  |
| searchDate | String | N | 검색할 날짜 대상. 디폴트 requestReturnAt | 주문결제일시:orderedAt, 반품신청일시:requestReturnAt, 반품취소일시:cancelReturnAt, 반품완료일시:completeReturnAt |
| searchStartAt | Date | N | 검색할 반품신청 시작일시. 디폴트 30일전 | |
| searchEndAt | Date | N | 검색할 반품신청 종료일시. 디폴트 오늘 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| returnCount | Integer | 반품 개수 |

### 반품 목록
- 반품 목록을 조회합니다.
- Request

```
GET /api/return
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| start | Integer | N | 페이지 시작 번호. 디폴트 0 | 페이지 사이즈가 20이면 다음 시작 번호는 20 |
| length | Integer | N | 페이지 사이즈. 디폴트 20 |  |
| searchTarget | String | N | 검색 대상 | 구매자 닉네임:buyerNickname, 구매자 이름:buyerName, 구매자 연락처:buyerPhoneNumber, 수령인:recipientName, 주문번호:orderSeq, 주문상품번호:orderProductSeq, 송장번호:trackingNumber |
| searchQuery | String | N | 검색어 | 최대 40자 |
| searchStatus | String | N | 검색할 주문 상태. 콤마(,)로 구분해서 여러개 가능 | 반품신청:40, 반품진행중(상품대기):41, 반품진행중(상품확인):42, 반품취소(구매자):47, 반품취소(판매자):48, 반품완료(환불완료):44, 반품완료(환불대기):46  |
| searchDate | String | N | 검색할 날짜 대상. 디폴트 requestReturnAt | 주문결제일시:orderedAt, 반품신청일시:requestReturnAt, 반품취소일시:cancelReturnAt, 반품완료일시:completeReturnAt |
| searchStartAt | Date | N | 검색할 반품신청 시작일시. 디폴트 30일전 | |
| searchEndAt | Date | N | 검색할 반품신청 종료일시. 디폴트 오늘 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| returnList | List&lt;ReturnList&gt; | 반품 목록 |

- ReturnList

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ |------------ | 
| orderSeq | Long | 주문 번호 | |
| orderProductSeq | Long | 주문 상품 번호 | |
| orderedAt | Date | 주문 결제 일시 | |
| orderState | OrderProductState | 주문 상태 | |
| returnRequestAt | Date | 반품신청일시 | |
| returnCancelAt | Date | 반품취소일시 | |
| returnCompleteAt | Date | 반품완료일시 | |
| buyerReturnReasonType | Integer | 반품사유. 단순변심:1, 다른 상품 잘못 주문:3, 서비스 불만족:4, 배송 지연:5, 상품 파손 및 불량:7, 상품정보 상이:8, 다른 상품 잘못 배송:10 | |
| buyerReturnReason | String | 구매자 반품 사유 | 최대 1,000자 | 
| sellerReturnReason | String | 판매자 반품 불가 메시지 | 최대 200자 |
| sellerPermitMessage | String | 판매자 반품 접수 안내 메시지 | 최대 1,000자 |
| yourProductId | String | 자체 상품 아이디 | 최대 40자 |
| productId | String | Grip 상품 아이디 | 최대 16자 |
| productName | String | 주문 당시 상품명 | 최대 40자 |
| optionNameSeqs | List<Integer> | 조합된 옵션의 종류 번호 | |
| optionName | String | 주문 당시 옵션명 | 최대 120자 |
| price | Double | 구매가 | |
| quantity | Integer | 수량 | |
| productAmount | Double | 상품 주문 금액 | |
| shippingAmount | Double | 배송비 | |
| shippingExtraAmount | Double | 도서/산간지역 추가 배송비 | |
| couponAmount | Double | 쿠폰 할인 금액 | |
| paymentMethod | Integer | 결제 수단 | |
| buyerNickname | String | 구매자 닉네임 | 최대 30자 |
| buyerName | String | 구매자 이름 | 최대 20자 |
| buyerPhoneNumber | String | 구매자 전화번호 | 최대 13자 |
| recipientName | String | 수령인 이름 | 최대 20자 |
| recipientPhoneNumber | String | 수령인 전화번호 | 최대 13자 |
| recipientPostalCode | String | 수령인 우편번호 | 최대 8자 |
| recipientAddress | String | 수령인 주소 | 최대 200자 |
| clearanceCode | String | 개인 통관 번호 | 최대 16자 |

### 반품 접수
- 구매자의 반품 요청을 접수합니다.
- 구매자에게 반품 방법을 안내하는 과정입니다.
- Request

```
POST /api/return/start
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKey | OrderKey | Y | 대상 주문 | |
| message | String | Y | 반품 접수 안내 메시지 | 최대 1,000자 |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| ret | Boolean | 성공여부 |

### 반품 상품 확인
- 구매자가 반품한 상품이 판매자에게 도착했다는 것을 의미합니다.
- Request

```
POST /api/return/receive
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKey | OrderKey | Y | 대상 주문 | |
| receiveProduct | Boolean | Y |  |  |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| ret | Boolean | 성공여부 |

### 반품 승인
- 반품을 승인합니다.
- 구매자에게 환불이 진행됩니다.
- 가상계좌로 결제한 고객인 경우에는 구매자가 환불계좌를 입력해야 환불이 완료됩니다.
- Request

```
POST /api/return/allow
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKey | OrderKey | Y | 대상 주문 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| ret | Boolean | 성공여부 |

### 반품 거절
- 반품을 거절합니다.

- Request

```
POST /api/return/deny
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKey | OrderKey | Y | 대상 주문 | |
| reason | String | Y | 반품 거절 사유 | 최대 200자 |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| ret | Boolean | 성공여부 |

### 교환 개수
- 교환 개수를 조회합니다.
- Request

```
GET /api/exchange/count
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| searchTarget | String | N | 검색 대상 | 구매자 닉네임:buyerNickname, 구매자 이름:buyerName, 구매자 연락처:buyerPhoneNumber, 수령인:recipientName, 주문번호:orderSeq, 주문상품번호:orderProductSeq, 송장번호:trackingNumber |
| searchQuery | String | N | 검색어 | 최대 40자 |
| searchStatus | String | N | 검색할 주문 상태. 콤마(,)로 구분해서 여러개 가능 | 교환신청:50, 교환진행중:51, 교환(배송중):53, 교환(배송완료):54, 교환취소(구매자):55, 교환취소(판매자):52  |
| searchDate | String | N | 검색할 날짜 대상. 디폴트 requestChangeAt | 주문결제일시:orderedAt, 교환신청일시:requestChangeAt, 교환취소일시:cancelChangeAt |
| searchStartAt | Date | N | 검색할 교환신청 시작일시. 디폴트 30일전 | |
| searchEndAt | Date | N | 검색할 교환신청 종료일시. 디폴트 오늘 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| exchangeCount | Integer | 교환 개수 |

### 교환 목록
- 교환 목록을 조회합니다.
- Request

```
GET /api/exchange
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| start | Integer | N | 페이지 시작 번호. 디폴트 0 | 페이지 사이즈가 20이면 다음 시작 번호는 20 |
| length | Integer | N | 페이지 사이즈. 디폴트 20 |  |
| searchTarget | String | N | 검색 대상 | 구매자 닉네임:buyerNickname, 구매자 이름:buyerName, 구매자 연락처:buyerPhoneNumber, 수령인:recipientName, 주문번호:orderSeq, 주문상품번호:orderProductSeq, 송장번호:trackingNumber |
| searchQuery | String | N | 검색어 | 최대 40 |
| searchStatus | String | N | 검색할 주문 상태. 콤마(,)로 구분해서 여러개 가능 | 교환신청:50, 교환진행중:51, 교환(배송중):53, 교환(배송완료):54, 교환취소(구매자):55, 교환취소(판매자):52  |
| searchDate | String | N | 검색할 날짜 대상. 디폴트 requestChangeAt | 주문결제일시:orderedAt, 교환신청일시:requestChangeAt, 교환취소일시:cancelChangeAt |
| searchStartAt | Date | N | 검색할 교환신청 시작일시. 디폴트 30일전 | |
| searchEndAt | Date | N | 검색할 교환신청 종료일시. 디폴트 오늘 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| exchangeList | List&lt;ExchangeList&gt; | 교환 목록 |

- ExchangeList

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| orderSeq | Long | 주문 번호 | |
| orderProductSeq | Long | 주문 상품 번호 | |
| orderedAt | Date | 주문 결제 일시 | |
| orderState | OrderProductState | 주문 상태 | |
| exchangeRequestAt | Date | 교환신청일시 | |
| exchangeCancelAt | Date | 교환취소일시 | |
| buyerChangeReasonType | Integer | 교환사유. 색상 및 사이즈 변경:2, 다른 상품 잘못 주문:3, 상품 파손 및 불량:7, 다른 상품 잘못 배송:10 | |
| buyerChangeReason | String | 구매자 교환 사유 | 최대 1,000자 |
| yourProductId | String | 자체 상품 아이디 | 최대 40자 |
| productId | String | Grip 상품 아이디 | 최대 16자 |
| productName | String | 주문 당시 상품명 | 최대 40자 |
| optionNameSeqs | List<Integer> | 조합된 옵션의 종류 번호 | |
| optionName | String | 주문 당시 옵션명 | 최대 120자 |
| price | Double | 구매가 | |
| quantity | Integer | 수량 | |
| productAmount | Double | 상품 주문 금액 | |
| shippingAmount | Double | 배송비 | |
| shippingExtraAmount | Double | 도서/산간지역 추가 배송비 | |
| couponAmount | Double | 쿠폰 할인 금액 | |
| paymentMethod | Integer | 결제 수단 | |
| buyerNickname | String | 구매자 닉네임 | 최대 30자 |
| buyerName | String | 구매자 이름 | 최대 20자 |
| buyerPhoneNumber | String | 구매자 전화번호 | 최대 13자 |
| recipientName | String | 수령인 이름 | 최대 20자 |
| recipientPhoneNumber | String | 수령인 전화번호 | 최대 13자 |
| recipientPostalCode | String | 수령인 우편번호 | 최대 8자 |
| recipientAddress | String | 수령인 주소 | 최대 200자 |
| clearanceCode | String | 개인 통관 번호 | 최대 16자 |

### 교환 접수
- 구매자의 교환 요청을 접수합니다.
- 구매자에게 교환 방법을 안내하는 과정입니다.
- Request

```
POST /api/exchange/start
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKey | OrderKey | Y | 대상 주문 | |
| message | String | Y | 교환 접수 안내 메시지 | 최대 1,000자 |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| ret | Boolean | 성공여부 |

### 교환 상품 확인
- 구매자가 교환한 상품이 판매자에게 도착했다는 것을 의미합니다.
- Request

```
POST /api/exchange/receive
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKey | OrderKey | Y | 대상 주문 | |
| receiveProduct | Boolean | Y |  |  |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| ret | Boolean | 성공여부 |

### 교환 직접 수령
- 교환 상품을 직접 수령한 경우에 사용합니다.
- 교환 직접 수령을 하면 구매자는 '배송완료' 안내를 받게 됩니다.
- Request

```
POST /api/exchange/direct
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKey | OrderKey | Y | 대상 주문 | |
| changeMemo | String | N | 교환 메모 | 최대 200자. 판매자가 확인하기 위한 메모 |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| ret | Boolean | 성공여부 |

### 교환 승인
- 교환을 승인합니다.
- 구매자에게 교환을 진행합니다. 교환 배송정보가 필요합니다.
- Request

```
POST /api/exchange/allow
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKey | OrderKey | Y | 대상 주문 | |
| changeMemo | String | N | 교환 메모 | 최대 200자. 판매자가 확인하기 위한 메모 |
| deliveryCompanySeq | Integer | Y | 택배회사 번호 | |
| trackingNumber | String | Y | 운송장 번호 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| ret | Boolean | 성공여부 |

### 교환 거절
- 교환을 거절합니다.

- Request

```
POST /api/exchange/deny
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKey | OrderKey | Y | 대상 주문 | |
| reason | String | Y | 교환 거절 사유 | 최대 200자 |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| ret | Boolean | 성공여부 |

## 배송 관리
- 배송을 하기 위해서는 발주(배송준비중)부터 하고 발송을 해야 합니다.
- 발주를 하면 구매자는 주문취소를 할 수 없고 '배송준비중' 안내 푸시를 받습니다.

- DeliveryResult

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| orderSeq | Long | 주문 번호 | |
| orderProductSeq | Long | 주문 상품 번호 | |
| result | Boolean | 성공 여부 | |
| message | String | 실패 사유 | 실패인 경우에만 있음. 최대 100자 |

### 택배회사 목록
- 배송정보에 설정할 수 있는 택배회사 목록입니다.
- Request

```
GET /api/delivery/company
```

- Response

| 이름 | 타입 | 설명 | 
| ----------- | ------------ |------------ | 
| deliveryCompanies | List&lt;DeliveryCompany&gt; | 택배회사 목록 |

- DeliveryCompany

| 이름 | 타입 | 설명 | 비고 |
| ----------- | ------------ |------------ | ------------ |
| companySeq | Integer | 택배회사 번호 | |
| companyName | String | 택배회사 이름 | 최대 40자 |
| serviceType | Integer | 일반배송:1, 새벽배송:2, 해외배송: 3 | |
| tracking | Boolean | 배송추적 가능 여부 | |

### 배송지 변경
- 구매자의 요청으로 배송 주소를 변경합니다.
- Request

```
PUT /api/delivery/info
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderSeq | Long | Y | 주문 번호 | |
| recipientName | String | Y | 수령인 이름 | |
| recipientPhoneNumber | String | Y | 수령인 연락처 | |
| recipientPostalCode | String | Y | 수령지 우편번호 | 최대 8자 |
| recipientAddress1 | String | Y | 수령지 주소 | 최대 100자, 서울특별시 서초구 서초동 강남대로 373 |
| recipientAddress2 | String | Y | 수령지 세부 주소 | 최대 100자, 홍우빌딩 10층 |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| affected | Integer | 주소 변경에 영향 받은 주문 수 |

### 배송 지연 안내
- 재고 부족이나 연휴가 긴 경우에 판매자가 배송 지연을 안내 합니다.
- 배송 지연 안내는 1회만 가능합니다.
- Request

```
PUT /api/delivery/postpone
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKeys | List&lt;OrderKey&gt; | Y | 대상 주문 | |
| reason | String | Y | 배송 지연 사유 | 최대 50자 |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| affected | Integer | 배송 지연 안내한 주문 수 |

```
PUT /api/delivery/postpone/result
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKeys | List&lt;OrderKey&gt; | Y | 대상 주문 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| result | List&lt;DeliveryResult&gt; | 배송 지연 안내 요청 결과 |

### 발주가 필요한 주문 개수
- 발주가 필요한 주문 개수를 조회합니다.
- Request

```
GET /api/delivery/prepare/count
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| searchTarget | String | N | 검색 대상 | 구매자 닉네임:buyerNickname, 구매자 이름:buyerName, 구매자 연락처:buyerPhoneNumber, 수령인:recipientName, 주문번호:orderSeq, 주문상품번호:orderProductSeq |
| searchQuery | String | N | 검색어 | 최대 40자 |
| searchStartAt | Date | N | 검색할 주문/결제 시작일시. 디폴트 30일전 | |
| searchEndAt | Date | N | 검색할 주문/결제 종료일시. 디폴트 오늘 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| prepareCount | Integer | 발주가 필요한 주문 수 |

### 발주할 주문 목록
- 발주가 필요한 주문 목록을 조회합니다.
- Request

```
GET /api/delivery/prepare
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| start | Integer | N | 페이지 시작 번호. 디폴트 0 | 페이지 사이즈가 20이면 다음 시작 번호는 20 |
| length | Integer | N | 페이지 사이즈. 디폴트 20, 최대 100 |  |
| searchTarget | String | N | 검색 대상 | 구매자 닉네임:buyerNickname, 구매자 이름:buyerName, 구매자 연락처:buyerPhoneNumber, 수령인:recipientName, 주문번호:orderSeq, 주문상품번호:orderProductSeq |
| searchQuery | String | N | 검색어 | 최대 40자 |
| searchStartAt | Date | N | 검색할 주문/결제 시작일시. 디폴트 30일전 | |
| searchEndAt | Date | N | 검색할 주문/결제 종료일시. 디폴트 오늘 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| prepareList | List&lt;DeliveryPrepareList&gt; | 발주가 필요한 주문 목록 |

- DeliveryPrepareList

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| orderSeq | Long | 주문 번호 | |
| orderProductSeq | Long | 주문 상품 번호 | |
| orderedAt | Date | 주문 결제 일시 | |
| postponedAt | Date | 배송 지연 안내 일시 | |
| postponedReason | String | 배송 지연 사유 | 최대 50자 |
| yourProductId | String | 자체 상품 아이디 | 최대 40자 |
| productId | String | Grip 상품 아이디 | 최대 16자 |
| productName | String | 주문 당시 상품명 | 최대 40자 |
| optionName | String | 주문 당시 옵션명 | 최대 120자 |
| price | Double | 구매가 | |
| quantity | Integer | 수량 | |
| productAmount | Double | 상품 주문 금액 | |
| shippingAmount | Double | 배송비 | |
| shippingExtraAmount | Double | 도서/산간지역 추가 배송비 | |
| originPostalCode | String | 상품 출고지 우편번호 | 최대 8자 |
| originAddress | String | 상품 출고지 주소 | 최대 200자 |
| buyerNickname | String | 구매자 닉네임 | 최대 30자 |
| buyerName | String | 구매자 이름 | 최대 20자 |
| buyerPhoneNumber | String | 구매자 전화번호 | 최대 13자 |
| recipientName | String | 수령인 이름 | 최대 20자 |
| recipientPhoneNumber | String | 수령인 전화번호 | 최대 13자 |
| recipientPostalCode | String | 수령인 우편번호 | 최대 8자 |
| recipientAddress | String | 수령인 주소 | 최대 200자 |
| deliveryRequest | String | 배송 메시지 | 최대 60자 |
| dawnDeliveryRequest | String | 새벽 배송 메시지 | 최대 60자 |
| clearanceCode | String | 개인 통관 번호 | 최대 16자 |

### 발주 요청
- 배송이 필요한 주문을 발주 요청 합니다.
- 한번에 다수의 주문을 묶어서 요청하는 것을 권장합니다.
- 발주 요청을 하면 구매자는 '배송준비중' 안내를 받고 주문취소를 할 수 없게 됩니다.
- Request

```
PUT /api/delivery/prepare
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKeys | List&lt;OrderKey&gt; | Y | 대상 주문 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| affected | Integer | 발주 요청한 주문 수 |

```
PUT /api/delivery/prepare/result
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKeys | List&lt;OrderKey&gt; | Y | 대상 주문 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| result | List&lt;DeliveryResult&gt; | 발주 요청 결과 |

### 발송할 주문 개수
- 발송이 필요한 주문 개수를 조회합니다.
- Request

```
GET /api/delivery/start/count
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| searchTarget | String | N | 검색 대상 | 구매자 닉네임:buyerNickname, 구매자 이름:buyerName, 구매자 연락처:buyerPhoneNumber, 수령인:recipientName, 주문번호:orderSeq, 주문상품번호:orderProductSeq |
| searchQuery | String | N | 검색어 | 최대 40자 |
| searchStartAt | Date | N | 검색할 주문/결제 시작일시. 디폴트 30일전 | |
| searchEndAt | Date | N | 검색할 주문/결제 종료일시. 디폴트 오늘 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| startCount | Integer | 발송이 필요한 주문 수 |

### 발송이 필요한 주문 목록
- 발송이 필요한 주문 목록을 조회합니다.
- Request

```
GET /api/delivery/start
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| start | Integer | N | 페이지 시작 번호. 디폴트 0 | 페이지 사이즈가 20이면 다음 시작 번호는 20 |
| length | Integer | N | 페이지 사이즈. 디폴트 20, 최대 100 |  |
| searchTarget | String | N | 검색 대상 | 구매자 닉네임:buyerNickname, 구매자 이름:buyerName, 구매자 연락처:buyerPhoneNumber, 수령인:recipientName, 주문번호:orderSeq, 주문상품번호:orderProductSeq |
| searchQuery | String | N | 검색어 | 최대 40자 |
| searchStartAt | Date | N | 검색할 주문/결제 시작일시. 디폴트 30일전 | |
| searchEndAt | Date | N | 검색할 주문/결제 종료일시. 디폴트 오늘 | |

- Response

| 이름 | 타입 | 설명 |
| -----------  | ------------ |------------ | 
| startList | List&lt;DeliveryStartList&gt; | 발송이 필요한 주문 목록 |

- DeliveryStartList

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| orderSeq | Long | 주문 번호 | |
| orderProductSeq | Long | 주문 상품 번호 | |
| orderedAt | Date | 주문 결제 일시 | |
| deliveryCompanySeq | Integer | 택배 회사 번호 | |
| deliveryTrackingNumber | String | 송장 번호 | 최대 40자 |
| yourProductId | String | 자체 상품 아이디 | 최대 40자 |
| productId | String | Grip 상품 아이디 | 최대 16자 |
| productName | String | 주문 당시 상품명 | 최대 40자 |
| optionName | String | 주문 당시 옵션명 | 최대 120자 |
| price | Double | 구매가 | |
| quantity | Integer | 수량 | |
| productAmount | Double | 상품 주문 금액 | |
| shippingAmount | Double | 배송비 | |
| shippingExtraAmount | Double | 도서/산간지역 추가 배송비 | |
| originPostalCode | String | 상품 출고지 우편번호 | 최대 8자 |
| originAddress | String | 상품 출고지 주소 | 최대 200자 |
| buyerNickname | String | 구매자 닉네임 | 최대 30자 |
| buyerName | String | 구매자 이름 | 최대 20자 |
| buyerPhoneNumber | String | 구매자 전화번호 | 최대 13자 |
| recipientName | String | 수령인 이름 | 최대 20자 |
| recipientPhoneNumber | String | 수령인 전화번호 | 최대 13자 |
| recipientPostalCode | String | 수령인 우편번호 | 최대 8자 |
| recipientAddress | String | 수령인 주소 | 최대 200자 |
| deliveryRequest | String | 배송 메시지 | 최대 60자 |
| dawnDeliveryRequest | String | 새벽 배송 메시지 | 최대 60자 |
| clearanceCode | String | 개인 통관 번호 | 최대 16자 |

### 택배 정보 설정
- 택배회사 및 운송장 번호를 설정합니다.
- 택배 정보를 설정해야 발송 요청을 성공할 수 있습니다.
- 운송장 번호를 잘못 설정한 경우에 배송중 상태이면 다시 설정할 수 있습니다.
- Request

```
PUT /api/delivery/shipping
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| shippings | List&lt;DeliveryShipping&gt; | Y | 대상 주문 | |

- OrderKey

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderSeq | Long | Y | 주문 번호 | |
| orderProductSeq | Long | Y | 주문 상품 번호 | |
| companySeq | Integer | Y | 택배 회사 번호 | |
| trackingNumber | String | Y | 운송장 번호 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| affected | Integer | 설정 성공한 주문 수 |

```
PUT /api/delivery/shipping/result
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKeys | List&lt;OrderKey&gt; | Y | 대상 주문 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| result | List&lt;DeliveryResult&gt; | 택배 정보 설정 요청 결과 |

### 발송 요청
- 택배사에 물건을 전달한 후에 발송 요청을 합니다.
- 직접배송이나 배송없음 상품이 아닌 경우에는 택배 정보 설정부터 해야 합니다.
- 한번에 다수의 주문을 묶어서 요청하는 것을 권장합니다.
- 발송 요청을 하면 구매자는 '배송중' 안내를 받고 배송추적 및 구매확정이 가능해집니다.
- 배송없음 상품인 경우에는 즉시 '배송완료'가 됩니다.
- Request

```
PUT /api/delivery/start
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKeys | List&lt;OrderKey&gt; | Y | 대상 주문 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| affected | Integer | 발송 요청 성공한 주문 수 |

```
PUT /api/delivery/start/result
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKeys | List&lt;OrderKey&gt; | Y | 대상 주문 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| result | List&lt;DeliveryResult&gt; | 발송 요청 결과 |

### 배송 현황 확인이 가능한 주문 개수
- 배송 현황 확인이 가능한 주문 개수를 조회합니다.
- Request

```
GET /api/delivery/status/count
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| searchTarget | String | N | 검색 대상 | 구매자 닉네임:buyerNickname, 구매자 이름:buyerName, 구매자 연락처:buyerPhoneNumber, 수령인:recipientName, 주문번호:orderSeq, 주문상품번호:orderProductSeq |
| searchQuery | String | N | 검색어 | 최대 40자 |
| searchStartAt | Date | N | 검색할 주문/결제 시작일시. 디폴트 30일전 | |
| searchEndAt | Date | N | 검색할 주문/결제 종료일시. 디폴트 오늘 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| statusCount | Integer | 확인 가능한 주문 수 |

### 배송 현황 확인이 가능한 주문 목록
- 배송 현황 확인이 가능한 주문 목록을 조회합니다.
- 발송 요청한 주문을 여기서 확인할 수 있습니다.
- Request

```
GET /api/delivery/status
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| start | Integer | N | 페이지 시작 번호. 디폴트 0 | 페이지 사이즈가 20이면 다음 시작 번호는 20 |
| length | Integer | N | 페이지 사이즈. 디폴트 20, 최대 100 |  |
| searchTarget | String | N | 검색 대상 | 구매자 닉네임:buyerNickname, 구매자 이름:buyerName, 구매자 연락처:buyerPhoneNumber, 수령인:recipientName, 주문번호:orderSeq, 주문상품번호:orderProductSeq, 송장번호:trackingNumber |
| searchQuery | String | N | 검색어 | 최대 40자 |
| searchStartAt | Date | N | 검색할 주문/결제 시작일시. 디폴트 30일전 | |
| searchEndAt | Date | N | 검색할 주문/결제 종료일시. 디폴트 오늘 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| statusList | List&lt;DeliveryStatusList&gt; | 확인이 가능한 주문 목록 |

- DeliveryStatusList

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| orderSeq | Long | 주문 번호 | |
| orderProductSeq | Long | 주문 상품 번호 | |
| orderedAt | Date | 주문 결제 일시 | |
| deliveryCompanySeq | Integer | 택배 회사 번호 | |
| deliveryTrackingNumber | String | 송장 번호 | 최대 40자 |
| startAt | Date | 발송 시작 일시 | |
| orderState | OrderProductState | 주문 상태 | |
| yourProductId | String | 자체 상품 아이디 | 최대 40자 |
| productId | String | Grip 상품 아이디 | 최대 16자 |
| productName | String | 주문 당시 상품명 | 최대 40자 |
| optionName | String | 주문 당시 옵션명 | 최대 120자 |
| price | Double | 구매가 | |
| quantity | Integer | 수량 | |
| productAmount | Double | 상품 주문 금액 | |
| shippingAmount | Double | 배송비 | |
| shippingExtraAmount | Double | 도서/산간지역 추가 배송비 | |
| originPostalCode | String | 상품 출고지 우편번호 | 최대 8자 |
| originAddress | String | 상품 출고지 주소 | 최대 200자 |
| buyerNickname | String | 구매자 닉네임 | 최대 30자 |
| buyerName | String | 구매자 이름 | 최대 20자 |
| buyerPhoneNumber | String | 구매자 전화번호 | 최대 13자 |
| recipientName | String | 수령인 이름 | 최대 20자 |
| recipientPhoneNumber | String | 수령인 전화번호 | 최대 13자 |
| recipientPostalCode | String | 수령인 우편번호 | 최대 8자 |
| recipientAddress | String | 수령인 주소 | 최대 200자 |
| deliveryRequest | String | 배송 메시지 | 최대 60자 |
| dawnDeliveryRequest | String | 새벽 배송 메시지 | 최대 60자 |
| clearanceCode | String | 개인 통관 번호 | 최대 16자 |

### 직접 수령
- 구매자가 상품을 직접 수령한 경우에 사용합니다.
- 직접 수령을 하면 구매자는 '배송완료' 안내를 받게 됩니다.
- Request

```
PUT /api/delivery/direct
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKeys | List&lt;OrderKey&gt; | Y | 대상 주문 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| affected | Integer | 직접 수령 요청 성공한 주문 수 |

```
PUT /api/delivery/direct/result
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKeys | List&lt;OrderKey&gt; | Y | 대상 주문 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| result | List&lt;DeliveryResult&gt; | 발송 요청 결과 |

### 강제 배송완료
- 구매자에게 상품을 발송하여 배송중 상태이지만 송장번호의 오류나 기타 택배사의 오류로 배송 추적이 되지 않는 경우에 사용합니다.
- 해외배송은 배송시작 후 30일이 경과해야 사용할 수 있고 국내배송은 배송시작 후 10일이 경과해야 사용할 수 있습니다.
- 강제 배송완료를 하면 구매자는 '배송완료' 안내를 받게 됩니다.
- 배송완료가 확실하지만 배송추적상의 문제가 있는 경우에만 사용해야 합니다.
- Request

```
PUT /api/delivery/complete
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKeys | List&lt;OrderKey&gt; | Y | 대상 주문 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| affected | Integer | 강제 배송완료 요청 성공한 주문 수 |

```
PUT /api/delivery/complete/result
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderKeys | List&lt;OrderKey&gt; | Y | 대상 주문 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| result | List&lt;DeliveryResult&gt; | 강제 배송완료 요청 결과 |

## 1:1 문의 관리
### 1:1 문의 개수
- 1:1 문의 개수를 조회합니다.
- Request

```
GET /api/inquiry/count
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| inquiryType | InquiryType | N | 검색할 문의 유형 | |
| searchTarget | String | N | 검색 대상 | 문의자 닉네임:username, 문의 제목:title, 주문번호:orderSeq |
| searchQuery | String | N | 최대 40자 | |
| searchStartAt | Date | N | 검색할 문의 등록 시작일시. 디폴트 30일전 | |
| searchEndAt | Date | N | 검색할 문의 등록 종료일시. 디폴트 오늘 | |
| needReply | Boolean | N | 답변 필요. 디폴트 false | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| inquiryCount | Integer | 1:1 문의 개수 |

### 1:1 문의 목록
- 1:1 문의 목록을 조회합니다.
- 그립에서 1:1 문의는 상품 상세와 주문서를 통해서 등록됩니다.
- Request

```
GET /api/inquiry
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| inquiryType | InquiryType | N | 검색할 문의 유형 | |
| searchTarget | String | N | 검색 대상 | 문의자 닉네임:username, 문의 제목:title, 주문번호:orderSeq |
| searchQuery | String | N | 검색어 | |
| searchStartAt | Date | N | 검색할 문의 등록 시작일시. 디폴트 30일전 | |
| searchEndAt | Date | N | 검색할 문의 등록 종료일시. 디폴트 오늘 | |
| needReply | Boolean | N | 답변 필요. 디폴트 false | |
| start | Integer | N | 페이지 시작 번호. 디폴트 0 | 페이지 사이즈가 20이면 다음 시작 번호는 20 |
| length | Integer | N | 페이지 사이즈. 디폴트 20 |  |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| inquiryList | List&lt;InquiryList&gt; | 1:1 문의 목록 |

- InquiryList

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| inquirySeq | Long | 문의 번호 | |
| inquiryType | InquiryType | 문의 유형 | |
| orderSeq | Long | 주문 번호 | 상품 상세에서 문의한 경우에는 null |
| title | String | 문의 제목 | 최대 50자 |
| userName | String | 문의한 사용자 닉네임 | 최대 30자 |
| yourProductId | String | 자체 상품 아이디 | 최대 40자 |
| productId | String | Grip 상품 아이디 | 최대 16자 |
| productName | String | 주문 당시 상품명 | 최대 40자 |
| email | String | 문의한 사용자 이메일 | 최대 60자 |
| createdAt | Date | 문의일시 | |
| replyAt | Date | 답변일시 | |
| imageUrls | List&lt;String&gt; | 이미지 있는 경우 URL 목록 | 최대 10개 |

- InquiryType

| 설명 | 값 | 비고 |
| -----------  | ------------ | ------------ |
| 상품 문의 | 1 | |
| 주문 확인 | 2 | |
| 배송일/배송지연 | 3 | |
| 누락 및 오배송 | 4 | |
| 배송전 취소요청 | 5 | |
| 반품/교환 지연 | 6 | |
| 반품/교환 철회 | 7 | |
| 환불 문의 | 8 | |
| 이벤트/사은품 문의 | 9 | |
| 기타 | 10 | |

### 1:1 문의 조회
- 1:1 문의를 조회합니다.
- Request

```
GET /api/inquiry/{inquirySeq}
```

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| inquiry | Inquiry | 1:1 문의 |

- Inquiry

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| inquirySeq | Long | 문의 번호 | |
| inquiryType | InquiryType | 문의 유형 | |
| orderSeq | Long | 주문 번호 | 상품 상세에서 문의한 경우에는 null |
| title | String | 문의 제목 | 최대 50자 |
| content | String | 문의 내용 | 최대 1,000자 |
| reply | String | 답변 내용 | 최대 1,000자 |
| userName | String | 문의한 사용자 닉네임 | 최대 30자 |
| yourProductId | String | 자체 상품 아이디 | 최대 40자 |
| productId | String | Grip 상품 아이디 | 최대 16자 |
| productName | String | 주문 당시 상품명 | 최대 40자 |
| email | String | 문의한 사용자 이메일 | 최대 60자 |
| createdAt | Date | 문의일시 | |
| replyAt | Date | 답변일시 | |
| imageUrls | List&lt;String&gt; | 이미지 있는 경우 URL 목록 | 최대 10개 |

### 1:1 문의 답변 등록
- 1:1 문의 답변을 등록합니다.
- 답변이 등록되는 즉시 문의자에게 알림이 나갑니다.
- Request

```
POST /api/inquiry/{inquirySeq}
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| reply | String | Y | 답변 내용 | 최대 1,000자 |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| inquirySeq | Long | 1:1 문의 번호 |

### 1:1 문의 답변 수정
- 1:1 문의 답변을 수정합니다.
- 수정하는 경우에는 문의자에게 수정 사항에 대해서 알려줄지 선택할 수 있습니다.
- Request

```
PUT /api/inquiry/{inquirySeq}
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| reply | String | Y | 답변 내용 | 최대 1,000자 |
| noti | Boolean | Y | 답변 수정 알림 여부 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| inquirySeq | Long | 1:1 문의 번호 |

## 리뷰 관리
### 리뷰 개수
- 리뷰 개수를 조회합니다.
- Request

```
GET /api/review/count
```

| searchQuery | String | N | 검색할 작성자 닉네임 | |
| searchStartAt | Date | N | 검색할 문의 등록 시작일시. 디폴트 30일전 | |
| searchEndAt | Date | N | 검색할 문의 등록 종료일시. 디폴트 오늘 | |
| needReply | Boolean | N | 답변 필요. 디폴트 false | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| reviewCount | Integer | 리뷰 개수 |

### 리뷰 목록
- 리뷰 목록을 조회합니다.
- Request

```
GET /api/review
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| searchQuery | String | N | 검색할 작성자 닉네임 | |
| searchStartAt | Date | N | 검색할 문의 등록 시작일시. 디폴트 30일전 | |
| searchEndAt | Date | N | 검색할 문의 등록 종료일시. 디폴트 오늘 | |
| needReply | Boolean | N | 답변 필요. 디폴트 false | |
| start | Integer | N | 페이지 시작 번호. 디폴트 0 | 페이지 사이즈가 20이면 다음 시작 번호는 20 |
| length | Integer | N | 페이지 사이즈. 디폴트 20 |  |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| reviewList | List&lt;ReviewList&gt; | 리뷰 목록 |

- ReviewList

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| reviewSeq | Long | 리뷰 번호 | |
| grade | Float | 별점 | |
| review | String | 리뷰 내용 | 최대 500자 |
| reply | String | 답변 내용 | 최대 500자 |
| userName | String | 리뷰 작성한 사용자 닉네임 | 최대 30자 |
| yourProductId | String | 자체 상품 아이디 | 최대 40자 |
| productId | String | Grip 상품 아이디 | 최대 16자 |
| productName | String | 주문 당시 상품명 | 최대 40자 |
| createdAt | Date | 작성일시 | |
| replyAt | Date | 답변일시 | |
| imageUrls | List&lt;String&gt; | 이미지 있는 경우 URL 목록 | 최대 10개 |

### 리뷰 답변 등록
- 리뷰의 답변을 등록합니다.
- 답변이 등록되는 즉시 리뷰 작성자에게 알림이 나갑니다.
- Request

```
POST /api/review/{reviewSeq}
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| reply | String | Y | 답변 내용 | 최대 500자 |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| reviewSeq | Long | 리뷰 번호 |

### 리뷰 답변 수정
- 리뷰의 답변을 수정합니다.
- 수정하는 경우에는 리뷰 작성자에게 수정 사항에 대해서 알려줄지 선택할 수 있습니다.
- Request

```
PUT /api/review/{reviewSeq}
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| reply | String | Y | 답변 내용 | 최대 500자 |
| noti | Boolean | Y | 답변 수정 알림 여부 | |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| reviewSeq | Long | 리뷰 번호 |

## 그룹 관리 (그룹 계정 전용)
### 맴버 수
- 그룹 맴버 수를 조회합니다.
- Request

```
GET /api/group/member/count
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| searchQuery | String | N | 검색할 맴버의 닉네임 or 소속명 | 최대 40자 |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| memberCount | Integer | 맴버 수 |

### 맴버 목록
- 그룹 맴버 목록을 조회합니다.
- Request

```
GET /api/group/member/
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| searchQuery | String | N | 검색할 맴버의 닉네임 or 소속명 | 최대 40자 |
| sortField | Integer | N | 정렬 필드 | 이용자 아이디: 2, 닉네임: 3, 소속명: 4, 상품수: 7, 방송수: 8, 팔로워수: 9, 최근방송일시: 10, 등록일시(디폴트): -1 |
| sortOrder | String | N | 정렬 순서 | DESC, ASC |
| start | Integer | N | 페이지 시작 번호. 디폴트 0 | 페이지 사이즈가 20이면 다음 시작 번호는 20 |
| length | Integer | N | 페이지 사이즈. 디폴트 20 |  |

- Response

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| memberList | List&lt;GroupMemberList&gt; | 맴버 목록 |

- GroupMemberList

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| userId | String | 그립 내부 사용자 아이디 | 최대 16자 |
| userTag | String | 이용자 아이디. 프로필에 보이는 아이디 | 최대 16자 |
| userName | String | 닉네임. 프로필에 보이는 닉네임 | 최대 30자 |
| master | Boolean | 그룹 마스터 여부 | |
| active | Boolean | 방송권한 여부 | |
| profileUrl | String | 프로필 URL | 최대 300자 |
| companyName | String | 소속명 | 최대 40자 |
| managerName | String | 브랜드 담당 매니저 이름 | 최대 20자 |
| managerEmail | String | 브랜드 담당 매니저 이메일 | 최대 60자 |
| managerMobile | String | 브랜드 담당 매니저 핸드폰 번호 | 최대 13자 |
| productCount | Integer | 상품 수 | |
| contentCount | Integer | 방송 수 | |
| followerCount | Integer | 팔로워 수 | |
| lastPublishedAt | Date | 최근 방송일시 | |
| createdAt | Date | 등록일시 | |
| memo | String | 관리용 메모 | 최대 200자 |
| accessKey | String | API AccessKey | 최대 16자 |
| secretKey | String | API SecretKey | 최대 16자 |


### 맴버 등록
- 그룹 맴버를 등록합니다.
- Request

```
POST /api/group/member
```

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| yourMemberId | String | N | 자체 맴버 아이디 | 최대 40자 |
| companyName | String | Y | 소속명 | 최대 40자 |
| userTag | String | Y | 이용자 아이디. 프로필에 보이는 아이디 | 최대 16자 |
| userName | String | Y | 닉네임. 프로필에 보이는 닉네임 | 최대 20자 |
| managerName | String | Y | 브랜드 담당 매니저 이름 | 최대 30자 |
| managerEmail | String | Y | 브랜드 담당 매니저 이메일 | 최대 40자 |
| managerMobile | String | Y | 브랜드 담당 매니저 핸드폰 번호 | |
| memo | String | N | 관리용 메모 | 최대 200자 |

- Response

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| userId | String | 그립 내부 사용자 아이디 | 최대 16자 |

### 맴버 수정
- 그룹 맴버의 정보를 수정합니다.
- Request는 맴버 등록과 동일합니다.

```
PUT /api/group/member/{userId}
```

- Response

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| userId | String | 그립 내부 사용자 아이디 | 최대 16자 |

### 맴버 삭제
- 그룹에서 해당 맴버를 삭제합니다.

```
DELETE /api/group/member/{userId}
```

- Response

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| userId | String | 그립 내부 사용자 아이디 | 최대 16자 |

### 방송 권한 부여
- 해당 맴버에게 방송 권한을 부여합니다.

```
PUT /api/group/member/{userId}/enable
```

- Response

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| userId | String | 그립 내부 사용자 아이디 | 최대 16자 |

### 방송 권한 제거
- 해당 맴버의 방송 권한을 제거합니다.

```
PUT /api/group/member/{userId}/disable
```

- Response

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| userId | String | 그립 내부 사용자 아이디 | 최대 16자 |

### 패스워드 초기화
- 해당 맴버의 패스워드를 초기화 합니다.
- 초기화하면 임시 패스워드가 발급됩니다.

```
PUT /api/group/member/{userId}/password/reset
```

- Response

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| userId | String | 그립 내부 사용자 아이디 | 최대 16자 |
| password | String | 새로운 임시 패스워드 | 최대 16자 |


### 패스워드 전송
- 해당 맴버의 managerEmail로 현재 패스워드를 전송 합니다.

```
PUT /api/group/member/{userId}/password/send
```

- Response

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| userId | String | 그립 내부 사용자 아이디 | 최대 16자 |
