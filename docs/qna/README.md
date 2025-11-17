## 1:1 문의 관리

## 제공 API
- [1:1 문의 개수](#11-문의-개수-codeget-apiinquirycountcode)
- [1:1 문의 목록](#11-문의-목록-codeget-apiinquirycode)
- [1:1 문의 상세 조회](#11-문의-상세-조회-codeget-apiinquiryinquiryseqcode)
- [1:1 문의 답변 등록](#11-문의-답변-등록-codepost-apiinquiryinquiryseqcode)
- [1:1 문의 답변 수정](#11-문의-답변-수정-codeput-apiinquiryinquiryseqcode)

---

## 모델

<a id="inquirytype"></a>
<details>
<summary>InquiryType</summary>

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
</details>

<a id="inquirylist"></a>
<details>
<summary>InquiryList</summary>

| 이름 | 타입                          | 설명 | 비고 |
| -----------  |-----------------------------|------------ | ------------ | 
| inquirySeq | Long                        | 문의 번호 | |
| inquiryType | [InquiryType](#inquirytype) | 문의 유형 | |
| orderSeq | Long                        | 주문 번호 | 상품 상세에서 문의한 경우에는 null |
| title | String                      | 문의 제목 | 최대 50자 |
| userName | String                      | 문의한 사용자 닉네임 | 최대 30자 |
| yourProductId | String                      | 자체 상품 아이디 | 최대 40자 |
| productId | String                      | Grip 상품 아이디 | 최대 16자 |
| productName | String                      | 주문 당시 상품명 | 최대 40자 |
| email | String                      | 문의한 사용자 이메일 | 최대 60자 |
| createdAt | Date                        | 문의일시 | |
| replyAt | Date                        | 답변일시 | |
| imageUrls | List&lt;String&gt;          | 이미지 있는 경우 URL 목록 | 최대 10개 |
</details>

<a id="inquiry"></a>
<details>
<summary>Inquiry</summary>

| 이름 | 타입                          | 설명 | 비고 |
| -----------  |-----------------------------|------------ | ------------ | 
| inquirySeq | Long                        | 문의 번호 | |
| inquiryType | [InquiryType](#inquirytype) | 문의 유형 | |
| orderSeq | Long                        | 주문 번호 | 상품 상세에서 문의한 경우에는 null |
| title | String                      | 문의 제목 | 최대 50자 |
| content | String                      | 문의 내용 | 최대 1,000자 |
| reply | String                      | 답변 내용 | 최대 1,000자 |
| userName | String                      | 문의한 사용자 닉네임 | 최대 30자 |
| yourProductId | String                      | 자체 상품 아이디 | 최대 40자 |
| productId | String                      | Grip 상품 아이디 | 최대 16자 |
| productName | String                      | 주문 당시 상품명 | 최대 40자 |
| email | String                      | 문의한 사용자 이메일 | 최대 60자 |
| createdAt | Date                        | 문의일시 | |
| replyAt | Date                        | 답변일시 | |
| imageUrls | List&lt;String&gt;          | 이미지 있는 경우 URL 목록 | 최대 10개 |
</details>

---

### 1:1 문의 개수 <code>GET /api/inquiry/count</code>
- 1:1 문의 개수를 조회합니다.

***Request Parameters***

| 이름 | 타입                          | 필수 | 설명                            | 비고                                                  |
| -----------  |-----------------------------|-----------|-------------------------------|-----------------------------------------------------|
| inquiryType | [InquiryType](#inquirytype) | N | 검색할 문의 유형                     |                                                     |
| searchTarget | String                      | N | 검색 대상                         | username: 문의자 닉네임<br>title: 문의 제목<br>orderSeq: 주문번호 |
| searchQuery | String                      | N | 최대 40자                        |                                                     |
| searchStartAt | Date                        | N | 검색할 문의 등록 시작일시. default 30일 전 |                                                     |
| searchEndAt | Date                        | N | 검색할 문의 등록 종료일시. default 오늘    |                                                     |
| needReply | Boolean                     | N | 답변 필요. default false          |                                                     |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| inquiryCount | Integer | 1:1 문의 개수 |

<br>

### 1:1 문의 목록 <code>GET /api/inquiry</code>
- 1:1 문의 목록을 조회합니다.
- 그립에서 1:1 문의는 상품 상세와 주문서를 통해서 등록됩니다.

***Request Parameters***

| 이름 | 타입                          | 필수 | 설명                            | 비고 |
| -----------  |-----------------------------|-----------|-------------------------------| --------------- |
| inquiryType | [InquiryType](#inquirytype) | N | 검색할 문의 유형                     | |
| searchTarget | String                      | N | 검색 대상                         | username: 문의자 닉네임<br>title: 문의 제목<br>orderSeq: 주문번호 |
| searchQuery | String                      | N | 검색어                           | |
| searchStartAt | Date                        | N | 검색할 문의 등록 시작일시. default 30일 전 | |
| searchEndAt | Date                        | N | 검색할 문의 등록 종료일시. default 오늘    | |
| needReply | Boolean                     | N | 답변 필요. default false          | |
| start | Integer                     | N | 페이지 시작 번호(offset). default 0  | 페이지 사이즈가 20이면, 다음 시작 번호는 20          |
| length | Integer                     | N | 페이지 사이즈. default 20           |  |

***Response***

| 이름 | 타입                                      | 설명 | 
| -----------  |-----------------------------------------|------------ | 
| inquiryList | List&lt;[InquiryList](#inquirylist)&gt; | 1:1 문의 목록 |

<br>

### 1:1 문의 상세 조회 <code>GET /api/inquiry/{inquirySeq}</code>
- 1:1 문의를 조회합니다.

***Response***

| 이름 | 타입                  | 설명 | 
| -----------  |---------------------|------------ | 
| inquiry | [Inquiry](#inquiry) | 1:1 문의 |

<br>

### 1:1 문의 답변 등록 <code>POST /api/inquiry/{inquirySeq}</code>
- 1:1 문의 답변을 등록합니다.
- 답변이 등록되는 즉시 문의자에게 알림이 전송됩니다.

***Request Body***

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| reply | String | Y | 답변 내용 | 최대 1,000자 |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| inquirySeq | Long | 1:1 문의 번호 |

<br>

### 1:1 문의 답변 수정 <code>PUT /api/inquiry/{inquirySeq}</code>
- 1:1 문의 답변을 수정합니다.
- 수정 사항에 대해 문의자에게 알림을 전송할 지 결정할 수 있습니다. (`noti`)

***Request Body***

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| reply | String | Y | 답변 내용 | 최대 1,000자 |
| noti | Boolean | Y | 답변 수정 알림 여부 | |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| inquirySeq | Long | 1:1 문의 번호 |