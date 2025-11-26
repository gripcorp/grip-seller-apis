## 리뷰 관리

## 제공 API
- [리뷰 개수](#리뷰-개수-get-apireviewcount)
- [리뷰 목록](#리뷰-목록-get-apireview)
- [리뷰 답변 등록](#리뷰-답변-등록-post-apireviewreviewseq)
- [리뷰 답변 수정](#리뷰-답변-수정-put-apireviewreviewseq)

---

## 모델

<a id="reviewlist"></a>
<details>
<summary>ReviewList</summary>

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
</details>

---

### 리뷰 개수 <code>GET /api/review/count</code>
- 리뷰 개수를 조회합니다.

***Request Parameters***

| 이름 | 타입 | 필수 | 설명                            | 비고 |
| -----------  | ------------ |-----------|-------------------------------| --------------- |
| searchQuery | String | N | 검색할 작성자 닉네임                   | |
| searchStartAt | Date | N | 검색할 문의 등록 시작일시. default 30일 전 | |
| searchEndAt | Date | N | 검색할 문의 등록 종료일시. default 오늘    | |
| needReply | Boolean | N | 답변 필요. default false          | |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| reviewCount | Integer | 리뷰 개수 |

<br>

### 리뷰 목록 <code>GET /api/review</code>
- 리뷰 목록을 조회합니다.

***Request Parameters***

| 이름 | 타입 | 필수 | 설명                            | 비고 |
| -----------  | ------------ |-----------|-------------------------------| --------------- |
| searchQuery | String | N | 검색할 작성자 닉네임                   | |
| searchStartAt | Date | N | 검색할 문의 등록 시작일시. default 30일 전 | |
| searchEndAt | Date | N | 검색할 문의 등록 종료일시. default 오늘    | |
| needReply | Boolean | N | 답변 필요. default false          | |
| start | Integer                     | N | 페이지 시작 번호(offset). default 0  | 페이지 사이즈가 20이면, 다음 시작 번호는 20          |
| length | Integer                     | N | 페이지 사이즈. default 20           |  |

***Response***

| 이름 | 타입                                    | 설명 | 
| -----------  |---------------------------------------|------------ | 
| reviewList | List&lt;[ReviewList](#reviewlist)&gt; | 리뷰 목록 |

<br>

### 리뷰 답변 등록 <code>POST /api/review/{reviewSeq}</code>
- 리뷰의 답변을 등록합니다.
- 답변이 등록되는 즉시 리뷰 작성자에게 알림이 전송됩니다.

***Request Body***

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| reply | String | Y | 답변 내용 | 최대 500자 |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| reviewSeq | Long | 리뷰 번호 |

<br>

### 리뷰 답변 수정 <code>PUT /api/review/{reviewSeq}</code>
- 리뷰의 답변을 수정합니다.
- 수정 사항에 대해 리뷰 작성자에게 알림을 전송할 지 결정할 수 있습니다. (`noti`)

***Request Body***

| 이름 | 타입 | 필수 | 설명 | 비고 |
| -----------  | ------------ |-----------|------------ | --------------- |
| reply | String | Y | 답변 내용 | 최대 500자 |
| noti | Boolean | Y | 답변 수정 알림 여부 | |

***Response***

| 이름 | 타입 | 설명 | 
| -----------  | ------------ |------------ | 
| reviewSeq | Long | 리뷰 번호 |