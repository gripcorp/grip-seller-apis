## 주문/반품/교환 목록
- 반품 및 교환은 Grip 판매자센터에서 직접 처리해야 합니다. API를 통해서는 조회만 가능합니다.
- 하나의 주문은 하나 이상의 상품 구매 정보로 구성되므로 '주문 번호'와 '주문 상품 번호'를 키 값으로 사용합니다.

## 제공 API
- 주문
  - [주문 개수](#주문-개수-get-apiordercount)
  - [주문 목록](#주문-목록-get-apiorder)
  - [주문 취소(판매 취소)](#주문-취소판매-취소-post-apiordercancel)
- 반품
  - [반품 개수](#반품-개수-get-apireturncount)
  - [반품 목록](#반품-목록-get-apireturn)
  - [반품 접수](#반품-접수-put-apireturnstart)
  - [반품 상품 확인](#반품-상품-확인-put-apireturnreceive)
  - [반품 승인](#반품-승인-put-apireturnallow)
  - [반품 거절](#반품-거절-put-apireturndeny)
- 교환
  - [교환 개수](#교환-개수-get-apiexchangecount)
  - [교환 목록](#교환-목록-get-apiexchange)
  - [교환 접수](#교환-접수-apiexchangestart)
  - [교환 상품 확인](#교환-상품-확인-put-apiexchangereceive)
  - [교환 직접 수령](#교환-직접-수령-put-apiexchangedirect)
  - [교환 승인](#교환-승인-put-apiexchangeallow)
  - [교환 거절](#교환-거절-put-apiexchangedeny)

---

## 모델

<a id="orderkey"></a>
<details>
<summary><strong>OrderKey</strong></summary>

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| orderSeq | Long | Y | 주문 번호 | |
| orderProductSeq | Long | Y | 주문 상품 번호 | |
</details>

<a id="orderproductstate"></a>
<details>
<summary><strong>OrderProductState</strong></summary>

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
</details>

<a id="paymentmethod"></a>
<details>
<summary><strong>PaymentMethod</strong></summary>

| 설명 | 값 | 비고 |
| -----------  | ------------ | ------------ |
| 신용카드 | 1 | |
| 실시간 계좌이체 | 2 | |
| 가상계좌 | 3 | |
| 카카오페이 | 4 | |
| 네이버페이 | 5 | |
| 페이코 | 6 | |
| 그립지원 | 99 | |
</details>

<a id="orderresult"></a>
<details>
<summary><strong>OrderResult</strong></summary>

| 이름 | 타입 | 설명 | 비고 |
| -----------  | ------------ |------------ | ------------ | 
| orderSeq | Long | 주문 번호 | |
| orderProductSeq | Long | 주문 상품 번호 | |
| result | Boolean | 성공 여부 | |
| message | String | 실패 사유 | 실패인 경우에만 있음. 최대 100자 |
</details>

<a id="orderlist"></a>
<details>
<summary><strong>OrderList</strong></summary>

| 이름                              | 타입                                      | 설명 | 비고 |
|---------------------------------|-----------------------------------------|------------ | ------------ | 
| orderSeq                        | Long                                    | 주문 번호 | |
| orderProductSeq                 | Long                                    | 주문 상품 번호 | |
| orderedAt                       | Date                                    | 주문 결제 일시 | |
| confirmAt                       | Date                                    | 구매 확정 일시 | |
| cancelAt                        | Date                                    | 주문(판매) 취소 일시 | |
| orderState                      | [OrderProductState](#orderproductstate) | 주문 상태 | |
| yourProductId                   | String                                  | 자체 상품 아이디 | 최대 40자 |
| yourOptionId                    | String                                  | 자체 옵션 아이디. | 최대 40자 |
| productId                       | String                                  | Grip 상품 아이디 | 최대 16자 |
| productName                     | String                                  | 주문 당시 상품명 | 최대 40자 |
| optionNameSeqs                  | List<Integer>                           | 조합된 옵션의 종류 번호 | |
| optionName                      | String                                  | 주문 당시 옵션명 | 최대 120자 |
| price                           | Double                                  | 구매가 | |
| quantity                        | Integer                                 | 수량 | |
| productAmount                   | Double                                  | 상품 주문 금액 | |
| shippingAmount                  | Double                                  | 배송비 | |
| shippingExtraAmount             | Double                                  | 도서/산간지역 추가 배송비 | |
| couponAmount                    | Double                                  | 쿠폰 할인 금액 | |
| [paymentMethod](#paymentmethod) | Integer                                 | 결제 수단 | |
| buyerNickname                   | String                                  | 구매자 닉네임 | 최대 30자 |
| buyerName                       | String                                  | 구매자 이름 | 최대 20자 |
| buyerPhoneNumber                | String                                  | 구매자 전화번호 | 최대 13자 |
| recipientName                   | String                                  | 수령인 이름 | 최대 20자 |
| recipientPhoneNumber            | String                                  | 수령인 전화번호 | 최대 13자 |
| recipientPostalCode             | String                                  | 수령인 우편번호 | 최대 8자 |
| recipientAddress                | String                                  | 수령인 주소 | 최대 200자 |
| deliveryRequest                 | String                                  | 배송 메시지 | 최대 60자 |
| dawnDeliveryRequest             | String                                  | 새벽 배송 메시지 | 최대 60자 |
| clearanceCode                   | String                                  | 개인 통관 번호 | 최대 16자 |
</details>

<a id="returnlist"></a>
<details>
<summary><strong>ReturnList</strong></summary>

| 이름                              | 타입                                      | 설명                                                                                                            | 비고 |
|---------------------------------|-----------------------------------------|---------------------------------------------------------------------------------------------------------------|------------ | 
| orderSeq                        | Long                                    | 주문 번호                                                                                                         | |
| orderProductSeq                 | Long                                    | 주문 상품 번호                                                                                                      | |
| orderedAt                       | Date                                    | 주문 결제 일시                                                                                                      | |
| orderState                      | [OrderProductState](#orderproductstate) | 주문 상태                                                                                                         | |
| returnRequestAt                 | Date                                    | 반품신청일시                                                                                                        | |
| returnCancelAt                  | Date                                    | 반품취소일시                                                                                                        | |
| returnCompleteAt                | Date                                    | 반품완료일시                                                                                                        | |
| buyerReturnReasonType           | Integer                                 | 반품사유<br>단순변심: 1<br>다른 상품 잘못 주문: 3<br>서비스 불만족: 4<br>배송 지연: 5<br>상품 파손 및 불량: 7<br>상품정보 상이: 8<br>다른 상품 잘못 배송: 10 | |
| buyerReturnReason               | String                                  | 구매자 반품 사유                                                                                                     | 최대 1,000자 | 
| sellerReturnReason              | String                                  | 판매자 반품 불가 메시지                                                                                                 | 최대 200자 |
| sellerPermitMessage             | String                                  | 판매자 반품 접수 안내 메시지                                                                                              | 최대 1,000자 |
| yourProductId                   | String                                  | 자체 상품 아이디                                                                                                     | 최대 40자 |
| yourOptionId                    | String                                  | 자체 옵션 아이디                                                                                                     | 최대 40자 |
| productId                       | String                                  | Grip 상품 아이디                                                                                                   | 최대 16자 |
| productName                     | String                                  | 주문 당시 상품명                                                                                                     | 최대 40자 |
| optionNameSeqs                  | List<Integer>                           | 조합된 옵션의 종류 번호                                                                                                 | |
| optionName                      | String                                  | 주문 당시 옵션명                                                                                                     | 최대 120자 |
| price                           | Double                                  | 구매가                                                                                                           | |
| quantity                        | Integer                                 | 수량                                                                                                            | |
| productAmount                   | Double                                  | 상품 주문 금액                                                                                                      | |
| shippingAmount                  | Double                                  | 배송비                                                                                                           | |
| shippingExtraAmount             | Double                                  | 도서/산간지역 추가 배송비                                                                                                | |
| couponAmount                    | Double                                  | 쿠폰 할인 금액                                                                                                      | |
| [paymentMethod](#paymentmethod) | Integer                                 | 결제 수단                                                                                                         | |
| buyerNickname                   | String                                  | 구매자 닉네임                                                                                                       | 최대 30자 |
| buyerName                       | String                                  | 구매자 이름                                                                                                        | 최대 20자 |
| buyerPhoneNumber                | String                                  | 구매자 전화번호                                                                                                      | 최대 13자 |
| recipientName                   | String                                  | 수령인 이름                                                                                                        | 최대 20자 |
| recipientPhoneNumber            | String                                  | 수령인 전화번호                                                                                                      | 최대 13자 |
| recipientPostalCode             | String                                  | 수령인 우편번호                                                                                                      | 최대 8자 |
| recipientAddress                | String                                  | 수령인 주소                                                                                                        | 최대 200자 |
| clearanceCode                   | String                                  | 개인 통관 번호                                                                                                      | 최대 16자 |
</details>

<a id="exchangelist"></a>
<details>
<summary><strong>ExchangeList</strong></summary>

| 이름                              | 타입                                      | 설명                                                                           | 비고 |
|---------------------------------|-----------------------------------------|------------------------------------------------------------------------------| ------------ | 
| orderSeq                        | Long                                    | 주문 번호                                                                        | |
| orderProductSeq                 | Long                                    | 주문 상품 번호                                                                     | |
| orderedAt                       | Date                                    | 주문 결제 일시                                                                     | |
| orderState                      | [OrderProductState](#orderproductstate) | 주문 상태                                                                        | |
| exchangeRequestAt               | Date                                    | 교환신청일시                                                                       | |
| exchangeCancelAt                | Date                                    | 교환취소일시                                                                       | |
| buyerChangeReasonType           | Integer                                 | 교환사유<br>색상 및 사이즈 변경: 2<br>다른 상품 잘못 주문: 3<br>상품 파손 및 불량: 7<br>다른 상품 잘못 배송: 10 | |
| buyerChangeReason               | String                                  | 구매자 교환 사유                                                                    | 최대 1,000자 |
| yourProductId                   | String                                  | 자체 상품 아이디                                                                    | 최대 40자 |
| yourOptionId                    | String                                  | 자체 옵션 아이디                                                                    | 최대 40자 |	
| productId                       | String                                  | Grip 상품 아이디                                                                  | 최대 16자 |
| productName                     | String                                  | 주문 당시 상품명                                                                    | 최대 40자 |
| optionNameSeqs                  | List<Integer>                           | 조합된 옵션의 종류 번호                                                                | |
| optionName                      | String                                  | 주문 당시 옵션명                                                                    | 최대 120자 |
| price                           | Double                                  | 구매가                                                                          | |
| quantity                        | Integer                                 | 수량                                                                           | |
| productAmount                   | Double                                  | 상품 주문 금액                                                                     | |
| shippingAmount                  | Double                                  | 배송비                                                                          | |
| shippingExtraAmount             | Double                                  | 도서/산간지역 추가 배송비                                                               | |
| couponAmount                    | Double                                  | 쿠폰 할인 금액                                                                     | |
| [paymentMethod](#paymentmethod) | Integer                                 | 결제 수단                                                                        | |
| buyerNickname                   | String                                  | 구매자 닉네임                                                                      | 최대 30자 |
| buyerName                       | String                                  | 구매자 이름                                                                       | 최대 20자 |
| buyerPhoneNumber                | String                                  | 구매자 전화번호                                                                     | 최대 13자 |
| recipientName                   | String                                  | 수령인 이름                                                                       | 최대 20자 |
| recipientPhoneNumber            | String                                  | 수령인 전화번호                                                                     | 최대 13자 |
| recipientPostalCode             | String                                  | 수령인 우편번호                                                                     | 최대 8자 |
| recipientAddress                | String                                  | 수령인 주소                                                                       | 최대 200자 |
| clearanceCode                   | String                                  | 개인 통관 번호                                                                     | 최대 16자 |
</details>

---

### 주문 개수 <code>GET /api/order/count</code>
- 주문 개수를 조회합니다.

***Request Body***

| 이름 | 타입 | 필수 | 설명                                | 비고                                                                                                                                                   |
| -----------  | ------------ |-----------|-----------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------|
| searchTarget | String | N | 검색 대상                             | buyerNickname: 구매자 닉네임<br>buyerName: 구매자 이름<br>buyerPhoneNumber: 구매자 연락처<br>recipientName: 수령인<br>orderSeq: 주문번호<br>orderProductSeq: 주문상품번호          |
| searchQuery | String | N | 검색어                               | 최대 40자                                                                                                                                               |
| searchStatus | String | N | 검색할 주문 상태. 콤마(,)로 구분해서 복수 상태 가능   | 결제완료: 1, 입금대기중: 2<br>배송준비중(발송준비중): 10, 배송중(발송완료): 11, 발송지연: 12, 배송완료(사용완료): 13<br>반품신청(취소요청): 40, 환불완료: 42<br>교환신청: 50, 판매취소: 60, 주문취소: 80, 구매확정: 90 |
| searchDate | String | N | 검색할 대상 주문/결제 날짜. default 주문 결제 일시 | orderedAt: 주문결제일시<br>confirmAt: 구매확정일시<br>cancelAt: 주문취소일시                                                                                           |
| searchStartAt | Date | N | 검색할 주문/결제 시작일시. default 30일 전     |                                                                                                                                                      |
| searchEndAt | Date | N | 검색할 주문/결제 종료일시. default 오늘        |                                                                                                                                                      |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| orderCount | Integer | 주문 개수 |

<br>

### 주문 목록 <code>GET /api/order</code>
- 주문 목록을 조회합니다.

***Request Body***

| 이름 | 타입 | 필수 | 설명                                | 비고                                                                                                                                          |
| -----------  | ------------ |-----------|-----------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------|
| start | Integer | N | 페이지 시작 번호(offset). default 0      | 페이지 사이즈가 20이면, 다음 시작 번호는 20                                                                                                                 |
| length | Integer | N | 페이지 사이즈. default 20, 최대 100       |                                                                                                                                             |
| searchTarget | String | N | 검색 대상                             | buyerNickname: 구매자 닉네임<br>buyerName: 구매자 이름<br>buyerPhoneNumber: 구매자 연락처<br>recipientName: 수령인<br>orderSeq: 주문번호<br>orderProductSeq: 주문상품번호 |
| searchQuery | String | N | 검색어                               | 최대 40                                                                                                                                       |
| searchStatus | String | N | 검색할 주문 상태. 콤마(,)로 구분해서 복수 상태 가능   | 결제완료: 1, 입금대기중: 2<br>배송준비중(발송준비중): 10, 배송중(발송완료): 11, 발송지연: 12, 배송완료(사용완료): 13<br>반품신청(취소요청): 40, 환불완료: 42<br>교환신청: 50, 판매취소: 60, 주문취소: 80, 구매확정: 90 |
| searchDate | String | N | 검색할 대상 주문/결제 날짜. default 주문 결제 일시 | orderedAt: 주문결제일시<br>confirmAt: 구매확정일시<br>cancelAt: 주문취소일시                                                                                  |
| searchStartAt | Date | N | 검색할 주문/결제 시작일시. default 30일 전     |                                                                                                                                             |
| searchEndAt | Date | N | 검색할 주문/결제 종료일시. default 오늘        |                                                                                                                                             |

***Response***

| 이름 | 타입                                  | 설명 | 
| -----------  |-------------------------------------|------------ | 
| orderList | List&lt;[OrderList](#orderlist)&gt; | 주문 목록 |

<br>

### 주문 취소(판매 취소) <code>POST /api/order/cancel</code>
- 재고 부족과 같은 사유로 판매자가 주문을 취소합니다.

***Request Body***

| 이름 | 타입                                | 필수 | 설명 | 비고                                                                  |
| -----------  |-----------------------------------|-----------|------------ |---------------------------------------------------------------------|
| orderKeys | List&lt;[OrderKey](#orderkey)&gt; | Y | 대상 주문 |                                                                     |
| reasonType | Integer                           | Y | 주문 취소 유형 | 고객요청-단순변심: 1<br>고객요청-서비스불만족: 2<br>재고부족: 3<br>상품문제발생: 4<br>배송문제발생: 5 |
| reason | String                            | Y | 주문 취소 사유 | 최대 50자                                                              |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| affected | Integer | 주문 취소 성공한 주문 수 |

<br>

### 주문 취소(판매 취소) <code>POST /api/order/cancel/result</code>

| 이름 | 타입                                | 필수 | 설명 | 비고 |
| -----------  |-----------------------------------|-----------|------------ | --------------- |
| orderKeys | List&lt;[OrderKey](#orderkey)&gt; | Y | 대상 주문 | |

***Response***

| 이름 | 타입                                      | 설명 | 
| -----------  |-----------------------------------------|------------ | 
| result | List&lt;[OrderResult](#orderresult)&gt; | 주문 취소 요청 결과 |

<br>

### 반품 개수 <code>GET /api/return/count</code>
- 반품 개수를 조회합니다.

***Request Body***

| 이름 | 타입 | 필수 | 설명                              | 비고                                                                                                                                                                   |
| -----------  | ------------ |-----------|---------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| searchTarget | String | N | 검색 대상                           | buyerNickname: 구매자 닉네임<br>buyerName: 구매자 이름<br>buyerPhoneNumber: 구매자 연락처<br>recipientName: 수령인<br>orderSeq: 주문번호<br>orderProductSeq: 주문상품번호<br>trackingNumber: 운송장번호 |
| searchQuery | String | N | 검색어                             | 최대 40자                                                                                                                                                               |
| searchStatus | String | N | 검색할 주문 상태. 콤마(,)로 구분해서 복수 상태 가능 | 반품신청: 40, 반품진행중(상품대기): 41, 반품진행중(상품확인): 42<br>반품완료(환불완료): 44, 반품완료(환불대기): 46<br>반품취소(구매자): 47, 반품취소(판매자): 48                                                         |
| searchDate | String | N | 검색할 대상 날짜. default 반품신청일시       | orderedAt: 주문결제일시<br>requestReturnAt: 반품신청일시<br>cancelReturnAt: 반품취소일시<br>completeReturnAt: 반품완료일시                                                                   |
| searchStartAt | Date | N | 검색할 반품신청 시작일시. default 30일 전    |                                                                                                                                                                      |
| searchEndAt | Date | N | 검색할 반품신청 종료일시. default 오늘       |                                                                                                                                                                      |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| returnCount | Integer | 반품 개수 |

<br>

### 반품 목록 <code>GET /api/return</code>
- 반품 목록을 조회합니다.

***Request Body***

| 이름 | 타입 | 필수 | 설명                             | 비고 |
| -----------  | ------------ |-----------|--------------------------------| --------------- |
| start | Integer | N | 페이지 시작 번호(offset). default 0      | 페이지 사이즈가 20이면, 다음 시작 번호는 20 |
| length | Integer | N | 페이지 사이즈. default 20                |  |
| searchTarget | String | N | 검색 대상                          | buyerNickname: 구매자 닉네임<br>buyerName: 구매자 이름<br>buyerPhoneNumber: 구매자 연락처<br>recipientName: 수령인<br>orderSeq: 주문번호<br>orderProductSeq: 주문상품번호<br>trackingNumber: 운송장번호 |
| searchQuery | String | N | 검색어                            | 최대 40자 |
| searchStatus | String | N | 검색할 주문 상태. 콤마(,)로 구분해서 복수 상태 가능 | 반품신청: 40, 반품진행중(상품대기): 41, 반품진행중(상품확인): 42<br>반품완료(환불완료): 44, 반품완료(환불대기): 46<br>반품취소(구매자): 47, 반품취소(판매자): 48                                                         |
| searchDate | String | N | 검색할 대상 날짜. default 반품신청일시       | orderedAt: 주문결제일시<br>requestReturnAt: 반품신청일시<br>cancelReturnAt: 반품취소일시<br>completeReturnAt: 반품완료일시                                                                   |
| searchStartAt | Date | N | 검색할 반품신청 시작일시. default 30일 전       | |
| searchEndAt | Date | N | 검색할 반품신청 종료일시. default 오늘          | |

***Response***

| 이름 | 타입                                    | 설명 | 
| -----------  |---------------------------------------|------------ | 
| returnList | List&lt;[ReturnList](#returnlist)&gt; | 반품 목록 |

<br>

### 반품 접수 <code>PUT /api/return/start</code>
- 구매자의 반품 요청을 접수합니다.
- 구매자에게 반품 방법을 안내하는 과정입니다.

***Request Body***

| 이름 | 타입                    | 필수 | 설명 | 비고 |
| -----------  |-----------------------|-----------|------------ | --------------- |
| orderKey | [OrderKey](#orderkey) | Y | 대상 주문 | |
| message | String                | Y | 반품 접수 안내 메시지 | 최대 1,000자 |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| ret | Boolean | 성공여부 |

<br>

### 반품 상품 확인 <code>PUT /api/return/receive</code>
- 구매자가 반품한 상품이 판매자에게 도착했다는 것을 의미합니다.

***Request Body***

| 이름 | 타입                    | 필수 | 설명 | 비고 |
| -----------  |-----------------------|-----------|------------ | --------------- |
| orderKey | [OrderKey](#orderkey) | Y | 대상 주문 | |
| receiveProduct | Boolean               | Y |  |  |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| ret | Boolean | 성공여부 |

<br>

### 반품 승인 <code>PUT /api/return/allow</code>
- 반품을 승인합니다.
- 구매자에게 환불이 진행됩니다.
- 가상계좌로 결제한 고객인 경우에는 구매자가 환불계좌를 입력해야 환불이 완료됩니다.

***Request Body***

| 이름 | 타입                    | 필수 | 설명 | 비고 |
| -----------  |-----------------------|-----------|------------ | --------------- |
| orderKey | [OrderKey](#orderkey) | Y | 대상 주문 | |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| ret | Boolean | 성공여부 |

<br>

### 반품 거절 <code>PUT /api/return/deny</code>
- 반품을 거절합니다.

***Request Body***

| 이름 | 타입                    | 필수 | 설명 | 비고 |
| -----------  |-----------------------|-----------|------------ | --------------- |
| orderKey | [OrderKey](#orderkey) | Y | 대상 주문 | |
| reason | String                | Y | 반품 거절 사유 | 최대 200자 |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| ret | Boolean | 성공여부 |

<br>

### 교환 개수 <code>GET /api/exchange/count</code>
- 교환 개수를 조회합니다.

***Request Body***

| 이름 | 타입 | 필수 | 설명                             | 비고                                                                                                                                                                   |
| -----------  | ------------ |-----------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| searchTarget | String | N | 검색 대상                          | buyerNickname: 구매자 닉네임<br>buyerName: 구매자 이름<br>buyerPhoneNumber: 구매자 연락처<br>recipientName: 수령인<br>orderSeq: 주문번호<br>orderProductSeq: 주문상품번호<br>trackingNumber: 운송장번호 |
| searchQuery | String | N | 검색어                            | 최대 40자                                                                                                                                                               |
| searchStatus | String | N | 검색할 주문 상태. 콤마(,)로 구분해서 복수 상태 가능 | 교환신청: 50, 교환진행중: 51, 교환취소(판매자): 52<br>교환(배송중): 53, 교환(배송완료): 54, 교환취소(구매자): 55                                                                                       |
| searchDate | String | N | 검색할 날짜 대상. default 교환신청일시 | orderedAt: 주문결제일시<br>requestChangeAt: 교환신청일시<br>cancelChangeAt: 교환취소일시                                                                                                     |
| searchStartAt | Date | N | 검색할 교환신청 시작일시. default 30일 전       |                                                                                                                                                                      |
| searchEndAt | Date | N | 검색할 교환신청 종료일시. default 오늘          |                                                                                                                                                                      |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| exchangeCount | Integer | 교환 개수 |

<br>

### 교환 목록 <code>GET /api/exchange</code>
- 교환 목록을 조회합니다.

***Request Body***

| 이름 | 타입 | 필수 | 설명                             | 비고                                                                                                                                                                   |
| -----------  | ------------ |-----------|--------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| start | Integer | N | 페이지 시작 번호(offset). default 0      | 페이지 사이즈가 20이면, 다음 시작 번호는 20                                                                                                                                          |
| length | Integer | N | 페이지 사이즈. default 20                |                                                                                                                                                                      |
| searchTarget | String | N | 검색 대상                          | buyerNickname: 구매자 닉네임<br>buyerName: 구매자 이름<br>buyerPhoneNumber: 구매자 연락처<br>recipientName: 수령인<br>orderSeq: 주문번호<br>orderProductSeq: 주문상품번호<br>trackingNumber: 운송장번호 |
| searchQuery | String | N | 검색어                            | 최대 40                                                                                                                                                                |
| searchStatus | String | N | 검색할 주문 상태. 콤마(,)로 구분해서 여러개 가능  | 교환신청: 50, 교환진행중: 51, 교환취소(판매자): 52<br>교환(배송중): 53, 교환(배송완료): 54, 교환취소(구매자): 55                                                                                       |
| searchDate | String | N | 검색할 날짜 대상. default requestChangeAt | orderedAt: 주문결제일시<br>requestChangeAt: 교환신청일시<br>cancelChangeAt: 교환취소일시                                                                                                     |
| searchStartAt | Date | N | 검색할 교환신청 시작일시. default 30일 전       |                                                                                                                                                                      |
| searchEndAt | Date | N | 검색할 교환신청 종료일시. default 오늘          |                                                                                                                                                                      |

***Response***

| 이름 | 타입                                        | 설명 | 
| -----------  |-------------------------------------------|------------ | 
| exchangeList | List&lt;[ExchangeList](#exchangelist)&gt; | 교환 목록 |

### 교환 접수 <code>/api/exchange/start</code>
- 구매자의 교환 요청을 접수합니다.
- 구매자에게 교환 방법을 안내하는 과정입니다.

***Request Body***

| 이름 | 타입                    | 필수 | 설명 | 비고 |
| -----------  |-----------------------|-----------|------------ | --------------- |
| orderKey | [OrderKey](#orderkey) | Y | 대상 주문 | |
| message | String                | Y | 교환 접수 안내 메시지 | 최대 1,000자 |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| ret | Boolean | 성공여부 |

<br>

### 교환 상품 확인 <code>PUT /api/exchange/receive</code>
- 구매자가 교환한 상품이 판매자에게 도착했다는 것을 의미합니다.

***Request Body***


| 이름 | 타입                    | 필수 | 설명 | 비고 |
| -----------  |-----------------------|-----------|------------ | --------------- |
| orderKey | [OrderKey](#orderkey) | Y | 대상 주문 | |
| receiveProduct | Boolean               | Y |  |  |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| ret | Boolean | 성공여부 |

<br>

### 교환 직접 수령 <code>PUT /api/exchange/direct</code>
- 교환 상품을 직접 수령한 경우에 사용합니다.
- 교환 직접 수령을 하면 구매자는 '배송완료' 안내를 받게 됩니다.

***Request Body***

| 이름 | 타입                    | 필수 | 설명 | 비고 |
| -----------  |-----------------------|-----------|------------ | --------------- |
| orderKey | [OrderKey](#orderkey) | Y | 대상 주문 | |
| changeMemo | String                | N | 교환 메모 | 최대 200자. 판매자가 확인하기 위한 메모 |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| ret | Boolean | 성공여부 |

<br>

### 교환 승인 <code>PUT /api/exchange/allow</code>
- 교환을 승인합니다.
- 구매자에게 교환을 진행합니다. 교환 배송정보가 필요합니다.

***Request Body***

| 이름 | 타입                    | 필수 | 설명 | 비고 |
| -----------  |-----------------------|-----------|------------ | --------------- |
| orderKey | [OrderKey](#orderkey) | Y | 대상 주문 | |
| changeMemo | String                | N | 교환 메모 | 최대 200자. 판매자가 확인하기 위한 메모 |
| deliveryCompanySeq | Integer               | Y | 택배회사 번호 | |
| trackingNumber | String                | Y | 운송장 번호 | |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| ret | Boolean | 성공여부 |

<br>

### 교환 거절 <code>PUT /api/exchange/deny</code>
- 교환을 거절합니다.

***Request Body***

| 이름 | 타입                    | 필수 | 설명 | 비고 |
| -----------  |-----------------------|-----------|------------ | --------------- |
| orderKey | [OrderKey](#orderkey) | Y | 대상 주문 | |
| reason | String                | Y | 교환 거절 사유 | 최대 200자 |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| ret | Boolean | 성공여부 |
