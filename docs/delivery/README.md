## 배송 관리
- 배송을 하기 위해서는 발주(배송준비중)부터 하고 발송을 해야 합니다.
- 발주를 하면 구매자는 주문취소를 할 수 없고 '배송준비중' 안내 푸시를 받습니다.

## 제공 API
- [지원 택배사 목록](#지원-택배사-목록-get-apideliverycompany)
- [배송지 변경](#배송지-변경-put-apideliveryinfo)
- [배송(발송) 지연 안내](#배송발송-지연-안내-put-apideliverypostpone)
- [발주(접수)가 필요한 주문 개수](#발주접수가-필요한-주문-개수-get-apideliverypreparecount)
- [발주(접수)할 주문 목록](#발주접수할-주문-목록-get-apideliveryprepare)
- [발주(접수)요청](#발주접수-요청-put-apideliveryprepareresult)
- [발송이 필요한 주문 개수](#발송이-필요한-주문-개수-get-apideliverystartcount)
- [발송이 필요한 주문 목록](#발송이-필요한-주문-목록-get-apideliverystart)
- [택배 정보 설정](#택배-정보-설정-put-apideliveryshipping)
- [발송 요청](#발송-요청-put-apideliverystart)
- [배송(사용) 현황 확인이 가능한 주문 개수](#배송사용-현황-확인이-가능한-주문-개수-get-apideliverystatuscount)
- [배송(사용) 현황 확인이 가능한 주문 목록](#배송사용-현황-확인이-가능한-주문-목록-get-apideliverystatus)
- [직접 수령 처리](#직접-수령-처리-put-apideliverydirect)
- [강제 배송 완료처리](#강제-배송완료사용-완료처리-put-apideliverycomplete)

---
## 모델

<a id="deliverycompany"></a>
<details>
<summary><strong>DeliveryCompany</strong></summary>

| 이름 | 타입 | 설명                        | 비고 |
| ----------- | ------------ |---------------------------| ------------ |
| companySeq | Integer | 택배회사 번호                   | |
| companyName | String | 택배회사 이름                   | 최대 40자 |
| serviceType | Integer | 일반배송: 1, 새벽배송: 2, 해외배송: 3 | |
| tracking | Boolean | 배송추적 가능 여부                | |
</details>

<a id="deliveryresult"></a>
<details>
<summary><strong>DeliveryResult</strong></summary>

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| orderSeq | Long | 주문 번호 | |
| orderProductSeq | Long | 주문 상품 번호 | |
| result | Boolean | 성공 여부 | |
| message | String | 실패 사유 | 실패인 경우에만 있음. 최대 100자 |
</details>

<a id="orderkey"></a>
<details>
<summary><strong>OrderKey</strong></summary>

| 이름              | 타입      | 설명                      | 비고 |
|-----------------|---------|-------------------------|----|
| orderSeq        | Long    | 주문 번호                   |    |
| orderProductSeq | Long    | 주문 상품 번호                | |
</details>

<a id="deliverypreparelist"></a>
<details>
<summary><strong>DeliveryPrepareList</strong></summary>

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| orderSeq | Long | 주문 번호 | |
| orderProductSeq | Long | 주문 상품 번호 | |
| orderedAt | Date | 주문 결제 일시 | |
| postponedAt | Date | 배송 지연 안내 일시 | |
| postponedReason | String | 배송 지연 사유 | 최대 50자 |
| yourProductId | String | 자체 상품 아이디 | 최대 40자 |
| yourOptionId | String | 자체 옵션 아이디 | 최대 40자 |	
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
</details>

<a id="deliverystartlist"></a>
<details>
<summary><strong>DeliveryStartList</strong></summary>

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| orderSeq | Long | 주문 번호 | |
| orderProductSeq | Long | 주문 상품 번호 | |
| orderedAt | Date | 주문 결제 일시 | |
| deliveryCompanySeq | Integer | 택배 회사 번호 | |
| deliveryTrackingNumber | String | 송장 번호 | 최대 40자 |
| yourProductId | String | 자체 상품 아이디 | 최대 40자 |
| yourOptionId | String | 자체 옵션 아이디 | 최대 40자 |	
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
</details>

<a id="deliveryshipping"></a>
<details>
<summary><strong>DeliveryShipping</strong></summary>

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderSeq | Long | Y | 주문 번호 | |
| orderProductSeq | Long | Y | 주문 상품 번호 | |
| companySeq | Integer | Y | 택배 회사 번호 | |
| trackingNumber | String | Y | 운송장 번호 | |
</details>

<a id="deliverystatuslist"></a>
<details>
<summary><strong>DeliveryStatusList</strong></summary>

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
| yourOptionId | String | 자체 옵션 아이디 | 최대 40자 |	
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
</details>

---

### 지원 택배사 목록 <code>GET /api/delivery/company</code>
- 배송정보에 설정할 수 있는 택배회사 목록입니다.

***Response***

| 이름 | 타입                                              | 설명 | 
| ----------- |-------------------------------------------------|------------ | 
| deliveryCompanies | List&lt;[DeliveryCompany](#deliverycompany)&gt; | 택배회사 목록 |

<br>

### 배송지 변경 <code>PUT /api/delivery/info</code>
- 구매자의 요청으로 배송 주소를 변경합니다.

***Request Body***

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderSeq | Long | Y | 주문 번호 | |
| recipientName | String | Y | 수령인 이름 | |
| recipientPhoneNumber | String | Y | 수령인 연락처 | |
| recipientPostalCode | String | Y | 수령지 우편번호 | 최대 8자 |
| recipientAddress1 | String | Y | 수령지 주소 | 최대 100자, 서울특별시 서초구 서초동 강남대로 373 |
| recipientAddress2 | String | Y | 수령지 세부 주소 | 최대 100자, 홍우빌딩 10층 |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| affected | Integer | 주소 변경에 영향 받은 주문 수 |

<br>

### 배송(발송) 지연 안내 <code>PUT /api/delivery/postpone</code>
- 재고 부족이나 연휴가 긴 경우에 판매자가 배송 지연을 안내 합니다.
- 배송 지연 안내는 1회만 가능합니다. 

***Request Body***

| 이름 | 타입                                | 필수 | 설명 | 비고                                   |
| -----------  |-----------------------------------|-----------|------------ |--------------------------------------|
| orderKeys | List&lt;[OrderKey](#orderkey)&gt; | Y | 대상 주문 |                                      |
| postponeType | Integer                           | Y | 지연 사유 | 재고부족: 1, 합배송 요청: 2, 배송일지정: 3, 기타: 10 |
| reason | String                            | Y | 상세 지연 사유. 소비자에게 안내됨 | 최대 50자                               |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| affected | Integer | 배송 지연 안내한 주문 수 |

<br>

### 배송(발송) 지연 안내 <code>PUT /api/delivery/postpone/result</code>

***Request Body***

| 이름 | 타입                                | 필수 | 설명 | 비고 |
| -----------  |-----------------------------------|-----------|------------ | --------------- |
| orderKeys | List&lt;[OrderKey](#orderkey)&gt; | Y | 대상 주문 | |

***Response***

| 이름 | 타입                                            | 설명 | 
| -----------  |-----------------------------------------------|------------ | 
| result | List&lt;[DeliveryResult](#deliveryresult)&gt; | 배송 지연 안내 요청 결과 |

<br>

### 발주(접수)가 필요한 주문 개수 <code>GET /api/delivery/prepare/count</code>
- 발주가 필요한 주문 개수를 조회합니다.

***Request Body***

| 이름 | 타입 | 필수 | 설명                            | 비고                                                                                                                                          |
| -----------  | ------------ |-----------|-------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| searchTarget | String | N | 검색 대상                         | buyerNickname: 구매자 닉네임<br>buyerName: 구매자 이름<br>buyerPhoneNumber: 구매자 연락처<br>recipientName: 수령인<br>orderSeq: 주문번호<br>orderProductSeq: 주문상품번호 |
| searchQuery | String | N | 검색어                           | 최대 40자                                                                                                                                      |
| searchStartAt | Date | N | 검색할 주문/결제 시작일시. default 30일 전 |                                                                                                                                             |
| searchEndAt | Date | N | 검색할 주문/결제 종료일시. default 오늘    |                                                                                                                                             |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| prepareCount | Integer | 발주가 필요한 주문 수 |

<br>

### 발주(접수)할 주문 목록 <code>GET /api/delivery/prepare</code>
- 발주가 필요한 주문 목록을 조회합니다.

***Request Body***

| 이름 | 타입 | 필수 | 설명                        | 비고 |
| -----------  | ------------ |-----------|---------------------------| --------------- |
| start | Integer | N | 페이지 시작 번호(offset). default 0      | 페이지 사이즈가 20이면, 다음 시작 번호는 20 |
| length | Integer | N | 페이지 사이즈. default 20, 최대 100   |  |
| searchTarget | String | N | 검색 대상                     | buyerNickname: 구매자 닉네임<br>buyerName: 구매자 이름<br>buyerPhoneNumber: 구매자 연락처<br>recipientName: 수령인<br>orderSeq: 주문번호<br>orderProductSeq: 주문상품번호 |
| searchQuery | String | N | 검색어                       | 최대 40자 |
| searchStartAt | Date | N | 검색할 주문/결제 시작일시. default 30일 전 | |
| searchEndAt | Date | N | 검색할 주문/결제 종료일시. default 오늘    | |

***Response***

| 이름 | 타입                                                      | 설명 | 
| -----------  |---------------------------------------------------------|------------ | 
| prepareList | List&lt;[DeliveryPrepareList](#deliverypreparelist)&gt; | 발주가 필요한 주문 목록 |

<br>

### 발주(접수) 요청 <code>PUT /api/delivery/prepare</code>
- 배송이 필요한 주문을 발주 요청 합니다.
- 한번에 다수의 주문을 묶어서 요청하는 것을 권장합니다.
- 발주 요청을 하면 구매자는 '배송준비중' 안내를 받고 주문취소를 할 수 없게 됩니다.

***Request Body***

| 이름 | 타입                                | 필수 | 설명 | 비고 |
| -----------  |-----------------------------------|-----------|------------ | --------------- |
| orderKeys | List&lt;[OrderKey](#orderkey)&gt; | Y | 대상 주문 | |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| affected | Integer | 발주 요청한 주문 수 |

<br>

### 발주(접수) 요청 <code>PUT /api/delivery/prepare/result</code>

***Request Body***

| 이름 | 타입                                | 필수 | 설명 | 비고 |
| -----------  |-----------------------------------|-----------|------------ | --------------- |
| orderKeys | List&lt;[OrderKey](#orderkey)&gt; | Y | 대상 주문 | |

***Response***

| 이름 | 타입                                            | 설명 | 
| -----------  |-----------------------------------------------|------------ | 
| result | List&lt;[DeliveryResult](#deliveryresult)&gt; | 발주 요청 결과 |

<br>

### 발송이 필요한 주문 개수 <code>GET /api/delivery/start/count</code>
- 발송이 필요한 주문 개수를 조회합니다.

***Request Body***

| 이름 | 타입 | 필수 | 설명                        | 비고 |
| -----------  | ------------ |-----------|---------------------------| --------------- |
| searchTarget | String | N | 검색 대상                     | buyerNickname: 구매자 닉네임<br>buyerName: 구매자 이름<br>buyerPhoneNumber: 구매자 연락처<br>recipientName: 수령인<br>orderSeq: 주문번호<br>orderProductSeq: 주문상품번호 |
| searchQuery | String | N | 검색어                       | 최대 40자 |
| searchStartAt | Date | N | 검색할 주문/결제 시작일시. default 30일 전 | |
| searchEndAt | Date | N | 검색할 주문/결제 종료일시. default 오늘    | |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| startCount | Integer | 발송이 필요한 주문 수 |

<br>

### 발송이 필요한 주문 목록 <code>GET /api/delivery/start</code>
- 발송이 필요한 주문 목록을 조회합니다.

***Request Body***

| 이름 | 타입 | 필수 | 설명                        | 비고 |
| -----------  | ------------ |-----------|---------------------------| --------------- |
| start | Integer | N | 페이지 시작 번호(offset). default 0      | 페이지 사이즈가 20이면, 다음 시작 번호는 20 |
| length | Integer | N | 페이지 사이즈. default 20, 최대 100   |  |
| searchTarget | String | N | 검색 대상                     | buyerNickname: 구매자 닉네임<br>buyerName: 구매자 이름<br>buyerPhoneNumber: 구매자 연락처<br>recipientName: 수령인<br>orderSeq: 주문번호<br>orderProductSeq: 주문상품번호 |
| searchQuery | String | N | 검색어                       | 최대 40자 |
| searchStartAt | Date | N | 검색할 주문/결제 시작일시. default 30일 전 | |
| searchEndAt | Date | N | 검색할 주문/결제 종료일시. default 오늘    | |

***Response***

| 이름 | 타입                                                  | 설명 |
| -----------  |-----------------------------------------------------|------------ | 
| startList | List&lt;[DeliveryStartList](#deliverystartlist)&gt; | 발송이 필요한 주문 목록 |

<br>

### 택배 정보 설정 <code>PUT /api/delivery/shipping</code>
- 택배회사 및 운송장 번호를 설정합니다.
- 택배 정보를 설정해야 발송 요청을 성공할 수 있습니다.
- 운송장 번호를 잘못 설정한 경우에 배송중 상태이면 다시 설정할 수 있습니다.

***Request Body***

| 이름 | 타입                                                | 필수 | 설명 | 비고 |
| -----------  |---------------------------------------------------|-----------|------------ | --------------- |
| shippings | List&lt;[DeliveryShipping](#deliveryshipping)&gt; | Y | 대상 주문 | |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| affected | Integer | 설정 성공한 주문 수 |

<br>

### 택배 정보 설정 <code>PUT /api/delivery/shipping/result</code>

***Request Body***

| 이름 | 타입                                                | 필수 | 설명 | 비고 |
| -----------  |---------------------------------------------------|-----------|------------ | --------------- |
| shippings | List&lt;[DeliveryShipping](#deliveryshipping)&gt; | Y | 대상 주문 | |

***Response***

| 이름 | 타입                                            | 설명 | 
| -----------  |-----------------------------------------------|------------ | 
| result | List&lt;[DeliveryResult](#deliveryresult)&gt; | 택배 정보 설정 요청 결과 |

<br>

### 발송 요청 <code>PUT /api/delivery/start</code>
- 택배사에 물건을 전달한 후에 발송 요청을 합니다.
- 직접배송이나 ~~배송없음~~ 상품이 아닌 경우에는 택배 정보 설정부터 해야 합니다.
- 한번에 다수의 주문을 묶어서 요청하는 것을 권장합니다.
- 발송 요청을 하면 구매자는 '배송중' 안내를 받고 배송추적 및 구매확정이 가능해집니다.
- ~~배송없음~~ 상품인 경우에는 즉시 '배송완료'가 됩니다.

***Request Body***

| 이름 | 타입                                | 필수 | 설명 | 비고 |
| -----------  |-----------------------------------|-----------|------------ | --------------- |
| orderKeys | List&lt;[OrderKey](#orderkey)&gt; | Y | 대상 주문 | |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| affected | Integer | 발송 요청 성공한 주문 수 |

<br>

### 발송 요청 <code>PUT /api/delivery/start/result</code>

***Request Body***

| 이름 | 타입                                | 필수 | 설명 | 비고 |
| -----------  |-----------------------------------|-----------|------------ | --------------- |
| orderKeys | List&lt;[OrderKey](#orderkey)&gt; | Y | 대상 주문 | |

***Response***

| 이름 | 타입                                            | 설명 | 
| -----------  |-----------------------------------------------|------------ | 
| result | List&lt;[DeliveryResult](#deliveryresult)&gt; | 발송 요청 결과 |

<br>

### 배송(사용) 현황 확인이 가능한 주문 개수 <code>GET /api/delivery/status/count</code>
- 배송 현황 확인이 가능한 주문 개수를 조회합니다.

***Request Body***

| 이름 | 타입 | 필수 | 설명                        | 비고 |
| -----------  | ------------ |-----------|---------------------------| --------------- |
| searchTarget | String | N | 검색 대상                     | buyerNickname: 구매자 닉네임<br>buyerName: 구매자 이름<br>buyerPhoneNumber: 구매자 연락처<br>recipientName: 수령인<br>orderSeq: 주문번호<br>orderProductSeq: 주문상품번호 |
| searchQuery | String | N | 검색어                       | 최대 40자 |
| searchStartAt | Date | N | 검색할 주문/결제 시작일시. default 30일 전 | |
| searchEndAt | Date | N | 검색할 주문/결제 종료일시. default 오늘    | |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| statusCount | Integer | 확인 가능한 주문 수 |

<br>

### 배송(사용) 현황 확인이 가능한 주문 목록 <code>GET /api/delivery/status</code>
- 배송 현황 확인이 가능한 주문 목록을 조회합니다.
- 발송 요청한 주문을 여기서 확인할 수 있습니다.

***Request Body***

| 이름 | 타입 | 필수 | 설명                        | 비고 |
| -----------  | ------------ |-----------|---------------------------| --------------- |
| start | Integer | N | 페이지 시작 번호(offset). default 0      | 페이지 사이즈가 20이면, 다음 시작 번호는 20 |
| length | Integer | N | 페이지 사이즈. default 20, 최대 100   |  |
| searchTarget | String | N | 검색 대상                     | buyerNickname: 구매자 닉네임<br>buyerName: 구매자 이름<br>buyerPhoneNumber: 구매자 연락처<br>recipientName: 수령인<br>orderSeq: 주문번호<br>orderProductSeq: 주문상품번호 |
| searchQuery | String | N | 검색어                       | 최대 40자 |
| searchStartAt | Date | N | 검색할 주문/결제 시작일시. default 30일 전 | |
| searchEndAt | Date | N | 검색할 주문/결제 종료일시. default 오늘    | |

***Response***

| 이름 | 타입                                                    | 설명 | 
| -----------  |-------------------------------------------------------|------------ | 
| statusList | List&lt;[DeliveryStatusList](#deliverystatuslist)&gt; | 확인이 가능한 주문 목록 |

<br>

### 직접 수령 처리 <code>PUT /api/delivery/direct</code>
- 구매자가 상품을 직접 수령한 경우에 사용합니다.
- 직접 수령을 하면 구매자는 '배송완료' 안내를 받게 됩니다.

***Request Body***

| 이름 | 타입                                | 필수 | 설명 | 비고 |
| -----------  |-----------------------------------|-----------|------------ | --------------- |
| orderKeys | List&lt;[OrderKey](#orderkey)&gt; | Y | 대상 주문 | |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| affected | Integer | 직접 수령 요청 성공한 주문 수 |

<br>

### 직접 수령 처리 <code>PUT /api/delivery/direct/result</code>

***Request Body***

| 이름 | 타입                                | 필수 | 설명 | 비고 |
| -----------  |-----------------------------------|-----------|------------ | --------------- |
| orderKeys | List&lt;[OrderKey](#orderkey)&gt; | Y | 대상 주문 | |

***Response***

| 이름 | 타입                                            | 설명 | 
| -----------  |-----------------------------------------------|------------ | 
| result | List&lt;[DeliveryResult](#deliveryresult)&gt; | 발송 요청 결과 |

<br>

### 강제 배송완료(사용 완료)처리 <code>PUT /api/delivery/complete</code>
- 구매자에게 상품을 발송하여 배송중 상태이지만 송장번호의 오류나 기타 택배사의 오류로 배송 추적이 되지 않는 경우에 사용합니다.
- 해외배송은 배송시작 후 30일이 경과해야 사용할 수 있고 국내배송은 배송시작 후 10일이 경과해야 사용할 수 있습니다.
- 강제 배송완료를 하면 구매자는 '배송완료' 안내를 받게 됩니다.
- 배송완료가 확실하지만 배송추적상의 문제가 있는 경우에만 사용해야 합니다.

***Request Body***

| 이름 | 타입                                | 필수 | 설명 | 비고 |
| -----------  |-----------------------------------|-----------|------------ | --------------- |
| orderKeys | List&lt;[OrderKey](#orderkey)&gt; | Y | 대상 주문 | |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| affected | Integer | 강제 배송완료 요청 성공한 주문 수 |

<br>

### 강제 배송완료(사용 완료)처리 <code>PUT /api/delivery/complete/result</code>

***Request Body***

| 이름 | 타입                                | 필수 | 설명 | 비고 |
| -----------  |-----------------------------------|-----------|------------ | --------------- |
| orderKeys | List&lt;[OrderKey](#orderkey)&gt; | Y | 대상 주문 | |

***Response***

| 이름 | 타입                                            | 설명 | 
| -----------  |-----------------------------------------------|------------ | 
| result | List&lt;[DeliveryResult](#deliveryresult)&gt; | 강제 배송완료 요청 결과 |