## 상품 관리
- 배송/반품/교환 정보와 A/S 및 특이 사항 정보는 Grip 판매자센터에서 설정한 판매자 기본 설정을 사용할 수 있습니다.
- 기본으로 설정한 정보와 다른 경우에만 설정하는 것을 권장합니다.
- 입점할 때 판매 상품의 카테고리에 따라 일반 상품과 전자 상품으로 구분됩니다. 전자 상품은 배송이 필요 없는 e-Ticket 형태의 기프트콘이나 여행 상품을 의미합니다.
- 상품 등록 시 어떤 상품 판매자인지에 따라 입력 정보가 상이합니다.

## 제공 API
- [이미지 업로드](#이미지-업로드-codepost-apiproductimagecode)
- [카테고리 목록](#카테고리-목록-codeget-apiproductcategorycode)
- [상품정보 제공고시 목록](#상품정보-제공고시-목록-codeget-apiproductlegalcode)
- [인증 정보 목록](#인증-정보-목록-codeget-apiproductcertcode)
- [모델 목록](#모델-목록-codeget-apiproductmodelcode)
- [브랜드 목록](#브랜드-목록-codeget-apiproductbrandcode)
- [제조사 목록](#제조사-목록-codeget-apiproductmanufacturercode)
- [상품 개수](#상품-개수-codeget-apiproductcountcode)
- [상품 목록](#상품-목록-codeget-apiproductcode)
- [상품 상세](#상품-상세-codeget-apiproductproductidcode)
- [상품 등록](#상품-등록-codepost-apiproductcode)
- [상품 수정](#상품-수정-codeput-apiproductproductidcode)
- [상품 삭제](#상품-삭제-codedelete-apiproductproductidcode)
- [상품 판매 시작](#상품-판매-시작-codeput-apiproductproductidstartcode)
- [상품 판매 중지](#상품-판매-중지-codeput-apiproductproductidstopcode)

---

## 모델

<a id="category"></a>
<details>
<summary><strong>Category</strong></summary>

| 이름 | 타입 | 설명                                                                         | 비고 |
| ----------- | ------------ |----------------------------------------------------------------------------| ------------ |
| categorySeq | Integer | 카테고리 번호                                                                    | |
| parentCategorySeq | Integer | 부모 카테고리 번호                                                                 | |
| level | Integer | 카테고리 트리에서 루트로부터 현재 카테고리까지의 거리(간선 수)를 나타내는 정수 값입니다.<br>루트 자식 노드는 1부터 시작합니다. | |
| categoryName | String | 카테고리 이름                                                                    | 최대 20자 |
</details>

<a id="legal"></a>
<details>
<summary><strong>Legal</strong></summary>

| 이름 | 타입                                  | 설명 | 비고 |
| -----------  |-------------------------------------|------------ | ------------ |
| legalSeq | Integer                             | 상품정보 제공고시 번호 | |
| legalName | String                              | 상품정보 제공고시 이름 | 최대 40자 |
| items | List&lt;[LegalItem](#legalitem)&gt; | 세부 항목 | |
</details>

<a id="legalitem"></a>
<details>
<summary><strong>LegalItem</strong></summary>

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ |
| itemSeq | Integer | 세부 항목 번호 | |
| title | String | 세부 항목 이름 | 최대 60자 |
| body | String | 세부 항목 설명 | 최대 2,000자 |
</details>

<a id="certtype"></a>
<details>
<summary><strong>CertType</strong></summary>

| 이름 | 타입                                      | 설명 | 비고 |
| -----------  |-----------------------------------------|------------ | ------------ |
| certTypeSeq | Integer                                 | 인증 종류 번호 | |
| typeName | String                                  | 인증 종류 이름 | 최대 40자 |
| items | List&lt;[CertSubject](#certsubject)&gt; | 인증 종류 세부 항목 | |
</details>

<a id="certsubject"></a>
<details>
<summary><strong>CertSubject</strong></summary>

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ |
| certSubjectSeq | Integer | 세부 항목 번호 | |
| subjectName | String | 세부 항목 이름 | 최대 60자 |
| required | Boolean | 인증기관 및 인증번호 필수 입력 여부 |  |
</details>

<a id="productlist"></a>
<details>
<summary><strong>ProductList</strong></summary>

| 이름 | 타입 | 설명                                  | 
| -----------  | ------------ |-------------------------------------| 
| yourProductId | String | 자체 상품 아이디                           |
| productId | String | Grip 상품 아이디                         |
| productName | String | 상품명                                 |
| mainImageUrl | String | 대표 이미지 URL                          |
| categorySeq | Integer | 상품 카테고리 번호                          |
| legalSeq | Integer | 상품정보 제공고시 번호                        |
| expose | Boolean | 판매 여부                               |
| useOption | Boolean | 옵션 사용 여부                            |
| costPrice | Double | 상품 가격                               |
| sellingPrice | Double | 상시 할인가                              |
| liveSellingPrice | Double | 라이브가                                |
| originName | String | 원산지                                 |
| manufacturer | String | 제조사                                 |
| brandName | String | 브랜드                                 |
| modelName | String | 모델명                                 |
| ondemand | Boolean | 주문제작 여부                             |
| returnImpossible | Boolean | 반품 불가 여부. 주문제작 여부가 `true`인 경우에만 사용.   |
| taxType | Integer | 부가세. 과세상품: 1, 면세상품: 2, 영세상품: 3      |
| startAt | Date | 판매 시작일시                             |
| endAt | Date | 판매 종료일시                             |
| stockCount | Integer | 재고 수량                               |
| useMinOrderQuantity | Boolean | 최소 구매 개수 사용 여부                      |
| useMaxOrderQuantity | Boolean | 최대 구매 개수 사용 여부                      |
| minOrderQuantity | Integer | 최소 구매 개수                            |
| maxOrderQuantity | Integer | 최대 구매 개수                            |
| allowCoupon | Boolean | 쿠폰 적용 가능 상품 여부. 쿠폰 사용 가능이면 Y, 불가면 N |
| overseasDirect | Boolean | 해외배송 여부                             |
| createdAt | Date | 등록일시                                |
| modifiedAt | Date | 수정일시                                |
</details>

<a id="product"></a>
<details>
<summary><strong>Product</strong></summary>

| 이름                        | 타입                                          | 설명                                                     | 비고     |
|---------------------------|---------------------------------------------|--------------------------------------------------------|--------| 
| yourProductId             | String                                      | 자체 상품 아이디                                              | 최대 40자 |
| productId                 | String                                      | Grip 상품 아이디                                            | 최대 16자 |
| productName               | String                                      | 상품명                                                    | 최대 40자 |
| categorySeq               | Integer                                     | 상품 카테고리 번호                                             |        |
| legalSeq                  | Integer                                     | 상품정보 제공고시 번호                                           |        |
| legalItems                | List&lt;[LegalItem](#legalitem)&gt;         | 상품정보 제공고시 상세                                           |        |
| introduction              | String                                      | 상품 설명                                                  | 최대 50자 |
| expose                    | Boolean                                     | 판매 여부                                                  |        |
| useOption                 | Boolean                                     | 옵션 사용 여부                                               |        |
| option                    | [ProductOption](#productoption)             | 옵션 정보                                                  |        |
| costPrice                 | Double                                      | 상품 가격                                                  |        |
| sellingPrice              | Double                                      | 상시 할인가                                                 |        |
| liveSellingPrice          | Double                                      | 라이브가                                                   |        |
| useSpecialPrice           | Boolean                                     | 행사 할인가 사용 여부                                           |        |
| specialPrice              | [ProductSpecialPrice](#productspecialprice) | 행사 할인가                                                 |        |
| originName                | String                                      | 원산지                                                    | 최대 20자 |
| manufacturer              | String                                      | 제조사                                                    | 최대 32자 |
| brandName                 | String                                      | 브랜드                                                    | 최대 32자 |
| modelName                 | String                                      | 모델명                                                    | 최대 32자 |
| ondemand                  | Boolean                                     | 주문제작 여부                                                |        |
| returnImpossible          | Boolean                                     | 반품 불가 여부                                               |        |
| taxType                   | Integer                                     | 부가세. 과세상품: 1, 면세상품: 2, 영세상품: 3                         |        |
| startAt                   | Date                                        | 판매 시작일시                                                |        |
| endAt                     | Date                                        | 판매 종료일시                                                |        |
| stockCount                | Integer                                     | 재고 수량                                                  |        |
| useMinOrderQuantity       | Boolean                                     | 최소 구매 개수 사용 여부                                         |        |
| useMaxOrderQuantity       | Boolean                                     | 최대 구매 개수 사용 여부                                         |        |
| minOrderQuantity          | Integer                                     | 최소 구매 개수                                               |        |
| maxOrderQuantity          | Integer                                     | 최대 구매 개수                                               |        |
| useMaxOrderQuantityPeriod | Boolean                                     | 최대 구매 개수 적용 기간 사용 여부                                   |        |
| maxOrderQuantityStartAt   | Date                                        | 최대 구매 개수 적용 시작일시                                       |        |
| maxOrderQuantityEndAt     | Date                                        | 최대 구매 개수 적용 종료일시                                       |        |
| allowCoupon               | Boolean                                     | 쿠폰 적용 가능 상품 여부. 쿠폰 사용 가능이면 Y, 불가면 N                    |        |
| overseasDirect            | Boolean                                     | 해외배송 여부                                                |        |
| customDelivery            | Boolean                                     | 커스텀 배송 정보 사용 여부                                        |        |
| delivery                  | [ProductDelivery](#productdelivery)         | 상품 배송 정보                                               |        |
| customAs                  | Boolean                                     | 커스텀 A/S 사용 여부                                          |        |
| as                        | [ProductAfterService](#productafterservice) | 상품 A/S 정보                                              |        |
| certTypeSeq               | Integer                                     | 인증 종류                                                  |        |
| certSubjectSeq            | Integer                                     | 인증 세부 항목                                               |        |
| certAgency                | String                                      | 인증 기관                                                  | 최대 40자 |
| certNumber                | String                                      | 인증 번                                                   | 최대 40자 |
| tags                      | List&lt;String&gt;                          | 태그 목록                                                  | 최대 20개 |
| previewImageUrls          | List&lt;String&gt;                          | 상품 상단 이미지 URL 목록                                       |        |
| detailImageUrls           | List&lt;String&gt;                          | 상품 상세 이미지 URL 목록                                       |        |
| voucher                   | [ProductVoucher](#productvoucher)           | 전자 상품인 경우에 설정한 가이드 정보                                  |        |
| createdAt                 | Date                                        | 등록일시                                                   |        |
| modifiedAt                | Date                                        | 수정일시                                                   |        |
| zeroPriceReasonType       | Integer                                     | 0원 상품 사유 유형. 합배송: 1, 이벤트(프로모션): 2, 사은품: 3, 기타: 4       |        |
| zeroPriceReasonText       | String                                      | 0원 상품 사유 상세. 0원 상품 사유 유형이 4인 경우 필수, 나머지 유형에서는 사용되지 않음. | 최대 50자 |
</details>

<a id="productspecialprice"></a>
<details>
<summary><strong>ProductSpecialPrice</strong></summary>

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ |
| specialPrice | Double | 행사할인가 | |
| startAt | Date | 행사 할인가 시작일시 | |
| endAt | Date | 행사 할인가 종료일시 | |
</details>

<a id="productvoucher"></a>
<details>
<summary><strong>ProductVoucher</strong></summary>

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ |
| guide | String | 예약/사용 안내 | |
| notice | String | 유의사항 | |
| cancelGuide | String | 취소/환불 방법 | |
| cancelFeeGuide | String | 취소 수수료 안내 | |
| cancelNotice | String | 취소 유의사항 | |
</details>

<a id="productoption"></a>
<details>
<summary><strong>ProductOption</strong></summary>

| 이름 | 타입                                                                | 설명 | 
| -----------  |-------------------------------------------------------------------|------------ | 
| types | List&lt;[ProductOptionType](#productoptiontype)&gt;               | 옵션 종류 목록. 최대 3개 |
| names | List&lt;[ProductOptionName](#productoptionname)&gt;               | 옵션 종류별 항목 목록. 종류별로 최대 100개 |
| combinations | List&lt;[ProductOptionCombination](#productoptioncombination)&gt; | 옵션 종류를 조합한 최종 옵션 정보 목록 |
</details>

<a id="productoptiontype"></a>
<details>
<summary><strong>ProductOptionType</strong></summary>

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ |
| typeSeq | Integer | 옵션 종류 번호 | |
| optionType | String | 옵션 종류 명칭 | ex) 색상. 최대 30자 |
</details>

<a id="productoptionname"></a>
<details>
<summary><strong>ProductOptionName</strong></summary>

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ |
| typeSeq | Integer | 옵션 종류 번호 | |
| nameSeq | Integer | 옵션 종류별 항목 번호 | |
| optionName | String | 옵션 항목 명칭 | ex) 블루, 블랙, 레드. 최대 120자 |
</details>

<a id="productoptioncombination"></a>
<details>
<summary><strong>ProductOptionCombination</strong></summary>

| 이름 | 타입 | 설명                                     | 비고 |
| -----------  | ------------ |----------------------------------------|------------ | 
| optionKey | String | 조합된 옵션의 키                              | |
| nameSeqs | List&lt;Integer&gt; | 조합된 옵션 항목 번호 목록                        | |
| price | Double | 추가 가격. 마이너스 가격 가능. 0원인 조합이 1개 이상 있어야 함 | |
| stockCount | Integer | 재고 수량                                  | |
| expose | Boolean | 판매 여부                                  | |
| yourProductId | String | (Optional) 옵션에 부여하고 싶은 자체 상품 아이디       | |
</details>

<a id="productafterservice"></a>
<details>
<summary><strong>ProductAfterService</strong></summary>

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ |
| asTelephone | String | A/S 전화번호 | |
| asPolicy | String | A/S 안내 | 최대 1,000자 |
| etc | String | 판매자 특이사항 | 최대 1,000자 |
</details>

<a id="productdelivery"></a>
<details>
<summary><strong>ProductDelivery</strong></summary>

| 이름 | 타입 | 설명                                              | 비고                    |
| -----------  | ------------ |-------------------------------------------------|-----------------------|
| serviceType | Integer | 택배배송: 1, 새벽배송: 2, 해외배송: 3, ~~배송없음: 4~~, 직접배송: 5 |                       |
| chargeType | Integer | 무료배송: 1, 조건부 무료배송: 2, 유료배송: 3, 수량별 배송비 부과: 4    |                       |
| chargeTimeType | Integer | 선결제: 1                                          | 현재 선결제만 지원            |
| bundleType | Integer | 최대 배송비: 1, 최소 배송비: 2, 개별 계산: 3                  | 묶음 배송에 대한 배송비         |
| chargePrice | Double | 배송비                                             |                       |
| deliveryExternal | Boolean | 도서산간지역 배송 여부                                    |                       |
| chargePriceExternal | Double | 도서산간지역 추가 배송비                                   |                       |
| chargeFreeCondition | Double | 무료 배송 조건 금액                                     |                       |
| chargeByQuantity | Integer | 수량별 배송비 부과 선택시 수량                               |                       |
| deliveryCompanySeq | Integer | 택배 회사 번호                                        |                       |
| sendEstimatedTime | Integer | 발송 예정일                                          | 2 ~ 21(Day) 이내의 값만 가능 |
| originPostalCode | String | 출고지 우편번호                                        | 최대 8자                 |
| originAddress1 | String | 출고지 주소                                          | 최대 100자               |
| originAddress2 | String | 출고지 상세 주소                                       | 최대 100자               |
| returnPostalCode | String | 반품/교환 주소지 우편번호                                  | 최대 8자                 |
| returnAddress1 | String | 반품/교환 주소지 주소                                    | 최대 100자               |
| returnAddress2 | String | 반품/교환 주소지 상세 주소                                 | 최대 100자               |
| returnCompanySeq | Integer | 반품/교환 택배 회사 번호                                  |                       |
| returnChargePrice | Double | 반품 택배비                                          |                       |
| exchangeChargePrice | Double | 교환 택배비                                          |                       |
</details>

---

### 이미지 업로드 <code>POST /api/product/image</code>
- 상품을 등록하기 전에 미리 이미지를 업로드 해야 합니다.
- 이미지의 크기는 5MB 이하여야 합니다.
- JPG, PNG, GIF만 지원합니다.
- Content-Type은 `multipart/form-data` 로 설정해야 합니다.

***Request Body***

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| image | multipart | Y | 업로드할 이미지| |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| image | String | 업로드한 이미지 URL |

<br>

### 카테고리 목록 <code>GET /api/product/category</code>
- 상품에 설정할 수 있는 카테고리 목록입니다.

***Response***

| 이름 | 타입                                | 설명 | 
| ----------- |-----------------------------------|------------ | 
| category | List&lt;[Category](#category)&gt; | 카테고리 정보 |

<br>

### 상품정보 제공고시 목록 <code>GET /api/product/legal</code>
- 상품에 설정할 수 있는 상품정보 제공고시 목록입니다.

***Response***

| 이름 | 타입                          | 설명 | 
| -----------  |-----------------------------|------------ | 
| legal | List&lt;[Legal](#legal)&gt; | 상품정보 제공고시 정보 |

<br>

### 인증 정보 목록 <code>GET /api/product/cert</code>
- 상품에 설정할 수 있는 인증 정보 목록입니다.

***Response***

| 이름 | 타입                                | 설명 | 
| -----------  |-----------------------------------|------------ | 
| cert | List&lt;[CertType](#certtype)&gt; | 상품 인증 정보 |

<br>

### 모델 목록 <code>GET /api/product/model</code>
- 그립에 등록되어 있는 상품의 모델 목록입니다. 상품 모델 추천에 사용할 수 있습니다.

***Response***

| 이름 | 타입 | 설명 | 
| ----------- | ------------ |------------ | 
| model | List&lt;String&gt; | 모델명, 최대 32자 |

<br>

### 브랜드 목록 <code>GET /api/product/brand</code>
- 그립에 등록되어 있는 상품의 브랜드 목록입니다. 상품 브랜드 추천에 사용할 수 있습니다.

***Response***

| 이름 | 타입 | 설명 | 
| ----------- | ------------ |------------ | 
| model | List&lt;String&gt; | 브랜드, 최대 32자 |

<br>

### 제조사 목록 <code>GET /api/product/manufacturer</code>
- 그립에 등록되어 있는 상품의 제조사 목록입니다. 상품 제조사 추천에 사용할 수 있습니다.

***Response***

| 이름 | 타입 | 설명 | 
| ----------- | ------------ |------------ | 
| model | List&lt;String&gt; | 제조사, 최대 32자 |

<br>

### 상품 개수 <code>GET /api/product/count</code>
- 상품 개수를 조회합니다.

***Request Parameters***

| 이름 | 타입 | 필수 | 설명 | 비고                                               |
| -----------  | ------------ |-----------|------------ |--------------------------------------------------|
| searchTarget | String | N | 검색 대상 | productName: 상품명                                 |
| searchQuery | String | N | 검색어 | 최대 40자                                           |
| searchStatus | String | N | 검색할 상품 상태. 콤마(,)로 구분해서 복수 상태 가능 | 판매대기: 1<br>판매중: 2<br>품절임박: 3<br>품절: 4<br>판매중지: 5 |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| productCount | Integer | 상품 개수 |

<br>

### 상품 목록 <code>GET /api/product</code>
- 상품 목록을 조회합니다.

***Request Parameters***

| 이름 | 타입 | 필수 | 설명 | 비고                                   |
| -----------  | ------------ |-----------|------------ |--------------------------------------|
| start | Integer | N | 페이지 시작 번호(offset). default 0      | 페이지 사이즈가 20이면, 다음 시작 번호는 20          |
| length | Integer | N | 페이지 사이즈. default 20, 최대 100 |                                      |
| searchTarget | String | N | 검색 대상 | productName: 상품명                     |
| searchQuery | String | N | 검색어 | 최대 40자                               |
| searchStatus | String | N | 검색할 상품 상태. 콤마(,)로 구분해서 복수 상태 가능 | 판매대기: 1<br>판매중: 2<br>품절임박: 3<br>품절: 4<br>판매중지: 5 |

***Response***

| 이름 | 타입                                      | 설명 | 
| -----------  |-----------------------------------------|------------ | 
| productList | List&lt;[ProductList](#productlist)&gt; | 상품 목록 |

<br>

### 상품 상세 <code>GET /api/product/{productId}</code>
- 상품 상세 정보를 조회합니다.

***Response***

| 이름 | 타입                  | 설명 | 
| -----------  |---------------------|------------ | 
| product | [Product](#product) | 상품 상세 |

<br>

### 상품 등록 <code>POST /api/product</code>
- 상품을 등록 합니다.

***Request Body***

| 이름                        | 타입                                          | 필수 | 설명                             | 비고                                                                                                                                     |
|---------------------------|---------------------------------------------|-----------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| yourProductId             | String                                      | N | 자체 상품 아이디                      | 최대 40자                                                                                                                                 |
| productName               | String                                      | Y | 상품명                            | 최대 40자                                                                                                                                 |
| categorySeq               | Integer                                     | Y | 상품 카테고리 번호                     | 말단 카테고리의 번호만 허용                                                                                                                        |
| legalSeq                  | Integer                                     | Y | 상품정보 제공고시 번호                   |                                                                                                                                        |
| legalItems                | List&lt;[LegalItem](#legalitem)&gt;         | Y | 상품정보 제공고시 상세                   |                                                                                                                                        |
| introduction              | String                                      | N | 상품 설명                          | 최대 50자                                                                                                                                 |
| useOption                 | Boolean                                     | Y | 옵션 사용 여부                       |                                                                                                                                        |
| option                    | [ProductOption](#productoption)             | N | 옵션 정보                          | `useOption`이 Y면 필수                                                                                                                     |
| costPrice                 | Double                                      | Y | 상품 가격                          | 최소 200원 또는 0원                                                                                                                          |
| sellingPrice              | Double                                      | Y | 상시 할인가                         | 최소 200원 또는 0원                                                                                                                          |
| liveSellingPrice          | Double                                      | Y | 라이브가                           | 최소 200원 또는 0원                                                                                                                          |
| useSpecialPrice           | Boolean                                     | Y | 행사 사용가 사용 여부                   |                                                                                                                                        |
| specialPrice              | [ProductSpecialPrice](#productspecialprice) | N | 행사 할인가 정보                      | `useSpecialPrice`이 Y면 필수                                                                                                               |
| originName                | String                                      | Y | 원산지                            | 최대 20자                                                                                                                                 |
| manufacturer              | String                                      | N | 제조사                            | 최대 32자                                                                                                                                 |
| brandName                 | String                                      | N | 브랜드                            | 최대 32자                                                                                                                                 |
| modelName                 | String                                      | N | 모델명                            | 최대 32자                                                                                                                                 |
| ondemand                  | Boolean                                     | Y | 주문제작 여부                        |                                                                                                                                        |
| returnImpossible          | Boolean                                     | N | 반품 불가 여부                       | `returnImpossible`이 Y면 필수                                                                                                              |
| taxType                   | Integer                                     | Y | 부가세. 과세상품: 1, 면세상품: 2, 영세상품: 3 |                                                                                                                                        |
| startAt                   | Date                                        | Y | 판매 시작일시                        | 최소 2019-02-01 00:00:00. 현재시간 권장                                                                                                        |
| endAt                     | Date                                        | Y | 판매 종료일시                        | 최대 2048-12-31 23:59:59                                                                                                                 |
| stockCount                | Integer                                     | Y | 재고 수량                          | `useOption`이 Y인 경우에 `option`에 있는 `ProductOptionCombination`에서 `expose`가 Y인 것으로 자동 설정 됨                                                 |
| useMinOrderQuantity       | Boolean                                     | Y | 최소 구매 개수 사용 여부                 |                                                                                                                                        |
| useMaxOrderQuantity       | Boolean                                     | Y | 최대 구매 개수 사용 여부                 |                                                                                                                                        |
| minOrderQuantity          | Integer                                     | N | 최소 구매 개수                       | `useMinOrderQuantity`가 Y면 필수                                                                                                           |
| maxOrderQuantity          | Integer                                     | N | 최대 구매 개수                       | `useMaxOrderQuantity`가 Y면 필수                                                                                                           |
| useMaxOrderQuantityPeriod | Boolean                                     | N | 최대 구매 개수 적용 기간 사용 여부           | N이면 매일 초기화되어 하루 단위로만 제한됨, Y이면 적용 기간을 설정할 수 있음                                                                                          |
| maxOrderQuantityStartAt   | Date                                        | N | 최대 구매 개수 적용 시작일시               | `useMaxOrderQuantityPeriod`가 Y면 필수                                                                                                     |
| maxOrderQuantityEndAt     | Date                                        | N | 최대 구매 개수 적용 종료일시               | `useMaxOrderQuantityPeriod`가 Y면 필수                                                                                                     |
| allowCoupon               | Boolean                                     | N | 쿠폰 적용 가능 상품 여부. default Y          | 쿠폰 사용 가능이면 Y, 불가면 N                                                                                                                    |
| overseasDirect            | Boolean                                     | N | 해외배송 여부. default N                 |
| customDelivery            | Boolean                                     | Y | 커스텀 배송 정보 사용 여부                | N이면 판매자 기본 배송 정보 사용                                                                                                                    |
| delivery                  | [ProductDelivery](#productdelivery)         | N | 상품 배송 정보                       | `customDelivery`가 Y면 필수                                                                                                                |
| customAs                  | Boolean                                     | Y | 커스텀 A/S 사용 여부                  | N이면 판매자 기본 A/S 정보 사용                                                                                                                   |
| as                        | [ProductAfterService](#productafterservice) | N | 상품 A/S 정보                      | `customAs`가 Y면 필수                                                                                                                      |
| tags                      | List&lt;String&gt;                          | Y | 태그 목록                          | 최대 20개, 최대 32자, 특수문자 불가. 대소문자 구분없음                                                                                                     |
| previewImageUrls          | List&lt;String&gt;                          | Y | 상품 상단 이미지 URL 목록               | 이미지를 미리 업로드하고 받은 URL 사용. 최대 10개. 750px X 750px 권장. 비율이 다를시 Center Crop. 첫번째 이미지가 대표 이미지. PNG, JPG 허용                                   |
| detailContentsType        | String                                      | N | 상품 상세 컨텐츠 타입                   | `IMAGE`(default) 혹은 `HTML`로 입력.<br>`IMAGE`인 경우, 상품상세 컨텐츠를 `detailImageUrls`기반으로 구성.<br>`HTML`인 경우 `detailDescription`기반으로 구성.          |
| detailImageUrls           | List&lt;String&gt;                          | `detailContentsType`가 `IMAGE`시 Y | 상품 상세 이미지 URL 목록               | 이미지를 미리 업로드하고 받은 URL 사용. 최대 30개. 가로 860px 권장. PNG, JPG, GIF 허용                                                                         |
| detailDescription         | String                                      | `detailContentsType`가 `HTML`시 Y | 상품 상세 HTML                     | [상품상세 HTML 등록 가이드](#html-guide) 참고                                                                                                     |
| certTypeSeq               | Integer                                     | N | 인증 정보 번호                       |                                                                                                                                        |
| certSubjectSeq            | Integer                                     | N | 인증 세부 항목 번호                    |                                                                                                                                        |
| certAgency                | String                                      | N | 인증 기관                          | 인증 세부 항목의 `required`가 `true`면 필수                                                                                                       |
| certNumber                | String                                      | N | 인증 번호                          | 인증 세부 항목의 `required`가 `true`면 필수                                                                                                       |
| voucherGuide              | String                                      | N | 예약/사용 안내                       | 전자 상품인 경우에는 필수                                                                                                                         |
| voucherNotice             | String                                      | N | 유의사항                           | 전자 상품인 경우에는 필수                                                                                                                         |
| voucherCancelGuide        | String                                      | N | 취소/환불 방법                       | 전자 상품인 경우에는 필수                                                                                                                         |
| voucherCancelFeeGuide     | String                                      | N | 취소 수수료 안내                      | 전자 상품인 경우에는 필수                                                                                                                         |
| voucherCancelNotice       | String                                      | N | 취소 유의사항                        | 전자 상품인 경우에는 필수                                                                                                                         |
| zeroPriceReasonType       | Integer                                     | N | 0원 상품 사유 유형                    | 합배송: 1, 이벤트(프로모션): 2, 사은품: 3, 기타: 4<br>상품 가격/상시 할인가/라이브가/행사 할인가/(옵션을 사용하는 경우 가격 + 옵션가) = 0인 경우 필수<br>***가격**: 상품 가격/상시 할인가/라이브가/행사 할인가 |
| zeroPriceReasonText       | String                                      | N | 0원 상품 사유 상세                    | 최대 50자, 0원 상품 사유 유형이 **기타: 4**인 경우 필수                                                                                                  |

***Response***

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ |-----------|
| productId | String | 상품 아이디 | 최대 16자 |

<br>

<a id="html-guide"></a>
#### * 상품상세 HTML 등록 가이드
- 기능
    - html 원본을 상품 상세에 등록가능함
- 스펙
    - 허용하는 html 태그들
        - body, p, span, br, ul, li, ol, figure, blockquote, table, tbody, tr, th, td, font, img, b, i, u, strike, s, h1, h2, h3, h4, h5, h6, div, strong
        - iframe (www.youtube.com 만 지원)
    - html내 허용하는 이미지갯수
        - 최소 1개, 최대 30개
    - html내 최대 문자수
        - 40,000자

<br>

### 상품 수정 <code>PUT /api/product/{productId}</code>
- 상품을 수정 합니다.

***Request Body***

| 이름                        | 타입                                          | 필수 | 설명                             | 비고                                                                                                                                     |
|---------------------------|---------------------------------------------|-----------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------------|
| yourProductId             | String                                      | N | 자체 상품 아이디                      | 최대 40자                                                                                                                                 |
| productName               | String                                      | Y | 상품명                            | 최대 40자                                                                                                                                 |
| categorySeq               | Integer                                     | Y | 상품 카테고리 번호                     | 말단 카테고리의 번호만 허용                                                                                                                        |
| legalSeq                  | Integer                                     | Y | 상품정보 제공고시 번호                   |                                                                                                                                        |
| legalItems                | List&lt;[LegalItem](#legalitem)&gt;         | Y | 상품정보 제공고시 상세                   |                                                                                                                                        |
| introduction              | String                                      | N | 상품 설명                          | 최대 50자                                                                                                                                 |
| useOption                 | Boolean                                     | Y | 옵션 사용 여부                       |                                                                                                                                        |
| option                    | [ProductOption](#productoption)             | N | 옵션 정보                          | `useOption`이 Y면 필수                                                                                                                     |
| costPrice                 | Double                                      | Y | 상품 가격                          | 최소 200원 또는 0원                                                                                                                          |
| sellingPrice              | Double                                      | Y | 상시 할인가                         | 최소 200원 또는 0원                                                                                                                          |
| liveSellingPrice          | Double                                      | Y | 라이브가                           | 최소 200원 또는 0원                                                                                                                          |
| useSpecialPrice           | Boolean                                     | Y | 행사 사용가 사용 여부                   |                                                                                                                                        |
| specialPrice              | [ProductSpecialPrice](#productspecialprice) | N | 행사 할인가 정보                      | `useSpecialPrice`이 Y면 필수                                                                                                               |
| originName                | String                                      | Y | 원산지                            | 최대 20자                                                                                                                                 |
| manufacturer              | String                                      | N | 제조사                            | 최대 32자                                                                                                                                 |
| brandName                 | String                                      | N | 브랜드                            | 최대 32자                                                                                                                                 |
| modelName                 | String                                      | N | 모델명                            | 최대 32자                                                                                                                                 |
| ondemand                  | Boolean                                     | Y | 주문제작 여부                        |                                                                                                                                        |
| returnImpossible          | Boolean                                     | N | 반품 불가 여부                       | `returnImpossible`이 Y면 필수                                                                                                              |
| taxType                   | Integer                                     | Y | 부가세. 과세상품: 1, 면세상품: 2, 영세상품: 3 |                                                                                                                                        |
| startAt                   | Date                                        | Y | 판매 시작일시                        | 최소 2019-02-01 00:00:00. 현재시간 권장                                                                                                        |
| endAt                     | Date                                        | Y | 판매 종료일시                        | 최대 2048-12-31 23:59:59                                                                                                                 |
| stockCount                | Integer                                     | Y | 재고 수량                          | `useOption`이 Y인 경우에 `option`에 있는 `ProductOptionCombination`에서 `expose`가 Y인 것으로 자동 설정 됨                                                 |
| useMinOrderQuantity       | Boolean                                     | Y | 최소 구매 개수 사용 여부                 |                                                                                                                                        |
| useMaxOrderQuantity       | Boolean                                     | Y | 최대 구매 개수 사용 여부                 |                                                                                                                                        |
| minOrderQuantity          | Integer                                     | N | 최소 구매 개수                       | `useMinOrderQuantity`가 Y면 필수                                                                                                           |
| maxOrderQuantity          | Integer                                     | N | 최대 구매 개수                       | `useMaxOrderQuantity`가 Y면 필수                                                                                                           |
| useMaxOrderQuantityPeriod | Boolean                                     | N | 최대 구매 개수 적용 기간 사용 여부           | N이면 매일 초기화되어 하루 단위로만 제한됨, Y이면 적용 기간을 설정할 수 있음                                                                                          |
| maxOrderQuantityStartAt   | Date                                        | N | 최대 구매 개수 적용 시작일시               | `useMaxOrderQuantityPeriod`가 Y면 필수                                                                                                     |
| maxOrderQuantityEndAt     | Date                                        | N | 최대 구매 개수 적용 종료일시               | `useMaxOrderQuantityPeriod`가 Y면 필수                                                                                                     |
| allowCoupon               | Boolean                                     | N | 쿠폰 적용 가능 상품 여부. default Y          | 쿠폰 사용 가능이면 Y, 불가면 N                                                                                                                    |
| overseasDirect            | Boolean                                     | N | 해외배송 여부. default N                 |
| customDelivery            | Boolean                                     | Y | 커스텀 배송 정보 사용 여부                | N이면 판매자 기본 배송 정보 사용                                                                                                                    |
| delivery                  | [ProductDelivery](#productdelivery)         | N | 상품 배송 정보                       | `customDelivery`가 Y면 필수                                                                                                                |
| customAs                  | Boolean                                     | Y | 커스텀 A/S 사용 여부                  | N이면 판매자 기본 A/S 정보 사용                                                                                                                   |
| as                        | [ProductAfterService](#productafterservice) | N | 상품 A/S 정보                      | `customAs`가 Y면 필수                                                                                                                      |
| tags                      | List&lt;String&gt;                          | Y | 태그 목록                          | 최대 20개, 최대 32자, 특수문자 불가. 대소문자 구분없음                                                                                                     |
| previewImageUrls          | List&lt;String&gt;                          | Y | 상품 상단 이미지 URL 목록               | 이미지를 미리 업로드하고 받은 URL 사용. 최대 10개. 750px X 750px 권장. 비율이 다를시 Center Crop. 첫번째 이미지가 대표 이미지. PNG, JPG 허용                                   |
| detailContentsType        | String                                      | N | 상품 상세 컨텐츠 타입                   | `IMAGE`(default) 혹은 `HTML`로 입력.<br>`IMAGE`인 경우, 상품상세 컨텐츠를 `detailImageUrls`기반으로 구성.<br>`HTML`인 경우 `detailDescription`기반으로 구성.          |
| detailImageUrls           | List&lt;String&gt;                          | `detailContentsType`가 `IMAGE`시 Y | 상품 상세 이미지 URL 목록               | 이미지를 미리 업로드하고 받은 URL 사용. 최대 30개. 가로 860px 권장. PNG, JPG, GIF 허용                                                                         |
| detailDescription         | String                                      | `detailContentsType`가 `HTML`시 Y | 상품 상세 HTML                     | [상품상세 HTML 등록 가이드](#html-guide) 참고                                                                                                     |
| certTypeSeq               | Integer                                     | N | 인증 정보 번호                       |                                                                                                                                        |
| certSubjectSeq            | Integer                                     | N | 인증 세부 항목 번호                    |                                                                                                                                        |
| certAgency                | String                                      | N | 인증 기관                          | 인증 세부 항목의 `required`가 `true`면 필수                                                                                                       |
| certNumber                | String                                      | N | 인증 번호                          | 인증 세부 항목의 `required`가 `true`면 필수                                                                                                       |
| voucherGuide              | String                                      | N | 예약/사용 안내                       | 전자 상품인 경우에는 필수                                                                                                                         |
| voucherNotice             | String                                      | N | 유의사항                           | 전자 상품인 경우에는 필수                                                                                                                         |
| voucherCancelGuide        | String                                      | N | 취소/환불 방법                       | 전자 상품인 경우에는 필수                                                                                                                         |
| voucherCancelFeeGuide     | String                                      | N | 취소 수수료 안내                      | 전자 상품인 경우에는 필수                                                                                                                         |
| voucherCancelNotice       | String                                      | N | 취소 유의사항                        | 전자 상품인 경우에는 필수                                                                                                                         |
| zeroPriceReasonType       | Integer                                     | N | 0원 상품 사유 유형                    | 합배송: 1, 이벤트(프로모션): 2, 사은품: 3, 기타: 4<br>상품 가격/상시 할인가/라이브가/행사 할인가/(옵션을 사용하는 경우 가격 + 옵션가) = 0인 경우 필수<br>***가격**: 상품 가격/상시 할인가/라이브가/행사 할인가 |
| zeroPriceReasonText       | String                                      | N | 0원 상품 사유 상세                    | 최대 50자, 0원 상품 사유 유형이 **기타: 4**인 경우 필수                                                                                                  |

***Response***

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ |-----------|
| productId | String | 상품 아이디 | 최대 16자 |

<br>

### 상품 삭제 <code>DELETE /api/product/{productId}</code>
- 상품을 삭제 합니다.

***Response***

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ |-----------|
| productId | String | 상품 아이디 | 최대 16자 |

<br>

### 상품 판매 시작 <code>PUT /api/product/{productId}/start</code>
- 상품을 판매 시작 합니다.

***Response***

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ |-----------|
| productId | String | 상품 아이디 | 최대 16자 |

<br>

### 상품 판매 중지 <code>PUT /api/product/{productId}/stop</code>
- 상품을 판매 중지 합니다.

***Response***

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ |-----------|
| productId | String | 상품 아이디 | 최대 16자 |